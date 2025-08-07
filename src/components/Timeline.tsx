import React, { useRef, useCallback, useMemo } from 'react';
import type { KeyMoment, TimelineSegment } from '../types';

interface TimelineProps {
  duration: number;
  currentTime: number;
  keyMoments: KeyMoment[];
  segments: TimelineSegment[];
  onSeek: (time: number) => void;
}

/**
 * Interactive timeline component with visual segments and key moments
 * Handles click-to-seek functionality and displays video progress
 */
const Timeline: React.FC<TimelineProps> = ({
  duration,
  currentTime,
  keyMoments,
  segments,
  onSeek,
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  /**
   * Handles timeline click to seek to specific time
   */
  const handleTimelineClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!timelineRef.current || duration === 0) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const percentage = clickX / rect.width;
      const seekTime = Math.max(0, Math.min(duration, percentage * duration));

      onSeek(seekTime);
    },
    [duration, onSeek]
  );

  /**
   * Generates time markers for the timeline (every 10 seconds)
   */
  const timeMarkers = useMemo(() => {
    if (duration === 0) return [];

    const markers: { time: number; percentage: number; label: string }[] = [];
    const interval = 10;

    for (let time = 0; time <= duration; time += interval) {
      const percentage = (time / duration) * 100;
      markers.push({
        time,
        percentage,
        label: `${Math.floor(time / 60)}:${(time % 60)
          .toString()
          .padStart(2, '0')}`,
      });
    }

    return markers;
  }, [duration]);

  /**
   * Calculates progress percentage for current playhead position
   */
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (duration === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center text-gray-500">Loading timeline...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>

      <div className="space-y-4">
        <div className="relative h-6">
          {timeMarkers.map((marker, index) => (
            <div
              key={index}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${marker.percentage}%` }}
            >
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="text-xs text-gray-500 mt-1 transform -translate-x-1/2">
                {marker.label}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={timelineRef}
          className="relative h-12 bg-gray-100 rounded-md cursor-pointer overflow-hidden"
          onClick={handleTimelineClick}
          role="slider"
          aria-label="Video timeline"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
        >
          {segments.map((segment, index) => {
            const startPercentage = (segment.startTime / duration) * 100;
            const widthPercentage =
              ((segment.endTime - segment.startTime) / duration) * 100;

            return (
              <div
                key={index}
                className={`absolute h-full ${
                  segment.type === 'silent'
                    ? 'bg-red-200 border-l-2 border-r-2 border-red-400'
                    : 'bg-yellow-200 border-l-2 border-r-2 border-yellow-400'
                }`}
                style={{
                  left: `${startPercentage}%`,
                  width: `${widthPercentage}%`,
                }}
                title={`${segment.type} segment: ${segment.startTime}s - ${
                  segment.endTime
                }s`}
              />
            );
          })}

          <div
            className="absolute top-0 left-0 h-full bg-blue-500 bg-opacity-30 transition-all duration-100"
            style={{ width: `${progressPercentage}%` }}
          />

          {keyMoments.map((moment, index) => {
            const percentage = (moment.timestamp / duration) * 100;
            return (
              <div
                key={index}
                className="absolute top-0 w-1 h-full bg-green-500 cursor-pointer hover:bg-green-600 transition-colors duration-200"
                style={{ left: `${percentage}%` }}
                title={`${moment.title} - ${moment.timestamp}s`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSeek(moment.timestamp);
                }}
              />
            );
          })}

          <div
            className="absolute top-0 w-0.5 h-full bg-blue-600 pointer-events-none"
            style={{ left: `${progressPercentage}%` }}
          >
            <div className="absolute -top-1 -left-2 w-4 h-6 bg-blue-600 rounded-sm"></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-red-200 border border-red-400 rounded"></div>
            <span>Silent segments</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-yellow-200 border border-yellow-400 rounded"></div>
            <span>Highlighted segments</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-3 bg-green-500 rounded"></div>
            <span>Key moments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
