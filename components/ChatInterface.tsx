'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessage {
  type: 'user' | 'bot' | 'error';
  content: string;
}

export default function ChatInterface() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const currentQuery = query;
    setQuery(''); // Clear input immediately
    setLoading(true);
    const userMessage: ChatMessage = { type: 'user', content: currentQuery };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: currentQuery,
          chatHistory: chatHistory
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        const botMessage: ChatMessage = { type: 'bot', content: data.response };
        setChatHistory(prev => [...prev, botMessage]);
        setResponse(data.response);
      } else {
        const errorMessage: ChatMessage = { type: 'error', content: data.error || 'Something went wrong' };
        setChatHistory(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = { type: 'error', content: 'Failed to get response' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat History */}
      <div className="bg-gray-900 rounded-lg shadow-lg mb-6 p-6 min-h-[400px] max-h-[600px] overflow-y-auto">
        {chatHistory.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <div className="text-6xl mb-4">💭</div>
            <p className="text-lg">Ask me anything about Google Cloud Certifications!</p>
            <p className="text-sm mt-2">Try asking: "How can I pass the Associate Cloud Engineer exam?"</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white rounded-br-sm'
                      : message.type === 'error'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-bl-sm'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm'
                  }`}
                >
                  {message.type === 'bot' ? (
                    <div className="max-w-none text-gray-200">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-3 last:mb-0 text-sm leading-relaxed">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-outside pl-6 mb-4 space-y-2">{children}</ol>,
                        li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
                        h1: ({ children }) => <h1 className="text-lg font-bold mb-3 mt-4 text-white">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-bold mb-3 mt-3 text-white">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-bold mb-2 mt-2 text-white">{children}</h3>,
                        code: ({ children, className }) => {
                          const isInline = !className;
                          return isInline ? (
                            <code className="bg-gray-600 px-1 py-0.5 rounded text-sm">{children}</code>
                          ) : (
                            <code className="block bg-gray-600 p-2 rounded text-sm overflow-x-auto">{children}</code>
                          );
                        },
                        pre: ({ children }) => <pre className="bg-gray-600 p-2 rounded text-sm overflow-x-auto mb-4">{children}</pre>,
                        blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-500 pl-4 mb-4 italic">{children}</blockquote>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                      }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-4 rounded-lg rounded-bl-sm">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg shadow-lg p-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about Google Cloud Certifications..."
            className="flex-1 px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-800 text-white rounded-lg font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
