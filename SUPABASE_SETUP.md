# 🔐 Supabase Integration Setup for Valo D

## 📋 Prerequisites

1. **Supabase Account**: Create an account at [supabase.com](https://supabase.com)
2. **GitHub Repository**: Your project repository ready for deployment

## 🚀 Setup Steps

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `valo-d-dance-platform`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 2. Get Your Credentials

Once your project is created:

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 3. Configure Your Application

**Option A: Direct Configuration (Development)**

Edit `/assets/js/config.js`:

```javascript
// Replace the commented section with your actual credentials
const SUPABASE_URL = 'https://your-project-ref.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    initializeApp(SUPABASE_URL, SUPABASE_ANON_KEY);
}
```

**Option B: Environment Variables (Production)**

For production deployment, use environment variables:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

### 4. Set Up Database Tables

In your Supabase dashboard, go to **Table Editor** and create these tables:

#### Users Table (Optional - Supabase Auth handles this automatically)
```sql
-- Users table is automatically created by Supabase Auth
-- You can extend it with additional profiles if needed

CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  photo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Dance Progress Table (Optional for future features)
```sql
CREATE TABLE dance_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  dance_style TEXT NOT NULL,
  level TEXT NOT NULL,
  completed_videos TEXT[],
  progress_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Configure **Site URL**: `https://your-domain.com` (or `http://localhost:8000` for development)
3. Set **Redirect URLs** if needed

### 6. Row Level Security (RLS)

Enable RLS for your tables:

```sql
-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

## 🔧 Current Authentication Flow

### With Supabase:
1. **Sign Up**: Creates user in Supabase Auth
2. **Login**: Authenticates with Supabase
3. **Session**: Managed by Supabase Auth
4. **Logout**: Proper Supabase sign out

### Fallback (Development):
- Uses localStorage for development/testing
- No real authentication security
- Only for local testing

## 🎯 Testing Authentication

### Test the Flow:
1. Start your server: `python3 -m http.server 8000`
2. Visit: `http://localhost:8000`
3. Try to access dance content → Should redirect to login
4. Sign up with a new account
5. Login with credentials
6. Access should be granted to all content

## 🔒 Security Features Implemented

### ✅ Authentication Protection:
- **Landing page**: Shows auth-required overlays
- **Protected pages**: Automatic redirect to login
- **Dance content**: Requires authentication
- **Session management**: Persistent login state

### ✅ User Experience:
- **Return URLs**: Redirects to intended page after login
- **Loading states**: Shows progress during auth
- **Error handling**: User-friendly error messages
- **Fallback mode**: Works without Supabase for testing

## 🌐 Deployment Recommendations

### Vercel/Netlify:
```bash
# Environment variables to set:
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

### GitHub Pages:
- Update `config.js` with your credentials
- Commit and push to deploy

## 🎪 Current Status

### ✅ Implemented:
- Authentication middleware
- Page protection
- Supabase integration (ready)
- Login/signup forms updated
- Session management
- Redirect functionality

### 🔄 Ready for:
- Your Supabase credentials
- Database setup
- Production deployment

---

**🚀 Ready to go! Just add your Supabase credentials to start using real authentication!**
