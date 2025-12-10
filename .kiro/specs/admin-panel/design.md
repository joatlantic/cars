# Admin Panel Design Document

## Overview

لوحة تحكم إدارية لموقع Apex Auto مبنية بـ Next.js App Router مع shadcn/ui. تستخدم بنية client-side مع localStorage للتخزين المؤقت (يمكن استبدالها بـ API لاحقاً).

## Architecture

```
app/
├── admin/
│   ├── layout.tsx          # Admin layout with sidebar
│   ├── page.tsx            # Dashboard
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── appointments/
│   │   └── page.tsx        # Appointments management
│   ├── services/
│   │   └── page.tsx        # Services management
│   ├── customers/
│   │   └── page.tsx        # Customers list
│   └── reviews/
│       └── page.tsx        # Reviews moderation
├── lib/
│   ├── admin-store.ts      # Data store (localStorage)
│   └── admin-types.ts      # TypeScript types
```

## Components and Interfaces

### Admin Layout
- Sidebar navigation مع روابط لكل قسم
- Header مع اسم المستخدم وزر logout
- محتوى رئيسي responsive

### Dashboard Component
- StatCard: بطاقة لعرض إحصائية واحدة
- RecentAppointments: جدول آخر المواعيد
- RecentReviews: قائمة آخر التقييمات

### Data Tables
- AppointmentsTable: جدول المواعيد مع actions
- ServicesTable: جدول الخدمات
- CustomersTable: جدول العملاء مع بحث
- ReviewsTable: جدول المراجعات

### Forms
- AppointmentForm: نموذج إضافة/تعديل موعد
- ServiceForm: نموذج إضافة/تعديل خدمة

## Data Models

```typescript
interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  isActive: boolean;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  visitCount: number;
  totalSpent: number;
  createdAt: string;
}

interface Review {
  id: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  isApproved: boolean;
}

interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Appointment count accuracy
*For any* list of appointments, the total count displayed on dashboard SHALL equal the actual number of appointments in the current month.
**Validates: Requirements 2.1**

### Property 2: Revenue calculation accuracy
*For any* list of completed appointments with associated services, the total revenue SHALL equal the sum of all service prices for completed appointments.
**Validates: Requirements 2.2**

### Property 3: Pending count accuracy
*For any* list of appointments, the pending count SHALL equal the count of appointments with status 'pending'.
**Validates: Requirements 2.3**

### Property 4: Appointment validation
*For any* appointment input, the system SHALL reject appointments with empty customer name, invalid email, or past dates.
**Validates: Requirements 3.2**

### Property 5: Appointment status update
*For any* appointment and valid status, updating the status SHALL change only the status field while preserving all other appointment data.
**Validates: Requirements 3.3**

### Property 6: Appointment deletion
*For any* list of appointments and a valid appointment ID, deleting that appointment SHALL result in a list with length reduced by one and not containing that ID.
**Validates: Requirements 3.4**

### Property 7: Service validation
*For any* service input, the system SHALL reject services with empty name, negative price, or zero duration.
**Validates: Requirements 4.2**

### Property 8: Service update preservation
*For any* service and partial update, updating specific fields SHALL preserve all non-updated fields.
**Validates: Requirements 4.3**

### Property 9: Service availability toggle
*For any* service, toggling availability SHALL flip the isActive flag to its opposite value.
**Validates: Requirements 4.4**

### Property 10: Customer search filtering
*For any* list of customers and search query, all returned results SHALL contain the query string in name, email, or phone.
**Validates: Requirements 5.2**

### Property 11: Review visibility toggle
*For any* review, approving SHALL set isApproved to true, and hiding SHALL set isApproved to false.
**Validates: Requirements 6.2, 6.3**

## Error Handling

- عرض toast notifications للأخطاء والنجاح
- التحقق من صحة البيانات قبل الحفظ
- عرض رسائل خطأ واضحة في النماذج
- التعامل مع حالة عدم وجود بيانات

## Testing Strategy

### Unit Tests
- اختبار دوال التحقق من صحة البيانات
- اختبار دوال الحساب (revenue, counts)
- اختبار دوال البحث والفلترة

### Property-Based Tests
- استخدام مكتبة `fast-check` للـ property-based testing
- كل property test يجب أن يعمل 100 iteration على الأقل
- كل test يجب أن يشير للـ property المقابل في التصميم بالصيغة: `**Feature: admin-panel, Property {number}: {property_text}**`
