# FILE-TO-FEATURE MAPPING
## PJTBillingByAudira Web Applications - Detail Reference

---

## 📂 STRUKTUR DIREKTORI

```
PJTBillingByAudira/
├── apps/
│   ├── frontend/              # Admin/Staff Web Application
│   │   └── src/
│   │       └── pages/         # 40+ halaman
│   │           ├── dashboard/ # Dashboard khusus (billing, noc)
│   │           └── *.tsx      # Halaman individual
│   │
│   └── customer-portal/       # Customer Self-Service Portal
│       └── src/
│           └── pages/         # 12 halaman
│               └── *.tsx
```

---

## 🔍 FRONTEND ADMIN - DETAIL MAPPING

### AUTHENTICATION & CORE
```
login.tsx                    → Login admin/staff dengan role-based redirect
register.tsx                 → User registration dengan role assignment
index.tsx                    → Main dashboard dengan business overview
404.tsx                      → Custom error page
_app.tsx                     → Next.js app wrapper
_document.tsx                → Next.js document wrapper
debug-auth.tsx               → Authentication debugging tool
test-api.tsx                 → API endpoint testing tool
```

### DASHBOARD SPECIALIZED
```
dashboard/
├── billing.tsx              → Dashboard khusus tim Billing
│   ├── Revenue statistics
│   ├── Customer stats
│   ├── Invoice stats
│   └── Payment tracking
│
└── noc.tsx                  → Dashboard khusus NOC team
    ├── Network status
    ├── Device statistics
    ├── Ticket stats
    └── Bandwidth monitoring
```

### HRM (HUMAN RESOURCE MANAGEMENT)
```
hrm-dashboard.tsx            → HRM Central Dashboard
├── Employee statistics
├── Salary overview
├── Leave summary
├── Performance metrics
└── Attendance stats

karyawan.tsx                 → Employee Management (CRUD)
├── Personal data (NIK, birth, address)
├── Employment data (position, dept, join date)
├── Search & filter
├── Employee detail view
└── Import/export

gaji.tsx                     → Salary & Payroll Management
├── Monthly salary processing
├── Bulk salary generation
├── Salary components (basic, allowance, overtime, bonus, deduction)
├── Slip gaji printing
├── Payment history
└── Payroll reports

cuti.tsx                     → Leave Management
├── Leave request (annual, sick, personal, emergency)
├── Approval workflow
├── Leave balance tracking
├── Calendar view
├── Leave statistics
└── History tracking

kinerja.tsx                  → Performance Management
├── Performance review form
├── Multi-criteria assessment (6 criteria)
├── Achievements tracking
├── Improvement plans
├── Goal setting
└── Performance history

attendance.tsx               → Daily Check-In/Out (Staff)
├── Photo-based check-in
├── GPS location capture
├── Check-out dengan foto
├── Work duration calculation
└── Late detection

attendance-monitoring.tsx    → Attendance Monitoring (Admin)
├── View all staff attendance
├── Filter by date/role/status
├── Edit attendance records
├── View photos & GPS
├── Export reports
└── Statistics dashboard

jadwal-kerja.tsx            → Work Schedule Management
├── Create schedules
├── Shift management
├── Bulk scheduling
├── Calendar view
└── Location assignment

technician-checkin.tsx      → Field Job Check-In (Technician)
├── View job assignments
├── Start/end job
├── GPS tracking
├── Photo documentation
└── Job timer
```

### BILLING & FINANCIAL MANAGEMENT
```
keuangan.tsx                 → Finance Management
├── Invoice management
├── Customer financial details
├── Payment history
├── Financial statistics
└── Payment tracking

invoice.tsx                  → Invoice Management (Detailed)
├── Generate invoices
├── Bulk generation
├── Send via email/WhatsApp
├── Download PDF
├── Payment recording
├── Filter & search
└── Invoice reminders

transaksi.tsx               → Transaction Management
├── Transaction history
├── Payment tracking
├── Registration tracking
├── Filter by type/status
├── Export reports
└── Print receipts

reports.tsx                 → Financial Reports
├── Revenue reports
├── Customer growth
├── Payment analysis
├── Visual charts
├── Date range filtering
└── Export capabilities

analytics.tsx               → Advanced Analytics & BI
├── Revenue forecasting (ML)
├── Churn prediction
├── Sales funnel analysis
├── Profit margin analysis
├── CLV (Customer Lifetime Value)
├── Trend analysis
└── Business intelligence

paket.tsx                   → Package Management
├── Package listing
├── Features per package
├── Pricing tiers
├── Package comparison
└── Active stats

franchise.tsx               → Multi-Tenant Management
├── Tenant/franchise CRUD
├── Hierarchy management
├── Commission rates
├── Tenant statistics
└── Parent-child relationships
```

