export interface KeyMoment {
    id: string;
    title: string;
    description: string;
    timestamp: number;
    importance: number;
}
export interface TimelineSegment {
    id: string;
    type: 'silent' | 'highlighted';
    startTime: number;
    endTime: number;
    description?: string;
}
export interface VideoMetadata {
    duration: number;
    width: number;
    height: number;
    fps: number;
}
