// ===== VIDEO MANAGEMENT SYSTEM =====

// Video storage structure
const VIDEO_STORAGE_KEY = 'valo_d_videos';
const ADMIN_HISTORY_KEY = 'valo_d_admin_history';
const LIKES_STORAGE_KEY = 'valo_d_video_likes';
const COMMENTS_STORAGE_KEY = 'valo_d_video_comments';

// Initialize video storage with default videos if not exists
function initializeVideoStorage() {
    const existingVideos = localStorage.getItem(VIDEO_STORAGE_KEY);
    
    if (!existingVideos) {
        // Default video structure for all dance types and levels
        const defaultVideos = {
            bharatanatyam: {
                beginner: [
                    { id: 'bharata_beg_1', url: 'https://www.youtube.com/embed/vmwZ9R03bXs', title: 'Bharatanatyam Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_beg_2', url: 'https://www.youtube.com/embed/MzDZYVhfgNw', title: 'Bharatanatyam Basics 2', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_beg_3', url: 'https://www.youtube.com/embed/OIKOHzePJCA', title: 'Bharatanatyam Basics 3', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_beg_4', url: 'https://www.youtube.com/embed/kbUzi7meesU', title: 'Hip Hop Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_beg_5', url: 'https://www.youtube.com/embed/1sD51hC0yRg', title: 'Hip Hop Basics 2', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_beg_6', url: 'https://www.youtube.com/embed/ujREEgxEP7g', title: 'Hip Hop Basics 3', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_beg_7', url: 'https://www.youtube.com/embed/KxV8I_YyiaY', title: 'Hip Hop Basics 4', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_beg_8', url: 'https://www.youtube.com/embed/1WIA6Yvj8Yg', title: 'Hip Hop Basics 5', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_beg_9', url: 'https://www.youtube.com/embed/BW9Q930DiK4', title: 'Hip Hop Basics 6', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intermediate: [
                    { id: 'bharata_int_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Bharatanatyam Intermediate 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_int_2', url: 'https://www.youtube.com/embed/kbUzi7meesU', title: 'Hip Hop Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_int_3', url: 'https://www.youtube.com/embed/1sD51hC0yRg', title: 'Hip Hop Basics 2', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_int_4', url: 'https://www.youtube.com/embed/ujREEgxEP7g', title: 'Hip Hop Basics 3', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_int_5', url: 'https://www.youtube.com/embed/KxV8I_YyiaY', title: 'Hip Hop Basics 4', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_int_6', url: 'https://www.youtube.com/embed/1WIA6Yvj8Yg', title: 'Hip Hop Basics 5', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_int_7', url: 'https://www.youtube.com/embed/BW9Q930DiK4', title: 'Hip Hop Basics 6', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intense: [
                    { id: 'bharata_ins_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Bharatanatyam Advanced 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_ins_2', url: 'https://www.youtube.com/embed/kbUzi7meesU', title: 'Hip Hop Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_ins_3', url: 'https://www.youtube.com/embed/1sD51hC0yRg', title: 'Hip Hop Basics 2', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_ins_4', url: 'https://www.youtube.com/embed/ujREEgxEP7g', title: 'Hip Hop Basics 3', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_ins_5', url: 'https://www.youtube.com/embed/KxV8I_YyiaY', title: 'Hip Hop Basics 4', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_ins_6', url: 'https://www.youtube.com/embed/1WIA6Yvj8Yg', title: 'Hip Hop Basics 5', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'bharata_ins_7', url: 'https://www.youtube.com/embed/BW9Q930DiK4', title: 'Hip Hop Basics 6', addedBy: 'system', addedAt: new Date().toISOString() }
                ]
            },
            hiphop: {
                beginner: [
                    { id: 'hiphop_beg_1', url: 'https://www.youtube.com/embed/kbUzi7meesU', title: 'Hip Hop Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_beg_2', url: 'https://www.youtube.com/embed/1sD51hC0yRg', title: 'Hip Hop Basics 2', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_beg_3', url: 'https://www.youtube.com/embed/ujREEgxEP7g', title: 'Hip Hop Basics 3', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_beg_4', url: 'https://www.youtube.com/embed/KxV8I_YyiaY', title: 'Hip Hop Basics 4', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_beg_5', url: 'https://www.youtube.com/embed/1WIA6Yvj8Yg', title: 'Hip Hop Basics 5', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_beg_6', url: 'https://www.youtube.com/embed/BW9Q930DiK4', title: 'Hip Hop Basics 6', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intermediate: [
                    { id: 'hiphop_int_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Hip Hop Intermediate 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_int_2', url: 'https://www.youtube.com/embed/kbUzi7meesU', title: 'Hip Hop Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_int_3', url: 'https://www.youtube.com/embed/1sD51hC0yRg', title: 'Hip Hop Basics 2', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_int_4', url: 'https://www.youtube.com/embed/ujREEgxEP7g', title: 'Hip Hop Basics 3', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_int_5', url: 'https://www.youtube.com/embed/KxV8I_YyiaY', title: 'Hip Hop Basics 4', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_int_6', url: 'https://www.youtube.com/embed/1WIA6Yvj8Yg', title: 'Hip Hop Basics 5', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_int_7', url: 'https://www.youtube.com/embed/BW9Q930DiK4', title: 'Hip Hop Basics 6', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intense: [
                    { id: 'hiphop_ins_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Hip Hop Advanced 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_ins_2', url: 'https://www.youtube.com/embed/kbUzi7meesU', title: 'Hip Hop Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_ins_3', url: 'https://www.youtube.com/embed/1sD51hC0yRg', title: 'Hip Hop Basics 2', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_ins_4', url: 'https://www.youtube.com/embed/ujREEgxEP7g', title: 'Hip Hop Basics 3', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_ins_5', url: 'https://www.youtube.com/embed/KxV8I_YyiaY', title: 'Hip Hop Basics 4', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_ins_6', url: 'https://www.youtube.com/embed/1WIA6Yvj8Yg', title: 'Hip Hop Basics 5', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'hiphop_ins_7', url: 'https://www.youtube.com/embed/BW9Q930DiK4', title: 'Hip Hop Basics 6', addedBy: 'system', addedAt: new Date().toISOString() }
                ]
            },
            breakdance: {
                beginner: [
                    { id: 'break_beg_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Breakdance Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_beg_2', url: 'https://www.youtube.com/embed/kbUzi7meesU', title: 'Hip Hop Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_beg_3', url: 'https://www.youtube.com/embed/1sD51hC0yRg', title: 'Hip Hop Basics 2', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_beg_4', url: 'https://www.youtube.com/embed/ujREEgxEP7g', title: 'Hip Hop Basics 3', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_beg_5', url: 'https://www.youtube.com/embed/KxV8I_YyiaY', title: 'Hip Hop Basics 4', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_beg_6', url: 'https://www.youtube.com/embed/1WIA6Yvj8Yg', title: 'Hip Hop Basics 5', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_beg_7', url: 'https://www.youtube.com/embed/BW9Q930DiK4', title: 'Hip Hop Basics 6', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intermediate: [
                    { id: 'break_int_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Breakdance Intermediate 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_int_2', url: 'https://www.youtube.com/embed/kbUzi7meesU', title: 'Hip Hop Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_int_3', url: 'https://www.youtube.com/embed/1sD51hC0yRg', title: 'Hip Hop Basics 2', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_int_4', url: 'https://www.youtube.com/embed/ujREEgxEP7g', title: 'Hip Hop Basics 3', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_int_5', url: 'https://www.youtube.com/embed/KxV8I_YyiaY', title: 'Hip Hop Basics 4', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_int_6', url: 'https://www.youtube.com/embed/1WIA6Yvj8Yg', title: 'Hip Hop Basics 5', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_int_7', url: 'https://www.youtube.com/embed/BW9Q930DiK4', title: 'Hip Hop Basics 6', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intense: [
                    { id: 'break_ins_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Breakdance Advanced 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_ins_2', url: 'https://www.youtube.com/embed/kbUzi7meesU', title: 'Hip Hop Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_ins_3', url: 'https://www.youtube.com/embed/1sD51hC0yRg', title: 'Hip Hop Basics 2', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_ins_4', url: 'https://www.youtube.com/embed/ujREEgxEP7g', title: 'Hip Hop Basics 3', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_ins_5', url: 'https://www.youtube.com/embed/KxV8I_YyiaY', title: 'Hip Hop Basics 4', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_ins_6', url: 'https://www.youtube.com/embed/1WIA6Yvj8Yg', title: 'Hip Hop Basics 5', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'break_ins_7', url: 'https://www.youtube.com/embed/BW9Q930DiK4', title: 'Hip Hop Basics 6', addedBy: 'system', addedAt: new Date().toISOString() }
                ]
            },
            poledance: {
                beginner: [
                    { id: 'pole_beg_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Pole Dance Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_beg_2', url: 'https://www.youtube.com/embed/kbUzi7meesU', title: 'Hip Hop Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_beg_3', url: 'https://www.youtube.com/embed/1sD51hC0yRg', title: 'Hip Hop Basics 2', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_beg_4', url: 'https://www.youtube.com/embed/ujREEgxEP7g', title: 'Hip Hop Basics 3', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_beg_5', url: 'https://www.youtube.com/embed/KxV8I_YyiaY', title: 'Hip Hop Basics 4', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_beg_6', url: 'https://www.youtube.com/embed/1WIA6Yvj8Yg', title: 'Hip Hop Basics 5', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_beg_7', url: 'https://www.youtube.com/embed/BW9Q930DiK4', title: 'Hip Hop Basics 6', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intermediate: [
                    { id: 'pole_int_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Pole Dance Intermediate 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_int_2', url: 'https://www.youtube.com/embed/kbUzi7meesU', title: 'Hip Hop Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_int_3', url: 'https://www.youtube.com/embed/1sD51hC0yRg', title: 'Hip Hop Basics 2', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_int_4', url: 'https://www.youtube.com/embed/ujREEgxEP7g', title: 'Hip Hop Basics 3', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_int_5', url: 'https://www.youtube.com/embed/KxV8I_YyiaY', title: 'Hip Hop Basics 4', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_int_6', url: 'https://www.youtube.com/embed/1WIA6Yvj8Yg', title: 'Hip Hop Basics 5', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_int_7', url: 'https://www.youtube.com/embed/BW9Q930DiK4', title: 'Hip Hop Basics 6', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intense: [
                    { id: 'pole_ins_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Pole Dance Advanced 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_ins_2', url: 'https://www.youtube.com/embed/kbUzi7meesU', title: 'Hip Hop Basics 1', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_ins_3', url: 'https://www.youtube.com/embed/1sD51hC0yRg', title: 'Hip Hop Basics 2', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_ins_4', url: 'https://www.youtube.com/embed/ujREEgxEP7g', title: 'Hip Hop Basics 3', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_ins_5', url: 'https://www.youtube.com/embed/KxV8I_YyiaY', title: 'Hip Hop Basics 4', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_ins_6', url: 'https://www.youtube.com/embed/1WIA6Yvj8Yg', title: 'Hip Hop Basics 5', addedBy: 'system', addedAt: new Date().toISOString() },
                    { id: 'pole_ins_7', url: 'https://www.youtube.com/embed/BW9Q930DiK4', title: 'Hip Hop Basics 6', addedBy: 'system', addedAt: new Date().toISOString() }
                ]
            }
        };
        
        localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(defaultVideos));
        console.log('Default video storage initialized');
    }
}

// Get videos for a specific dance type and level
async function getVideos(danceType, level) {
    try {
        // Use database manager if available
        if (window.databaseManager) {
            return await window.databaseManager.getVideosFromDB(danceType, level);
        } else {
            // Fallback to localStorage
            const videos = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY)) || {};
            return videos[danceType]?.[level] || [];
        }
    } catch (error) {
        console.error('Error getting videos:', error);
        // Final fallback
        const videos = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY)) || {};
        return videos[danceType]?.[level] || [];
    }
}

// Add a new video (admin only)
async function addVideo(danceType, level, videoUrl, title) {
    try {
        // Check admin permissions
        if (!await window.authUtils.isAdmin()) {
            throw new Error('Admin privileges required');
        }
        
        const user = await window.authUtils.getCurrentUser();
        const videos = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY)) || {};
        
        // Initialize structure if needed
        if (!videos[danceType]) videos[danceType] = {};
        if (!videos[danceType][level]) videos[danceType][level] = [];
        
        // Extract YouTube video ID from URL
        let embedUrl = videoUrl;
        if (videoUrl.includes('youtube.com/watch?v=')) {
            const videoId = videoUrl.split('v=')[1].split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (videoUrl.includes('youtu.be/')) {
            const videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
        
        const newVideo = {
            id: 'video_' + Date.now(),
            url: embedUrl,
            title: title,
            addedBy: user.name || user.email,
            addedAt: new Date().toISOString()
        };
        
        videos[danceType][level].push(newVideo);
        localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(videos));
        
        // Store in database if available
        if (window.databaseManager) {
            await window.databaseManager.storeVideoData(danceType, level, newVideo);
        }
        
        // Log to admin history
        await logAdminAction('ADD', {
            videoId: newVideo.id,
            danceType,
            level,
            title,
            url: embedUrl,
            adminUser: user.name || user.email
        });
        
        return { success: true, video: newVideo };
    } catch (error) {
        console.error('Error adding video:', error);
        return { success: false, error: error.message };
    }
}

// Remove a video (admin only)
async function removeVideo(danceType, level, videoId) {
    try {
        // Check admin permissions
        if (!await window.authUtils.isAdmin()) {
            throw new Error('Admin privileges required');
        }
        
        const user = await window.authUtils.getCurrentUser();
        const videos = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY)) || {};
        
        if (!videos[danceType]?.[level]) {
            throw new Error('Dance type or level not found');
        }
        
        const videoIndex = videos[danceType][level].findIndex(v => v.id === videoId);
        if (videoIndex === -1) {
            throw new Error('Video not found');
        }
        
        const removedVideo = videos[danceType][level][videoIndex];
        videos[danceType][level].splice(videoIndex, 1);
        localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(videos));
        
        // Remove from database if available
        if (window.databaseManager) {
            await window.databaseManager.removeVideoFromDB(danceType, level, videoId);
        }
        
        // Log to admin history
        await logAdminAction('REMOVE', {
            videoId: removedVideo.id,
            danceType,
            level,
            title: removedVideo.title,
            url: removedVideo.url,
            adminUser: user.name || user.email
        });
        
        return { success: true, removedVideo };
    } catch (error) {
        console.error('Error removing video:', error);
        return { success: false, error: error.message };
    }
}

// Log admin actions to history
async function logAdminAction(action, details) {
    try {
        // Use database manager if available
        if (window.databaseManager) {
            await window.databaseManager.storeAdminAction(action, details);
        } else {
            // Fallback to localStorage
            const history = JSON.parse(localStorage.getItem(ADMIN_HISTORY_KEY)) || [];
            
            const historyEntry = {
                id: 'action_' + Date.now(),
                action,
                timestamp: new Date().toISOString(),
                details
            };
            
            history.unshift(historyEntry); // Add to beginning
            
            // Keep only last 100 actions
            if (history.length > 100) {
                history.splice(100);
            }
            
            localStorage.setItem(ADMIN_HISTORY_KEY, JSON.stringify(history));
        }
    } catch (error) {
        console.error('Error logging admin action:', error);
    }
}

// Get admin history (admin only)
async function getAdminHistory() {
    try {
        // Use database manager if available
        if (window.databaseManager) {
            return await window.databaseManager.getAdminHistory();
        } else {
            // Fallback to localStorage
            const isAdminUser = await window.authUtils.isAdmin();
            const userDataFromStorage = localStorage.getItem('currentUser');
            let hasAdminAccess = isAdminUser;
            
            // Fallback check if auth utils fails
            if (!hasAdminAccess && userDataFromStorage) {
                const userData = JSON.parse(userDataFromStorage);
                hasAdminAccess = userData.isAdmin === true;
            }
            
            if (!hasAdminAccess) {
                throw new Error('Admin privileges required');
            }
            
            return JSON.parse(localStorage.getItem(ADMIN_HISTORY_KEY)) || [];
        }
    } catch (error) {
        console.error('Error getting admin history:', error);
        return [];
    }
}

// ===== LIKE AND COMMENT SYSTEM =====

// Get likes for a video
function getVideoLikes(videoId) {
    const likes = localStorage.getItem(LIKES_STORAGE_KEY);
    const likesData = likes ? JSON.parse(likes) : {};
    return likesData[videoId] || { count: 0, users: [] };
}

// Toggle like for a video
async function toggleVideoLike(videoId) {
    const currentUser = await window.authUtils.getCurrentUser();
    if (!currentUser) {
        alert('Please log in to like videos');
        return false;
    }

    const likes = localStorage.getItem(LIKES_STORAGE_KEY);
    const likesData = likes ? JSON.parse(likes) : {};
    
    if (!likesData[videoId]) {
        likesData[videoId] = { count: 0, users: [] };
    }
    
    const userIndex = likesData[videoId].users.indexOf(currentUser.email);
    
    if (userIndex > -1) {
        // User already liked, remove like
        likesData[videoId].users.splice(userIndex, 1);
        likesData[videoId].count--;
    } else {
        // Add like
        likesData[videoId].users.push(currentUser.email);
        likesData[videoId].count++;
    }
    
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likesData));
    return true;
}

// Check if current user liked a video
async function hasUserLikedVideo(videoId) {
    const currentUser = await window.authUtils.getCurrentUser();
    if (!currentUser) return false;
    
    const likes = getVideoLikes(videoId);
    return likes.users.includes(currentUser.email);
}

// Get comments for a video
function getVideoComments(videoId) {
    const comments = localStorage.getItem(COMMENTS_STORAGE_KEY);
    const commentsData = comments ? JSON.parse(comments) : {};
    return commentsData[videoId] || [];
}

// Add comment to a video
async function addVideoComment(videoId, commentText) {
    const currentUser = await window.authUtils.getCurrentUser();
    if (!currentUser) {
        alert('Please log in to comment');
        return false;
    }
    
    if (!commentText.trim()) {
        alert('Please enter a comment');
        return false;
    }
    
    const comments = localStorage.getItem(COMMENTS_STORAGE_KEY);
    const commentsData = comments ? JSON.parse(comments) : {};
    
    if (!commentsData[videoId]) {
        commentsData[videoId] = [];
    }
    
    const newComment = {
        id: Date.now().toString(),
        text: commentText.trim(),
        author: currentUser.email,
        authorName: currentUser.user_metadata?.full_name || currentUser.email,
        timestamp: new Date().toISOString()
    };
    
    commentsData[videoId].push(newComment);
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(commentsData));
    return true;
}