### NETWORK MANAGEMENT
```
mikrotik.tsx                → MikroTik Router Management
├── Device management
├── API/SSH connection
├── Monitoring (CPU, RAM, uptime)
├── Interface/port management
├── Traffic statistics
├── Device reboot
├── PPPoE user management
├── Configuration backup
└── Model library

genieacs.tsx                → ONT/CPE Management
├── Device listing
├── TR-069 integration
├── Online/offline status
├── Device info (serial, firmware)
├── Customer linkage
├── Device refresh
└── Configuration management

modem-monitor.tsx           → Real-time Modem Monitoring
├── Online/offline status
├── Response time tracking
├── Statistics dashboard
├── Filter by status
├── Auto-refresh (60s)
├── By type grouping
└── Search capability

layanan.tsx                 → Service Management
├── Service listing
├── Service types
├── Status management
├── Activation/expiry tracking
├── Auto-renew
├── Suspend/resume
└── Termination

inventory.tsx               → Equipment Inventory
├── Equipment tracking
├── Serial & MAC tracking
├── Status management
├── Brand & model
├── Vendor info
├── Location tracking
├── Assignment management
└── Stock statistics

infrastruktur/              → Infrastructure Management (Directory)
└── Topology, ODP, FDT, Core devices management
```

### OPERATIONS & CUSTOMER SERVICE
```
pelanggan.tsx               → Customer Management (CRM)
├── Customer CRUD
├── Profile management
├── Service information
├── Internet number/ID
├── Modem information
├── Status management
├── Balance tracking
├── Search & filter
├── Import/export
└── Detail view with history

tickets.tsx                 → Support Ticket System
├── Create tickets
├── Assignment to technician
├── Priority levels
├── Status tracking
├── Customer integration
├── Ticket history
├── Search & filter
├── Statistics
└── Detail view

operational.tsx             → Operational Management
├── Ticket management
├── Technician dispatch
├── Availability status
├── Active jobs tracking
├── Priority management
├── Skills matching
└── Work order history

field-service.tsx           → Field Service Management
├── Work order creation
├── Technician scheduling
├── Job type management
├── Location-based assignment
├── GPS integration
├── Status tracking
├── Completion time
└── Service statistics

work-order-detail.tsx       → Work Order Execution
├── View details
├── Start/complete job
├── Photo upload
├── GPS capture
├── Customer signature
├── Documentation
├── Navigation
└── Rating collection

technician.tsx              → Technician Dashboard
├── Today's jobs
├── All assigned jobs
├── Job statistics
├── Average rating
├── Job detail view
└── Customer contact

technician-monitoring.tsx   → Real-time Technician Monitoring
├── Live location tracking
├── Active job monitoring
├── Technician status
├── Today's statistics
├── Check-in/out history
├── Job duration
└── Performance metrics

dokumentasi.tsx             → Documentation Portal
├── Getting started guide
├── API documentation
├── Feature docs
├── Code examples
├── Search functionality
├── Copy-to-clipboard
└── Troubleshooting
```

### SYSTEM & ADMINISTRATION
```
pengaturan.tsx              → Settings & Configuration
├── Profile settings
├── Company information
├── Billing settings
├── Notification preferences
├── Security settings
├── API key management
├── Email configuration
└── System preferences

audit-logs.tsx              → System Audit Trail
├── Activity logging
├── User action tracking
├── Entity change tracking
├── IP address logging
├── User agent tracking
├── Error logging
├── Filter & search
├── Pagination
└── Export logs

backup.tsx                  → Database Backup
├── Create backup
├── List backups
├── Size tracking
├── Download backup
├── Delete old backups
└── Storage usage
```

---

## 📱 CUSTOMER PORTAL - DETAIL MAPPING

### AUTHENTICATION
```
index.tsx                   → Customer Login
├── Email/password auth
├── JWT token management
├── Password visibility toggle
└── Redirect to dashboard
```

### DASHBOARD & OVERVIEW
```
dashboard.tsx               → Customer Dashboard
├── Current invoice status
├── Total paid amount
├── Active tickets count
├── Bandwidth info
├── Recent invoices (last 5)
├── Quick stats cards
└── Activity timeline
```

