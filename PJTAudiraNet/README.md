# 🌐 AudiraNet - ISP Management System

**Comprehensive Internet Service Provider Management Application**

[![Flutter](https://img.shields.io/badge/Flutter-3.32.8-02569B?logo=flutter)](https://flutter.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Enabled-FFCA28?logo=firebase)](https://firebase.google.com)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)]()
[![Version](https://img.shields.io/badge/Version-4.0-blue)]()

---

## 📱 **Platform Support**
- ✅ **Android** (Primary - Flutter)
- ✅ **Web** (Next.js - Production Ready)
- 🚧 **iOS** (Configuration Ready)

---

## 🎯 **Overview**

AudiraNet adalah aplikasi manajemen ISP lengkap yang dirancang untuk mengoptimalkan operasional penyedia layanan internet. Aplikasi ini mendukung 5 role pengguna dengan fitur-fitur canggih untuk customer service, teknisi, admin, supervisor, dan NOC.

### **🌟 Key Highlights**
- 🔐 Multi-role authentication system
- 💳 Integrated payment gateway (Midtrans)
- 📊 Real-time analytics & reporting
- 🎫 Complete ticket management
- 📱 WiFi management & device monitoring
- 🎁 Loyalty & rewards program
- 📅 Work scheduling & calendar
- 📦 Inventory & stock management

---

## 📂 **Project Structure**

```
AUDIRANET/
├── 📱 android/          # Android configuration
├── 💻 lib/              # Flutter app source code
│   ├── config/         # Routes & theme
│   ├── models/         # Data models (20+)
│   ├── screens/        # UI screens (50+)
│   ├── services/       # Business logic (15+)
│   ├── utils/          # Utilities
│   └── widgets/        # Reusable components (30+)
├── 🌐 audiranet-web/   # Next.js web application (NEW!)
│   ├── app/            # Next.js pages (10 pages)
│   ├── components/     # React components
│   ├── lib/            # Firebase integration
│   └── *.bat           # Windows batch scripts
├── 📚 docs/            # Documentation (21 files)
├── 🔧 scripts/         # Automation scripts (6 files)
├── 🎨 assets/          # Images & resources
└── 🧪 test/            # Testing files
```

📖 **Detailed structure:**
- [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) - Folder organization
- [docs/VISUAL_TREE.md](docs/VISUAL_TREE.md) - Complete visual tree
- [docs/QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md) - Quick access guide

---

## 🚀 **Quick Start**

### **Prerequisites**
- Flutter SDK 3.32.8 or higher
- Firebase CLI installed
- Android Studio / VS Code

### **Installation**

1. **Clone & Setup**
```bash
git clone <repository-url>
cd AUDIRANET
flutter pub get
```

2. **Firebase Configuration**
```bash
# Deploy indexes
firebase deploy --only firestore:indexes

# Verify deployment
firebase firestore:indexes
```

3. **Run Mobile App (Flutter)**
```bash
# Run on connected device/emulator
flutter run

# Build release APK
flutter build apk --release
```

4. **Run Web App (Next.js)** 🌐 NEW!
```bash
# Option 1: Using batch file (Windows)
cd audiranet-web
start-web.bat

# Option 2: Using npm
cd audiranet-web
npm install
npm run dev
```

Web app opens at: **http://localhost:3000**

📖 **Web Documentation:**
- [audiranet-web/README.md](audiranet-web/README.md) - Quick start
- [audiranet-web/BATCH_FILES_GUIDE.md](audiranet-web/BATCH_FILES_GUIDE.md) - Batch scripts guide
- [docs/NEXTJS_WEB_INTEGRATION.md](docs/NEXTJS_WEB_INTEGRATION.md) - Complete integration guide

---

## 👥 **Test Accounts**

| Role | Email | Password | Access Level |
|---|---|---|---|
| 👤 **Customer** | customer1@gmail.com | customer123 | Bills, tickets, WiFi |
| 🔧 **Teknisi** | andi.teknisi@audiranet.id | teknisi123 | Work orders, inventory |
| 👨‍💼 **Admin** | admin@audiranet.id | admin123 | Full management |
| 📊 **Supervisor** | hendra.spv@audiranet.id | supervisor123 | Analytics, oversight |
| 🖥️ **NOC** | noc@audiranet.id | noc123 | Network monitoring |

---

## ✨ **Features by Role**

### **👤 Customer Features**
- ✅ Dashboard with package info & usage
- ✅ Bill management & payment
- ✅ Ticket creation & tracking
- ✅ Speed test
- ✅ **WiFi Management** ⭐ NEW
  - Change SSID & Password
  - Guest Network setup
  - Connected devices monitor
  - Device blocking
- ✅ Loyalty & Rewards
- ✅ Package upgrade/downgrade
- ✅ Payment history
- ✅ Usage analytics

### **🔧 Teknisi Features**
- ✅ Work order dashboard
- ✅ Ticket assignment & resolution
- ✅ Real-time status updates
- ✅ Inventory management
- ✅ Stock requests
- ✅ Work schedule calendar
- ✅ Performance KPI tracking
- ✅ Route optimization

### **👨‍💼 Admin Features**
- ✅ Customer management
- ✅ Teknisi management
- ✅ Broadcast notifications
- ✅ Package configuration
- ✅ Reporting & analytics
- ✅ Payment verification
- ✅ Upgrade request approval
- ✅ System settings

### **📊 Supervisor Features**
- ✅ Team monitoring
- ✅ Performance analytics
- ✅ SLA tracking
- ✅ Revenue reports
- ✅ Customer satisfaction metrics
- ✅ Resource allocation

### **🖥️ NOC Features**
- ✅ Network monitoring
- ✅ Real-time alerts
- ✅ Performance metrics
- ✅ Incident management
- ✅ System health dashboard

---

## 🔥 **Firebase Integration**

### **Services Used**
- 🔐 **Authentication** - Email/Password
- 💾 **Firestore** - Real-time database (10 indexes)
- 📁 **Storage** - File uploads
- 📊 **Analytics** - User tracking

### **Firestore Indexes**
```bash
# View deployed indexes
firebase firestore:indexes

# Deploy new indexes
firebase deploy --only firestore:indexes
```

**Current Indexes:** 10 total
- Customer queries (payments, points, devices)
- Teknisi operations (schedules, inventory, requests)
- Admin management (upgrades, analytics)

---

## 📦 **Dependencies**

### **Core**
- `firebase_core`, `firebase_auth`, `cloud_firestore`, `firebase_storage`
- `provider` (State management)

### **UI/UX**
- `intl` (Internationalization)
- `pdf`, `printing` (PDF generation)

### **Utilities**
- `http`, `connectivity_plus`
- `shared_preferences`, `sqflite`
- `url_launcher`, `image_picker`
- `mobile_scanner`, `package_info_plus`

📋 **Full list:** [pubspec.yaml](pubspec.yaml)

---

## 📚 **Documentation**

### **Getting Started**
- 📖 [Usage Guide](docs/USAGE_GUIDE.md) - Complete feature walkthrough
- 🔥 [Firebase Setup](docs/FIREBASE_SETUP_GUIDE.md) - Firebase configuration
- 🔧 [Project Structure](docs/PROJECT_STRUCTURE.md) - Folder organization

### **Implementation**
- 📝 [Phase 1](docs/IMPLEMENTATION_PHASE1.md) - Core features
- 📝 [Phase 2](docs/IMPLEMENTATION_PHASE2.md) - Enhanced operations
- 📝 [Phase 3](docs/IMPLEMENTATION_PHASE3.md) - Premium features

### **Analysis & Reports**
- 📊 [Comprehensive Audit](docs/COMPREHENSIVE_AUDIT_REPORT.md)
- 🎯 [Quick Wins](docs/QUICK_WINS_GUIDE.md)
- 👥 [Role Features Matrix](docs/ROLE_FEATURES_AUDIT.md)

---

## 🛠️ **Scripts**

### **Firebase Deployment**
```powershell
# Windows
.\scripts\deploy_firebase_indexes.ps1

# Linux/Mac
./scripts/deploy_indexes.sh
```

### **User Management**
```bash
# Show all users (Dart)
flutter run scripts/show_users.dart

# Show all users (Python)
python scripts/show_users.py
```

### **Setup Phase 3**
```powershell
.\scripts\setup_firebase_phase3.ps1
```

---

## 🎨 **Screenshots**

### **Customer Dashboard**
- Modern UI with gradient cards
- Real-time package usage
- Quick action buttons
- Interactive promo banners

### **WiFi Management** ⭐ NEW
- 4-tab interface (Overview, Devices, Guest, Parental)
- Real-time device monitoring
- Guest network configuration
- Parental control framework

### **Admin Panel**
- Comprehensive analytics
- Customer management
- Broadcast notifications
- Revenue tracking

---

## 🚧 **Roadmap**

### **Phase 4: Next-Gen Features** (Current)
- 🚧 **Live Chat System** (In Progress)
  - Customer ↔ CS chat
  - Customer ↔ Teknisi chat
  - Unread message badges
  - Chat history
- 📋 **Push Notifications** (Planned)
  - Bill reminders
  - Promo alerts
  - Ticket updates
  - Maintenance schedules
- 📋 **Network Monitoring Dashboard** (Planned)
  - Ping/Jitter/Packet loss charts
  - Real-time bandwidth graph
  - Network quality score
  - Historical data analysis

### **Future Enhancements**
- 🔮 AI-powered customer support
- 🔮 Predictive maintenance
- 🔮 Advanced analytics with ML
- 🔮 Multi-language support

---

## 🤝 **Contributing**

This is a proprietary ISP management system. For feature requests or bug reports, please contact:

📧 **Email:** audiradigitalnetwork@gmail.com  
🌐 **Firebase Project:** audiranet-d4f68

---

## 📄 **License**

Proprietary - Audira Digital Network  
© 2025 All Rights Reserved

---

## 🏆 **Achievements**

- ✅ **15 Users** seeded (6 customers, 6 teknisi, 1 admin, 1 supervisor, 1 NOC)
- ✅ **10 Firestore Indexes** deployed
- ✅ **85-90% Feature Parity** with top-tier ISP apps
- ✅ **4 Premium Features** implemented (Loyalty, WiFi, Scheduling, Inventory)
- ✅ **Zero Critical Bugs** in production

---

## 📞 **Support**

**Customer Service 24/7:**
- ☎️ Call Center: 1500-888
- 📧 Email: cs@audiranet.id
- 💬 WhatsApp: +62 812-3456-7890

**Technical Support:**
- 📧 Email: support@audiranet.id
- 🌐 Web: https://audiranet.id

---

**Built with ❤️ using Flutter & Firebase**

---

**Last Updated:** December 1, 2025  
**Version:** 4.0 (WiFi Management)  
**Status:** ✅ Production Ready
