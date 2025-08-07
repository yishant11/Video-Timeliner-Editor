import React from 'react';
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
declare const Timeline: React.FC<TimelineProps>;
export default Timeline;