### BILLING & PAYMENT
```
invoices.tsx                → Invoice Management
├── Invoice history
├── Invoice detail view
├── Status tracking
├── Download PDF
├── Filter by status
├── Search invoices
└── Items breakdown

payments.tsx                → Payment Methods
├── Payment channel selection
│   ├── Bank Transfer (BCA, Mandiri, BNI, BRI)
│   ├── E-Wallet (GoPay, OVO, Dana, ShopeePay)
│   ├── QRIS
│   └── Credit Card
├── Payment history
├── Transaction receipt
└── Status tracking
```

### SERVICE MONITORING & MANAGEMENT
```
usage.tsx                   → Bandwidth Usage Monitor
├── Download/upload stats
├── Period selection (week/month/year)
├── Quota tracking
├── Daily usage chart
├── Peak hours analysis
├── Usage percentage
└── Export report

speedtest.tsx               → Speed Test Tool
├── Download speed test
├── Upload speed test
├── Ping/latency
├── Jitter measurement
├── Server selection
├── Test history
├── Progress indicator
└── Share results

upgrade.tsx                 → Package Upgrade
├── Current package info
├── Available packages
├── Package comparison
├── Feature highlights
├── Price comparison
├── Upgrade request
├── Recommended packages
└── Price difference calculation
```

### SUPPORT & SERVICE
```
tickets.tsx                 → Support Tickets
├── Create new ticket
├── Ticket listing
├── Status tracking
├── Priority selection
├── Ticket history
├── Technician info
├── Detail view
└── Add comments

chat.tsx                    → Live Chat Support
├── Real-time messaging
├── Agent assignment
├── Online/offline status
├── Message history
├── Typing indicator
├── File attachment
├── Chat session management
└── Agent info display
```

### MARKETING & LOYALTY
```
referral.tsx                → Referral Program
├── Unique referral code
├── Link generation
├── Copy to clipboard
├── Social sharing
├── Referral statistics
├── Commission tracking
├── Referral history
└── Reward redemption

loyalty.tsx                 → Loyalty Program
├── Total points display
├── Tier system
├── Points breakdown by source
│   ├── Signup bonus
│   ├── Referral rewards
│   ├── Payment points
│   └── Cashback
├── Recent points history
├── Leaderboard
├── Redeem points
├── Tier benefits
└── Points expiry tracking
```

### ACCOUNT MANAGEMENT
```
settings.tsx                → Account Settings
├── Update profile
├── Change email/phone
├── Change password
├── Security settings
├── Notification preferences
├── Profile picture upload
└── Account info display
```

---

## 🗺️ NAVIGATION MAP

### Frontend Admin Access Flow
```
Login (login.tsx)
    ↓
Main Dashboard (index.tsx)
    ├── If ADMIN → Full Access (40+ pages)
    ├── If BILLING → Billing Dashboard + Limited
    ├── If NOC → NOC Dashboard + Network
    ├── If CS → Customer Service features
    ├── If TECHNICIAN → Technician Dashboard + Field
    └── If HR → HRM features

Role-Based Menu Structure:
├── Dashboard (Home)
├── HRM Module (if Admin/HR)
│   ├── HRM Dashboard
│   ├── Karyawan
│   ├── Attendance & Monitoring
│   ├── Gaji
│   ├── Cuti
│   ├── Kinerja
│   └── Jadwal Kerja
├── Billing Module (if Admin/Billing/CS)
│   ├── Billing Dashboard
│   ├── Invoice
│   ├── Keuangan
│   ├── Transaksi
│   ├── Reports
│   └── Analytics
├── Network Module (if Admin/NOC)
│   ├── NOC Dashboard
│   ├── MikroTik
│   ├── GenieACS
│   ├── Modem Monitor
│   ├── Layanan
│   └── Inventory
├── Operations Module (if Admin/CS/NOC)
│   ├── Pelanggan
│   ├── Tickets
│   ├── Operational
│   ├── Field Service
│   └── Technician Monitoring
├── System Module (if Admin)
│   ├── Pengaturan
│   ├── Audit Logs
│   ├── Backup
│   └── Franchise
└── Help & Support
    └── Dokumentasi
```

