import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, BookOpen, Globe, RefreshCw, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  sources?: string[];
}

/**
 * CleanAnswerRenderer
 * Formats AI responses into friendly, easy-to-understand structured text.
 * Completely eliminates raw markdown signs like (**), (-), (###), or (*) and
 * transforms them into clean paragraphs, styled step badges, and custom emerald dots.
 */
const CleanAnswerRenderer: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  // Split into paragraphs by double newlines or single newlines with content
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'bullet' | 'number'; items: { num?: string; content: string }[] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === 'bullet') {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-2.5 space-y-2">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-slate-200 text-xs sm:text-sm leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span className="flex-1">{cleanInlineText(item.content)}</span>
            </li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={`list-${elements.length}`} className="my-2.5 space-y-2.5">
          {currentList.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-200 text-xs sm:text-sm leading-relaxed">
              <span className="w-5 h-5 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {item.num || idx + 1}
              </span>
              <span className="flex-1">{cleanInlineText(item.content)}</span>
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  const cleanInlineText = (raw: string) => {
    // Strip all raw markdown signs: **, *, __, `, ###
    let cleaned = raw.replace(/\*\*/g, '').replace(/\*/g, '').replace(/__/g, '').replace(/`/g, '');
    cleaned = cleaned.replace(/^#+\s*/, '');
    return cleaned;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    // Check for bullet items (starts with -, *, •, or +)
    const bulletMatch = trimmed.match(/^[-*•+]\s+(.*)$/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== 'bullet') {
        flushList();
        currentList = { type: 'bullet', items: [] };
      }
      currentList.items.push({ content: bulletMatch[1] });
      return;
    }

    // Check for numbered items (e.g. 1. or 1)
    const numberMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)$/);
    if (numberMatch) {
      if (!currentList || currentList.type !== 'number') {
        flushList();
        currentList = { type: 'number', items: [] };
      }
      currentList.items.push({ num: numberMatch[1], content: numberMatch[2] });
      return;
    }

    // Normal line or paragraph
    flushList();

    // Check if line looks like a header (short, ends with a colon or has Title: prefix)
    const cleaned = cleanInlineText(trimmed);
    const isSubheading = cleaned.endsWith(':') && cleaned.length < 60;

    if (isSubheading) {
      elements.push(
        <h4 key={`heading-${index}`} className="font-semibold text-white text-xs sm:text-sm pt-2 pb-0.5 tracking-wide text-emerald-300">
          {cleaned}
        </h4>
      );
    } else {
      elements.push(
        <p key={`p-${index}`} className="text-slate-200 text-xs sm:text-sm leading-relaxed">
          {cleaned}
        </p>
      );
    }
  });

  flushList();

  return <div className="space-y-2">{elements}</div>;
};

export const AIMentorView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [useSearch, setUseSearch] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: `Selam! I am the EthioTech AI Mentor, your engineering study assistant for The EthioTech Initiative and ETHIOTECH INTEL research.

I can guide you through:
1. Applied Flagship Projects: Guzo AI transit modeling, AgriTech Vision crop pathology detection, EthioLinguistic NLP tokenization, and EthioTelematics LoRa mesh.
2. Core Engineering Concepts: Distributed systems, offline-first databases, robotics and microcontrollers, or cybersecurity fundamentals.
3. Student Track Guidance: How to select your path, prepare your application, and collaborate with university chapters.
4. Real-Time Research: Ask about current Ethiopian technology developments, campus hackathons, and global breakthroughs.

What technical topic or project would you like to explore today?`,
      sources: ['The EthioTech Initiative Curriculum', 'ETHIOTECH INTEL Research Archive'],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'How does Guzo AI predict minibus transit congestion in Addis Ababa?',
    'What is the tokenization bottleneck in Amharic and Geʽez script models?',
    'Explain how to run quantized ONNX crop vision models on low-cost devices.',
    'What skills do I need to join the Robotics and Embedded Systems track?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (userPrompt: string) => {
    if (!userPrompt.trim() || loading) return;

    const trimmed = userPrompt.trim();
    setPrompt('');
    setError(null);

    const updatedMessages: Message[] = [...messages, { role: 'user', text: trimmed }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      // Build conversation history for multi-turn chat
      const conversationHistory = updatedMessages.slice(-8).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: trimmed,
          conversationHistory,
          useSearch,
        }),
      });

      if (!response.ok) {
        throw new Error('AI Mentor query failed');
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.answer || 'I could not generate an answer at this time.',
          sources: data.sources,
        },
      ]);
    } catch (err: any) {
      setError(err.message || 'Failed to receive mentor response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'assistant',
        text: 'Conversation thread refreshed. What technical challenge would you like to explore?',
        sources: ['The EthioTech Initiative Knowledge Base'],
      },
    ]);
  };

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
            <Bot className="w-4 h-4" />
            <span>Interactive Engineering Mentor</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Gemini 3.8 Flash</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            EthioTech AI Learning Assistant
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Ask technical questions in plain language, explore project architectures, and get clear step-by-step guidance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Google Search Grounding toggle */}
          <button
            onClick={() => setUseSearch(!useSearch)}
            title="Toggle Google Search Grounding"
            className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
              useSearch
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/25'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Search Grounding: {useSearch ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={handleResetChat}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            title="Clear Chat Thread"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Inquiries */}
      <div className="space-y-2">
        <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick exploration questions (click to ask):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {samplePrompts.map((sp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sp)}
              className="text-left text-xs bg-[#0b1322] hover:bg-slate-800/90 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/30 rounded-xl px-3.5 py-2.5 transition-all cursor-pointer flex items-center justify-between group shadow-sm hover:-translate-y-0.5"
            >
              <span className="line-clamp-1">{sp}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-[#0b1322] border border-slate-800/90 rounded-2xl flex flex-col h-[580px] overflow-hidden shadow-2xl">
        {/* Messages scroll area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 text-xs sm:text-sm ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4 text-emerald-400" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-slate-950 font-medium rounded-tr-none shadow-md'
                    : 'bg-[#070b14] border border-slate-800 text-slate-200 rounded-tl-none space-y-3'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <CleanAnswerRenderer text={msg.text} />
                ) : (
                  <div className="whitespace-pre-line text-xs sm:text-sm">{msg.text}</div>
                )}

                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
                    <div className="flex items-center gap-1 font-semibold text-emerald-400">
                      <BookOpen className="w-3 h-3" />
                      <span>Verified Sources & Technical Papers:</span>
                    </div>
                    <div className="space-y-1 pl-1">
                      {msg.sources.map((s, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-slate-300">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <span className="break-all">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 text-xs justify-start items-center">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
              </div>
              <div className="bg-[#070b14] border border-slate-800 text-slate-300 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs">Consulting Gemini 3.8 Flash & Grounded Knowledge...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#070b14] border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(prompt);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question in plain words (e.g. How does Guzo AI work?)..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
              className="flex-1 bg-[#0b1322] border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="px-4 py-2.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-400 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md hover:shadow-emerald-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
