# Requirements Document

## Introduction

لوحة تحكم إدارية (Admin Panel) لموقع Apex Auto لإصلاح السيارات. تتيح للمسؤولين إدارة المواعيد، الخدمات، العملاء، والمراجعات من واجهة مركزية واحدة.

## Glossary

- **Admin Panel**: لوحة التحكم الإدارية للموقع
- **Dashboard**: الصفحة الرئيسية للوحة التحكم تعرض الإحصائيات
- **Appointment**: موعد حجز خدمة للعميل
- **Service**: خدمة إصلاح أو صيانة تقدمها الورشة
- **Customer**: عميل الورشة
- **Review**: تقييم ومراجعة من العميل

## Requirements

### Requirement 1

**User Story:** As an admin, I want to access a secure dashboard, so that I can manage the auto repair shop operations.

#### Acceptance Criteria

1. WHEN an admin navigates to /admin THEN the Admin Panel SHALL display a login form if not authenticated
2. WHEN an admin enters valid credentials THEN the Admin Panel SHALL redirect to the dashboard
3. WHEN an admin is authenticated THEN the Admin Panel SHALL display a sidebar navigation with all management sections
4. WHEN an admin clicks logout THEN the Admin Panel SHALL clear the session and redirect to login

### Requirement 2

**User Story:** As an admin, I want to view key metrics on the dashboard, so that I can monitor business performance at a glance.

#### Acceptance Criteria

1. WHEN the dashboard loads THEN the Admin Panel SHALL display total appointments count for current month
2. WHEN the dashboard loads THEN the Admin Panel SHALL display total revenue statistics
3. WHEN the dashboard loads THEN the Admin Panel SHALL display pending appointments count
4. WHEN the dashboard loads THEN the Admin Panel SHALL display recent customer reviews summary

### Requirement 3

**User Story:** As an admin, I want to manage appointments, so that I can schedule and track customer services.

#### Acceptance Criteria

1. WHEN an admin views appointments THEN the Admin Panel SHALL display a table with customer name, service, date, status, and actions
2. WHEN an admin creates a new appointment THEN the Admin Panel SHALL validate required fields and save the appointment
3. WHEN an admin updates appointment status THEN the Admin Panel SHALL reflect the change immediately in the table
4. WHEN an admin deletes an appointment THEN the Admin Panel SHALL remove it from the list after confirmation

### Requirement 4

**User Story:** As an admin, I want to manage services offered, so that I can update pricing and descriptions.

#### Acceptance Criteria

1. WHEN an admin views services THEN the Admin Panel SHALL display all services with name, description, price, and duration
2. WHEN an admin adds a new service THEN the Admin Panel SHALL validate and save the service details
3. WHEN an admin edits a service THEN the Admin Panel SHALL update the service information
4. WHEN an admin toggles service availability THEN the Admin Panel SHALL mark the service as active or inactive

### Requirement 5

**User Story:** As an admin, I want to view and manage customer information, so that I can maintain customer records.

#### Acceptance Criteria

1. WHEN an admin views customers THEN the Admin Panel SHALL display a searchable list with name, email, phone, and visit count
2. WHEN an admin searches for a customer THEN the Admin Panel SHALL filter results by name, email, or phone
3. WHEN an admin views customer details THEN the Admin Panel SHALL show appointment history and total spent

### Requirement 6

**User Story:** As an admin, I want to manage customer reviews, so that I can moderate feedback displayed on the website.

#### Acceptance Criteria

1. WHEN an admin views reviews THEN the Admin Panel SHALL display all reviews with customer name, rating, comment, and date
2. WHEN an admin approves a review THEN the Admin Panel SHALL mark it as visible on the public website
3. WHEN an admin hides a review THEN the Admin Panel SHALL remove it from public display
