import React from 'react';
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
declare const KeyMomentsList: React.FC<KeyMomentsListProps>;
export default KeyMomentsList;
