'use client';

import * as React from 'react';
import { Plus, Trash2, Clock, CheckCircle, XCircle, CalendarCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  getAppointments,
  getServices,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  validateAppointment,
  type AppointmentInput,
} from '@/lib/admin-store';
import type { Appointment, AppointmentStatus, Service } from '@/lib/admin-types';

const statusOptions: { value: AppointmentStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];


function getStatusStyle(status: AppointmentStatus) {
  switch (status) {
    case 'pending':
      return {
        className: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/20',
        icon: Clock,
        label: 'Pending'
      };
    case 'confirmed':
      return {
        className: 'bg-blue-500/10 border-blue-500/50 text-blue-500 hover:bg-blue-500/20',
        icon: CalendarCheck,
        label: 'Confirmed'
      };
    case 'completed':
      return {
        className: 'bg-green-500/10 border-green-500/50 text-green-500 hover:bg-green-500/20',
        icon: CheckCircle,
        label: 'Completed'
      };
    case 'cancelled':
      return {
        className: 'bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20',
        icon: XCircle,
        label: 'Cancelled'
      };
    default:
      return {
        className: 'bg-gray-500/10 border-gray-500/50 text-gray-500 hover:bg-gray-500/20',
        icon: Clock,
        label: 'Unknown'
      };
  }
}

interface AppointmentFormProps {
  services: Service[];
  onSubmit: (data: AppointmentInput) => void;
  onCancel: () => void;
  initialData?: Partial<AppointmentInput>;
  isEdit?: boolean;
}

function AppointmentForm({
  services,
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
}: AppointmentFormProps) {
  const [formData, setFormData] = React.useState<AppointmentInput>({
    customerName: initialData?.customerName || '',
    customerEmail: initialData?.customerEmail || '',
    customerPhone: initialData?.customerPhone || '',
    serviceId: initialData?.serviceId || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    notes: initialData?.notes || '',
  });
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateAppointment(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    onSubmit(formData);
  };

  const activeServices = services.filter((s) => s.isActive);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.length > 0 && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="customerName">Customer Name *</Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
            placeholder="Enter customer name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerEmail">Email *</Label>
          <Input
            id="customerEmail"
            type="email"
            value={formData.customerEmail}
            onChange={(e) =>
              setFormData({ ...formData, customerEmail: e.target.value })
            }
            placeholder="customer@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerPhone">Phone *</Label>
          <Input
            id="customerPhone"
            value={formData.customerPhone}
            onChange={(e) =>
              setFormData({ ...formData, customerPhone: e.target.value })
            }
            placeholder="+966501234567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceId">Service *</Label>
          <Select
            value={formData.serviceId}
            onValueChange={(value) =>
              setFormData({ ...formData, serviceId: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {activeServices.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name} - ${service.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time *</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Input
          id="notes"
          value={formData.notes || ''}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes..."
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEdit ? 'Update' : 'Create'} Appointment</Button>
      </DialogFooter>
    </form>
  );
}


export default function AppointmentsPage() {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [services, setServices] = React.useState<Service[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const loadData = React.useCallback(() => {
    setAppointments(getAppointments());
    setServices(getServices());
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const getServiceName = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    return service?.name || 'Unknown Service';
  };

  const handleCreateAppointment = (data: AppointmentInput) => {
    const result = createAppointment(data);
    if (result) {
      loadData();
      setIsDialogOpen(false);
    }
  };

  const handleStatusChange = (id: string, status: AppointmentStatus) => {
    const result = updateAppointmentStatus(id, status);
    if (result) {
      loadData();
    }
  };

  const handleDelete = (id: string) => {
    const result = deleteAppointment(id);
    if (result) {
      loadData();
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Appointments</h2>
          <p className="text-muted-foreground">
            Manage customer appointments and schedules
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Appointment</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new appointment.
              </DialogDescription>
            </DialogHeader>
            <AppointmentForm
              services={services}
              onSubmit={handleCreateAppointment}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-muted-foreground">No appointments found.</p>
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{appointment.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.customerEmail}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.customerPhone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getServiceName(appointment.serviceId)}</TableCell>
                  <TableCell>
                    <div>
                      <p>{appointment.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.time}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={appointment.status}
                      onValueChange={(value: AppointmentStatus) =>
                        handleStatusChange(appointment.id, value)
                      }
                    >
                      <SelectTrigger 
                        className={`w-[140px] ${getStatusStyle(appointment.status).className}`}
                      >
                        <div className="flex items-center gap-2">
                          {React.createElement(getStatusStyle(appointment.status).icon, { className: "h-4 w-4" })}
                          <span className="font-medium">
                            {getStatusStyle(appointment.status).label}
                          </span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => {
                          const style = getStatusStyle(option.value);
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                {React.createElement(style.icon, { className: "h-4 w-4" })}
                                {option.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog
                      open={deleteId === appointment.id}
                      onOpenChange={(open) =>
                        setDeleteId(open ? appointment.id : null)
                      }
                    >
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this appointment for{' '}
                            {appointment.customerName}? This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(appointment.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
