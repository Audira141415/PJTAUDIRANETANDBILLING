# 🗺️ Mobile App File Mapping - PJTAudiraNet

**Complete file structure mapping for Flutter Mobile Application**

---

## 📂 DIRECTORY STRUCTURE

```
PJTAudiraNet/lib/
├── screens/                    # All screen files
│   ├── customer/              # Customer-specific screens
│   ├── admin/                 # Admin-specific screens
│   ├── teknisi/               # Teknisi-specific screens
│   ├── auth/                  # Authentication screens
│   ├── notifications_page.dart
│   ├── about_page.dart
│   ├── quick_wins_demo_page.dart
│   └── backend_integration_test.dart
│
├── widgets/                    # Reusable widgets
│   ├── dialogs.dart
│   ├── enhanced_ui_components.dart
│   ├── skeleton_loader.dart
│   ├── shimmer_avatar.dart
│   ├── swipeable_items.dart
│   ├── copy_clipboard.dart
│   ├── share_widget.dart
│   └── map_picker.dart
│
├── services/                   # Business logic services
│   ├── auth_service.dart
│   ├── firebase_service.dart
│   ├── database_service.dart
│   ├── notification_service.dart
│   ├── chatbot_service.dart
│   ├── analytics_service.dart
│   ├── loyalty_service.dart
│   ├── broadcast_service.dart
│   ├── logger_service.dart
│   └── pdf_generator_service.dart
│
├── models/                     # Data models
│   ├── loyalty_model.dart
│   ├── broadcast_notification.dart
│   └── [other models]
│
├── utils/                      # Utility functions
│   ├── constants.dart
│   ├── app_theme.dart
│   ├── theme_provider.dart
│   ├── logger.dart
│   └── map_utils.dart
│
└── config/                     # Configuration
    └── routes.dart
```

---

## 📱 CUSTOMER SCREENS MAPPING

### Main Container & Navigation
```
customer_home.dart (5,607 lines)
├── CustomerHomePage (line 42)          # Main container
├── BerandaPage (line 137)              # Dashboard
├── TagihanPage (line 2233)             # Billing
├── BantuanPage (line 3257)             # Help
└── ProfilPage (line 4153)              # Profile
```

### Modal/Tool Pages
```
customer/
├── speed_test_page.dart (609 lines)
│   └── SpeedTestPage                   # Internet speed testing
│
├── chatbot_page.dart (427 lines)
│   └── ChatbotPage                     # AI Assistant "Audi"
│
├── payment_page.dart (471 lines)
│   └── PaymentPage                     # Payment methods modal
│
├── bandwidth_usage_page.dart (573 lines)
│   └── BandwidthUsagePage              # Bandwidth analytics
│
├── usage_analytics_page.dart (641 lines)
│   └── UsageAnalyticsPage              # Advanced analytics
│
├── wifi_management_page.dart
│   └── WiFiManagementPage              # WiFi & IoT control
│
├── package_upgrade_page.dart (662 lines)
│   └── PackageUpgradePage              # Package change requests
│
├── maintenance_alert_page.dart (487 lines)
│   └── MaintenanceAlertPage            # Maintenance schedules
│
└── loyalty_rewards_page.dart (421 lines)
    └── LoyaltyRewardsPage              # Loyalty program
```

### Sub-directories
```
customer/pages/
└── beranda_page.dart (414 lines)
    └── BerandaPage                     # Alternative beranda (legacy)
```

---

## 🔧 ADMIN SCREENS MAPPING

### Main Container & Core Pages
```
admin_home.dart (4,414 lines)
├── AdminHomePage (line 24)             # Main container
├── AdminBerandaPage (line 137)         # Dashboard
├── AdminPelangganPage (line 2429)      # Customer list (basic)
├── AdminTiketPage (line 2606)          # Ticket list (basic)
├── AdminInstallasiPage (line 2637)     # Installation management
├── AdminPaymentsPage (line 3737)       # Payment management
└── AdminProfilPage (line 3163)         # Admin profile
```

