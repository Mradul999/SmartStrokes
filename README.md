# SmartStrokes - AI-Powered Typing Test Platform

SmartStrokes is a modern, feature-rich typing test platform that helps users improve their typing speed and accuracy through AI-powered practice sessions and detailed performance analytics.

## 🌟 Features

### Core Features

### AI-Powered Learning
- **Smart Practice**: AI-generated text based on your problem keys
- **Personalized Feedback**: Identifies and tracks weak keys
- **Adaptive Learning**: Customizes practice content based on typing patterns

### User Experience
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Dark/Light Mode**: Supports both dark and light themes
- **Visual Keyboard**: Interactive keyboard display showing problem keys
- **Skill Level Assessment**: Calculates and displays your typing skill level

### Performance Analytics
- **Detailed Statistics**:
  - WPM (Words Per Minute)
  - Accuracy percentage
  - Character count
  - Time taken
  - Problem key analysis
- **Progress Tracking**: Save and review your typing history
- **Weak Key Analysis**: Identifies keys that need improvement

### Authentiation  and state
Google Authentication: Sign in securely using your Google account via Firebase
Zustand State Management: Lightweight and scalable global state management

### Firebase Storage
Firebase Integration: Store user-generated data (test results, preferences) securely
Cloud Storage: Upload files or statistics for persistent storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/SmartStrokes.git
cd SmartStrokes
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
Create `.env` files in both frontend and backend directories with necessary configurations.

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm run dev
```

## 💻 Usage

1. **Start a Test**:
   - Click on the typing area to begin
   - Type the displayed text
   - The timer starts automatically with your first keystroke

2. **Practice with AI**:
   - Complete a test to identify problem keys
   - Use the "AI Practice" button to generate custom practice text
   - Focus on improving your weak areas

3. **Track Progress**:
   - View detailed statistics after each test
   - Monitor your improvement over time
   - Get personalized recommendations

## 🛠️ Built With

- **Frontend**:
  - React.js
  - Tailwind CSS
  - React Router
  - Axios

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication

## 📱 Mobile Support

- Fully responsive design
- Optimized for touch input
- Mobile-friendly keyboard interface
- Adaptive layout for different screen sizes

## 🔒 Security

- JWT-based authentication
- Secure password handling
- Protected API endpoints
- Secure session management

Try it now: [SmartStrokes Live Demo](https://smart-strokes.vercel.app/)

