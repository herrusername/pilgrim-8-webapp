'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { geminiService } from '../lib/ai-services';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hallo! Ich bin dein PILGRIM-8 AI-Assistent. Ich kann dir alles über unsere visionäre 5-Jahres-Wanderung erzählen. Wie kann ich dir helfen?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await geminiService.chat(inputText, 'CHATBOT');
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Entschuldigung, ich konnte deine Nachricht nicht verarbeiten. Bitte versuche es erneut.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'Was ist PILGRIM-8?',
    'Wie funktioniert das KARMA-System?',
    'Wie kann ich teilnehmen?',
    'Was ist GAIA-OS?',
    'Welche Routen gibt es?'
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <MessageCircle size={24} />
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-black/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot size={24} className="text-white" />
                  <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">PILGRIM-8 AI</h3>
                  <p className="text-purple-200 text-xs">Dein Reisebegleiter</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-purple-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.isBot ? 'bg-purple-600' : 'bg-blue-600'}`}>
                      {message.isBot ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
                    </div>
                    <div className={`p-3 rounded-2xl ${message.isBot ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'}`}>
                      {message.isBot ? (
                        <ReactMarkdown className="text-sm prose prose-invert max-w-none">
                          {message.text}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-sm">{message.text}</p>
                      )}
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-gray-800 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-gray-400 text-xs mb-2">Schnelle Fragen:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputText(question)}
                      className="text-xs bg-gray-800 hover:bg-gray-700 text-purple-300 px-2 py-1 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex space-x-2">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Frage mich alles über PILGRIM-8..."
                  className="flex-1 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-purple-500 transition-colors"
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;