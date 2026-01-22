# AniSearch 🎌 - Your Ultimate Anime Discovery Platform

Welcome to **AniSearch**, a modern, elegant anime discovery and tracking application built with React, Tailwind CSS, and Framer Motion. Discover new anime, search your favorites, and manage your personal watched list—all in one beautiful interface.

---

## ✨ Features

### 🏠 **Home Page**
- **Trending Anime Showcase**: Discover the latest and most popular anime at a glance
- **Beautiful Card Design**: Eye-catching anime cards with hover animations
- **Quick Access**: Click any anime card to view detailed information
- **Responsive Grid**: Adapts seamlessly from mobile to desktop screens

### 🔍 **Search & Discovery**
- **Powerful Search Engine**: Search for anime by title in real-time
- **Live Results**: Get instant search results as you type
- **Detailed Information**: View anime type, episode count, and ratings
- **Score Display**: See MyAnimeList ratings for each anime
- **Mobile-Optimized**: Search bar adapts to any screen size

### 📺 **Anime Details Page**
- **Comprehensive Information**: 
  - Full synopsis and plot description
  - Genre tags with smooth animations
  - Episode count and air dates
  - Studio information
  - Content rating and duration
  - Anime type (TV, Movie, OVA, etc.)
  - MyAnimeList score with visual indicator
  
- **Gallery Section**: Browse anime-related images
- **Trailer Link**: Watch official trailers directly
- **Add to Watched**: Quick-add button with status selection
- **Beautiful Header**: Full-size backdrop image with gradient overlay

### 📋 **Watched Anime Tracker** ⭐
Your personal anime management hub with powerful features:

#### **View Options**
- **Grid View**: Image-focused layout with hover effects and progress indicators
- **List View**: Compact, detail-rich rows perfect for quick scanning
- **Instant Toggle**: Switch between views with one click

#### **Status Management**
- **4 Status Types**: Watching, Completed, On Hold, Dropped
- **Visual Indicators**: Color-coded badges for quick identification
- **Status Modal**: Update status with an intuitive modal interface
- **Progress Tracking**: Track episodes watched vs. total episodes
- **Visual Progress Bar**: See your completion percentage at a glance

#### **Tracking Features**
- **Episode Counter**: Track how many episodes you've watched
- **Personal Ratings**: Rate anime on a 0-10 scale with visual feedback
- **Personal Notes**: Add custom notes for each anime
- **Last Watched Date**: Automatically tracks when you last updated an anime
- **Date Added**: Remember when you added anime to your list

#### **Search & Filter**
- **Search by Title**: Find anime in your watched list instantly
- **Filter by Status**: View only anime with specific status
- **Combined Filtering**: Search AND filter simultaneously for precision

#### **Sorting Options**
- **Recently Watched**: Sort by last update date
- **Alphabetical**: A-Z ordering for easy browsing
- **By Rating**: See your highest-rated anime first
- **By Date Added**: View newest additions to your list

#### **Data Management**
- **Edit Anime**: Update status, progress, ratings, and notes anytime
- **Delete Safely**: Confirmation modal prevents accidental deletion
- **Persistent Storage**: Your watched list is saved in browser storage
- **Cross-Session Memory**: Your data survives page refreshes

#### **Empty State**
- **Friendly Onboarding**: Helpful tips for new users
- **Quick Navigation**: Direct link to search for anime to add

---

## 🎨 **Design & User Experience**

### **Visual Design**
- **Modern Glassmorphism**: Frosted glass effect with backdrop blur
- **Dynamic Gradients**: Beautiful gradient backgrounds that adapt to anime themes
- **Smooth Animations**: Framer Motion animations for fluid interactions
- **Responsive Typography**: Text scales beautifully across all devices

### **Accessibility**
- **Keyboard Navigation**: Full keyboard support for all features
- **ARIA Labels**: Semantic HTML for screen readers
- **Color Contrast**: WCAG AA compliant color choices
- **Focus States**: Clear visual feedback for keyboard users

### **Responsive Design**
- **Mobile First**: Optimized experience on phones
- **Tablet Friendly**: Adjusts perfectly for tablets
- **Desktop Optimized**: Full-featured experience on larger screens
- **Flexible Layouts**: Grids adapt from 1 to 4 columns automatically

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone https://github.com/sayantaniy/Search-Animes.git

# Navigate to project directory
cd AnimeProj

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will open at `http://localhost:5173` (or the URL shown in terminal).

---

## 💾 **Data Storage**

AniSearch uses browser localStorage to persistently save your watched anime list. Your data includes:
- Anime title and information
- Watch status
- Episodes watched
- Personal ratings
- Personal notes
- Timestamps of when added and last watched

**Note**: Data is stored locally in your browser and is not synced across devices. Clear browser data to reset your list.

---

## 🛠️ **Tech Stack**

- **Frontend Framework**: React 18.3.1
- **Styling**: Tailwind CSS v3.4.19
- **Animation**: Framer Motion v10.16.16
- **Routing**: React Router DOM v6.26.0
- **Build Tool**: Vite v7.2.4
- **API**: Jikan API (MyAnimeList data)
- **Font**: Custom Google Fonts integration

---

## 📱 **Browser Support**

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎯 **Use Cases**

1. **Anime Discovery**: Find new anime to watch from trending lists
2. **Search & Research**: Quickly search for specific anime with detailed info
3. **Watch Tracking**: Keep track of all anime you've watched
4. **Progress Monitoring**: See how many episodes you've completed
5. **Personal Ratings**: Build your own ranking system
6. **Notes & Reminders**: Add personal thoughts about each anime

---

## 🌟 **Future Enhancements**

Planned features for upcoming releases:
- User authentication & cloud sync
- Statistics dashboard (hours watched, favorite genres)
- Social features (share watch lists, follow friends)
- Watchlist sharing via URL
- Advanced recommendations engine
- Mobile app version
- Dark/Light theme toggle
- Custom lists creation

---

## 📝 **License**

This project is open source. Feel free to fork, modify, and use it for your own purposes.

---

## 💬 **Feedback & Support**

Have suggestions or found a bug? Feel free to open an issue or contribute to the project!

---

## 🙏 **Credits**

- **Anime Data**: Provided by [Jikan API](https://jikan.moe/) (MyAnimeList unofficial API)
- **Design Inspiration**: Modern web design principles and anime community feedback
- **Icons & Fonts**: Google Fonts and custom animations

---

## 🎬 **Enjoy Your Anime Journey!**

Start exploring AniSearch today and never lose track of your anime watching progress. Happy watching! 🍿✨

---

**Made with ❤️ for anime lovers everywhere**
