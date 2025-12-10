/**
 * Admin Panel Data Store
 * Uses localStorage for persistence with CRUD operations
 */

import {
  Appointment,
  AppointmentStatus,
  Service,
  Customer,
  Review,
  AdminUser,
} from './admin-types';

// Storage keys
const STORAGE_KEYS = {
  APPOINTMENTS: 'admin_appointments',
  SERVICES: 'admin_services',
  CUSTOMERS: 'admin_customers',
  REVIEWS: 'admin_reviews',
  AUTH: 'admin_auth',
} as const;

// Helper to generate unique IDs
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

// Helper to check if we're in browser
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

// Generic localStorage helpers
function getFromStorage<T>(key: string, defaultValue: T[]): T[] {
  if (!isBrowser()) return defaultValue;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
}

function saveToStorage<T>(key: string, data: T[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ============ APPOINTMENTS ============

export function getAppointments(): Appointment[] {
  return getFromStorage<Appointment>(STORAGE_KEYS.APPOINTMENTS, mockAppointments);
}

export function getAppointmentById(id: string): Appointment | undefined {
  return getAppointments().find((a) => a.id === id);
}


export interface AppointmentInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
}

export function validateAppointment(input: AppointmentInput): string[] {
  const errors: string[] = [];
  
  if (!input.customerName || input.customerName.trim() === '') {
    errors.push('Customer name is required');
  }
  
  if (!input.customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.customerEmail)) {
    errors.push('Valid email is required');
  }
  
  if (!input.customerPhone || input.customerPhone.trim() === '') {
    errors.push('Phone number is required');
  }
  
  if (!input.serviceId) {
    errors.push('Service is required');
  }
  
  if (!input.date) {
    errors.push('Date is required');
  } else {
    const appointmentDate = new Date(input.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (appointmentDate < today) {
      errors.push('Appointment date cannot be in the past');
    }
  }
  
  if (!input.time) {
    errors.push('Time is required');
  }
  
  return errors;
}

export function createAppointment(input: AppointmentInput): Appointment | null {
  const errors = validateAppointment(input);
  if (errors.length > 0) return null;
  
  const appointments = getAppointments();
  const newAppointment: Appointment = {
    id: generateId(),
    ...input,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  
  appointments.push(newAppointment);
  saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
  return newAppointment;
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus): Appointment | null {
  const appointments = getAppointments();
  const index = appointments.findIndex((a) => a.id === id);
  if (index === -1) return null;
  
  appointments[index] = { ...appointments[index], status };
  saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
  return appointments[index];
}

export function deleteAppointment(id: string): boolean {
  const appointments = getAppointments();
  const filtered = appointments.filter((a) => a.id !== id);
  if (filtered.length === appointments.length) return false;
  
  saveToStorage(STORAGE_KEYS.APPOINTMENTS, filtered);
  return true;
}


// ============ SERVICES ============

export function getServices(): Service[] {
  return getFromStorage<Service>(STORAGE_KEYS.SERVICES, mockServices);
}

export function getServiceById(id: string): Service | undefined {
  return getServices().find((s) => s.id === id);
}

export interface ServiceInput {
  name: string;
  description: string;
  price: number;
  duration: number;
}

export function validateService(input: ServiceInput): string[] {
  const errors: string[] = [];
  
  if (!input.name || input.name.trim() === '') {
    errors.push('Service name is required');
  }
  
  if (input.price < 0) {
    errors.push('Price cannot be negative');
  }
  
  if (!input.duration || input.duration <= 0) {
    errors.push('Duration must be greater than zero');
  }
  
  return errors;
}

export function createService(input: ServiceInput): Service | null {
  const errors = validateService(input);
  if (errors.length > 0) return null;
  
  const services = getServices();
  const newService: Service = {
    id: generateId(),
    ...input,
    isActive: true,
  };
  
  services.push(newService);
  saveToStorage(STORAGE_KEYS.SERVICES, services);
  return newService;
}

export function updateService(id: string, updates: Partial<ServiceInput>): Service | null {
  const services = getServices();
  const index = services.findIndex((s) => s.id === id);
  if (index === -1) return null;
  
  services[index] = { ...services[index], ...updates };
  saveToStorage(STORAGE_KEYS.SERVICES, services);
  return services[index];
}

export function toggleServiceAvailability(id: string): Service | null {
  const services = getServices();
  const index = services.findIndex((s) => s.id === id);
  if (index === -1) return null;
  
  services[index] = { ...services[index], isActive: !services[index].isActive };
  saveToStorage(STORAGE_KEYS.SERVICES, services);
  return services[index];
}

export function deleteService(id: string): boolean {
  const services = getServices();
  const filtered = services.filter((s) => s.id !== id);
  if (filtered.length === services.length) return false;
  
  saveToStorage(STORAGE_KEYS.SERVICES, filtered);
  return true;
}


// ============ CUSTOMERS ============

export function getCustomers(): Customer[] {
  return getFromStorage<Customer>(STORAGE_KEYS.CUSTOMERS, mockCustomers);
}

export function getCustomerById(id: string): Customer | undefined {
  return getCustomers().find((c) => c.id === id);
}

export function searchCustomers(query: string): Customer[] {
  const customers = getCustomers();
  if (!query || query.trim() === '') return customers;
  
  const lowerQuery = query.toLowerCase();
  return customers.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.email.toLowerCase().includes(lowerQuery) ||
      c.phone.includes(query)
  );
}

// ============ REVIEWS ============

export function getReviews(): Review[] {
  return getFromStorage<Review>(STORAGE_KEYS.REVIEWS, mockReviews);
}

export function getReviewById(id: string): Review | undefined {
  return getReviews().find((r) => r.id === id);
}

export function approveReview(id: string): Review | null {
  const reviews = getReviews();
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return null;
  
  reviews[index] = { ...reviews[index], isApproved: true };
  saveToStorage(STORAGE_KEYS.REVIEWS, reviews);
  return reviews[index];
}

export function hideReview(id: string): Review | null {
  const reviews = getReviews();
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return null;
  
  reviews[index] = { ...reviews[index], isApproved: false };
  saveToStorage(STORAGE_KEYS.REVIEWS, reviews);
  return reviews[index];
}

// ============ AUTH ============

export function getAuthState(): AdminUser {
  if (!isBrowser()) {
    return { username: '', isAuthenticated: false };
  }
  const stored = localStorage.getItem(STORAGE_KEYS.AUTH);
  return stored ? JSON.parse(stored) : { username: '', isAuthenticated: false };
}

export function login(username: string, password: string): boolean {
  // Simple auth check as per requirements
  if (username === 'admin' && password === 'admin') {
    const authState: AdminUser = { username, isAuthenticated: true };
    if (isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authState));
    }
    return true;
  }
  return false;
}

