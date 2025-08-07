import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from 'react';
import { Upload, Video } from 'lucide-react';
/**
 * File upload component with drag-and-drop support
 * Allows users to upload video files or load sample content
 */
const FileUpload = ({ onVideoUpload, onLoadSample }) => {
    /**
     * Handles file selection from input element
     */
    const handleFileSelect = useCallback((event) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            onVideoUpload(file);
        }
        else if (file) {
            alert('Please select a valid video file');
        }
    }, [onVideoUpload]);
    /**
     * Handles drag and drop functionality
     */
    const handleDrop = useCallback((event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('video/')) {
            onVideoUpload(file);
        }
        else if (file) {
            alert('Please drop a valid video file');
        }
    }, [onVideoUpload]);
    /**
     * Prevents default drag behavior
     */
    const handleDragOver = useCallback((event) => {
        event.preventDefault();
    }, []);
    return (_jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-8", children: _jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-6", children: "Get Started" }), _jsxs("div", { onDrop: handleDrop, onDragOver: handleDragOver, className: "border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200", children: [_jsx(Upload, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-lg text-gray-600 mb-2", children: "Drag and drop your video file here" }), _jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Supports MP4, WebM, and other video formats" }), _jsxs("label", { className: "inline-block", children: [_jsx("input", { type: "file", accept: "video/*", onChange: handleFileSelect, className: "hidden" }), _jsxs("span", { className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md cursor-pointer transition-colors duration-200 inline-flex items-center space-x-2", children: [_jsx(Upload, { className: "w-4 h-4" }), _jsx("span", { children: "Choose File" })] })] })] }), _jsxs("div", { className: "relative mb-6", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-gray-300" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-white text-gray-500", children: "or" }) })] }), _jsxs("button", { onClick: onLoadSample, className: "bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-md transition-colors duration-200 inline-flex items-center space-x-2", children: [_jsx(Video, { className: "w-4 h-4" }), _jsx("span", { children: "Load Sample Video" })] })] }) }));
};
export default FileUpload;
