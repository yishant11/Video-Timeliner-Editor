import React, { useState, useRef, useCallback, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import Timeline from './Timeline';
import KeyMomentsList from './KeyMomentsList';
import FileUpload from './FileUpload';
import type { KeyMoment, TimelineSegment } from '../types/index';
import { mockKeyMoments, mockTimelineSegments } from '../data/mockData';

/**
 * Main component that orchestrates the video timeline browser functionality
 * Manages video state, timeline interactions, and key moments navigation
 */
const VideoTimelineBrowser: React.FC = () => {
  // Video state management
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  // Timeline data
  const [keyMoments] = useState<KeyMoment[]>(mockKeyMoments);
  const [timelineSegments] = useState<TimelineSegment[]>(mockTimelineSegments);
  
  // Refs for video control
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Handles video file upload and creates object URL
   */
  const handleVideoUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setCurrentTime(0);
    setIsPlaying(false);
  }, []);

  /**
   * Loads sample video for demonstration
   */
  const handleLoadSample = useCallback(() => {
    // Using a sample video URL - in production, this would be a real video file
    setVideoSrc('/placeholder.mp4?height=720&width=1280&query=sample video for timeline demo');
    setCurrentTime(0);
    setIsPlaying(false);
  }, []);

  /**
   * Seeks video to specific time when timeline is clicked or key moment is selected
   */
  const handleSeek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  /**
   * Handles key moment selection and jumps to timestamp
   */
  const handleKeyMomentClick = useCallback((moment: KeyMoment) => {
    handleSeek(moment.timestamp);
  }, [handleSeek]);

  /**
   * Updates current time as video plays
   */
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  /**
   * Sets video duration when metadata loads
   */
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  /**
   * Toggles play/pause state
   */
  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (videoSrc && videoSrc.startsWith('blob:')) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Video Timeline Browser
          </h1>
          <p className="text-gray-600">
            Upload a video or use sample content to explore timeline features
          </p>
        </header>

        {/* File Upload Section */}
        {!videoSrc && (
          <div className="mb-6">
            <FileUpload 
              onVideoUpload={handleVideoUpload}
              onLoadSample={handleLoadSample}
            />
          </div>
        )}

        {/* Main Content */}
        {videoSrc && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Video Player and Timeline */}
            <div className="lg:col-span-3 space-y-4">
              <VideoPlayer
                ref={videoRef}
                src={videoSrc}
                currentTime={currentTime}
                isPlaying={isPlaying}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlayPause={handlePlayPause}
              />
              
              <Timeline
                duration={duration}
                currentTime={currentTime}
                keyMoments={keyMoments}
                segments={timelineSegments}
                onSeek={handleSeek}
              />
            </div>

            {/* Key Moments Sidebar */}
            <div className="lg:col-span-1">
              <KeyMomentsList
                keyMoments={keyMoments}
                currentTime={currentTime}
                onMomentClick={handleKeyMomentClick}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoTimelineBrowser;
