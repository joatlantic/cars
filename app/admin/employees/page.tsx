'use client';

import * as React from 'react';
import { Plus, Pencil, Trash2, Check, X, Minus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  getEmployees,
  createEmployee,
  updateEmployee,
  toggleEmployeeStatus,
  deleteEmployee,
  validateEmployee,
  type EmployeeInput,
} from '@/lib/admin-store';
import type { Employee, EmployeeRole } from '@/lib/admin-types';


const roleOptions: { value: EmployeeRole; label: string }[] = [
  { value: 'manager', label: 'Manager' },
  { value: 'mechanic', label: 'Mechanic' },
  { value: 'technician', label: 'Technician' },
  { value: 'receptionist', label: 'Receptionist' },
];

function getRoleColor(role: EmployeeRole) {
  switch (role) {
    case 'manager':
      return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
    case 'mechanic':
      return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
    case 'technician':
      return 'bg-cyan-500/20 text-cyan-500 border-cyan-500/30';
    case 'receptionist':
      return 'bg-pink-500/20 text-pink-500 border-pink-500/30';
    default:
      return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
  }
}

interface EmployeeFormProps {
  onSubmit: (data: EmployeeInput) => void;
  onCancel: () => void;
  initialData?: Partial<Employee>;
  isEdit?: boolean;
}

function EmployeeForm({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
}: EmployeeFormProps) {
  const [formData, setFormData] = React.useState<EmployeeInput>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    role: initialData?.role || 'mechanic',
    salary: initialData?.salary || 0,
    hireDate: initialData?.hireDate || '',
    absenceDays: initialData?.absenceDays || 0,
    deductions: initialData?.deductions || 0,
  });
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateEmployee(formData);
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter employee name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="employee@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+966501234567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role *</Label>
          <Select
            value={formData.role}
            onValueChange={(value: EmployeeRole) =>
              setFormData({ ...formData, role: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary">Salary ($) *</Label>
          <Input
            id="salary"
            type="number"
            min="0"
            value={formData.salary}
            onChange={(e) =>
              setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })
            }
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hireDate">Hire Date *</Label>
          <Input
            id="hireDate"
            type="date"
            value={formData.hireDate}
            onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="absenceDays">Absence Days</Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                const newDays = Math.max(0, (formData.absenceDays || 0) - 1);
                const dailyRate = formData.salary / 30;
                setFormData({ 
                  ...formData, 
                  absenceDays: newDays,
                  deductions: Math.round(newDays * dailyRate * 100) / 100
                });
              }}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id="absenceDays"
              type="number"
              min="0"
              className="text-center"
              value={formData.absenceDays}
              onChange={(e) => {
                const newDays = parseInt(e.target.value) || 0;
                const dailyRate = formData.salary / 30;
                setFormData({ 
                  ...formData, 
                  absenceDays: newDays,
                  deductions: Math.round(newDays * dailyRate * 100) / 100
                });
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                const newDays = (formData.absenceDays || 0) + 1;
                const dailyRate = formData.salary / 30;
                setFormData({ 
                  ...formData, 
                  absenceDays: newDays,
                  deductions: Math.round(newDays * dailyRate * 100) / 100
                });
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deductions">Deductions (Auto-calculated)</Label>
          <div className="flex items-center gap-2">
            <Input
              id="deductions"
              type="number"
              min="0"
              value={formData.deductions}
              readOnly
              className="bg-muted"
            />
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              ${Math.round(formData.salary / 30)}/day
            </span>
          </div>
        </div>
      </div>

      {(formData.absenceDays || 0) > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-sm p-3 rounded-md">
          <p>
            <strong>Deduction Summary:</strong> {formData.absenceDays} days × ${Math.round(formData.salary / 30)}/day = ${formData.deductions}
          </p>
          <p className="mt-1">
            <strong>Net Salary:</strong> ${formData.salary} - ${formData.deductions} = <span className="text-green-500">${formData.salary - (formData.deductions || 0)}</span>
          </p>
        </div>
      )}

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEdit ? 'Update' : 'Add'} Employee</Button>
      </DialogFooter>
    </form>
  );
}


export default function EmployeesPage() {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [editingEmployee, setEditingEmployee] = React.useState<Employee | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const loadData = React.useCallback(() => {
    setEmployees(getEmployees());
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateEmployee = (data: EmployeeInput) => {
    const result = createEmployee(data);
    if (result) {
      loadData();
      setIsCreateDialogOpen(false);
    }
  };

  const handleUpdateEmployee = (data: EmployeeInput) => {
    if (!editingEmployee) return;
    const result = updateEmployee(editingEmployee.id, data);
    if (result) {
      loadData();
      setEditingEmployee(null);
    }
  };

  const handleToggleStatus = (id: string) => {
    const result = toggleEmployeeStatus(id);
    if (result) {
      loadData();
    }
  };

  const handleDelete = (id: string) => {
    const result = deleteEmployee(id);
    if (result) {
      loadData();
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Employees</h2>
          <p className="text-muted-foreground">
            Manage staff members and their information
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new staff member.
              </DialogDescription>
            </DialogHeader>
            <EmployeeForm
              onSubmit={handleCreateEmployee}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Absence</TableHead>
              <TableHead>Deductions</TableHead>
              <TableHead>Net Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <p className="text-muted-foreground">No employees found.</p>
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{employee.email}</p>
                      <p className="text-sm text-muted-foreground">{employee.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(employee.role)}>
                      {roleOptions.find((r) => r.value === employee.role)?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>${employee.salary.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={(employee.absenceDays || 0) > 0 ? 'text-yellow-500' : ''}>
                      {employee.absenceDays || 0} days
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={(employee.deductions || 0) > 0 ? 'text-red-500' : ''}>
                      ${(employee.deductions || 0).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-500 font-medium">
                      ${(employee.salary - (employee.deductions || 0)).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(employee.id)}
                      className={employee.isActive 
                        ? 'bg-green-500/10 border-green-500/50 text-green-500 hover:bg-green-500/20 hover:text-green-400' 
                        : 'bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20 hover:text-red-400'
                      }
                    >
                      {employee.isActive ? (
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
                        open={editingEmployee?.id === employee.id}
                        onOpenChange={(open) =>
                          setEditingEmployee(open ? employee : null)
                        }
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Edit Employee</DialogTitle>
                            <DialogDescription>
                              Update employee details.
                            </DialogDescription>
                          </DialogHeader>
                          <EmployeeForm
                            onSubmit={handleUpdateEmployee}
                            onCancel={() => setEditingEmployee(null)}
                            initialData={employee}
                            isEdit
                          />
                        </DialogContent>
                      </Dialog>

                      <AlertDialog
                        open={deleteId === employee.id}
                        onOpenChange={(open) =>
                          setDeleteId(open ? employee.id : null)
                        }
                      >
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete &quot;{employee.name}&quot;?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(employee.id)}
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
