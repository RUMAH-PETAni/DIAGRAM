"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizonal, Bot, User } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface ChatTranslations {
  user1: string;
  assistant1: string;
  user2: string;
  assistant2: string;
  user3: string;
  assistant3: string;
  user4: string;
  assistant4: string;
  aiTyping: string;
  userTyping: string;
  typeMessage: string;
}

const chatScript = (translations: ChatTranslations): Message[] => [
  { role: "user", content: translations.user1 },
  {
    role: "assistant",
    content: translations.assistant1,
  },
  {
    role: "user",
    content: translations.user2,
  },
  {
    role: "assistant",
    content: translations.assistant2,
  },
  {
    role: "user",
    content: translations.user3,
  },
  {
    role: "assistant",
    content: translations.assistant3,
  },
  {
    role: "user",
    content: translations.user4,
  },
  {
    role: "assistant",
    content: translations.assistant4,
  },
];

export default function FakeChatAgroforestry() {
  const { getTranslations } = useI18n();
  const translations = getTranslations().agroforestryChat as ChatTranslations;
  const script = chatScript(translations);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [displayedText, setDisplayedText] = useState("");
  const [typingRole, setTypingRole] = useState<"assistant" | "user" | null>(
    null
  );
  const [isBubbleTyping, setIsBubbleTyping] = useState(false);
  const [step, setStep] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto scroll for each new message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages.length]);

  // Run conversation simulation
  useEffect(() => {
    if (step >= script.length) {
      setTimeout(() => {
        setMessages([]);
        setStep(0);
      }, 4000);
      return;
    }

    const current = script[step];
    setTypingRole(current.role);
    setDisplayedText("");
    setIsBubbleTyping(true);

    // Delay typing effect
    const typingDelay = current.role === "assistant" ? 1200 : 800;

    const typingTimeout = setTimeout(() => {
      setIsBubbleTyping(false);
      typeText(current);
    }, typingDelay);

    return () => clearTimeout(typingTimeout);
  }, [step]);

  const typeText = (message: Message) => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + message.content[i]);
      i++;
      if (i >= message.content.length) {
        clearInterval(interval);
        setTimeout(() => {
          setMessages((prev) => [...prev, message]);
          setDisplayedText("");
          setTypingRole(null);
          setStep((s) => s + 1);
        }, 500);
      }
    }, 30);
  };

  const renderBubble = (msg: Message, i: number) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${
        msg.role === "assistant" ? "justify-start" : "justify-end"
      }`}
    >
      {msg.role === "assistant" ? (
        <div className="flex items-start gap-1.5 sm:gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-700 flex items-center justify-center">
            <Bot size={14} className="sm:hidden" />
            <Bot size={16} className="hidden sm:block" />
          </div>
          <div className="max-w-[70%] bg-neutral-800 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl rounded-tl-none leading-relaxed">
            {messages[messages.length - 1]?.content === msg.content && isBubbleTyping && typingRole === "assistant" ? displayedText : msg.content}
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-1.5 sm:gap-2 flex-row-reverse">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <User size={14} className="sm:hidden" />
            <User size={16} className="hidden sm:block" />
          </div>
          <div className="max-w-[70%] bg-blue-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl rounded-tr-none text-white leading-relaxed">
            {messages[messages.length - 1]?.content === msg.content && isBubbleTyping && typingRole === "user" ? displayedText : msg.content}
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[90vw] sm:max-w-[380px]">
      {/* Smartphone frame */}
      <motion.div
        className="relative w-full aspect-[9/16] min-h-[400px] max-h-[70vh] bg-black rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-700"
      >
        

        {/* Layar chat */}
        <div className="absolute inset-[8px] sm:inset-[10px] bg-neutral-950 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-2 sm:p-3 border-b border-neutral-800 text-center text-xs sm:text-sm text-neutral-400">
          
          </div>

          {/* Chat Area */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto px-3 py-2 sm:px-4 sm:py-3 space-y-2 sm:space-y-3 scrollbar-hide"
          >
            {messages.map(renderBubble)}

            {/* Typing bubble */}
            <AnimatePresence>
              {isBubbleTyping && typingRole && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    typingRole === "assistant" ? "justify-start" : "justify-end"
                  }`}
                >
                  {typingRole === "assistant" ? (
                    <div className="flex items-start gap-1.5 sm:gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-700 flex items-center justify-center">
                        <Bot size={14} className="sm:hidden" />
                        <Bot size={16} className="hidden sm:block" />
                      </div>
                      <div className="bg-neutral-800 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl rounded-tl-none">
                        {displayedText}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-1.5 sm:gap-2 flex-row-reverse">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <User size={14} className="sm:hidden" />
                        <User size={16} className="hidden sm:block" />
                      </div>
                      <div className="bg-blue-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl rounded-tr-none">
                        {displayedText}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input bar bawah */}
          <div className="border-t border-neutral-800 p-2 sm:p-3 bg-neutral-900 flex items-center gap-2">
            <div className="flex-1 h-8 sm:h-9 bg-neutral-800 rounded-xl flex items-center px-2 sm:px-3 text-xs sm:text-sm text-neutral-400">
              {typingRole ? (
                <motion.span
                  className="flex items-center gap-1"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                >
                  {typingRole === "assistant"
                    ? translations.aiTyping
                    : translations.userTyping}
                  <span>...</span>
                </motion.span>
              ) : (
                <span className="text-neutral-600 text-xs sm:text-sm">{translations.typeMessage}</span>
              )}
            </div>
            <button
              className="w-8 h-8 sm:w-9 sm:h-9 bg-green-700 hover:bg-green-600 rounded-xl flex items-center justify-center transition"
              disabled
            >
              <SendHorizonal size={14} className="sm:hidden" />
              <SendHorizonal size={16} className="hidden sm:block" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* CSS to hide scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}