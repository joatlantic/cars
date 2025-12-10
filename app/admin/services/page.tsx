'use client';

import * as React from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { Badge } from '@/components/ui/badge';
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
  getServices,
  createService,
  updateService,
  toggleServiceAvailability,
  deleteService,
  validateService,
  type ServiceInput,
} from '@/lib/admin-store';
import type { Service } from '@/lib/admin-types';


interface ServiceFormProps {
  onSubmit: (data: ServiceInput) => void;
  onCancel: () => void;
  initialData?: Partial<Service>;
  isEdit?: boolean;
}

function ServiceForm({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
}: ServiceFormProps) {
  const [formData, setFormData] = React.useState<ServiceInput>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    duration: initialData?.duration || 30,
  });
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateService(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    onSubmit(formData);
  };

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

      <div className="space-y-2">
        <Label htmlFor="name">Service Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter service name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter service description"
          rows={3}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($) *</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
            }
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes) *</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })
            }
            placeholder="30"
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEdit ? 'Update' : 'Create'} Service</Button>
      </DialogFooter>
    </form>
  );
}


export default function ServicesPage() {
  const [services, setServices] = React.useState<Service[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [editingService, setEditingService] = React.useState<Service | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const loadData = React.useCallback(() => {
    setServices(getServices());
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateService = (data: ServiceInput) => {
    const result = createService(data);
    if (result) {
      loadData();
      setIsCreateDialogOpen(false);
    }
  };

  const handleUpdateService = (data: ServiceInput) => {
    if (!editingService) return;
    const result = updateService(editingService.id, data);
    if (result) {
      loadData();
      setEditingService(null);
    }
  };

  const handleToggleAvailability = (id: string) => {
    const result = toggleServiceAvailability(id);
    if (result) {
      loadData();
    }
  };

  const handleDelete = (id: string) => {
    const result = deleteService(id);
    if (result) {
      loadData();
      setDeleteId(null);
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Services</h2>
          <p className="text-muted-foreground">
            Manage services offered by the auto repair shop
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Service</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new service.
              </DialogDescription>
            </DialogHeader>
            <ServiceForm
              onSubmit={handleCreateService}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">No services found.</p>
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {service.description}
                  </TableCell>
                  <TableCell>${service.price.toFixed(2)}</TableCell>
                  <TableCell>{formatDuration(service.duration)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleAvailability(service.id)}
                      className={service.isActive 
                        ? 'bg-green-500/10 border-green-500/50 text-green-500 hover:bg-green-500/20 hover:text-green-400' 
                        : 'bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20 hover:text-red-400'
                      }
                    >
                      {service.isActive ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 mr-1" />
                          Inactive
                        </>
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog
                        open={editingService?.id === service.id}
                        onOpenChange={(open) =>
                          setEditingService(open ? service : null)
                        }
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Edit Service</DialogTitle>
                            <DialogDescription>
                              Update the service details.
                            </DialogDescription>
                          </DialogHeader>
                          <ServiceForm
                            onSubmit={handleUpdateService}
                            onCancel={() => setEditingService(null)}
                            initialData={service}
                            isEdit
                          />
                        </DialogContent>
                      </Dialog>

                      <AlertDialog
                        open={deleteId === service.id}
                        onOpenChange={(open) =>
                          setDeleteId(open ? service.id : null)
                        }
                      >
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Service</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete &quot;{service.name}&quot;?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(service.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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
