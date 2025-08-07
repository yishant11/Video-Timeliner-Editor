import  { forwardRef } from 'react';
import { Play, Pause } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  currentTime: number;
  isPlaying: boolean;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  onPlayPause: () => void;
}

/**
 * Video player component with custom controls
 * Uses forwardRef to allow parent components to control video element directly
 */
const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ src, currentTime, isPlaying, onTimeUpdate, onLoadedMetadata, onPlayPause }, ref) => {
    /**
     * Formats time in MM:SS format for display
     */
    const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Video Element */}
        <div className="relative bg-black aspect-video">
          <video
            ref={ref}
            src={src}
            className="w-full h-full object-contain"
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            preload="metadata"
          />
          
          {/* Play/Pause Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={onPlayPause}
              className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-4 transition-all duration-200"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </button>
          </div>
        </div>

        {/* Video Controls */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={onPlayPause}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {isPlaying ? 'Pause' : 'Play'}
              </span>
            </button>
            
            <div className="text-sm text-gray-600 font-mono">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
