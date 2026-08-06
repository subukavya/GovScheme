import { useState } from "react";
import { Mic, MicOff, Send, Sparkles, Volume2, Bot, User, X } from "lucide-react";
import Button from "../ui/Button";
import type { ChatMessage } from "../../types";

interface AIAssistantWidgetProps {
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
      text: "Namaste Ramesh! I am your AI Scheme Assistant. Ask me anything about rural government schemes, eligibility rules, or required documents in Hindi, English, or your regional language.",
      timestamp: "Just now",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const samplePrompts = [
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

    // Simulate AI response
    setTimeout(() => {
      let aiReply = "Based on your rural profile (2.5 Acres, Income < ₹2.5L), you have 98% eligibility for PM-KISAN and 92% for PM Vishwakarma Yojana. Would you like me to pre-fill your application?";
      
      if (text.toLowerCase().includes("pmay") || text.toLowerCase().includes("house")) {
        aiReply = "For PMAY Rural Housing Scheme, you need: 1. Aadhaar Card, 2. Income Certificate (< ₹3 Lakh/yr), 3. Land ownership document / Affidavit. You are 95% eligible!";
      } else if (text.toLowerCase().includes("solar")) {
        aiReply = "PM Surya Ghar Free Electricity Scheme offers up to 60% subsidy for rooftop solar installation for rural agricultural consumers. Estimated savings: ₹18,000/year.";
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiReply,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
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
      }, 3500);
    }
  };

  const content = (
    <div className="flex flex-col h-full bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      {/* Assistant Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Bot size={22} />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-900"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white">GovScheme AI Voice Assistant</h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-semibold">
                Multilingual AI
              </span>
            </div>
            <p className="text-xs text-slate-400">Speak or type in any language</p>
          </div>
        </div>

        {!inline && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition cursor-pointer"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Voice Wave Recording Indicator */}
      {isRecording && (
        <div className="bg-gradient-to-r from-blue-600/30 to-indigo-600/30 px-6 py-3 border-b border-blue-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </div>
            <span className="text-xs font-semibold text-blue-200">Listening to your voice... (Speak now)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1 h-4 bg-blue-400 animate-bounce"></div>
            <div className="w-1 h-6 bg-blue-400 animate-bounce delay-75"></div>
            <div className="w-1 h-3 bg-blue-400 animate-bounce delay-150"></div>
            <div className="w-1 h-7 bg-blue-400 animate-bounce delay-100"></div>
          </div>
        </div>
      )}

      {/* Chat Messages Body */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[380px] bg-slate-950/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div
              className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none"
              }`}
            >
              <p>{msg.text}</p>
              {msg.sender === "ai" && (
                <button
                  onClick={() => setIsSpeaking(!isSpeaking)}
                  className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-blue-400 hover:text-blue-300"
                >
                  <Volume2 size={12} /> {isSpeaking ? "Speaking..." : "Listen Audio"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="px-6 py-2.5 bg-slate-900 border-t border-slate-800 flex gap-2 overflow-x-auto no-scrollbar">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-blue-950/60 border border-slate-700 hover:border-blue-500/50 text-[11px] text-slate-300 whitespace-nowrap transition cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles size={11} className="text-amber-400" />
            {prompt}
          </button>
        ))}
      </div>

      {/* Controls & Input */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-3">
        <button
          onClick={toggleRecording}
          className={`p-3 rounded-2xl transition-all cursor-pointer ${
            isRecording
              ? "bg-rose-500 text-white animate-pulse"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
          }`}
          title={isRecording ? "Stop Listening" : "Speak via Microphone"}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask AI in English, Hindi, Marathi..."
          className="flex-1 bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-2xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none"
        />

        <Button
          onClick={() => handleSend()}
          variant="primary"
          className="!p-3 !rounded-2xl shrink-0"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );

  if (inline) {
    return content;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl h-[600px]">{content}</div>
    </div>
  );
}
