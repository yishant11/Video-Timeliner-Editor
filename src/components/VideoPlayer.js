import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Play, Pause } from 'lucide-react';
/**
 * Video player component with custom controls
 * Uses forwardRef to allow parent components to control video element directly
 */
const VideoPlayer = forwardRef(({ src, currentTime, isPlaying, onTimeUpdate, onLoadedMetadata, onPlayPause }, ref) => {
    /**
     * Formats time in MM:SS format for display
     */
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden", children: [_jsxs("div", { className: "relative bg-black aspect-video", children: [_jsx("video", { ref: ref, src: src, className: "w-full h-full object-contain", onTimeUpdate: onTimeUpdate, onLoadedMetadata: onLoadedMetadata, preload: "metadata" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200", children: _jsx("button", { onClick: onPlayPause, className: "bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-4 transition-all duration-200", "aria-label": isPlaying ? 'Pause video' : 'Play video', children: isPlaying ? (_jsx(Pause, { className: "w-8 h-8" })) : (_jsx(Play, { className: "w-8 h-8 ml-1" })) }) })] }), _jsx("div", { className: "p-4 bg-gray-50 border-t border-gray-200", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("button", { onClick: onPlayPause, className: "flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200", "aria-label": isPlaying ? 'Pause video' : 'Play video', children: [isPlaying ? (_jsx(Pause, { className: "w-4 h-4" })) : (_jsx(Play, { className: "w-4 h-4" })), _jsx("span", { className: "hidden sm:inline", children: isPlaying ? 'Pause' : 'Play' })] }), _jsx("div", { className: "text-sm text-gray-600 font-mono", children: formatTime(currentTime) })] }) })] }));
});
VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;
