/**
 * Mock data for key moments - simulates auto-generated content analysis
 * In a real application, this would come from AI/ML analysis of the video
 */
export const mockKeyMoments = [
    {
        id: '1',
        title: 'Introduction',
        description: 'Speaker introduces the main topic and agenda',
        timestamp: 15,
        importance: 4,
    },
    {
        id: '2',
        title: 'Key Concept Explanation',
        description: 'Detailed explanation of the core concept with visual aids',
        timestamp: 45,
        importance: 5,
    },
    {
        id: '3',
        title: 'First Example',
        description: 'Practical example demonstrating the concept in action',
        timestamp: 78,
        importance: 4,
    },
    {
        id: '4',
        title: 'Q&A Session Begins',
        description: 'Transition to audience questions and interactive discussion',
        timestamp: 120,
        importance: 3,
    },
    {
        id: '5',
        title: 'Important Question',
        description: 'Audience asks about implementation challenges',
        timestamp: 145,
        importance: 4,
    },
    {
        id: '6',
        title: 'Technical Deep Dive',
        description: 'Detailed technical explanation with code examples',
        timestamp: 180,
        importance: 5,
    },
    {
        id: '7',
        title: 'Best Practices',
        description: 'Discussion of industry best practices and recommendations',
        timestamp: 220,
        importance: 4,
    },
    {
        id: '8',
        title: 'Conclusion',
        description: 'Summary of key points and next steps',
        timestamp: 270,
        importance: 3,
    },
];
/**
 * Mock data for timeline segments - represents different types of content
 * Silent segments: periods with no speech or low audio
 * Highlighted segments: important or engaging content sections
 */
export const mockTimelineSegments = [
    {
        id: 's1',
        type: 'silent',
        startTime: 0,
        endTime: 8,
        description: 'Opening silence before presentation starts',
    },
    {
        id: 'h1',
        type: 'highlighted',
        startTime: 15,
        endTime: 65,
        description: 'High engagement introduction and concept explanation',
    },
    {
        id: 's2',
        type: 'silent',
        startTime: 95,
        endTime: 102,
        description: 'Pause for slide transition',
    },
    {
        id: 'h2',
        type: 'highlighted',
        startTime: 120,
        endTime: 200,
        description: 'Interactive Q&A session with high audience engagement',
    },
    {
        id: 's3',
        type: 'silent',
        startTime: 250,
        endTime: 258,
        description: 'Brief pause before conclusion',
    },
    {
        id: 'h3',
        type: 'highlighted',
        startTime: 270,
        endTime: 290,
        description: 'Strong conclusion with key takeaways',
    },
];