### Management Pages
```
admin/
├── admin_pelanggan_page.dart
│   └── AdminPelangganPageEnhanced      # Enhanced customer management
│
├── customer_detail_page.dart
│   └── CustomerDetailPage              # Customer 360 view
│
├── admin_tiket_page_new.dart
│   └── AdminTiketPageNew               # Enhanced ticket management
│
├── admin_teknisi_page.dart
│   └── AdminTeknisiPage                # Technician management
│
├── admin_reporting_page.dart (997 lines)
│   └── AdminReportingPage              # Advanced reporting
│
├── admin_broadcast_page.dart (792 lines)
│   ├── AdminBroadcastPage              # Broadcast dashboard
│   └── CreateBroadcastPage (line 459)  # Create broadcast form
│
├── broadcast_notification_page.dart
│   └── BroadcastNotificationPage       # Alternative broadcast
│
├── admin_alert_center_page.dart
│   └── AdminAlertCenterPage            # Alert monitoring
│
└── admin_package_requests_page.dart
    └── AdminPackageRequestsPage        # Package request approval
```

---

## 🔨 TEKNISI SCREENS MAPPING

### Main Container & Core Pages
```
teknisi_home.dart (5,441 lines)
├── TeknisiHomePage (line 38)           # Main container
├── TeknisiDashboardPage (line 109)     # Dashboard
├── TeknisiTiketPage (line 1077)        # Ticket list
├── TeknisiInstallasiPage (line 1175)   # Installation list
├── TeknisiProfilPage (line 1445)       # Profile
├── TicketDetailPage (line 2735)        # Ticket details
├── InstallationDetailPage (line 3980)  # Installation details
└── _ResolvedTicketsPage (line 4842)    # Resolved tickets
```

### Tool Pages
```
teknisi/
├── barcode_scanner_page.dart (495 lines)
│   └── BarcodeScannerPage              # Equipment barcode scanner
│
├── installation_map_view.dart (332 lines)
│   └── InstallationMapView             # Map with installation markers
│
├── leaderboard_page.dart (251 lines)
│   └── LeaderboardPage                 # Performance leaderboard
│
├── jadwal_teknisi_page.dart
│   └── JadwalTeknisiPage               # Work schedule
│
├── checkin_history_page.dart
│   └── CheckInHistoryPage              # Attendance history
│
├── enhanced_kpi_dashboard.dart (744 lines)
│   └── EnhancedKPIDashboard            # KPI analytics
│
└── inventory_management_page.dart
    └── InventoryManagementPage         # Equipment inventory
```

---

## 🌐 SHARED SCREENS MAPPING

```
screens/
├── notifications_page.dart
│   └── NotificationsPage               # Notification center (All roles)
│
├── about_page.dart
│   └── AboutPage                       # App information (All roles)
│
├── quick_wins_demo_page.dart
│   └── QuickWinsDemoPage               # UI demo (Dev/Test)
│
└── backend_integration_test.dart
    └── BackendIntegrationTest          # Backend testing (Dev/Test)
```

### Authentication (Separate directory)
```
screens/auth/
├── login_page.dart
├── register_page.dart
├── forgot_password_page.dart
└── [other auth screens]
```

---

## 🎨 WIDGET COMPONENTS MAPPING

### Reusable UI Components
```
widgets/
├── dialogs.dart
│   ├── showExitConfirmationDialog()
│   ├── showSuccessDialog()
│   ├── showErrorDialog()
│   └── showLoadingDialog()
│
├── enhanced_ui_components.dart
│   ├── EnhancedCard
│   ├── EnhancedButton
│   ├── EnhancedTextField
│   ├── StatusBadge
│   ├── PriorityChip
│   └── [other Material 3 components]
│
├── skeleton_loader.dart
│   ├── SkeletonLoader
│   ├── SkeletonLine
│   └── SkeletonCircle
│
├── shimmer_avatar.dart
│   └── ShimmerAvatar                   # Avatar with shimmer loading
│
├── swipeable_items.dart
│   └── SwipeableListItem               # Swipeable list items
│
├── copy_clipboard.dart
│   └── CopyableText                    # Text with copy button
│
├── share_widget.dart
│   └── ShareWidget                     # Share functionality
│
└── map_picker.dart
    └── MapPicker                       # Location picker with map
```

---

## ⚙️ SERVICE LAYER MAPPING

