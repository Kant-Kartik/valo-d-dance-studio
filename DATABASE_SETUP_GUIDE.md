# 🗄️ Supabase Database Setup Guide

## 📋 Overview

Your Valo D platform now has a comprehensive database system that stores:
- ✅ **Contact Messages** - All user inquiries with read/unread status
- ✅ **Admin History** - Complete audit trail of admin actions  
- ✅ **Video Data** - Centralized video management
- ✅ **Cross-device Sync** - Data persists across all devices

## 🚀 Quick Setup (5 minutes)

### Step 1: Access Supabase SQL Editor
1. Go to your Supabase dashboard: https://supabase.com
2. Navigate to your project
3. Click **SQL Editor** in the left sidebar

### Step 2: Create Tables
1. Copy the entire contents of `SUPABASE_TABLES.sql`
2. Paste into the SQL Editor
3. Click **Run** to create all tables and policies

### Step 3: Verify Setup
Run this verification query:
```sql
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('contact_messages', 'admin_history', 'videos')
ORDER BY table_name, ordinal_position;
```

## 📊 Database Schema

### contact_messages
```sql
- id (bigserial, primary key)
- name (text, required)  
- email (text, required)
- message (text, required)
- submitted_at (timestamptz, auto)
- status (text, 'unread'/'read')
- read_at (timestamptz, nullable)
```

### admin_history  
```sql
- id (bigserial, primary key)
- action (text, 'ADD'/'REMOVE')
- details (jsonb, video info)
- timestamp (timestamptz, auto)
- admin_user (text, admin name)
```

### videos
```sql
- id (bigserial, primary key)
- dance_type (text, enum)
- level (text, enum) 
- video_id (text, unique)
- url (text, YouTube embed)
- title (text, video title)
- added_by (text, admin name)
- added_at (timestamptz, auto)
```

## 🔒 Security Features

### Row Level Security (RLS)
- **contact_messages**: Anyone can insert, authenticated users can view/update
- **admin_history**: Only authenticated users can access
- **videos**: Public read access, authenticated write access

### Data Validation
- Enum constraints on dance types and levels
- Required field validation
- Unique constraints on video IDs

## 🔄 Fallback System

The system intelligently falls back to localStorage if:
- Supabase is unavailable
- Database connection fails  
- User is offline

**Storage Priority:**
1. 🥇 **Supabase Database** (preferred)
2. 🥈 **localStorage** (fallback)

## 🎯 Features Implemented

### Contact Form (`/contactus.html`)
- ✅ Stores messages in database
- ✅ Form validation and error handling
- ✅ Success/error feedback
- ✅ Automatic fallback to localStorage

### Admin Dashboard (`/pages/admin/history.html`)
- ✅ **Admin History Tab**: Complete audit trail
- ✅ **Contact Messages Tab**: View and manage inquiries
- ✅ Message status management (mark as read)
- ✅ Real-time statistics
- ✅ Advanced filtering options

### Video Management
- ✅ Database storage for all video operations
- ✅ Cross-device synchronization
- ✅ Persistent admin history
- ✅ Automatic localStorage backup

## 🧪 Testing Your Setup

### 1. Test Contact Form
1. Visit `/contactus.html`
2. Submit a test message
3. Check browser console for "Message stored via: supabase"

### 2. Test Admin Dashboard  
1. Login as admin (passcode: 1234)
2. Visit admin history page
3. Switch to "Contact Messages" tab
4. Verify your test message appears

### 3. Test Video Management
1. Add a video as admin
2. Check that action appears in admin history
3. Verify video persists after page refresh

## 🔧 Configuration Files

### Modified Files:
- ✅ `assets/js/database.js` - New database manager
- ✅ `assets/js/video-manager.js` - Updated with DB integration
- ✅ `contactus.html` - Contact form with storage
- ✅ `pages/admin/history.html` - Enhanced admin dashboard

### New Files:
- ✅ `SUPABASE_TABLES.sql` - Database schema
- ✅ `DATABASE_SETUP_GUIDE.md` - This guide

## 🎉 Benefits

### For Users:
- ✅ Contact messages are never lost
- ✅ Faster page loading with database caching
- ✅ Consistent experience across devices

### For Admins:
- ✅ Complete message management system
- ✅ Persistent admin action history
- ✅ Professional dashboard interface
- ✅ Cross-device admin access

### For Development:
- ✅ Scalable database architecture
- ✅ Automatic fallback handling
- ✅ Production-ready data storage
- ✅ Future-proof system design

## 🚨 Troubleshooting

### If Database Setup Fails:
1. Check Supabase project URL and keys in `config.js`
2. Verify SQL was executed without errors
3. Check browser console for connection issues

### If Fallback is Used:
- Messages show "stored via: localStorage" in console
- System continues working normally
- Data will sync when database reconnects

## 🔄 Migration Notes

The system automatically handles data migration:
- Existing localStorage data remains functional
- New data uses database when available
- No manual migration required
- Seamless transition for users

---

Your Valo D platform now has enterprise-grade data management! 🎯
