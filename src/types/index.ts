// src/types/index.ts

export interface KeyMoment {
  id: string;
  title: string;
  description: string;
  timestamp: number; // in seconds
  importance: number; // 1-5 scale
}

export interface TimelineSegment {
  id: string;
  type: 'silent' | 'highlighted';
  startTime: number; // in seconds
  endTime: number; // in seconds
  description?: string;
}

export interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  fps: number;
}