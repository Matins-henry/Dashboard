# 📊 LifeBoard - Premium Productivity Dashboard

A modern, feature-rich productivity dashboard built with React, Vite, and Tailwind CSS.

## ✨ Features

- 📈 **Analytics Dashboard** - Advanced charts with theme support
- ✅ **Task Management** - Complete todo system with priorities
- 📅 **Activity Tracking** - Log and track daily activities
- 👥 **Community** - Share updates and connect
- 💬 **Messages** - Communication system
- ⚙️ **Settings** - Comprehensive user preferences
- 🎨 **Dual Themes** - Professional light and dark modes
- 📱 **Fully Responsive** - Works on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Set root directory to `client`
   - Deploy!

3. **Configuration** (Auto-detected)
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

See [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md) for detailed deployment guide.

## 📁 Project Structure

```
client/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── store/         # State management (Zustand)
│   ├── utils/         # Utility functions
│   ├── hooks/         # Custom React hooks
│   └── services/      # API services
├── public/            # Static assets
├── docs/              # Documentation
└── vercel.json        # Deployment config
```

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📚 Documentation

- [Theme System](./docs/THEME_SYSTEM.md)
- [Advanced Charts](./docs/ADVANCED_CHARTS_COMPLETE.md)
- [Settings Implementation](./docs/SETTINGS_IMPLEMENTATION_COMPLETE.md)
- [Deployment Guide](./DEPLOYMENT_READY.md)

## 🎨 Features Highlights

### Theme System
- Seamless light/dark mode switching
- Theme-aware components
- Persistent preferences
- Professional color palettes

### Analytics
- 4 advanced chart types
- Real-time data visualization
- Export functionality
- Time period filtering

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interfaces
- Modern navigation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

Built with modern web technologies and best practices.

---

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: November 2025
