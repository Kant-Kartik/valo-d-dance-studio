// ===== AUTHENTICATION MIDDLEWARE =====

// Supabase configuration (will be updated with your credentials)
let supabase = null;

// Initialize Supabase when credentials are provided
function initializeSupabase(supabaseUrl, supabaseKey) {
    if (typeof supabase === 'undefined') {
        console.error('Supabase client not loaded. Please include the Supabase script.');
        return;
    }
    
    supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    console.log('Supabase initialized successfully');
}

// Check if user is authenticated
async function isAuthenticated() {
    try {
        if (supabase) {
            // Check Supabase session - accept any valid session regardless of email confirmation
            const { data: { session } } = await supabase.auth.getSession();
            if (session && session.user) {
                // Accept user even if email is not confirmed
                return true;
            }
            return false;
        } else {
            // Fallback to localStorage for development
            const userData = localStorage.getItem('currentUser');
            return userData !== null;
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        // If there's an error, check localStorage as fallback
        const userData = localStorage.getItem('currentUser');
        return userData !== null;
    }
}

// Get current user data
async function getCurrentUser() {
    try {
        if (supabase) {
            const { data: { user } } = await supabase.auth.getUser();
            // Return user even if email is not confirmed
            if (user) {
                return user;
            }
            // Fallback to localStorage if Supabase doesn't have user
            const userData = localStorage.getItem('currentUser');
            return userData ? JSON.parse(userData) : null;
        } else {
            // Fallback to localStorage
            const userData = localStorage.getItem('currentUser');
            return userData ? JSON.parse(userData) : null;
        }
    } catch (error) {
        console.error('Error getting current user:', error);
        // Fallback to localStorage on error
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }
}

// Redirect to login if not authenticated
async function requireAuth() {
    const authenticated = await isAuthenticated();
    
    if (!authenticated) {
        // Get current page to redirect back after login
        const currentPage = window.location.pathname;
        const returnUrl = encodeURIComponent(currentPage);
        
        // Determine the correct path to login based on current location
        let loginPath = '/pages/auth/login.html';
        
        // Adjust path based on current directory depth
        if (currentPage.includes('/pages/dance/')) {
            loginPath = '../../../pages/auth/login.html';
        } else if (currentPage.includes('/pages/')) {
            loginPath = '../auth/login.html';
        } else {
            loginPath = '/pages/auth/login.html';
        }
        
        // Add return URL as parameter
        window.location.href = `${loginPath}?return=${returnUrl}`;
        return false;
    }
    
    return true;
}

// Protect pages that require authentication
async function protectPage() {
    const authenticated = await requireAuth();
    
    if (!authenticated) {
        // Hide content while redirecting
        document.body.style.display = 'none';
        return false;
    }
    
    // Show content if authenticated
    document.body.style.display = 'block';
    return true;
}

// Supabase Authentication Functions
async function signUpWithSupabase(email, password, userData) {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: undefined, // Disable email confirmation
                data: {
                    name: userData.name,
                    photo: userData.photo || null
                }
            }
        });
        
        if (error) throw error;
        
        // Check if user was created and auto-confirmed
        if (data.user && !data.user.email_confirmed_at) {
            // For immediate access, we'll treat unconfirmed users as valid
            console.log('User created without email confirmation');
        }
        
        return { success: true, data, user: data.user };
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, error: error.message };
    }
}

async function signInWithSupabase(email, password) {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) throw error;
        
        return { success: true, data };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
    }
}

async function signOutWithSupabase() {
    if (!supabase) {
        // Fallback logout
        localStorage.removeItem('currentUser');
        window.location.href = '/index.html';
        return;
    }
    
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        // Clear local storage
        localStorage.removeItem('currentUser');
        
        // Redirect to home
        window.location.href = '/index.html';
    } catch (error) {
        console.error('Logout error:', error);
        // Force logout even if Supabase fails
        localStorage.removeItem('currentUser');
        window.location.href = '/index.html';
    }
}

// Listen for authentication state changes
function setupAuthListener() {
    if (supabase) {
        supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event, session);
            
            if (event === 'SIGNED_IN') {
                // User signed in
                const userData = {
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata.name || session.user.email,
                    photo: session.user.user_metadata.photo || null
                };
                localStorage.setItem('currentUser', JSON.stringify(userData));
            } else if (event === 'SIGNED_OUT') {
                // User signed out
                localStorage.removeItem('currentUser');
            }
        });
    }
}

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set up auth listener
    setupAuthListener();
    
    // Get current page
    const currentPage = window.location.pathname;
    
    // List of protected pages (pages that require authentication)
    const protectedPages = [
        '/homepage.html',
        '/styles.html',
        '/pages/dance/'
    ];
    
    // Check if current page is protected
    const isProtectedPage = protectedPages.some(page => 
        currentPage.includes(page) || 
        (currentPage === '/' && !currentPage.includes('index.html'))
    );
    
    // If it's a protected page, require authentication
    if (isProtectedPage) {
        protectPage();
    }
});

// Export functions for use in other scripts
window.authUtils = {
    isAuthenticated,
    getCurrentUser,
    requireAuth,
    protectPage,
    signUpWithSupabase,
    signInWithSupabase,
    signOutWithSupabase,
    initializeSupabase
};
