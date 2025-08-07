/// <reference types="react" />
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
declare const VideoPlayer: import("react").ForwardRefExoticComponent<VideoPlayerProps & import("react").RefAttributes<HTMLVideoElement>>;
export default VideoPlayer;
