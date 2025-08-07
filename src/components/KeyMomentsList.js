import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Clock, Star } from 'lucide-react';
/**
 * Sidebar component displaying list of key moments
 * Allows users to jump to specific timestamps by clicking moments
 */
const KeyMomentsList = ({ keyMoments, currentTime, onMomentClick, }) => {
    /**
     * Formats timestamp for display in MM:SS format
     */
    const formatTimestamp = (timestamp) => {
        const minutes = Math.floor(timestamp / 60);
        const seconds = Math.floor(timestamp % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    /**
     * Determines if a moment is currently active (within 2 seconds of current time)
     */
    const isActiveMoment = (timestamp) => {
        return Math.abs(currentTime - timestamp) < 2;
    };
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-fit", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [_jsx(Star, { className: "w-5 h-5 text-yellow-500" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Key Moments" })] }), _jsx("div", { className: "space-y-2 max-h-96 overflow-y-auto", children: keyMoments.map((moment, index) => (_jsxs("button", { onClick: () => onMomentClick(moment), className: `w-full text-left p-3 rounded-md border transition-all duration-200 hover:shadow-md ${isActiveMoment(moment.timestamp)
                        ? 'bg-blue-50 border-blue-200 shadow-sm'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`, "aria-label": `Jump to ${moment.title} at ${formatTimestamp(moment.timestamp)}`, children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsx("h4", { className: "font-medium text-gray-900 text-sm leading-tight", children: moment.title }), _jsxs("div", { className: "flex items-center space-x-1 text-xs text-gray-500 ml-2 flex-shrink-0", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsx("span", { className: "font-mono", children: formatTimestamp(moment.timestamp) })] })] }), _jsx("p", { className: "text-xs text-gray-600 leading-relaxed", children: moment.description }), _jsxs("div", { className: "flex items-center mt-2", children: [_jsx("div", { className: "flex space-x-1", children: [...Array(5)].map((_, i) => (_jsx("div", { className: `w-1.5 h-1.5 rounded-full ${i < moment.importance
                                            ? 'bg-yellow-400'
                                            : 'bg-gray-200'}` }, i))) }), _jsxs("span", { className: "text-xs text-gray-500 ml-2", children: ["Importance: ", moment.importance, "/5"] })] })] }, index))) }), keyMoments.length === 0 && (_jsxs("div", { className: "text-center text-gray-500 py-8", children: [_jsx(Star, { className: "w-8 h-8 mx-auto mb-2 text-gray-300" }), _jsx("p", { className: "text-sm", children: "No key moments detected" })] }))] }));
};
export default KeyMomentsList;