export function logout(): void {
  if (isBrowser()) {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
}


// ============ DASHBOARD CALCULATIONS ============

export function getAppointmentsCountForCurrentMonth(): number {
  const appointments = getAppointments();
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return appointments.filter((a) => {
    const appointmentDate = new Date(a.date);
    return (
      appointmentDate.getMonth() === currentMonth &&
      appointmentDate.getFullYear() === currentYear
    );
  }).length;
}

export function getTotalRevenue(): number {
  const appointments = getAppointments();
  const services = getServices();
  
  return appointments
    .filter((a) => a.status === 'completed')
    .reduce((total, appointment) => {
      const service = services.find((s) => s.id === appointment.serviceId);
      return total + (service?.price || 0);
    }, 0);
}

export function getPendingAppointmentsCount(): number {
  const appointments = getAppointments();
  return appointments.filter((a) => a.status === 'pending').length;
}

// ============ MOCK DATA ============

const mockServices: Service[] = [
  {
    id: 'service-1',
    name: 'Oil Change',
    description: 'Full synthetic oil change with filter replacement',
    price: 75,
    duration: 30,
    isActive: true,
  },
  {
    id: 'service-2',
    name: 'Brake Inspection',
    description: 'Complete brake system inspection and adjustment',
    price: 50,
    duration: 45,
    isActive: true,
  },
  {
    id: 'service-3',
    name: 'Tire Rotation',
    description: 'Rotate all four tires for even wear',
    price: 40,
    duration: 30,
    isActive: true,
  },
  {
    id: 'service-4',
    name: 'Engine Diagnostic',
    description: 'Full computer diagnostic scan',
    price: 100,
    duration: 60,
    isActive: true,
  },
  {
    id: 'service-5',
    name: 'AC Service',
    description: 'Air conditioning system check and recharge',
    price: 150,
    duration: 90,
    isActive: false,
  },
];


const mockCustomers: Customer[] = [
  {
    id: 'customer-1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1555123456',
    visitCount: 5,
    totalSpent: 450,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'customer-2',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '+1555654321',
    visitCount: 3,
    totalSpent: 275,
    createdAt: '2024-02-20T14:30:00Z',
  },
  {
    id: 'customer-3',
    name: 'David Williams',
    email: 'david@example.com',
    phone: '+1555987654',
    visitCount: 8,
    totalSpent: 820,
    createdAt: '2023-11-10T09:15:00Z',
  },
];

const mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    customerPhone: '+1555123456',
    serviceId: 'service-1',
    date: '2024-12-15',
    time: '10:00',
    status: 'pending',
    createdAt: '2024-12-01T08:00:00Z',
  },
  {
    id: 'apt-2',
    customerName: 'Michael Johnson',
    customerEmail: 'michael@example.com',
    customerPhone: '+1555654321',
    serviceId: 'service-2',
    date: '2024-12-16',
    time: '14:00',
    status: 'confirmed',
    createdAt: '2024-12-02T10:30:00Z',
  },
  {
    id: 'apt-3',
    customerName: 'David Williams',
    customerEmail: 'david@example.com',
    customerPhone: '+1555987654',
    serviceId: 'service-4',
    date: '2024-12-10',
    time: '09:00',
    status: 'completed',
    createdAt: '2024-12-05T11:00:00Z',
  },
];

