import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Mic } from 'lucide-react';

const faqData = [
  {
    question: 'What is Credit Saarthi?',
    answer: 'Credit Saarthi is an AI-powered lending platform that simplifies concessional loans for underserved and rural customers.',
    keywords: ['what is credit saarthi', 'who are you', 'about'],
  },
  {
    question: 'How do I apply for a loan?',
    answer: 'Click on “Apply” in the navbar or scroll to the CTA section, fill in the short form, and our team will guide you.',
    keywords: ['apply', 'loan apply', 'application'],
  },
  {
    question: 'What documents are needed?',
    answer: 'You can start with simple bills like electricity, LPG receipts, mobile recharge slips, plus Aadhaar for verification.',
    keywords: ['document', 'docs', 'needed'],
  },
  {
    question: 'How long does approval take?',
    answer: 'Most applications get an instant AI score, and approvals usually happen within 24 hours for eligible users.',
    keywords: ['approval', 'how long', 'time'],
  },
  {
    question: 'Is there language support?',
    answer: 'Yes, the entire landing experience supports 14 Indian languages through the language selector.',
    keywords: ['language', 'hindi', 'support'],
  },
  {
    question: 'Who can use Credit Saarthi?',
    answer: 'Beneficiaries, channel partners, NBCFDC admins, and risk teams can all log in through their dedicated dashboards.',
    keywords: ['who can use', 'beneficiary', 'partner'],
  },
  {
    question: 'How is the credit score calculated?',
    answer: 'We blend income indicators (electricity, LPG, mobile), repayment behavior, and safety checks to create a composite score.',
    keywords: ['score', 'credit score', 'how score'],
  },
  {
    question: 'Can I track my application?',
    answer: 'Yes, after logging in you can view real-time status, active loans, and repayment schedules in the beneficiary dashboard.',
    keywords: ['track', 'status', 'dashboard'],
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We follow RBI-compliant processes, ISO 27001 controls, and GDPR-ready practices to keep data safe.',
    keywords: ['secure', 'security', 'data'],
  },
  {
    question: 'How do I contact support?',
    answer: 'Use the toll-free 1800 number, email help@creditsaarthi.in, or reach us on WhatsApp as shown in the CTA section.',
    keywords: ['contact', 'support', 'help'],
  },
];

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'bot-0',
      sender: 'bot',
      text: 'नमस्ते! I am Saarthi Bot. Ask me anything about Credit Saarthi, or tap a quick question below.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const toggleWidget = () => {
    setIsOpen((prev) => !prev);
  };

  const sendMessage = useCallback(
    (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: trimmed,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      const answer = getAnswer(trimmed);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: answer,
          },
        ]);
      }, 300);
    },
    []
  );

  const getAnswer = (questionText) => {
    const normalized = questionText.toLowerCase();
    const matched = faqData.find((faq) =>
      faq.keywords.some((kw) => normalized.includes(kw))
    );
    if (matched) return matched.answer;
    return 'I am still learning. Please check the CTA section or contact our support team at help@creditsaarthi.in / 1800-XXX-XXXX.';
  };

  const handleSuggestionClick = (question) => {
    sendMessage(question);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = () => {
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || '';
      setInput(transcript);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleWidget}
          className="fixed bottom-5 right-6 z-40 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Open chatbot"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 z-40 w-80 sm:w-96 max-h-[78vh] sm:max-h-[82vh] rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Saarthi Bot</p>
              <p className="text-xs text-blue-100">Ask in text or voice</p>
            </div>
            <button
              onClick={toggleWidget}
              className="rounded-full p-1 hover:bg-white/20 focus:outline-none"
              aria-label="Close chatbot"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-4 pt-3 pb-2 border-b border-gray-100 max-h-32 overflow-y-auto">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Quick Questions
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {faqData.map((faq) => (
                <button
                  key={faq.question}
                  onClick={() => handleSuggestionClick(faq.question)}
                  className="rounded-full border border-blue-100 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="flex items-center gap-2 border-t border-gray-100 bg-white px-4 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`rounded-full border px-2 py-2 ${isListening ? 'border-red-300 bg-red-50 text-red-500' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
              aria-label="Speak your question"
            >
              <Mic className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 rounded-2xl border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 p-2 text-white enabled:hover:bg-blue-700 disabled:bg-blue-300"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;

