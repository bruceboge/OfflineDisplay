import React from 'react'

export default function SkeletonCard({ lines = 3 }) {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="h-2 w-full bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 rounded w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
