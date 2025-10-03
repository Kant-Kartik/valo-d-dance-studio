// ===== SUPABASE DATABASE MANAGEMENT SYSTEM =====

// Database configuration
let supabaseClient = null;

// Initialize database connection
function initializeDatabase() {
    if (window.supabase && window.supabaseConfig) {
        const config = window.supabaseConfig.getConfig();
        if (config.url && config.anonKey) {
            supabaseClient = window.supabase.createClient(config.url, config.anonKey);
            console.log('✅ Database initialized successfully');
            return true;
        }
    }
    console.warn('⚠️ Database not available, using localStorage fallback');
    return false;
}

// ===== CONTACT MESSAGES MANAGEMENT =====

// Store contact message
async function storeContactMessage(name, email, message) {
    const messageData = {
        name: name,
        email: email,
        message: message,
        submitted_at: new Date().toISOString(),
        status: 'unread'
    };

    try {
        if (supabaseClient) {
            // Store in Supabase
            const { data, error } = await supabaseClient
                .from('contact_messages')
                .insert([messageData]);
            
            if (error) {
                console.error('Supabase contact error:', error);
                // Fallback to localStorage
                storeContactMessageLocal(messageData);
                return { success: true, method: 'localStorage' };
            }
            
            return { success: true, method: 'supabase', data };
        } else {
            // Fallback to localStorage
            storeContactMessageLocal(messageData);
            return { success: true, method: 'localStorage' };
        }
    } catch (error) {
        console.error('Contact storage error:', error);
        // Final fallback
        storeContactMessageLocal(messageData);
        return { success: true, method: 'localStorage' };
    }
}

// localStorage fallback for contact messages
function storeContactMessageLocal(messageData) {
    const messages = JSON.parse(localStorage.getItem('valo_d_contact_messages') || '[]');
    messageData.id = 'msg_' + Date.now();
    messages.unshift(messageData);
    
    // Keep only last 100 messages
    if (messages.length > 100) {
        messages.splice(100);
    }
    
    localStorage.setItem('valo_d_contact_messages', JSON.stringify(messages));
}

// Get contact messages (admin only)
async function getContactMessages() {
    try {
        // Check admin permissions
        if (!await window.authUtils.isAdmin()) {
            throw new Error('Admin privileges required');
        }

        if (supabaseClient) {
            // Get from Supabase
            const { data, error } = await supabaseClient
                .from('contact_messages')
                .select('*')
                .order('submitted_at', { ascending: false })
                .limit(100);
            
            if (error) {
                console.error('Supabase get messages error:', error);
                // Fallback to localStorage
                return JSON.parse(localStorage.getItem('valo_d_contact_messages') || '[]');
            }
            
            return data || [];
        } else {
            // Fallback to localStorage
            return JSON.parse(localStorage.getItem('valo_d_contact_messages') || '[]');
        }
    } catch (error) {
        console.error('Error getting contact messages:', error);
        return [];
    }
}

// Mark message as read
async function markMessageAsRead(messageId) {
    try {
        if (!await window.authUtils.isAdmin()) {
            throw new Error('Admin privileges required');
        }

        if (supabaseClient) {
            const { error } = await supabaseClient
                .from('contact_messages')
                .update({ status: 'read', read_at: new Date().toISOString() })
                .eq('id', messageId);
            
            if (error) {
                console.error('Error marking message as read:', error);
                return false;
            }
            return true;
        } else {
            // localStorage fallback
            const messages = JSON.parse(localStorage.getItem('valo_d_contact_messages') || '[]');
            const messageIndex = messages.findIndex(m => m.id === messageId);
            if (messageIndex !== -1) {
                messages[messageIndex].status = 'read';
                messages[messageIndex].read_at = new Date().toISOString();
                localStorage.setItem('valo_d_contact_messages', JSON.stringify(messages));
                return true;
            }
            return false;
        }
    } catch (error) {
        console.error('Error marking message as read:', error);
        return false;
    }
}

// ===== ADMIN HISTORY MANAGEMENT =====

// Store admin action
async function storeAdminAction(action, details) {
    const historyData = {
        action: action,
        details: details,
        timestamp: new Date().toISOString(),
        admin_user: details.adminUser || 'Unknown'
    };

    try {
        if (supabaseClient) {
            // Store in Supabase
            const { data, error } = await supabaseClient
                .from('admin_history')
                .insert([historyData]);
            
            if (error) {
                console.error('Supabase admin history error:', error);
                // Fallback to localStorage
                storeAdminActionLocal(historyData);
                return { success: true, method: 'localStorage' };
            }
            
            return { success: true, method: 'supabase', data };
        } else {
            // Fallback to localStorage
            storeAdminActionLocal(historyData);
            return { success: true, method: 'localStorage' };
        }
    } catch (error) {
        console.error('Admin history storage error:', error);
        // Final fallback
        storeAdminActionLocal(historyData);
        return { success: true, method: 'localStorage' };
    }
}

