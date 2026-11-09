'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, Bot, User, Image as ImageIcon, Paperclip, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

interface AiTutorProps {
  unitName: string;
}

interface ChatMessage {
  sender: 'user' | 'tutor';
  text: string;
  imagePreviews?: string[];
  docNames?: string[];
}

export default function AiTutorChat({ unitName }: AiTutorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('Student');

  // Multi-file states
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Refs for hidden inputs and auto-scroll
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    const name = localStorage.getItem('user_name');
    if (name) setUserName(name);
    setMessages([
      {
        sender: 'tutor',
        text: `Hello **${name || 'Student'}**. I am your AegisMed ANI tutor for **${unitName}**. Ask me clinical questions, request board-style case studies, or attach up to 10 images and 3 documents for review!`,
      },
    ]);
  }, [unitName]);

  // Handle multiple Image selection (Max 10)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    if (selectedImages.length + files.length > 10) {
      alert('You can only upload up to 10 images at once.');
      return;
    }

    setSelectedImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  // Handle multiple Document selection (Max 3)
  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    if (selectedDocs.length + files.length > 3) {
      alert('You can only upload up to 3 documents at once.');
      return;
    }

    setSelectedDocs((prev) => [...prev, ...files]);
    if (docInputRef.current) docInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeDoc = (index: number) => {
    setSelectedDocs((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllAttachments = () => {
    setSelectedImages([]);
    setSelectedDocs([]);
    setImagePreviews([]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasAttachments = selectedImages.length > 0 || selectedDocs.length > 0;
    if ((!input.trim() && !hasAttachments) || loading) return;

    const userMessage = input;

    // Add user message to chat feed
    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: userMessage,
        imagePreviews: [...imagePreviews],
        docNames: selectedDocs.map((d) => d.name),
      },
    ]);

    setInput('');
    setLoading(true);

    const formData = new FormData();
    formData.append('message', userMessage);
    formData.append('unit', unitName);
    formData.append('action', 'chat');

    selectedImages.forEach((file) => formData.append('files', file));
    selectedDocs.forEach((file) => formData.append('files', file));

    clearAllAttachments();

    const token = localStorage.getItem('access_token');

    try {
      const response = await axios.post(`${API_URL}/api/ai/chat`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages((prev) => [
        ...prev,
        { sender: 'tutor', text: response.data.tutor_reply },
      ]);
    } catch (err: any) {
      // Handle 401 Expired JWT Token
      if (err.response?.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_name');
        window.location.href = '/login?expired=true';
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'tutor',
          text: err.response?.data?.error || 'Failed to reach the AI backend tutor.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[82dvh] sm:h-[75vh] w-full max-w-5xl mx-auto rounded-xl sm:rounded-2xl bg-accent border border-border shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-background px-3.5 py-3 sm:px-6 sm:py-4 border-b border-border flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
          <div className="min-w-0">
            <h3 className="font-bold text-foreground text-sm sm:text-lg truncate">
              AegisMed Neural Tutor
            </h3>
            <p className="text-[11px] sm:text-xs text-foreground/60 truncate">
              Active Unit: {unitName}
            </p>
          </div>
        </div>
        <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0 whitespace-nowrap">
          AegisMed ANI v1.0
        </span>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 scroll-smooth">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 sm:gap-4 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-0.5 ${
                msg.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border text-primary'
              }`}
            >
              {msg.sender === 'user' ? (
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`min-w-0 max-w-[88%] sm:max-w-[85%] p-3.5 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm overflow-x-auto ${
                msg.sender === 'user'
                  ? 'bg-primary text-primary-foreground font-medium rounded-tr-none'
                  : 'bg-background border border-border text-foreground rounded-tl-none'
              }`}
            >
              {/* Render User Attachments */}
              {msg.sender === 'user' &&
                ((msg.imagePreviews && msg.imagePreviews.length > 0) ||
                  (msg.docNames && msg.docNames.length > 0)) && (
                  <div className="flex flex-wrap gap-2 mb-2.5 sm:mb-3">
                    {msg.imagePreviews?.map((preview, i) => (
                      <img
                        key={`img-${i}`}
                        src={preview}
                        alt="Attached preview"
                        className="h-20 sm:h-24 w-auto rounded-lg shadow-md object-cover"
                      />
                    ))}
                    {msg.docNames?.map((name, i) => (
                      <div
                        key={`doc-${i}`}
                        className="flex items-center gap-1.5 sm:gap-2 bg-primary-foreground/10 p-1.5 sm:p-2 rounded-lg text-[11px] sm:text-xs font-semibold max-w-full"
                      >
                        <Paperclip className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="truncate">{name}</span>
                      </div>
                    ))}
                  </div>
                )}

              {msg.sender === 'tutor' ? (
                <div className="markdown-content text-xs sm:text-sm leading-6 sm:leading-7 break-words">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-lg sm:text-xl font-bold text-primary mt-4 sm:mt-5 mb-2 first:mt-0">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-base sm:text-lg font-bold text-primary mt-4 sm:mt-5 mb-2 first:mt-0">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-sm sm:text-base font-bold text-foreground mt-3.5 sm:mt-4 mb-1.5 sm:mb-2 first:mt-0">
                          {children}
                        </h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="text-xs sm:text-sm font-semibold text-foreground mt-3 mb-1">
                          {children}
                        </h4>
                      ),
                      p: ({ children }) => (
                        <p className="mb-2.5 sm:mb-3 last:mb-0 leading-relaxed">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc pl-4 sm:pl-5 mb-2.5 sm:mb-3 space-y-1 sm:space-y-1.5">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-4 sm:pl-5 mb-2.5 sm:mb-3 space-y-1 sm:space-y-1.5">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                      hr: () => <hr className="my-4 sm:my-5 border-t border-border" />,
                      strong: ({ children }) => (
                        <strong className="font-semibold text-foreground">{children}</strong>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary/50 pl-3 sm:pl-4 italic my-2.5 sm:my-3 text-foreground/80">
                          {children}
                        </blockquote>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-3 sm:my-4 rounded-lg border border-border -mx-1 sm:mx-0">
                          <table className="w-full border-collapse text-left text-xs sm:text-sm">
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="bg-accent border-b border-border p-2 sm:p-3 font-semibold text-foreground whitespace-nowrap">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="border-b border-border/60 p-2 sm:p-3 align-top min-w-[100px]">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2.5 sm:gap-3 text-foreground/50 text-xs sm:text-sm animate-pulse px-2">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <span>Consulting clinical databases and rendering structured layouts...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Area */}
      <div className="bg-background border-t border-border p-2.5 sm:p-4">
        {/* Multiple Attachment Previews (Horizontal swipe on mobile, wrap on desktop) */}
        {(selectedImages.length > 0 || selectedDocs.length > 0) && (
          <div className="flex flex-nowrap sm:flex-wrap gap-2.5 sm:gap-3 mb-2.5 sm:mb-3 p-2.5 sm:p-3 bg-accent/50 border border-border rounded-lg max-w-full overflow-x-auto">
            {imagePreviews.map((url, idx) => (
              <div key={`prev-img-${idx}`} className="relative group shrink-0">
                <img
                  src={url}
                  alt="Preview"
                  className="h-14 w-14 sm:h-16 sm:w-16 object-cover rounded shadow-sm border border-border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  aria-label="Remove image"
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {selectedDocs.map((doc, idx) => (
              <div
                key={`prev-doc-${idx}`}
                className="relative group shrink-0 flex items-center gap-2 bg-background border border-border p-2 rounded shadow-sm h-14 sm:h-16 w-40 sm:w-48"
              >
                <Paperclip className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/60 shrink-0" />
                <div className="text-xs truncate font-medium text-foreground pr-2">{doc.name}</div>
                <button
                  type="button"
                  onClick={() => removeDoc(idx)}
                  aria-label="Remove document"
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center gap-1.5 sm:gap-3">
          <input
            type="file"
            multiple
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            ref={docInputRef}
            onChange={handleDocChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="p-2.5 sm:p-3 text-foreground/60 hover:text-primary hover:bg-accent rounded-xl transition-colors shrink-0"
            title="Upload Images"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => docInputRef.current?.click()}
            className="p-2.5 sm:p-3 text-foreground/60 hover:text-primary hover:bg-accent rounded-xl transition-colors shrink-0"
            title="Upload Documents"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            placeholder={`Ask about ${unitName}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-w-0 flex-1 px-3.5 py-2.5 sm:p-4 rounded-xl bg-accent border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-base sm:text-sm shadow-inner"
          />

          <button
            type="submit"
            disabled={
              loading ||
              (!input.trim() && selectedImages.length === 0 && selectedDocs.length === 0)
            }
            className="p-3 sm:px-6 sm:py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <span className="hidden sm:inline">Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}