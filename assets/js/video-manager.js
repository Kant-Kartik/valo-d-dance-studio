// ===== VIDEO MANAGEMENT SYSTEM =====

// Video storage structure
const VIDEO_STORAGE_KEY = 'valo_d_videos';
const ADMIN_HISTORY_KEY = 'valo_d_admin_history';

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
                    { id: 'bharata_beg_3', url: 'https://www.youtube.com/embed/OIKOHzePJCA', title: 'Bharatanatyam Basics 3', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intermediate: [
                    { id: 'bharata_int_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Bharatanatyam Intermediate 1', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intense: [
                    { id: 'bharata_ins_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Bharatanatyam Advanced 1', addedBy: 'system', addedAt: new Date().toISOString() }
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
                    { id: 'hiphop_int_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Hip Hop Intermediate 1', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intense: [
                    { id: 'hiphop_ins_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Hip Hop Advanced 1', addedBy: 'system', addedAt: new Date().toISOString() }
                ]
            },
            breakdance: {
                beginner: [
                    { id: 'break_beg_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Breakdance Basics 1', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intermediate: [
                    { id: 'break_int_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Breakdance Intermediate 1', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intense: [
                    { id: 'break_ins_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Breakdance Advanced 1', addedBy: 'system', addedAt: new Date().toISOString() }
                ]
            },
            poledance: {
                beginner: [
                    { id: 'pole_beg_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Pole Dance Basics 1', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intermediate: [
                    { id: 'pole_int_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Pole Dance Intermediate 1', addedBy: 'system', addedAt: new Date().toISOString() }
                ],
                intense: [
                    { id: 'pole_ins_1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Pole Dance Advanced 1', addedBy: 'system', addedAt: new Date().toISOString() }
                ]
            }
        };
        
        localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(defaultVideos));
        console.log('Default video storage initialized');
    }
}

// Get videos for a specific dance type and level
function getVideos(danceType, level) {
    try {
        const videos = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY)) || {};
        return videos[danceType]?.[level] || [];
    } catch (error) {
        console.error('Error getting videos:', error);
        return [];
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
        
        // Log to admin history
        logAdminAction('ADD', {
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
        
        // Log to admin history
        logAdminAction('REMOVE', {
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
function logAdminAction(action, details) {
    try {
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
    } catch (error) {
        console.error('Error logging admin action:', error);
    }
}

// Get admin history (admin only)
async function getAdminHistory() {
    try {
        if (!await window.authUtils.isAdmin()) {
            throw new Error('Admin privileges required');
        }
        
        return JSON.parse(localStorage.getItem(ADMIN_HISTORY_KEY)) || [];
    } catch (error) {
        console.error('Error getting admin history:', error);
        return [];
    }
}

// Render videos on a page
function renderVideos(danceType, level, containerId) {
    const videos = getVideos(danceType, level);
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error('Container not found:', containerId);
        return;
    }
    
    container.innerHTML = '';
    
    videos.forEach(video => {
        const videoWrapper = document.createElement('div');
        videoWrapper.style.marginBottom = '20px';
        
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
        
        videoWrapper.appendChild(videoElement);
        videoWrapper.appendChild(videoInfo);
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
    handleRemoveVideo
};
