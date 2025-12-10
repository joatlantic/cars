'use client';

import * as React from 'react';
import { Search, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCustomers, searchCustomers, getAppointments, getServices } from '@/lib/admin-store';
import type { Customer, Appointment, Service } from '@/lib/admin-types';

interface CustomerDetailsProps {
  customer: Customer;
  appointments: Appointment[];
  services: Service[];
}

function CustomerDetails({ customer, appointments, services }: CustomerDetailsProps) {
  const customerAppointments = appointments.filter(
    (apt) =>
      apt.customerEmail === customer.email ||
      apt.customerPhone === customer.phone ||
      apt.customerName === customer.name
  );

  const getServiceName = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    return service?.name || 'Unknown Service';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Visits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{customer.visitCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${customer.totalSpent.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Contact Information</h4>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Email:</span> {customer.email}
          </p>
          <p>
            <span className="text-muted-foreground">Phone:</span> {customer.phone}
          </p>
          <p>
            <span className="text-muted-foreground">Customer since:</span>{' '}
            {new Date(customer.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Appointment History</h4>
        {customerAppointments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No appointments found.</p>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerAppointments.map((apt) => (
                  <TableRow key={apt.id}>
                    <TableCell>{getServiceName(apt.serviceId)}</TableCell>
                    <TableCell>
                      {apt.date} at {apt.time}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          apt.status
                        )}`}
                      >
                        {apt.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}


export default function CustomersPage() {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [services, setServices] = React.useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null);

  const loadData = React.useCallback(() => {
    setCustomers(getCustomers());
    setAppointments(getAppointments());
    setServices(getServices());
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredCustomers = React.useMemo(() => {
    if (!searchQuery.trim()) return customers;
    return searchCustomers(searchQuery);
  }, [customers, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customers</h2>
          <p className="text-muted-foreground">
            View and manage customer information
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery('')}
          >
            Clear
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Visits</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? 'No customers found matching your search.'
                      : 'No customers found.'}
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.visitCount}</TableCell>
                  <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Dialog
                      open={selectedCustomer?.id === customer.id}
                      onOpenChange={(open) =>
                        setSelectedCustomer(open ? customer : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>{customer.name}</DialogTitle>
                          <DialogDescription>
                            Customer details and appointment history
                          </DialogDescription>
                        </DialogHeader>
                        <CustomerDetails
                          customer={customer}
                          appointments={appointments}
                          services={services}
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
