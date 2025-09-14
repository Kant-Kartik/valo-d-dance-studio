# Valo D - Dance Tutorial Platform

A comprehensive web-based dance learning platform offering tutorials across multiple dance styles.

## 🎭 Project Structure

```
valod/
├── index.html                    # Main landing page
├── homepage.html                 # User dashboard
├── styles.html                   # Dance styles overview
├── about.html                    # About page
├── contactus.html               # Contact page
├── assets/
│   ├── css/
│   │   └── main.css             # Main stylesheet
│   ├── js/
│   │   └── main.js              # Main JavaScript file
│   └── images/                  # All image assets
│       ├── pic.png              # Default profile image
│       ├── farhan.png           # Instructor photos
│       ├── prabu.png
│       ├── geeta.png
│       ├── about us.jpg         # Page images
│       ├── break dance.jpg
│       ├── hiphop.jpg
│       ├── poledance.jpg
│       ├── bhartanatyam.jpg
│       ├── bl.jpg               # Gallery images
│       ├── bt.jpg
│       └── hh.webp
├── pages/
│   ├── auth/
│   │   ├── login.html           # User login
│   │   └── signup.html          # User registration
│   └── dance/
│       ├── breakdance/
│       │   ├── breakdance.html      # Breakdance overview
│       │   ├── breakdanceb.html     # Beginner tutorials
│       │   ├── breakdancei.html     # Intermediate tutorials
│       │   └── breakdanceint.html   # Advanced tutorials
│       ├── hiphop/
│       │   ├── hiphop.html          # Hip hop overview
│       │   ├── hiphopb.html         # Beginner tutorials
│       │   ├── hiphopi.html         # Intermediate tutorials
│       │   └── hiphopint.html       # Advanced tutorials
│       ├── poledance/
│       │   ├── poledance.html       # Pole dance overview
│       │   ├── poledanceb.html      # Beginner tutorials
│       │   ├── poledancei.html      # Intermediate tutorials
│       │   └── poledanceint.html    # Advanced tutorials
│       └── bharatanatyam/
│           ├── bhartanatyam.html    # Bharatanatyam overview
│           ├── bhartanatyamb.html   # Beginner tutorials
│           ├── bhartanatyami.html   # Intermediate tutorials
│           └── bhartanatyamint.html # Advanced tutorials
└── README.md                    # This file
```

## 🚀 Features

### User Authentication
- **Secure Login/Signup** with email and password validation
- **Profile Management** with photo upload
- **Session Management** using localStorage
- **Password Requirements**: 8+ chars, uppercase, lowercase, numbers, special characters

### Dance Categories
- **Breakdance**: Street dance with power moves and freezes
- **Hip Hop**: Urban dance style with rhythmic movements
- **Pole Dance**: Fitness and artistic expression
- **Bharatanatyam**: Classical Indian dance form

### Learning Levels
Each dance style offers three progression levels:
- **Beginner**: Foundational moves and basic techniques
- **Intermediate**: Building on foundations with increased complexity
- **Advanced/Intense**: Complex choreography and performance techniques

### Video Tutorials
- **Embedded YouTube Videos** with responsive design
- **Curated Content** for each skill level
- **Professional Instructors** and quality tutorials

## 🎨 Design Features

### Responsive Design
- **Mobile-first** approach
- **Flexible grid layouts** for video content
- **Adaptive navigation** for different screen sizes

### Modern UI/UX
- **Dark theme** with professional aesthetics
- **Smooth animations** and transitions
- **Intuitive navigation** structure
- **Card-based layouts** for content organization

### User Experience
- **Progressive learning paths** from beginner to advanced
- **Visual feedback** for form validation
- **Session persistence** for logged-in users
- **Error handling** with user-friendly messages

## 🛠️ Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox and grid
- **Vanilla JavaScript**: Core functionality and interactivity
- **LocalStorage**: Client-side data persistence

### File Organization
- **Modular CSS**: Centralized styling in `assets/css/main.css`
- **Reusable JavaScript**: Common functions in `assets/js/main.js`
- **Organized Assets**: Images centralized in `assets/images/`
- **Logical Routing**: Pages organized by function and category

### Key JavaScript Features
- **Form Validation**: Email regex and password complexity
- **User Session Management**: Login state persistence
- **Navigation Helpers**: Smooth scrolling and routing
- **Error Handling**: Global error catching and user notifications

## 🎯 Getting Started

### Running the Application
1. **Simple Method**: Double-click `index.html`
2. **Local Server** (recommended):
   ```bash
   cd valod
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

### User Journey
1. **Start**: Visit landing page (`index.html`)
2. **Register**: Create account with profile (`pages/auth/signup.html`)
3. **Login**: Access dashboard (`pages/auth/login.html` → `homepage.html`)
4. **Explore**: Browse dance styles (`styles.html`)
5. **Learn**: Access tutorials by skill level

### Navigation Flow
```
index.html (Landing)
├── pages/auth/signup.html (Registration)
├── pages/auth/login.html (Authentication)
├── homepage.html (User Dashboard)
├── styles.html (Dance Categories)
├── pages/dance/[style]/[style].html (Style Overview)
└── pages/dance/[style]/[style][level].html (Tutorials)
```

## 🎪 Dance Styles & Instructors

### Featured Instructors
- **Farah Khan**: Renowned choreographer
- **Prabhu Deva**: Dance legend and choreographer
- **Geeta Kapoor**: Classical and contemporary expert

### Style Specializations
- **Breakdance**: Power moves, toprock, footwork, freezes
- **Hip Hop**: Locking, popping, house, commercial dance
- **Pole Dance**: Spins, climbs, inversions, flow
- **Bharatanatyam**: Adavu, expressions, storytelling, technique

## 📱 Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Responsive**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🔒 Security Features
- **Client-side Validation**: Input sanitization and validation
- **Password Security**: Complex password requirements
- **Session Management**: Secure local storage practices
- **XSS Prevention**: Proper input handling

---

**Valo D - Where Every Step Feels Like You** 💃🕺
