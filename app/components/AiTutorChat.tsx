'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

interface AiTutorProps {
  unitName: string;
}

export default function AiTutorChat({ unitName }: AiTutorProps) {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'tutor'; text: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('Student');

  useEffect(() => {
    const name = localStorage.getItem('user_name');
    if (name) setUserName(name);
    setMessages([
      { sender: 'tutor', text: `Hello **${name || 'Student'}**. I am your AegisMed ANI tutor for **${unitName}**. Ask me clinical questions, request board-style case studies, or prompt me to generate summary tables!` }
    ]);
  }, [unitName]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    const token = localStorage.getItem('access_token');

    try {
      const response = await axios.post(
        `${API_URL}/api/ai/chat`,
        {
          message: userMessage,
          unit: unitName,
          action: 'chat', // Hardcoded since we removed grading
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [...prev, { sender: 'tutor', text: response.data.tutor_reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { sender: 'tutor', text: err.response?.data?.error || 'Failed to reach the AI backend tutor.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[75vh] w-full max-w-5xl mx-auto rounded-2xl bg-accent border border-border shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-background px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-bold text-foreground text-lg">AegisMed Neural Tutor</h3>
            <p className="text-xs text-foreground/60">Active Unit: {unitName}</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
          AegisMed ANI v1.0
        </span>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border text-primary'}`}>
              {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            
            {/* Message Bubble with Custom Table Styling Overrides */}
            <div className={`max-w-[85%] p-5 rounded-2xl text-sm leading-relaxed shadow-sm overflow-x-auto ${msg.sender === 'user' ? 'bg-primary text-primary-foreground font-medium rounded-tr-none' : 'bg-background border border-border text-foreground rounded-tl-none'}`}>
              {msg.sender === 'tutor' ? (
                <div className="markdown-content space-y-3 prose prose-invert max-w-none [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_th]:bg-accent [&_th]:border [&_th]:border-border [&_th]:p-2.5 [&_th]:text-left [&_td]:border [&_td]:border-border [&_td]:p-2.5">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-3 text-foreground/50 text-sm animate-pulse px-2">
            <Bot className="w-5 h-5 text-primary" />
            <span>Consulting clinical databases and rendering structured layouts...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="p-4 bg-background border-t border-border flex items-center gap-3">
        <input
          type="text"
          placeholder={`Ask about ${unitName} or request a comparison table...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-4 rounded-xl bg-accent border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm shadow-inner"
        />
        
        {/* Single Send Button */}
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}