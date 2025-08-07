import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useCallback, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import Timeline from './Timeline';
import KeyMomentsList from './KeyMomentsList';
import FileUpload from './FileUpload';
import { mockKeyMoments, mockTimelineSegments } from '../data/mockData';
/**
 * Main component that orchestrates the video timeline browser functionality
 * Manages video state, timeline interactions, and key moments navigation
 */
const VideoTimelineBrowser = () => {
    // Video state management
    const [videoSrc, setVideoSrc] = useState('');
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    // Timeline data
    const [keyMoments] = useState(mockKeyMoments);
    const [timelineSegments] = useState(mockTimelineSegments);
    // Refs for video control
    const videoRef = useRef(null);
    /**
     * Handles video file upload and creates object URL
     */
    const handleVideoUpload = useCallback((file) => {
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
    const handleSeek = useCallback((time) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    }, []);
    /**
     * Handles key moment selection and jumps to timestamp
     */
    const handleKeyMomentClick = useCallback((moment) => {
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
            }
            else {
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
    return (_jsx("div", { className: "min-h-screen bg-gray-50 p-4 md:p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("header", { className: "mb-6", children: [_jsx("h1", { className: "text-2xl md:text-3xl font-bold text-gray-900 mb-2", children: "Video Timeline Browser" }), _jsx("p", { className: "text-gray-600", children: "Upload a video or use sample content to explore timeline features" })] }), !videoSrc && (_jsx("div", { className: "mb-6", children: _jsx(FileUpload, { onVideoUpload: handleVideoUpload, onLoadSample: handleLoadSample }) })), videoSrc && (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "lg:col-span-3 space-y-4", children: [_jsx(VideoPlayer, { ref: videoRef, src: videoSrc, currentTime: currentTime, isPlaying: isPlaying, onTimeUpdate: handleTimeUpdate, onLoadedMetadata: handleLoadedMetadata, onPlayPause: handlePlayPause }), _jsx(Timeline, { duration: duration, currentTime: currentTime, keyMoments: keyMoments, segments: timelineSegments, onSeek: handleSeek })] }), _jsx("div", { className: "lg:col-span-1", children: _jsx(KeyMomentsList, { keyMoments: keyMoments, currentTime: currentTime, onMomentClick: handleKeyMomentClick }) })] }))] }) }));
};
export default VideoTimelineBrowser;