### Core Services
```
services/
├── auth_service.dart
│   ├── AuthService.instance
│   ├── login()
│   ├── register()
│   ├── logout()
│   ├── getCurrentUser()
│   └── currentUserData
│
├── firebase_service.dart
│   ├── FirebaseService.instance
│   ├── getAllCustomers()
│   ├── getCustomerByUserId()
│   ├── getAllTickets()
│   ├── getTicketsByZone()
│   ├── getAllInstallations()
│   ├── getLeaderboard()
│   ├── hasCheckedInToday()
│   ├── getRewardsByTeknisiId()
│   └── [100+ methods]
│
├── database_service.dart
│   └── DatabaseService                 # Local database operations
│
├── notification_service.dart
│   ├── NotificationService.instance
│   ├── showNotification()
│   ├── scheduleNotification()
│   └── cancelNotification()
│
├── chatbot_service.dart
│   ├── ChatbotService
│   ├── processMessage()
│   ├── getResponse()
│   └── getQuickReplies()
│
├── analytics_service.dart
│   ├── AnalyticsService.instance
│   ├── getDashboardStats()
│   ├── getRevenueReport()
│   ├── getCustomerGrowthReport()
│   └── getTeknisiPerformance()
│
├── loyalty_service.dart
│   ├── LoyaltyService.instance
│   ├── getOrCreateAccount()
│   ├── addPoints()
│   ├── redeemReward()
│   └── getTransactionHistory()
│
├── broadcast_service.dart
│   ├── BroadcastService.instance
│   ├── createBroadcast()
│   ├── sendBroadcast()
│   ├── scheduleBroadcast()
│   └── getBroadcastStats()
│
├── logger_service.dart
│   └── LoggerService                   # Logging utility
│
└── pdf_generator_service.dart
    └── PdfGeneratorService             # PDF generation (invoices, reports)
```

---

## 🎯 CONFIGURATION & UTILS

### Configuration Files
```
config/
├── routes.dart
│   ├── AppRoutes.home
│   ├── AppRoutes.login
│   ├── AppRoutes.customerHome
│   ├── AppRoutes.adminHome
│   ├── AppRoutes.teknisiHome
│   └── [route definitions]
```

### Utility Files
```
utils/
├── constants.dart
│   ├── API endpoints
│   ├── Firebase collections
│   ├── App constants
│   └── Color constants
│
├── app_theme.dart
│   ├── AppTheme.primaryCyan
│   ├── AppTheme.gradientPrimary
│   ├── AppTheme.textTheme
│   └── [theme definitions]
│
├── theme_provider.dart
│   ├── ThemeProvider
│   ├── ThemeSettingsPage (line 350)
│   ├── toggleTheme()
│   └── currentTheme
│
├── logger.dart
│   └── Logger utility functions
│
└── map_utils.dart
    └── Map utility functions
```

---

## 📊 MODEL CLASSES

```
models/
├── loyalty_model.dart
│   ├── LoyaltyAccount
│   ├── PointsTransaction
│   └── RewardItem
│
├── broadcast_notification.dart
│   └── BroadcastNotification
│
└── [other model files]
    ├── User
    ├── Customer
    ├── Ticket
    ├── Installation
    ├── Payment
    └── [etc.]
```

---

## 🔍 SCREEN SIZE REFERENCE

### Customer Screens (Total: ~12,000 lines)
```
customer_home.dart          : 5,607 lines  ████████████████
speed_test_page.dart        :   609 lines  ██
chatbot_page.dart           :   427 lines  █
payment_page.dart           :   471 lines  █
bandwidth_usage_page.dart   :   573 lines  ██
usage_analytics_page.dart   :   641 lines  ██
package_upgrade_page.dart   :   662 lines  ██
maintenance_alert_page.dart :   487 lines  █
loyalty_rewards_page.dart   :   421 lines  █
wifi_management_page.dart   :   ~400 lines █
```

### Admin Screens (Total: ~10,000 lines)
```
admin_home.dart             : 4,414 lines  ████████████
admin_pelanggan_page.dart   :   ~900 lines ███
admin_reporting_page.dart   :   997 lines  ███
admin_broadcast_page.dart   :   792 lines  ██
admin_tiket_page_new.dart   :   ~800 lines ██
admin_teknisi_page.dart     :   ~600 lines ██
customer_detail_page.dart   :   ~500 lines █
admin_alert_center_page.dart:   ~800 lines ██
admin_package_requests_page :   ~500 lines █
```

### Teknisi Screens (Total: ~10,000 lines)
```
teknisi_home.dart           : 5,441 lines  ████████████████
enhanced_kpi_dashboard.dart :   744 lines  ██
barcode_scanner_page.dart   :   495 lines  █
installation_map_view.dart  :   332 lines  █
leaderboard_page.dart       :   251 lines  █
inventory_management_page.dart: ~400 lines █
jadwal_teknisi_page.dart    :   ~300 lines █
checkin_history_page.dart   :   ~300 lines █
```

---

## 🎨 UI COMPONENT HIERARCHY

