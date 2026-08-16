import { useState } from "react";
import { Mic, MicOff, Send, Volume2, Bot, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import type { ChatMessage } from "../../types";

export interface AIAssistantWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
  inline?: boolean;
}

export default function AIAssistantWidget({
  isOpen = false,
  onClose,
  inline = false,
}: AIAssistantWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      text: "Namaste! I am your AI Scheme Assistant. Ask me anything about government schemes, eligibility rules, or documents.",
      timestamp: "Just now",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const suggestedPrompts = [
    "Am I eligible for PM-KISAN ₹6,000 subsidy?",
    "What documents are needed for PMAY Rural House?",
    "How to apply for Solar Pump Subsidy?",
    "Check pension eligibility for senior citizen",
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");

    setTimeout(() => {
      let aiReply = "Based on your rural household profile, you are eligible for PM-KISAN and PM Vishwakarma Yojana. Would you like to proceed with pre-filling your application?";
      
      if (text.toLowerCase().includes("pmay") || text.toLowerCase().includes("house")) {
        aiReply = "For PMAY Rural Housing Scheme, you need: 1. Aadhaar Card, 2. Income Certificate (< ₹3 Lakh/yr), 3. Land ownership document / Affidavit.";
      } else if (text.toLowerCase().includes("solar")) {
        aiReply = "PM Surya Ghar Free Electricity Scheme offers up to 60% subsidy for rooftop solar installation for rural agricultural consumers.";
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiReply,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      handleSend("Am I eligible for PM-KISAN ₹6,000 annual installment?");
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        handleSend("How can I upload my Aadhaar card for instant verification?");
      }, 3000);
    }
  };

  const content = (
    <div className="flex flex-col h-full bg-white text-[#0F172A] rounded-[24px] overflow-hidden shadow-2xl border border-[#E2E8F0]">
      {/* ChatGPT-style Minimal Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[14px] bg-[#2563EB] text-white flex items-center justify-center shadow-sm shrink-0">
            <Bot size={22} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#0F172A]">AI Assistant</h3>
            <p className="text-xs text-[#64748B] font-normal">ChatGPT-inspired voice & text assistant</p>
          </div>
        </div>

        {!inline && onClose && (
          <button
            onClick={onClose}
            aria-label="Close Assistant"
            className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/60 rounded-full transition cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Floating Microphone Indicator Banner */}
      {isRecording && (
        <div className="bg-[#DBEAFE] px-6 py-3 border-b border-blue-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="w-4 h-4 rounded-full bg-[#EF4444]"
            />
            <span className="text-xs font-bold text-[#2563EB]">Listening to your voice... Speak now</span>
          </div>
          <div className="flex items-center gap-1">
            <motion.div animate={{ height: [12, 24, 12] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-[#2563EB] rounded" />
            <motion.div animate={{ height: [20, 8, 20] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-[#2563EB] rounded" />
            <motion.div animate={{ height: [10, 26, 10] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-[#2563EB] rounded" />
          </div>
        </div>
      )}

      {/* Large Chat Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#F8FAFC]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-[12px] flex items-center justify-center shrink-0 ${
                msg.sender === "user"
                  ? "bg-[#0F172A] text-white"
                  : "bg-[#2563EB] text-white"
              }`}
            >
              {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div
              className={`max-w-[85%] rounded-[18px] p-4 text-xs leading-relaxed ${
                msg.sender === "user"
                  ? "bg-[#2563EB] text-white rounded-tr-none font-medium"
                  : "bg-white text-[#0F172A] border border-[#E2E8F0] shadow-soft rounded-tl-none font-normal"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              {msg.sender === "ai" && (
                <button
                  onClick={() => setIsSpeaking(!isSpeaking)}
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#2563EB] hover:underline cursor-pointer"
                >
                  <Volume2 size={13} /> {isSpeaking ? "Speaking..." : "Listen"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Prompts Chips */}
      <div className="px-4 py-2.5 bg-white border-t border-[#E2E8F0] flex gap-2 overflow-x-auto no-scrollbar">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3.5 py-2 rounded-full bg-[#F8FAFC] hover:bg-[#DBEAFE] border border-[#E2E8F0] hover:border-blue-300 text-xs text-[#0F172A] font-medium whitespace-nowrap transition cursor-pointer shrink-0 min-h-[36px]"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Bottom Input Area */}
      <div className="p-4 bg-white border-t border-[#E2E8F0] flex items-center gap-3">
        <button
          onClick={toggleRecording}
          aria-label={isRecording ? "Stop voice recording" : "Start voice recording"}
          className={`p-3.5 rounded-[16px] transition-all cursor-pointer min-w-[48px] min-h-[48px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
            isRecording
              ? "bg-[#EF4444] text-white animate-pulse"
              : "bg-[#DBEAFE] hover:bg-blue-200 text-[#2563EB]"
          }`}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask AI in your language..."
          className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#2563EB] rounded-[16px] px-4 py-3.5 text-sm text-[#0F172A] placeholder:text-[#64748B] focus:outline-none min-h-[48px]"
        />

        <Button
          onClick={() => handleSend()}
          variant="primary"
          className="!p-3.5 !rounded-[16px] shrink-0 min-w-[48px] min-h-[48px]"
          aria-label="Send message"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );

  if (inline) {
    return content;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl h-[620px]"
          >
            {content}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
