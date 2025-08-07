import React from 'react';
interface FileUploadProps {
    onVideoUpload: (file: File) => void;
    onLoadSample: () => void;
}
/**
 * File upload component with drag-and-drop support
 * Allows users to upload video files or load sample content
 */
declare const FileUpload: React.FC<FileUploadProps>;
export default FileUpload;
