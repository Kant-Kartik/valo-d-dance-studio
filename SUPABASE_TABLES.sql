-- ===== SUPABASE DATABASE TABLES SETUP =====
-- Run these SQL commands in your Supabase SQL Editor

-- 1. Contact Messages Table
CREATE TABLE contact_messages (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read')),
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_contact_messages_submitted_at ON contact_messages(submitted_at DESC);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);

-- Enable RLS (Row Level Security)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (send messages)
CREATE POLICY "Anyone can send contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

-- Policy: Only authenticated users can view (for admin access)
CREATE POLICY "Authenticated users can view contact messages" ON contact_messages
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update (mark as read)
CREATE POLICY "Authenticated users can update contact messages" ON contact_messages
    FOR UPDATE USING (auth.role() = 'authenticated');

-- 2. Admin History Table
CREATE TABLE admin_history (
    id BIGSERIAL PRIMARY KEY,
    action TEXT NOT NULL CHECK (action IN ('ADD', 'REMOVE')),
    details JSONB NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    admin_user TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_admin_history_timestamp ON admin_history(timestamp DESC);
CREATE INDEX idx_admin_history_action ON admin_history(action);
CREATE INDEX idx_admin_history_admin_user ON admin_history(admin_user);

-- Enable RLS
ALTER TABLE admin_history ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can insert/view admin history
CREATE POLICY "Authenticated users can manage admin history" ON admin_history
    FOR ALL USING (auth.role() = 'authenticated');

-- 3. Videos Table
CREATE TABLE videos (
    id BIGSERIAL PRIMARY KEY,
    dance_type TEXT NOT NULL CHECK (dance_type IN ('bharatanatyam', 'hiphop', 'breakdance', 'poledance')),
    level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'intense')),
    video_id TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    added_by TEXT NOT NULL,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_videos_dance_type_level ON videos(dance_type, level);
CREATE INDEX idx_videos_added_at ON videos(added_at);
CREATE UNIQUE INDEX idx_videos_video_id ON videos(video_id);

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view videos (public access)
CREATE POLICY "Anyone can view videos" ON videos
    FOR SELECT USING (true);

-- Policy: Only authenticated users can insert/update/delete videos (admin only)
CREATE POLICY "Authenticated users can manage videos" ON videos
    FOR ALL USING (auth.role() = 'authenticated');

-- ===== OPTIONAL: INSERT DEFAULT VIDEOS =====
-- Uncomment and run this if you want to migrate existing video data

/*
INSERT INTO videos (dance_type, level, video_id, url, title, added_by, added_at) VALUES
-- Bharatanatyam Beginner
('bharatanatyam', 'beginner', 'bharata_beg_1', 'https://www.youtube.com/embed/vmwZ9R03bXs', 'Bharatanatyam Basics 1', 'system', NOW()),
('bharatanatyam', 'beginner', 'bharata_beg_2', 'https://www.youtube.com/embed/MzDZYVhfgNw', 'Bharatanatyam Basics 2', 'system', NOW()),
('bharatanatyam', 'beginner', 'bharata_beg_3', 'https://www.youtube.com/embed/OIKOHzePJCA', 'Bharatanatyam Basics 3', 'system', NOW()),

-- Hip Hop Beginner
('hiphop', 'beginner', 'hiphop_beg_1', 'https://www.youtube.com/embed/kbUzi7meesU', 'Hip Hop Basics 1', 'system', NOW()),
('hiphop', 'beginner', 'hiphop_beg_2', 'https://www.youtube.com/embed/1sD51hC0yRg', 'Hip Hop Basics 2', 'system', NOW()),
('hiphop', 'beginner', 'hiphop_beg_3', 'https://www.youtube.com/embed/ujREEgxEP7g', 'Hip Hop Basics 3', 'system', NOW()),
('hiphop', 'beginner', 'hiphop_beg_4', 'https://www.youtube.com/embed/KxV8I_YyiaY', 'Hip Hop Basics 4', 'system', NOW()),
('hiphop', 'beginner', 'hiphop_beg_5', 'https://www.youtube.com/embed/1WIA6Yvj8Yg', 'Hip Hop Basics 5', 'system', NOW()),
('hiphop', 'beginner', 'hiphop_beg_6', 'https://www.youtube.com/embed/BW9Q930DiK4', 'Hip Hop Basics 6', 'system', NOW());
*/

-- ===== VERIFICATION QUERIES =====
-- Run these to verify your tables were created correctly

-- Check table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name IN ('contact_messages', 'admin_history', 'videos')
ORDER BY table_name, ordinal_position;

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('contact_messages', 'admin_history', 'videos');