// Render videos on a page
async function renderVideos(danceType, level, containerId) {
    const videos = await getVideos(danceType, level);
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error('Container not found:', containerId);
        return;
    }
    
    container.innerHTML = '';
    
    videos.forEach(async (video, index) => {
        const videoWrapper = document.createElement('div');
        videoWrapper.style.marginBottom = '30px';
        videoWrapper.style.border = '1px solid #333';
        videoWrapper.style.borderRadius = '8px';
        videoWrapper.style.padding = '15px';
        videoWrapper.style.backgroundColor = '#111';
        
        const videoElement = document.createElement('div');
        videoElement.className = 'video-container';
        videoElement.innerHTML = `
            <iframe src="${video.url}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
        `;
        
        const videoInfo = document.createElement('div');
        videoInfo.className = 'video-info';
        videoInfo.innerHTML = `
            <h4>${video.title}</h4>
            <p>Added by: ${video.addedBy} on ${new Date(video.addedAt).toLocaleDateString()}</p>
        `;
        
        // Get like and comment data
        const likes = getVideoLikes(video.id);
        const comments = getVideoComments(video.id);
        const userLiked = await hasUserLikedVideo(video.id);
        
        // Create interaction section
        const interactionSection = document.createElement('div');
        interactionSection.className = 'video-interactions';
        interactionSection.style.marginTop = '15px';
        interactionSection.style.borderTop = '1px solid #333';
        interactionSection.style.paddingTop = '15px';
        
        // Like button
        const likeButton = document.createElement('button');
        likeButton.className = 'like-btn';
        likeButton.innerHTML = `${userLiked ? '❤️' : '🤍'} ${likes.count} ${likes.count === 1 ? 'Like' : 'Likes'}`;
        likeButton.style.cssText = `
            background: ${userLiked ? '#ff4757' : 'transparent'};
            color: white;
            border: 1px solid #007bff;
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            margin-right: 10px;
            font-size: 14px;
            transition: all 0.3s ease;
        `;
        
        likeButton.addEventListener('click', async () => {
            const success = await toggleVideoLike(video.id);
            if (success) {
                // Refresh the video section to update like count
                renderVideos(danceType, level, containerId);
            }
        });
        
        // Comment button
        const commentButton = document.createElement('button');
        commentButton.className = 'comment-btn';
        commentButton.innerHTML = `💬 ${comments.length} ${comments.length === 1 ? 'Comment' : 'Comments'}`;
        commentButton.style.cssText = `
            background: transparent;
            color: white;
            border: 1px solid #007bff;
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
        `;
        
        // Button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginBottom = '15px';
        buttonContainer.appendChild(likeButton);
        buttonContainer.appendChild(commentButton);
        
        // Comment section (initially hidden)
        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';
        commentSection.style.display = 'none';
        commentSection.style.marginTop = '15px';
        
        // Comment input
        const commentInput = document.createElement('textarea');
        commentInput.placeholder = 'Write a comment...';
        commentInput.style.cssText = `
            width: 100%;
            min-height: 60px;
            background: #222;
            color: white;
            border: 1px solid #333;
            border-radius: 4px;
            padding: 10px;
            resize: vertical;
            font-family: inherit;
            margin-bottom: 10px;
        `;
        
        const submitCommentBtn = document.createElement('button');
        submitCommentBtn.textContent = 'Post Comment';
        submitCommentBtn.style.cssText = `
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 15px;
        `;
        
        submitCommentBtn.addEventListener('click', async () => {
            const success = await addVideoComment(video.id, commentInput.value);
            if (success) {
                commentInput.value = '';
                renderVideos(danceType, level, containerId);
            }
        });
        
        // Comments display
        const commentsDisplay = document.createElement('div');
        commentsDisplay.className = 'comments-display';
        
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.style.cssText = `
                background: #222;
                padding: 10px;
                border-radius: 4px;
                margin-bottom: 10px;
                border-left: 3px solid #007bff;
            `;
            
            commentDiv.innerHTML = `
                <div style="font-weight: bold; color: #007bff; margin-bottom: 5px;">
                    ${comment.authorName}
                </div>
                <div style="margin-bottom: 5px;">${comment.text}</div>
                <div style="font-size: 12px; color: #888;">
                    ${new Date(comment.timestamp).toLocaleString()}
                </div>
            `;
            
            commentsDisplay.appendChild(commentDiv);
        });
        
        commentSection.appendChild(commentInput);
        commentSection.appendChild(submitCommentBtn);
        commentSection.appendChild(commentsDisplay);
        
        // Toggle comment section visibility
        commentButton.addEventListener('click', () => {
            if (commentSection.style.display === 'none') {
                commentSection.style.display = 'block';
                commentButton.style.background = '#007bff';
            } else {
                commentSection.style.display = 'none';
                commentButton.style.background = 'transparent';
            }
        });
        
        interactionSection.appendChild(buttonContainer);
        interactionSection.appendChild(commentSection);
        
        videoWrapper.appendChild(videoElement);
        videoWrapper.appendChild(videoInfo);
        videoWrapper.appendChild(interactionSection);
        container.appendChild(videoWrapper);
    });
}

