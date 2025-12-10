'use client';

import * as React from 'react';
import { Check, EyeOff, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getReviews, approveReview, hideReview } from '@/lib/admin-store';
import type { Review } from '@/lib/admin-types';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = React.useState<Review[]>([]);

  const loadData = React.useCallback(() => {
    setReviews(getReviews());
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleApprove = (id: string) => {
    const result = approveReview(id);
    if (result) {
      loadData();
    }
  };

  const handleHide = (id: string) => {
    const result = hideReview(id);
    if (result) {
      loadData();
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Reviews</h2>
        <p className="text-muted-foreground">
          Moderate customer reviews and feedback
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="max-w-[300px]">Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">No reviews found.</p>
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">
                    {review.customerName}
                  </TableCell>
                  <TableCell>
                    <StarRating rating={review.rating} />
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="truncate" title={review.comment}>
                      {review.comment}
                    </p>
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={review.isApproved ? 'default' : 'secondary'}
                    >
                      {review.isApproved ? 'Approved' : 'Hidden'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!review.isApproved ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApprove(review.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleHide(review.id)}
                        >
                          <EyeOff className="h-4 w-4 mr-1" />
                          Hide
                        </Button>
                      )}
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
