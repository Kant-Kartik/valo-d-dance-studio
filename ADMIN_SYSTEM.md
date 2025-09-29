# Admin System Documentation

## Overview
The Valo D dance platform now includes a comprehensive admin system that allows administrators to manage video content and track all administrative actions through a detailed history dashboard.

## Features

### 1. Admin User Creation
- **Admin Passcode**: During signup, users can enter the admin passcode `1234` to create an admin account
- **Admin Indicator**: Admin users see an "ADMIN" badge on their homepage profile
- **Admin Access**: Only admin users can access admin features

### 2. Video Management
- **Add Videos**: Admins can add new YouTube videos to any dance category and level
- **Remove Videos**: Admins can remove existing videos from the platform
- **Video Information**: All videos show who added them and when
- **Support**: Supports YouTube URLs in multiple formats (youtube.com/watch?v=, youtu.be/, embed URLs)

### 3. Admin History Dashboard
- **Complete Audit Trail**: Tracks all video additions and removals
- **Action Details**: Shows timestamp, action type, video title, dance type, level, and admin user
- **Statistics**: Displays total actions, videos added, videos removed, and current total videos
- **Filtering**: Filter history by action type, dance type, or level
- **Admin Only**: History dashboard is only accessible to admin users

### 4. Admin Controls Location
- **Video Pages**: Admin controls appear at the top of each video level page (beginner, intermediate, intense)
- **Homepage**: Admin users see an "Admin History" button in their profile section
- **Quick Access**: Direct navigation to admin dashboard from any video page

## How to Use

### Creating an Admin Account
1. Go to signup page
2. Fill in all required fields
3. Enter `1234` in the "Admin Passcode" field
4. Complete signup - you're now an admin!

### Managing Videos
1. Navigate to any video page (e.g., Hip Hop → Beginner)
2. As an admin, you'll see the admin control panel at the top
3. **To Add Video**:
   - Enter YouTube URL and video title
   - Click "Add Video"
   - Page refreshes with new video
4. **To Remove Video**:
   - Click "Remove Video"
   - Select video from dropdown
   - Confirm removal

### Viewing Admin History
1. From homepage: Click "Admin History" button in profile
2. From video pages: Click "View History" in admin controls
3. Use filters to find specific actions
4. View detailed statistics at the top

## Technical Details

### Storage
- Videos are stored in localStorage under `valo_d_videos`
- Admin history is stored under `valo_d_admin_history`
- Works with both localStorage and Supabase authentication

### Video Structure
Each video contains:
- Unique ID
- YouTube embed URL
- Title
- Added by (admin username)
- Added at (timestamp)

### History Structure
Each history entry contains:
- Action (ADD/REMOVE)
- Timestamp
- Video details (title, URL, dance type, level)
- Admin user who performed the action

### Security
- Admin functions check user privileges before execution
- Non-admin users cannot access admin features
- Admin status is verified both client-side and through authentication flow

## Default Videos
The system comes pre-loaded with default videos for all dance categories and levels to ensure a complete experience from the start.

## Admin Passcode
Current admin passcode: `1234`
(This can be changed in the video-manager.js file)

## Files Modified/Created
- `assets/js/auth.js` - Added admin checking functions
- `assets/js/video-manager.js` - Complete video management system
- `pages/admin/history.html` - Admin history dashboard
- `pages/auth/signup.html` - Added admin passcode field
- `signup.html` - Added admin passcode field
- `homepage.html` - Added admin indicators and controls
- All video level pages - Updated with dynamic loading and admin controls
