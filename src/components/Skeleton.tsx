import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      {/* Answer Box Skeleton */}
      <div className="bg-[#252a3d] rounded-lg p-4">
        <div className="h-4 w-20 bg-gray-600 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-600 rounded w-3/4"></div>
          <div className="h-3 bg-gray-600 rounded w-1/2"></div>
          <div className="h-3 bg-gray-600 rounded w-2/3"></div>
        </div>
      </div>
      
      {/* Image Box Skeleton */}
      <div className="bg-[#252a3d] rounded-lg overflow-hidden">
        <div className="h-60 w-60 bg-gray-600"></div>
        <div className="p-4">
          <div className="h-3 bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;