// Add admin controls to video pages
async function addAdminControls(danceType, level, containerId) {
    if (!await window.authUtils.isAdmin()) {
        return; // Not an admin, don't add controls
    }
    
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Create admin control panel
    const adminPanel = document.createElement('div');
    adminPanel.className = 'admin-panel';
    adminPanel.style.cssText = `
        background: #333;
        padding: 20px;
        margin: 20px 0;
        border-radius: 8px;
        border: 2px solid #007bff;
    `;
    
    adminPanel.innerHTML = `
        <h3 style="color: #007bff; margin-top: 0;">🛡️ Admin Controls</h3>
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <input type="text" id="videoUrl" placeholder="YouTube URL" style="flex: 1; padding: 8px; border-radius: 4px; border: none; background: #222; color: white;">
            <input type="text" id="videoTitle" placeholder="Video Title" style="flex: 1; padding: 8px; border-radius: 4px; border: none; background: #222; color: white;">
            <button onclick="handleAddVideo('${danceType}', '${level}')" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Add Video</button>
        </div>
        <div style="margin-bottom: 15px;">
            <button onclick="showRemoveVideoInterface('${danceType}', '${level}')" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Remove Video</button>
            <button onclick="window.location.href='/pages/admin/history.html'" style="padding: 8px 16px; background: #6f42c1; color: white; border: none; border-radius: 4px; cursor: pointer;">View History</button>
        </div>
        <div id="removeVideoInterface" style="display: none; background: #444; padding: 15px; border-radius: 4px; margin-top: 10px;"></div>
    `;
    
    // Insert admin panel at the top
    container.parentNode.insertBefore(adminPanel, container);
}

