import React, { useCallback } from 'react';
import { Upload, Video } from 'lucide-react';

interface FileUploadProps {
  onVideoUpload: (file: File) => void;
  onLoadSample: () => void;
}

/**
 * File upload component with drag-and-drop support
 * Allows users to upload video files or load sample content
 */
const FileUpload: React.FC<FileUploadProps> = ({ onVideoUpload, onLoadSample }) => {
  /**
   * Handles file selection from input element
   */
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoUpload(file);
    } else if (file) {
      alert('Please select a valid video file');
    }
  }, [onVideoUpload]);

  /**
   * Handles drag and drop functionality
   */
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      onVideoUpload(file);
    } else if (file) {
      alert('Please drop a valid video file');
    }
  }, [onVideoUpload]);

  /**
   * Prevents default drag behavior
   */
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Get Started
        </h2>
        
        {/* Drag and Drop Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600 mb-2">
            Drag and drop your video file here
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supports MP4, WebM, and other video formats
          </p>
          
          {/* File Input */}
          <label className="inline-block">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <span className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md cursor-pointer transition-colors duration-200 inline-flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Choose File</span>
            </span>
          </label>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Sample Video Button */}
        <button
          onClick={onLoadSample}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-md transition-colors duration-200 inline-flex items-center space-x-2"
        >
          <Video className="w-4 h-4" />
          <span>Load Sample Video</span>
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
