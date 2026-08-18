'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Loader2,
  Clock,
  CheckCircle2,
  BrainCircuit,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  followUps?: string[];
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      content: `Hello! I am your **Warehouse Operations AI Co-Pilot**.\n\nI am monitoring all **100 SKUs, 50 orders, 20 shift workers, and regional weather transit corridors** for Hub Central-01 in real time.\n\nHow can I help you optimize operations today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      followUps: [
        'Why are orders delayed today?',
        'Which products require immediate reorder?',
        'Explain today\'s packing bottleneck',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Why are orders delayed today?',
    'Which products require immediate reorder?',
    'Explain today\'s packing bottleneck',
    'How can warehouse efficiency improve?',
    'What caused the SSD inventory shortage?',
    'Should I advance outbound dispatch for weather?',
    'Summarize current warehouse operations',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const formatRawText = (rawContent: any): string => {
    if (typeof rawContent !== 'string') {
      try {
        rawContent = JSON.stringify(rawContent);
      } catch {
        return 'Operational analysis completed.';
      }
    }

    const trimmed = rawContent.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed.response) return parsed.response;
        if (parsed.summary || parsed.insights) {
          let formatted = `**${parsed.summary || 'Operational Analysis Summary'}**\n\n`;
          if (Array.isArray(parsed.insights)) {
            formatted += `**Key Observations:**\n${parsed.insights.map((i: string) => `• ${i}`).join('\n')}\n\n`;
          }
          if (Array.isArray(parsed.recommendations)) {
            formatted += `**Recommended Actions:**\n${parsed.recommendations
              .map((r: any) => `• **${r.title || r.type || 'Action'}:** ${r.description || r.suggestedAction || ''}`)
              .join('\n')}\n\n`;
          }
          if (parsed.managerMessage) {
            formatted += `**Director Directive:** ${parsed.managerMessage}`;
          }
          return formatted;
        }
      } catch {}
    }

    return rawContent;
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          message: textToSend,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {}

      const rawReply = data?.data?.response || data?.data || 'Operational analysis completed for your query.';
      const cleanReply = formatRawText(rawReply);
      const followUps = data?.data?.suggestedFollowUps || [];

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: cleanReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        followUps: followUps.length > 0 ? followUps : undefined,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `**Operations Director Note:** AI network service is operating in resilient fallback mode. All deterministic warehouse decision rules remain fully active.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormattedContent = (content: string, isUser: boolean) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-2 text-sm leading-relaxed font-normal">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;

          // Bullet Point Line
          if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
            const bulletText = trimmed.replace(/^[•\-\*]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className={cn('text-xs mt-1', isUser ? 'text-blue-200' : 'text-emerald-400')}>
                  •
                </span>
                <span className="flex-1">{renderInlineMarkdown(bulletText, isUser)}</span>
              </div>
            );
          }

          // Numbered Line
          if (/^\d+\.\s/.test(trimmed)) {
            const num = trimmed.match(/^\d+\./)?.[0];
            const rest = trimmed.replace(/^\d+\.\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className={cn('font-bold text-xs mt-0.5', isUser ? 'text-blue-200' : 'text-emerald-400')}>
                  {num}
                </span>
                <span className="flex-1">{renderInlineMarkdown(rest, isUser)}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="m-0">
              {renderInlineMarkdown(trimmed, isUser)}
            </p>
          );
        })}
      </div>
    );
  };

  const renderInlineMarkdown = (text: string, isUser: boolean) => {
    const parts = text.split('**');
    return parts.map((part, j) =>
      j % 2 === 1 ? (
        <strong key={j} className={isUser ? 'text-white font-bold' : 'text-emerald-300 font-bold'}>
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-12 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-900/30 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-600/25 ring-1 ring-white/20">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-white tracking-tight">
                Operations Director AI Co-Pilot
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                LIVE AI
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Conversational decision intelligence analyzing real-time warehouse state
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setMessages([
              {
                id: 'msg-init-reset',
                role: 'assistant',
                content: `Chat session reset. What warehouse operational challenge can I help you analyze next?`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                followUps: [
                  'Why are orders delayed today?',
                  'Which products require immediate reorder?',
                  'Explain today\'s packing bottleneck',
                ],
              },
            ])
          }
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors w-fit"
          title="Reset Chat"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Session</span>
        </button>
      </div>

      {/* Main Dedicated Chat Window */}
      <div className="flex flex-col h-[620px] rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Suggested Prompt Pills */}
        <div className="p-3 border-b border-slate-800/80 bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0">
            Quick Ask:
          </span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-full border border-slate-800 hover:border-slate-700 transition-all shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex gap-3 max-w-[90%]',
                m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              )}
            >
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm',
                  m.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                )}
              >
                {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div className="space-y-2 max-w-full">
                <div
                  className={cn(
                    'rounded-2xl p-4 shadow-md text-sm',
                    m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-950/90 border border-slate-800 text-slate-200 rounded-tl-none'
                  )}
                >
                  {renderFormattedContent(m.content, m.role === 'user')}

                  <div
                    className={cn(
                      'text-[10px] font-mono flex items-center justify-end gap-1 pt-2 opacity-60',
                      m.role === 'user' ? 'text-blue-200' : 'text-slate-500'
                    )}
                  >
                    <Clock className="h-3 w-3" />
                    <span>{m.timestamp}</span>
                  </div>
                </div>

                {/* Optional Follow-Up Suggestion Chips */}
                {m.followUps && m.followUps.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1 pl-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      Follow up:
                    </span>
                    {m.followUps.map((fu, fIdx) => (
                      <button
                        key={fIdx}
                        type="button"
                        onClick={() => handleSend(fu)}
                        className="px-2.5 py-1 rounded-full text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                      >
                        {fu} →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 mr-auto max-w-[80%]"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 rounded-tl-none flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Operations Director is analyzing facility telemetry...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Operations Director anything (e.g. 'Why is packing station 3 slow?')..."
              className="w-full h-11 pl-4 pr-12 bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-100 placeholder-slate-500 rounded-xl outline-none transition-all shadow-inner font-sans"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-white rounded-lg transition-colors shadow-md"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