const mockReviews: Review[] = [
  {
    id: 'review-1',
    customerName: 'John Smith',
    rating: 5,
    comment: 'Excellent service! Very professional team.',
    date: '2024-12-01',
    isApproved: true,
  },
  {
    id: 'review-2',
    customerName: 'Michael Johnson',
    rating: 4,
    comment: 'Good work, but had to wait a bit longer than expected.',
    date: '2024-11-28',
    isApproved: true,
  },
  {
    id: 'review-3',
    customerName: 'David Williams',
    rating: 5,
    comment: 'Best auto repair shop in town!',
    date: '2024-11-25',
    isApproved: false,
  },
];

// Initialize storage with mock data if empty
export function initializeStore(): void {
  if (!isBrowser()) return;
  
  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    saveToStorage(STORAGE_KEYS.APPOINTMENTS, mockAppointments);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    saveToStorage(STORAGE_KEYS.SERVICES, mockServices);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
    saveToStorage(STORAGE_KEYS.CUSTOMERS, mockCustomers);
  }
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    saveToStorage(STORAGE_KEYS.REVIEWS, mockReviews);
  }
}


// ============ EMPLOYEES ============

import { Employee, EmployeeRole } from './admin-types';

const EMPLOYEES_KEY = 'admin_employees';

const mockEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Robert Brown',
    email: 'robert@apexauto.com',
    phone: '+1555111111',
    role: 'manager',
    salary: 8000,
    hireDate: '2020-01-15',
    isActive: true,
    absenceDays: 0,
    deductions: 0,
  },
  {
    id: 'emp-2',
    name: 'James Wilson',
    email: 'james@apexauto.com',
    phone: '+1555222222',
    role: 'mechanic',
    salary: 5000,
    hireDate: '2021-03-20',
    isActive: true,
    absenceDays: 2,
    deductions: 200,
  },
  {
    id: 'emp-3',
    name: 'William Davis',
    email: 'william@apexauto.com',
    phone: '+1555333333',
    role: 'technician',
    salary: 4500,
    hireDate: '2022-06-10',
    isActive: true,
    absenceDays: 1,
    deductions: 100,
  },
  {
    id: 'emp-4',
    name: 'Thomas Miller',
    email: 'thomas@apexauto.com',
    phone: '+1555444444',
    role: 'receptionist',
    salary: 3500,
    hireDate: '2023-01-05',
    isActive: false,
    absenceDays: 5,
    deductions: 500,
  },
];

export function getEmployees(): Employee[] {
  return getFromStorage<Employee>(EMPLOYEES_KEY, mockEmployees);
}

export function getEmployeeById(id: string): Employee | undefined {
  return getEmployees().find((e) => e.id === id);
}

export interface EmployeeInput {
  name: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  salary: number;
  hireDate: string;
  absenceDays?: number;
  deductions?: number;
}

export function validateEmployee(input: EmployeeInput): string[] {
  const errors: string[] = [];
  
  if (!input.name || input.name.trim() === '') {
    errors.push('Employee name is required');
  }
  
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.push('Valid email is required');
  }
  
  if (!input.phone || input.phone.trim() === '') {
    errors.push('Phone number is required');
  }
  
  if (!input.role) {
    errors.push('Role is required');
  }
  
  if (input.salary < 0) {
    errors.push('Salary cannot be negative');
  }
  
  if (!input.hireDate) {
    errors.push('Hire date is required');
  }
  
  return errors;
}

export function createEmployee(input: EmployeeInput): Employee | null {
  const errors = validateEmployee(input);
  if (errors.length > 0) return null;
  
  const employees = getEmployees();
  const newEmployee: Employee = {
    id: generateId(),
    ...input,
    isActive: true,
    absenceDays: input.absenceDays || 0,
    deductions: input.deductions || 0,
  };
  
  employees.push(newEmployee);
  saveToStorage(EMPLOYEES_KEY, employees);
  return newEmployee;
}

export function updateEmployee(id: string, updates: Partial<EmployeeInput>): Employee | null {
  const employees = getEmployees();
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return null;
  
  employees[index] = { ...employees[index], ...updates };
  saveToStorage(EMPLOYEES_KEY, employees);
  return employees[index];
}

export function toggleEmployeeStatus(id: string): Employee | null {
  const employees = getEmployees();
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return null;
  
  employees[index] = { ...employees[index], isActive: !employees[index].isActive };
  saveToStorage(EMPLOYEES_KEY, employees);
  return employees[index];
}

export function deleteEmployee(id: string): boolean {
  const employees = getEmployees();
  const filtered = employees.filter((e) => e.id !== id);
  if (filtered.length === employees.length) return false;
  
  saveToStorage(EMPLOYEES_KEY, filtered);
  return true;
}