### Customer Portal Access Flow
```
Customer Login (index.tsx)
    ↓
Customer Dashboard (dashboard.tsx)
    ├── Billing & Payment
    │   ├── Invoices
    │   └── Payments
    ├── Service
    │   ├── Usage Monitor
    │   ├── Speed Test
    │   └── Package Upgrade
    ├── Support
    │   ├── Tickets
    │   └── Live Chat
    ├── Engagement
    │   ├── Referral Program
    │   └── Loyalty Program
    └── Account
        └── Settings
```

---

## 📊 FILE SIZE & COMPLEXITY

### Large/Complex Files (>500 lines)
```
mikrotik.tsx               → 1539 lines (Most complex)
invoice.tsx                → 1000 lines
operational.tsx            → 980 lines
index.tsx (main)           → 817 lines
karyawan.tsx              → 776 lines
attendance-monitoring.tsx  → 749 lines
gaji.tsx                  → 718 lines
keuangan.tsx              → 663 lines
dokumentasi.tsx           → 646 lines
pengaturan.tsx            → 610 lines
```

### Medium Files (200-500 lines)
```
field-service.tsx          → 583 lines
jadwal-kerja.tsx          → 550 lines
kinerja.tsx               → 513 lines
technician-checkin.tsx    → 503 lines
tickets.tsx (frontend)    → 497 lines
layanan.tsx               → 497 lines
work-order-detail.tsx     → 492 lines
technician-monitoring.tsx  → 485 lines
audit-logs.tsx            → 479 lines
analytics.tsx             → 470 lines
inventory.tsx             → 440 lines
franchise.tsx             → 427 lines
transaksi.tsx             → 422 lines
attendance.tsx            → 420 lines
invoices.tsx (portal)     → 387 lines
loyalty.tsx               → 381 lines
cuti.tsx                  → 376 lines
paket.tsx                 → 369 lines
chat.tsx                  → 342 lines
backup.tsx                → 342 lines
technician.tsx            → 339 lines
referral.tsx              → 323 lines
modem-monitor.tsx         → 322 lines
hrm-dashboard.tsx         → 319 lines
upgrade.tsx               → 319 lines
reports.tsx               → 268 lines
settings.tsx              → 266 lines
genieacs.tsx              → 262 lines
tickets.tsx (portal)      → 260 lines
dashboard.tsx (portal)    → 246 lines
```

---

## 🔗 DEPENDENCIES & INTEGRATIONS

### External APIs Integrated
```
MikroTik RouterOS API      → mikrotik.tsx
GenieACS TR-069 API        → genieacs.tsx
RADIUS Server              → layanan.tsx, pelanggan.tsx
Email/SMTP                 → invoice.tsx, pengaturan.tsx
WhatsApp API               → invoice.tsx
Payment Gateway            → payments.tsx (ready)
GPS/Maps API               → attendance.tsx, technician-*.tsx, field-service.tsx
```

### Internal API Endpoints Used
```
/auth/*                    → login.tsx, register.tsx
/api/customer/*            → pelanggan.tsx
/api/invoice/*             → invoice.tsx, keuangan.tsx
/api/employee/*            → karyawan.tsx
/api/attendance/*          → attendance.tsx, attendance-monitoring.tsx
/api/salary/*              → gaji.tsx
/api/leave/*               → cuti.tsx
/api/performance/*         → kinerja.tsx
/api/schedule/*            → jadwal-kerja.tsx
/api/tickets/*             → tickets.tsx, operational.tsx
/api/work-orders/*         → field-service.tsx, work-order-*.tsx
/backup/*                  → backup.tsx
/reports/*                 → reports.tsx, analytics.tsx
/referral/*                → referral.tsx, loyalty.tsx
```

---

## 📖 USAGE PATTERNS

### Common Patterns Across Files
1. **Authentication Check**: All pages check JWT token
2. **Role-Based Access**: Redirect based on user role
3. **CRUD Operations**: Create, Read, Update, Delete
4. **Search & Filter**: Almost all listing pages
5. **Modal Dialogs**: For create/edit/detail views
6. **Statistics Dashboard**: Summary cards with metrics
7. **Export Functions**: PDF/Excel generation
8. **Real-time Updates**: Auto-refresh intervals

### Shared Components Used
- Layout (Navigation + Sidebar)
- Modal dialogs
- Search bars
- Filter dropdowns
- Statistics cards
- Data tables
- Charts (Recharts)
- Loading spinners
- Error messages
- Success notifications

---

*File-to-Feature Mapping Reference*  
*Generated: 19 Desember 2025*
