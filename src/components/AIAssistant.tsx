import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Paperclip, 
  Sparkles, 
  User, 
  Building2, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import { ChatMessage, Scheme, UserProfile, LanguageCode } from '../types';
import { startVoiceListening, speakText, stopSpeaking, isSpeechRecognitionSupported } from '../services/voiceService';

interface AIAssistantProps {
  user: UserProfile;
  schemes: Scheme[];
  currentLang: LanguageCode;
  onNavigateTab: (tab: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  user,
  schemes,
  currentLang,
  onNavigateTab
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Namaste ${user.fullName.split(' ')[0]}! I am your AI Government Scheme Assistant. I can help you discover welfare schemes, analyze your document eligibility, compare programs, and guide your official application.`,
      timestamp: 'Just now',
      suggestedPrompts: [
        `What schemes am I eligible for as a ${user.occupation}?`,
        `How do I apply for PM-KISAN?`,
        `What documents do I need for PM Awas Yojana?`,
        `Compare Ayushman Bharat and State Health schemes`
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [voicePlaybackEnabled, setVoicePlaybackEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // AI Response Logic Simulation
    setTimeout(() => {
      let replyText = '';
      let referenced: Scheme[] = [];

      const queryLower = text.toLowerCase();

      if (queryLower.includes('pm-kisan') || queryLower.includes('kisan') || queryLower.includes('farmer')) {
        const pmKisan = schemes.find(s => s.id === 'pm-kisan');
        replyText = `Based on your profile as a ${user.occupation} with ${user.landHoldingAcres} acres of land in ${user.state}, you are eligible for **PM-KISAN**. You will receive ₹6,000 annually in 3 installments of ₹2,000 directly into your bank account.`;
        if (pmKisan) referenced.push(pmKisan);
      } else if (queryLower.includes('awas') || queryLower.includes('housing') || queryLower.includes('house')) {
        const pmay = schemes.find(s => s.id === 'pmay-g');
        replyText = `For housing support under **Pradhan Mantri Awas Yojana - Gramin (PMAY-G)**, rural households with annual income below ₹1.8 Lakh get financial grants of ₹1.20 Lakh to construct pucca houses + 90 days MGNREGA wages.`;
        if (pmay) referenced.push(pmay);
      } else if (queryLower.includes('document') || queryLower.includes('aadhaar') || queryLower.includes('proof')) {
        replyText = `To apply for most Central and State schemes, you need: 1. Aadhaar Card (linked to mobile), 2. Revenue Income Certificate, 3. Bank Account Passbook, 4. Ration Card. You currently have ${user.documents.length} verified documents in your Vault.`;
      } else if (queryLower.includes('ayushman') || queryLower.includes('health') || queryLower.includes('hospital')) {
        const pmjay = schemes.find(s => s.id === 'pmjay-ayushman');
        replyText = `**Ayushman Bharat (PM-JAY)** provides ₹5 Lakh per family per year cashless hospitalization cover across 27,000+ empanelled hospitals across India.`;
        if (pmjay) referenced.push(pmjay);
      } else {
        replyText = `Thank you for your question. As a ${user.occupation} residing in ${user.state} with annual income of ₹${user.annualIncome.toLocaleString('en-IN')}, our hybrid Rule Engine evaluates that you have multiple high-priority welfare options available.`;
        referenced = schemes.slice(0, 2);
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        referencedSchemes: referenced,
        suggestedPrompts: [
          "Check required documents",
          "Open official portal link",
          "Find local Gram Panchayat contact"
        ]
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);

      if (voicePlaybackEnabled) {
        speakText(replyText, currentLang);
      }
    }, 1200);
  };

  const handleMicClick = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      alert("Voice speech recognition is not supported in your browser.");
      return;
    }

    setIsListening(true);
    startVoiceListening(
      currentLang,
      (transcript) => {
        setIsListening(false);
        setInputText(transcript);
        handleSendMessage(transcript);
      },
      (err) => {
        setIsListening(false);
        console.error("Voice error:", err);
      }
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
      <div className="gov-card flex flex-col h-[75vh] overflow-hidden shadow-2xl rounded-3xl border border-slate-200 dark:border-slate-800">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-heading">GovScheme AI Assistant</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="pulse-dot"></span> Online
                </span>
              </div>
              <p className="text-xs text-blue-200">Multilingual Voice & Chat Assistance for Rural Citizens</p>
            </div>
          </div>

          <button
            onClick={() => {
              setVoicePlaybackEnabled(!voicePlaybackEnabled);
              if (voicePlaybackEnabled) stopSpeaking();
            }}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition ${
              voicePlaybackEnabled
                ? 'bg-amber-400 text-slate-950 border-amber-500'
                : 'bg-blue-950/60 text-blue-200 border-blue-700'
            }`}
            title="Toggle Text-to-Speech Voice Playback"
          >
            {voicePlaybackEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{voicePlaybackEnabled ? 'Voice On' : 'Voice Off'}</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-slate-50/50 dark:bg-slate-900/50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                msg.sender === 'user' ? 'bg-blue-700 text-white' : 'bg-amber-500 text-slate-950'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-3">
                <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-700 text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Referenced Scheme Cards inside Assistant */}
                  {msg.referencedSchemes && msg.referencedSchemes.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                        Referenced Scheme Card:
                      </span>
                      {msg.referencedSchemes.map(sch => (
                        <div key={sch.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{sch.name}</span>
                            <span className="text-emerald-600 font-bold">{sch.benefitsSummary}</span>
                          </div>
                          <a
                            href={sch.officialApplyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] hover:bg-amber-400 transition flex items-center gap-1"
                          >
                            <span>Apply</span> <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="block text-[10px] text-right mt-1 opacity-60">{msg.timestamp}</span>
                </div>

                {/* Suggested Prompt Chips */}
                {msg.suggestedPrompts && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="px-3 py-1.5 rounded-full bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-700 text-[11px] font-medium transition"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Animation Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic">
              <Bot className="w-4 h-4 text-amber-500 animate-spin" />
              <span>GovScheme AI is processing legal rules & generating response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Voice Mic Input Button */}
            <button
              type="button"
              onClick={handleMicClick}
              className={`p-3 rounded-xl transition ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800'
              }`}
              title="Voice Input (Speech-to-Text)"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? "Listening... Speak your question now" : "Ask about schemes, eligibility, required documents..."}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-blue-600 outline-none"
            />

            {/* Submit Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
