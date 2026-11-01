import React from 'react';

export function Skeleton({ className = '' }) {
  return (
    <div
      className={`shimmer-effect bg-slate-200/80 dark:bg-slate-700/50 rounded-xl ${className}`}
    />
  );
}

export function RoomCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm flex flex-col sm:flex-row animate-fade-in">
      <Skeleton className="w-full sm:w-72 h-56 shrink-0 rounded-none" />
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-28 rounded-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="flex items-end justify-between pt-3 border-t border-slate-100 dark:border-slate-700/60">
          <div className="space-y-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-7 w-28" />
          </div>
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function DestinationCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

