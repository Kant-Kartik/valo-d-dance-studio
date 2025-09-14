// ===== SUPABASE CONFIGURATION =====

// Supabase configuration - Update these with your credentials
const SUPABASE_CONFIG = {
    url: 'https://bbqwzphirhefvwyaisbb.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicXd6cGhpcmhlZnZ3eWFpc2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NDYyNjcsImV4cCI6MjA3MzQyMjI2N30.Fd7lZEjnvDyBa5QkqUqANYm-ZRrt6fz0MliU8DtoKk4',
    initialized: false
};

// Initialize Supabase with your credentials
function initializeApp(supabaseUrl, supabaseAnonKey) {
    SUPABASE_CONFIG.url = supabaseUrl;
    SUPABASE_CONFIG.anonKey = supabaseAnonKey;
    
    // Initialize Supabase client
    if (window.authUtils && window.authUtils.initializeSupabase) {
        window.authUtils.initializeSupabase(supabaseUrl, supabaseAnonKey);
        SUPABASE_CONFIG.initialized = true;
        console.log('✅ Supabase configuration loaded successfully');
    } else {
        console.warn('⚠️ Auth utilities not loaded yet. Supabase will initialize when auth.js loads.');
    }
}

// Check if Supabase is configured
function isSupabaseConfigured() {
    return SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey && SUPABASE_CONFIG.initialized;
}

// Get configuration
function getSupabaseConfig() {
    return SUPABASE_CONFIG;
}

// Export configuration
window.supabaseConfig = {
    initialize: initializeApp,
    isConfigured: isSupabaseConfigured,
    getConfig: getSupabaseConfig,
    SUPABASE_CONFIG
};

// Auto-initialize if credentials are already set
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with your Supabase credentials
    if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
        initializeApp(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        console.log('✅ Supabase initialized with your credentials');
    } else {
        console.warn('⚠️ Supabase credentials not found');
    }
});
