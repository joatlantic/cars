/**
 * Admin Panel TypeScript Types
 * Based on design document data models
 */

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  visitCount: number;
  totalSpent: number;
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  isApproved: boolean;
}

export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}

export type EmployeeRole = 'mechanic' | 'technician' | 'manager' | 'receptionist';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  salary: number;
  hireDate: string;
  isActive: boolean;
  absenceDays: number;
  deductions: number;
}
