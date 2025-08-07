import React from 'react';
import { Clock, Star } from 'lucide-react';
import type { KeyMoment } from '../types/index';

interface KeyMomentsListProps {
  keyMoments: KeyMoment[];
  currentTime: number;
  onMomentClick: (moment: KeyMoment) => void;
}

/**
 * Sidebar component displaying list of key moments
 * Allows users to jump to specific timestamps by clicking moments
 */
const KeyMomentsList: React.FC<KeyMomentsListProps> = ({
  keyMoments,
  currentTime,
  onMomentClick,
}) => {
  /**
   * Formats timestamp for display in MM:SS format
   */
  const formatTimestamp = (timestamp: number): string => {
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  /**
   * Determines if a moment is currently active (within 2 seconds of current time)
   */
  const isActiveMoment = (timestamp: number): boolean => {
    return Math.abs(currentTime - timestamp) < 2;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-fit">
      <div className="flex items-center space-x-2 mb-4">
        <Star className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">Key Moments</h3>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {keyMoments.map((moment, index) => (
          <button
            key={index}
            onClick={() => onMomentClick(moment)}
            className={`w-full text-left p-3 rounded-md border transition-all duration-200 hover:shadow-md ${
              isActiveMoment(moment.timestamp)
                ? 'bg-blue-50 border-blue-200 shadow-sm'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
            aria-label={`Jump to ${moment.title} at ${formatTimestamp(moment.timestamp)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-900 text-sm leading-tight">
                {moment.title}
              </h4>
              <div className="flex items-center space-x-1 text-xs text-gray-500 ml-2 flex-shrink-0">
                <Clock className="w-3 h-3" />
                <span className="font-mono">{formatTimestamp(moment.timestamp)}</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed">
              {moment.description}
            </p>
            
            {/* Importance indicator */}
            <div className="flex items-center mt-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i < moment.importance
                        ? 'bg-yellow-400'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-2">
                Importance: {moment.importance}/5
              </span>
            </div>
          </button>
        ))}
      </div>

      {keyMoments.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <Star className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">No key moments detected</p>
        </div>
      )}
    </div>
  );
};

export default KeyMomentsList;