// localStorage fallback for admin history
function storeAdminActionLocal(historyData) {
    const history = JSON.parse(localStorage.getItem('valo_d_admin_history') || '[]');
    historyData.id = 'action_' + Date.now();
    history.unshift(historyData);
    
    // Keep only last 100 actions
    if (history.length > 100) {
        history.splice(100);
    }
    
    localStorage.setItem('valo_d_admin_history', JSON.stringify(history));
}

// Get admin history
async function getAdminHistory() {
    try {
        // Check admin permissions with fallback
        const isAdminUser = await window.authUtils.isAdmin();
        const userDataFromStorage = localStorage.getItem('currentUser');
        let hasAdminAccess = isAdminUser;
        
        if (!hasAdminAccess && userDataFromStorage) {
            const userData = JSON.parse(userDataFromStorage);
            hasAdminAccess = userData.isAdmin === true;
        }
        
        if (!hasAdminAccess) {
            throw new Error('Admin privileges required');
        }

        if (supabaseClient) {
            // Get from Supabase
            const { data, error } = await supabaseClient
                .from('admin_history')
                .select('*')
                .order('timestamp', { ascending: false })
                .limit(100);
            
            if (error) {
                console.error('Supabase get history error:', error);
                // Fallback to localStorage
                return JSON.parse(localStorage.getItem('valo_d_admin_history') || '[]');
            }
            
            return data || [];
        } else {
            // Fallback to localStorage
            return JSON.parse(localStorage.getItem('valo_d_admin_history') || '[]');
        }
    } catch (error) {
        console.error('Error getting admin history:', error);
        return [];
    }
}

// ===== VIDEO DATA MANAGEMENT =====

// Store video data
async function storeVideoData(danceType, level, videoData) {
    try {
        if (supabaseClient) {
            // Store in Supabase
            const dbVideoData = {
                dance_type: danceType,
                level: level,
                video_id: videoData.id,
                url: videoData.url,
                title: videoData.title,
                added_by: videoData.addedBy,
                added_at: videoData.addedAt
            };

            const { data, error } = await supabaseClient
                .from('videos')
                .insert([dbVideoData]);
            
            if (error) {
                console.error('Supabase video storage error:', error);
                return { success: false, error: error.message };
            }
            
            return { success: true, method: 'supabase', data };
        } else {
            // Fallback to localStorage (existing system)
            return { success: true, method: 'localStorage' };
        }
    } catch (error) {
        console.error('Video storage error:', error);
        return { success: false, error: error.message };
    }
}

// Get videos for a dance type and level
async function getVideosFromDB(danceType, level) {
    try {
        if (supabaseClient) {
            // Get from Supabase
            const { data, error } = await supabaseClient
                .from('videos')
                .select('*')
                .eq('dance_type', danceType)
                .eq('level', level)
                .order('added_at', { ascending: true });
            
            if (error) {
                console.error('Supabase get videos error:', error);
                // Fallback to localStorage
                return getVideosFromLocalStorage(danceType, level);
            }
            
            // Convert to expected format
            return data.map(video => ({
                id: video.video_id,
                url: video.url,
                title: video.title,
                addedBy: video.added_by,
                addedAt: video.added_at
            }));
        } else {
            // Fallback to localStorage
            return getVideosFromLocalStorage(danceType, level);
        }
    } catch (error) {
        console.error('Error getting videos:', error);
        return getVideosFromLocalStorage(danceType, level);
    }
}

// localStorage fallback for videos
function getVideosFromLocalStorage(danceType, level) {
    const videos = JSON.parse(localStorage.getItem('valo_d_videos') || '{}');
    return videos[danceType]?.[level] || [];
}

// Remove video from database
async function removeVideoFromDB(danceType, level, videoId) {
    try {
        if (supabaseClient) {
            const { error } = await supabaseClient
                .from('videos')
                .delete()
                .eq('dance_type', danceType)
                .eq('level', level)
                .eq('video_id', videoId);
            
            if (error) {
                console.error('Supabase video removal error:', error);
                return { success: false, error: error.message };
            }
            
            return { success: true, method: 'supabase' };
        } else {
            return { success: true, method: 'localStorage' };
        }
    } catch (error) {
        console.error('Video removal error:', error);
        return { success: false, error: error.message };
    }
}

// ===== INITIALIZATION =====

// Initialize database when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait for other scripts to load
    setTimeout(() => {
        initializeDatabase();
    }, 1000);
});

// Export functions for global use
window.databaseManager = {
    // Contact messages
    storeContactMessage,
    getContactMessages,
    markMessageAsRead,
    
    // Admin history
    storeAdminAction,
    getAdminHistory,
    
    // Videos
    storeVideoData,
    getVideosFromDB,
    removeVideoFromDB,
    
    // Utility
    initializeDatabase
};