### Customer UI Flow
```
CustomerHomePage
├── BerandaPage
│   ├── _NetworkStatusBadge
│   ├── _MiniBandwidthChart
│   ├── _QuickActionButton (×4)
│   ├── _PromoBannerSlider
│   ├── _PaymentReminderSection
│   ├── _InfoCard (×3)
│   └── _MaintenanceAlertBanner
│
├── TagihanPage
│   ├── _BillCard (×N) with SwipeableListItem
│   ├── _AutoPayToggle
│   └── _PaymentHistoryTimeline
│       └── _TimelineItem (×N)
│
├── BantuanPage
│   ├── _TicketCard (×N)
│   ├── _CategoryOption (×4)
│   └── _PriorityChip
│
└── ProfilPage
    ├── _ProfileSection
    ├── _ReferralCard
    ├── _LoyaltySection
    ├── _AchievementBadge (×N)
    └── _ProfileInfoTile (×N)
```

### Admin UI Flow
```
AdminHomePage
├── AdminBerandaPage
│   ├── _GlassStatCard (×4)
│   ├── _NetworkMetricCard (×3)
│   ├── _ModernActivityTile (×N)
│   ├── _QuickActionCard (×6)
│   ├── _RevenueMetricCard
│   └── _AlertCard (×N)
│
├── AdminPelangganPageEnhanced
│   ├── _SummaryCard (×4)
│   └── _DetailRow (×N)
│
├── AdminPaymentsPage
│   ├── _PaymentCard (×N)
│   └── _PaymentDetailRow (×N)
│
└── AdminReportingPage
    ├── _MetricCard (×6)
    ├── _SummaryCard (×4)
    └── Charts (LineChart, BarChart, PieChart)
```

### Teknisi UI Flow
```
TeknisiHomePage
├── TeknisiDashboardPage
│   ├── _ModernStatCard (×4)
│   └── _QuickActionButton (×4)
│
├── TeknisiTiketPage
│   └── _TicketCard (×N) with SwipeableListItem
│       └── TicketDetailPage
│           ├── _DetailRow (×N)
│           ├── _PhotoPreview (×N)
│           ├── _TimelineItem (×N)
│           └── _CompleteTicketDialog
│
├── TeknisiInstallasiPage
│   └── _InstallationCard (×N)
│       └── InstallationDetailPage
│           ├── _DetailRow (×N)
│           ├── _FeatureChip (×N)
│           └── _PhotoPreview (×N)
│
└── TeknisiProfilPage
    ├── _ProfileItem (×N)
    └── _PerformanceItem (×N)
```

---

## 🔗 NAVIGATION FLOW

### Authentication Flow
```
App Start
    ↓
[Splash Screen]
    ↓
Check Auth Status
    ├── Not Logged In → [LoginPage]
    │                      ↓
    │                   [Role Selection]
    │                      ↓
    └── Logged In ──────────┬── Customer → [CustomerHomePage]
                            ├── Admin → [AdminHomePage]
                            └── Teknisi → [TeknisiHomePage]
```

### Customer Navigation
```
CustomerHomePage (BottomNav)
    ├── Tab 0: BerandaPage
    │   ├── FAB: ChatbotPage (Modal)
    │   ├── Speed Test → SpeedTestPage (Push)
    │   ├── Usage → BandwidthUsagePage (Push)
    │   ├── WiFi → WiFiManagementPage (Push)
    │   └── Maintenance → MaintenanceAlertPage (Push)
    │
    ├── Tab 1: TagihanPage
    │   ├── Bill Card → PaymentPage (Modal)
    │   └── History → [Timeline View]
    │
    ├── Tab 2: BantuanPage
    │   ├── Create Ticket → [Ticket Form]
    │   └── View Ticket → [Ticket Detail]
    │
    └── Tab 3: ProfilPage
        ├── Edit Profile → [Edit Form]
        ├── Loyalty → LoyaltyRewardsPage (Push)
        ├── Theme → ThemeSettingsPage (Push)
        └── About → AboutPage (Push)
```

### Admin Navigation
```
AdminHomePage (HorizontalScrollNav)
    ├── Tab 0: AdminBerandaPage (Dashboard)
    ├── Tab 1: AdminPelangganPageEnhanced
    │   └── Customer → CustomerDetailPage (Push)
    ├── Tab 2: AdminPaymentsPage
    ├── Tab 3: AdminTiketPageNew
    ├── Tab 4: AdminInstallasiPage
    ├── Tab 5: AdminTeknisiPage
    └── Tab 6: AdminProfilPage
        ├── Reporting → AdminReportingPage (Push)
        ├── Broadcast → AdminBroadcastPage (Push)
        ├── Alerts → AdminAlertCenterPage (Push)
        └── Requests → AdminPackageRequestsPage (Push)
```

