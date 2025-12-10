'use client';

import * as React from 'react';
import { Calendar, DollarSign, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getAppointmentsCountForCurrentMonth,
  getTotalRevenue,
  getPendingAppointmentsCount,
  getReviews,
  getAppointments,
  getServices,
} from '@/lib/admin-store';
import type { Review, Appointment, Service } from '@/lib/admin-types';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

function RecentReviews({ reviews }: { reviews: Review[] }) {
  const approvedReviews = reviews.filter((r) => r.isApproved);
  const recentReviews = approvedReviews.slice(0, 3);

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        {recentReviews.length === 0 ? (
          <p className="text-muted-foreground text-sm">No approved reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {recentReviews.map((review) => (
              <div key={review.id} className="flex items-start gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{review.customerName}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RecentAppointments({
  appointments,
  services,
}: {
  appointments: Appointment[];
  services: Service[];
}) {
  const recentAppointments = appointments.slice(0, 5);

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
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        {recentAppointments.length === 0 ? (
          <p className="text-muted-foreground text-sm">No appointments yet.</p>
        ) : (
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{appointment.customerName}</p>
                  <p className="text-sm text-muted-foreground">
                    {getServiceName(appointment.serviceId)} - {appointment.date} at{' '}
                    {appointment.time}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  const [appointmentsCount, setAppointmentsCount] = React.useState(0);
  const [revenue, setRevenue] = React.useState(0);
  const [pendingCount, setPendingCount] = React.useState(0);
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [services, setServices] = React.useState<Service[]>([]);

  React.useEffect(() => {
    setAppointmentsCount(getAppointmentsCountForCurrentMonth());
    setRevenue(getTotalRevenue());
    setPendingCount(getPendingAppointmentsCount());
    setReviews(getReviews());
    setAppointments(getAppointments());
    setServices(getServices());
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to the Apex Auto Admin Panel
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Appointments This Month"
          value={appointmentsCount}
          description="Total appointments for current month"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          title="Total Revenue"
          value={`$${revenue.toLocaleString()}`}
          description="From completed appointments"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatCard
          title="Pending Appointments"
          value={pendingCount}
          description="Awaiting confirmation"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard
          title="Approved Reviews"
          value={reviews.filter((r) => r.isApproved).length}
          description="Visible on website"
          icon={<Star className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <RecentAppointments appointments={appointments} services={services} />
        <RecentReviews reviews={reviews} />
      </div>
    </div>
  );
}
