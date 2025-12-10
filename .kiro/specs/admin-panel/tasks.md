# Implementation Plan

- [x] 1. Setup admin types and data store
  - [x] 1.1 Create TypeScript types for all data models
    - Create `lib/admin-types.ts` with Appointment, Service, Customer, Review, AdminUser interfaces
    - _Requirements: 3.1, 4.1, 5.1, 6.1_
  - [x] 1.2 Create data store with localStorage
    - Create `lib/admin-store.ts` with CRUD functions for all entities
    - Include mock data for initial testing
    - _Requirements: 3.2, 3.3, 3.4, 4.2, 4.3, 4.4_
  - [ ]* 1.3 Write property test for appointment validation
    - **Property 4: Appointment validation**
    - **Validates: Requirements 3.2**
  - [ ]* 1.4 Write property test for service validation
    - **Property 7: Service validation**
    - **Validates: Requirements 4.2**

- [x] 2. Create admin layout and authentication
  - [x] 2.1 Create admin layout with sidebar
    - Create `app/admin/layout.tsx` with sidebar navigation and header
    - Include links to all admin sections
    - _Requirements: 1.3_
  - [x] 2.2 Create login page
    - Create `app/admin/login/page.tsx` with login form
    - Implement simple auth check (username: admin, password: admin)
    - _Requirements: 1.1, 1.2, 1.4_

- [x] 3. Build dashboard page
  - [x] 3.1 Create dashboard with stat cards
    - Create `app/admin/page.tsx` with StatCard components
    - Display appointments count, revenue, pending count
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [ ]* 3.2 Write property tests for dashboard calculations
    - **Property 1: Appointment count accuracy**
    - **Property 2: Revenue calculation accuracy**
    - **Property 3: Pending count accuracy**
    - **Validates: Requirements 2.1, 2.2, 2.3**

- [x] 4. Implement appointments management
  - [x] 4.1 Create appointments page with table
    - Create `app/admin/appointments/page.tsx`
    - Display table with all appointment data and actions
    - _Requirements: 3.1_
  - [x] 4.2 Add appointment form dialog
    - Create form for adding/editing appointments
    - Include validation for required fields
    - _Requirements: 3.2_
  - [x] 4.3 Implement status update and delete actions
    - Add status dropdown and delete button with confirmation
    - _Requirements: 3.3, 3.4_
  - [ ]* 4.4 Write property tests for appointment operations
    - **Property 5: Appointment status update**
    - **Property 6: Appointment deletion**
    - **Validates: Requirements 3.3, 3.4**

- [x] 5. Implement services management
  - [x] 5.1 Create services page with table
    - Create `app/admin/services/page.tsx`
    - Display services with name, description, price, duration, status
    - _Requirements: 4.1_
  - [x] 5.2 Add service form and toggle functionality
    - Create form for adding/editing services
    - Add toggle for active/inactive status
    - _Requirements: 4.2, 4.3, 4.4_
  - [ ]* 5.3 Write property tests for service operations
    - **Property 8: Service update preservation**
    - **Property 9: Service availability toggle**
    - **Validates: Requirements 4.3, 4.4**

- [x] 6. Implement customers page
  - [x] 6.1 Create customers page with search
    - Create `app/admin/customers/page.tsx`
    - Display searchable table with customer data
    - Show visit count and total spent
    - _Requirements: 5.1, 5.2, 5.3_
  - [ ]* 6.2 Write property test for customer search
    - **Property 10: Customer search filtering**
    - **Validates: Requirements 5.2**

- [x] 7. Implement reviews management
  - [x] 7.1 Create reviews page with moderation
    - Create `app/admin/reviews/page.tsx`
    - Display reviews with approve/hide actions
    - _Requirements: 6.1, 6.2, 6.3_
  - [ ]* 7.2 Write property test for review visibility
    - **Property 11: Review visibility toggle**
    - **Validates: Requirements 6.2, 6.3**

- [x] 8. Final Checkpoint
  - Ensure all tests pass, ask the user if questions arise.
