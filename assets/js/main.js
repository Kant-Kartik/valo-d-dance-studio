// ===== MAIN NAVIGATION AND ROUTING =====

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    checkUserSession();
    
    // Initialize navigation
    setupNavigation();
    
    // Add smooth scrolling
    setupSmoothScrolling();
    
    // Initialize any page-specific functionality
    initializePageSpecific();
}

// ===== USER SESSION MANAGEMENT =====
function checkUserSession() {
    const userData = localStorage.getItem('currentUser');
    const navLinks = document.querySelector('.nav-links');
    
    if (userData && navLinks) {
        const user = JSON.parse(userData);
        // Update navigation for logged-in users
        navLinks.innerHTML = `
            <a href="/homepage.html">Dashboard</a>
            <a href="/styles.html">Dance Styles</a>
            <a href="/about.html">About</a>
            <a href="#" onclick="logout()">Logout (${user.name})</a>
        `;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    alert('You have been logged out successfully!');
    window.location.href = '/index.html';
}

// ===== NAVIGATION SETUP =====
function setupNavigation() {
    // Add active state to current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== PAGE-SPECIFIC INITIALIZATION =====
function initializePageSpecific() {
    const path = window.location.pathname;
    
    // Initialize based on current page
    if (path.includes('login.html')) {
        initializeLoginPage();
    } else if (path.includes('signup.html')) {
        initializeSignupPage();
    } else if (path.includes('homepage.html')) {
        initializeHomepage();
    }
}

// ===== LOGIN PAGE FUNCTIONS =====
function initializeLoginPage() {
    // Add any login-specific initialization here
    console.log('Login page initialized');
}

// ===== SIGNUP PAGE FUNCTIONS =====
function initializeSignupPage() {
    // Add any signup-specific initialization here
    console.log('Signup page initialized');
}

// ===== HOMEPAGE FUNCTIONS =====
function initializeHomepage() {
    // Load user profile data
    loadUserProfile();
}

function loadUserProfile() {
    const userData = localStorage.getItem('currentUser');
    
    if (userData) {
        const user = JSON.parse(userData);
        
        // Update profile elements if they exist
        const profileName = document.getElementById('profileName');
        const profileImage = document.getElementById('profileImage');
        
        if (profileName && user.name) {
            profileName.textContent = user.name;
        }
        
        if (profileImage && user.photo) {
            profileImage.src = user.photo;
            profileImage.alt = user.name + "'s Profile";
        }
    } else {
        // Redirect to login if no user session
        window.location.href = '/pages/auth/login.html';
    }
}

// ===== UTILITY FUNCTIONS =====

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Password validation
function isValidPassword(password) {
    if (password.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters long!" };
    }
    
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one uppercase letter!" };
    }
    
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one lowercase letter!" };
    }
    
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: "Password must contain at least one number!" };
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return { valid: false, message: "Password must contain at least one special character!" };
    }
    
    return { valid: true, message: "" };
}

// Show loading state
function showLoading(element) {
    element.innerHTML = 'Loading...';
    element.disabled = true;
}

// Hide loading state
function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== NAVIGATION HELPERS =====
function navigateTo(path) {
    window.location.href = path;
}

function goBack() {
    window.history.back();
}

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// ===== EXPORT FOR MODULAR USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        isValidPassword,
        showNotification,
        navigateTo,
        checkUserSession,
        logout
    };
}