// Handle adding video
async function handleAddVideo(danceType, level) {
    const urlInput = document.getElementById('videoUrl');
    const titleInput = document.getElementById('videoTitle');
    
    const url = urlInput.value.trim();
    const title = titleInput.value.trim();
    
    if (!url || !title) {
        alert('Please enter both URL and title');
        return;
    }
    
    const result = await addVideo(danceType, level, url, title);
    
    if (result.success) {
        alert('Video added successfully!');
        urlInput.value = '';
        titleInput.value = '';
        // Refresh the page to show new video
        window.location.reload();
    } else {
        alert('Error adding video: ' + result.error);
    }
}

// Show remove video interface
function showRemoveVideoInterface(danceType, level) {
    const videos = getVideos(danceType, level);
    const interface_ = document.getElementById('removeVideoInterface');
    
    if (videos.length === 0) {
        alert('No videos to remove');
        return;
    }
    
    interface_.style.display = 'block';
    interface_.innerHTML = `
        <h4>Select video to remove:</h4>
        <select id="videoToRemove" style="width: 100%; padding: 8px; margin-bottom: 10px; background: #222; color: white; border: none; border-radius: 4px;">
            <option value="">Select a video...</option>
            ${videos.map(video => `<option value="${video.id}">${video.title} (Added by ${video.addedBy})</option>`).join('')}
        </select>
        <div>
            <button onclick="handleRemoveVideo('${danceType}', '${level}')" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">Remove Selected</button>
            <button onclick="document.getElementById('removeVideoInterface').style.display='none'" style="padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
        </div>
    `;
}

// Handle removing video
async function handleRemoveVideo(danceType, level) {
    const select = document.getElementById('videoToRemove');
    const videoId = select.value;
    
    if (!videoId) {
        alert('Please select a video to remove');
        return;
    }
    
    if (!confirm('Are you sure you want to remove this video?')) {
        return;
    }
    
    const result = await removeVideo(danceType, level, videoId);
    
    if (result.success) {
        alert('Video removed successfully!');
        // Refresh the page to show updated videos
        window.location.reload();
    } else {
        alert('Error removing video: ' + result.error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeVideoStorage();
});

// Export functions for global use
window.videoManager = {
    getVideos,
    addVideo,
    removeVideo,
    getAdminHistory,
    renderVideos,
    addAdminControls,
    handleAddVideo,
    showRemoveVideoInterface,
    handleRemoveVideo,
    // Like and comment functions
    getVideoLikes,
    toggleVideoLike,
    hasUserLikedVideo,
    getVideoComments,
    addVideoComment
};