### Teknisi Navigation
```
TeknisiHomePage (BottomNav)
    ├── Tab 0: TeknisiDashboardPage
    │   ├── Scanner → BarcodeScannerPage (Push)
    │   ├── Map → InstallationMapView (Push)
    │   ├── Leaderboard → LeaderboardPage (Push)
    │   └── Schedule → JadwalTeknisiPage (Push)
    │
    ├── Tab 1: TeknisiTiketPage
    │   └── Ticket → TicketDetailPage (Push)
    │       ├── Complete → _CompleteTicketDialog (Modal)
    │       └── Navigate → Google Maps (External)
    │
    ├── Tab 2: TeknisiInstallasiPage
    │   ├── Map View → InstallationMapView (Push)
    │   └── Installation → InstallationDetailPage (Push)
    │
    └── Tab 3: TeknisiProfilPage
        ├── KPI → EnhancedKPIDashboard (Push)
        ├── Check-in History → CheckInHistoryPage (Push)
        └── Inventory → InventoryManagementPage (Push)
```

---

## 📦 DEPENDENCIES MAPPING

### Core Flutter Packages
```yaml
flutter:
  sdk: flutter

flutter_localizations:
  sdk: flutter
```

### Firebase
```yaml
firebase_core: ^latest
firebase_auth: ^latest
cloud_firestore: ^latest
firebase_storage: ^latest
firebase_messaging: ^latest
firebase_analytics: ^latest
```

### UI & Animation
```yaml
fl_chart: ^latest              # Charts
flutter_map: ^latest           # Maps
latlong2: ^latest              # Coordinates
provider: ^latest              # State management
intl: ^latest                  # Internationalization
```

### Device Features
```yaml
mobile_scanner: ^latest        # Barcode/QR
image_picker: ^latest          # Camera/Gallery
connectivity_plus: ^latest     # Network status
url_launcher: ^latest          # External apps
share_plus: ^latest            # Sharing
```

### Utilities
```yaml
http: ^latest                  # HTTP client
path_provider: ^latest         # File paths
sqflite: ^latest               # Local database (optional)
shared_preferences: ^latest    # Local storage
package_info_plus: ^latest     # App info
```

---

## 🎯 FILE ACCESS PATTERNS

### Most Accessed Files
```
1. firebase_service.dart        (All screens read/write)
2. auth_service.dart            (All screens check auth)
3. app_theme.dart               (All screens use theme)
4. enhanced_ui_components.dart  (All screens use widgets)
5. dialogs.dart                 (All screens show dialogs)
```

### Role-Specific Access
```
Customer:
  - Primary: customer_home.dart
  - Services: firebase_service, chatbot_service, loyalty_service
  - Widgets: swipeable_items, copy_clipboard, share_widget

Admin:
  - Primary: admin_home.dart
  - Services: firebase_service, analytics_service, broadcast_service
  - Widgets: enhanced_ui_components, dialogs

Teknisi:
  - Primary: teknisi_home.dart
  - Services: firebase_service, notification_service
  - Widgets: swipeable_items, map_picker, copy_clipboard
```

---

## 📊 CODE METRICS BY FILE

### Complexity Score (Lines / Features)
```
High Complexity (>5000 lines):
  - customer_home.dart    : 5,607 lines (4 main pages + 30+ components)
  - teknisi_home.dart     : 5,441 lines (4 main pages + 25+ components)
  - admin_home.dart       : 4,414 lines (7 main pages + 20+ components)

Medium Complexity (500-1000 lines):
  - admin_reporting_page.dart      : 997 lines
  - admin_broadcast_page.dart      : 792 lines
  - enhanced_kpi_dashboard.dart    : 744 lines
  - package_upgrade_page.dart      : 662 lines
  - usage_analytics_page.dart      : 641 lines
  - speed_test_page.dart           : 609 lines
  - bandwidth_usage_page.dart      : 573 lines

Low Complexity (<500 lines):
  - All other individual feature pages
```

---

**Last Updated:** 19 Desember 2025  
**Total Files Mapped:** 50+ screen files  
**Total Services:** 10+ service files  
**Total Widgets:** 15+ widget files  
**Documentation Status:** ✅ Complete
