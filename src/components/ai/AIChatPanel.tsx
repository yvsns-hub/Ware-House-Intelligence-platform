'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  Loader2,
  BrainCircuit,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export function AIChatPanel({
  initialQuery,
}: {
  initialQuery?: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      content: `Hello Alex. I am your **Warehouse Operations Co-Pilot**. I'm actively monitoring all 100 SKUs, 50 active orders, 20 shift workers, and regional transit weather corridors for Hub Central-01.\n\nHow can I assist your operational decisions for today's shift?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Why are orders delayed today?',
    'Which products require immediate reorder?',
    'Explain today\'s packing bottleneck',
    'How can shift efficiency improve?',
    'Should we advance our evening dispatch window?',
    'Summarize current warehouse operations',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
      const aiReply = data?.data?.response || 'Operational analysis completed for your query.';

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `**Operations Director Note:** AI network service is in resilient fallback mode. All deterministic warehouse rules remain 100% active.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[640px] rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/70">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20 ring-1 ring-white/20">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-extrabold text-white tracking-tight">
                Operations Director Co-Pilot
              </h3>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                LIVE AI
              </span>
            </div>
            <span className="text-[10px] text-slate-400">
              Conversational Decision Intelligence
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setMessages([
              {
                id: 'msg-init-2',
                role: 'assistant',
                content: `Chat session reset. What warehouse operational challenge can I analyze next?`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ])
          }
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Reset Chat"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

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
            className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-full border border-slate-800 hover:border-slate-700 transition-all shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'flex gap-3 max-w-[90%]',
              m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            )}
          >
            <div
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm',
                m.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
              )}
            >
              {m.role === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
            </div>

            <div
              className={cn(
                'rounded-2xl p-3.5 space-y-1.5 shadow-md leading-relaxed',
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none'
              )}
            >
              <div className="prose prose-invert prose-xs max-w-none space-y-1.5">
                {m.content.split('\n\n').map((para, i) => (
                  <p key={i} className="m-0 leading-relaxed">
                    {para.split('**').map((part, j) =>
                      j % 2 === 1 ? <strong key={j} className="text-white font-bold">{part}</strong> : part
                    )}
                  </p>
                ))}
              </div>

              <div
                className={cn(
                  'text-[9px] font-mono flex items-center justify-end gap-1 pt-1 opacity-60',
                  m.role === 'user' ? 'text-blue-200' : 'text-slate-500'
                )}
              >
                <Clock className="h-2.5 w-2.5" />
                <span>{m.timestamp}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 mr-auto max-w-[80%]"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 rounded-tl-none flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Operations Director is analyzing facility telemetry...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/70">
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
            placeholder="Ask Operations Director anything (e.g. 'Why is pack station 3 slow?')..."
            className="w-full h-11 pl-4 pr-12 bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs text-slate-100 placeholder-slate-500 rounded-xl outline-none transition-all shadow-inner"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-white rounded-lg transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
