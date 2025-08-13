'use client';

import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Thinkr
          </h1>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto">
            This chatbot can help you with questions about Google Cloud Certifications. 
            It can answer questions about the certification process, exam details, and project ideas.
          </p>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
}
