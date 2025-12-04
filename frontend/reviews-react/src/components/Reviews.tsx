import React from 'react'
import { Rating } from '@mui/material'
import type { Review } from '@/entity/types'

interface ReviewsProps {
    reviews: Review[]
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className="flex-1 flex flex-col p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No reviews available for this product.</p>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 max-h-[300px]">
          {reviews.map((review: Review) => (
            <div key={review.id} className="p-4 border border rounded-lg">
              <div className="flex justify-between gap-3 mb-3">
                <Rating
                  value={review.rating}
                  readOnly
                  size="small"
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#374151", // dark grey (gray-700)
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#d1d5db", // light grey (gray-300)
                    },
                  }}
                />
                <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
