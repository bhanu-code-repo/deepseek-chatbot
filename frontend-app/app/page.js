"use client";

import { useState, useRef } from "react";
import {
  Search,
  Send,
  Folder,
  MessageCircle,
  PlusCircle,
  Paperclip,
  Lightbulb,
  Code,
  SpellCheck,
  Menu,
  User,
  Bot,
} from "lucide-react";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (fileName) => {
    setSelectedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const handleSendMessage = () => {
    if (!query.trim() && selectedFiles.length === 0) return;

    // Create message with content and files
    const newMessage = {
      id: Date.now(),
      text: query,
      isBot: false,
      files: [...selectedFiles],
    };

    setMessages((prev) => [...prev, newMessage]);
    setQuery("");
    setSelectedFiles([]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now(),
        text:
          "Thank you for your message. I've received your " +
          (newMessage.files.length > 0
            ? `file${newMessage.files.length > 1 ? "s" : ""}`
            : "message") +
          ". In a production environment, this would be properly processed.",
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    if (!hasStartedChat) setHasStartedChat(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-50 p-4 flex flex-col justify-between border-r border-gray-100 transition-all duration-300`}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            {isSidebarOpen && (
              <div className="flex items-center justify-between flex-1">
                <h1 className="text-lg font-semibold text-gray-800">Chats</h1>
                <PlusCircle
                  size={20}
                  className="text-gray-600 cursor-pointer hover:text-gray-800"
                />
              </div>
            )}
          </div>
          <nav className="space-y-1">
            <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 flex items-center space-x-2 text-gray-700">
              <Folder size={18} className="text-gray-600" />
              {isSidebarOpen && <span className="text-sm">Workspace</span>}
            </button>
            <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 flex items-center space-x-2 text-gray-700">
              <Search size={18} className="text-gray-600" />
              {isSidebarOpen && <span className="text-sm">Search</span>}
            </button>
            <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 flex items-center space-x-2 text-gray-700">
              <MessageCircle size={18} className="text-gray-600" />
              {isSidebarOpen && <span className="text-sm">Conversations</span>}
            </button>
          </nav>
        </div>
        {isSidebarOpen && (
          <div className="p-2 flex items-center space-x-2 bg-gray-100 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm font-medium">
              B
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Bhanu</p>
              <p className="text-xs text-gray-500">Professional Plan</p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {!hasStartedChat ? (
          // Welcome Screen
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                Welcome, Bhanu
              </h2>
              <p className="text-gray-500 text-sm">
                How can I assist you today?
              </p>
            </div>

            <div className="w-full max-w-lg space-y-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-200 p-3 pl-11 pr-16 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm text-gray-700 placeholder-gray-400"
                  placeholder="Type your message..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <Search
                  size={18}
                  className="absolute left-4 top-3.5 text-gray-400"
                />
                <button
                  className="absolute right-14 top-2.5 text-gray-400 hover:text-gray-500 p-2"
                  onClick={handleFileUpload}
                >
                  <Paperclip size={18} />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="absolute right-3 top-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send size={18} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*, .pdf, .doc, .docx, .txt"
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button className="p-3 text-left rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Lightbulb size={18} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Generate creative ideas
                      </p>
                      <p className="text-xs text-gray-500">
                        Brainstorm new concepts
                      </p>
                    </div>
                  </div>
                </button>
                <button className="p-3 text-left rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Code size={18} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Code assistance
                      </p>
                      <p className="text-xs text-gray-500">
                        Debug or write new code
                      </p>
                    </div>
                  </div>
                </button>
                <button className="p-3 text-left rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <SpellCheck size={18} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Document review
                      </p>
                      <p className="text-xs text-gray-500">
                        Proofread and edit
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Chat Interface
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  } px-4`}
                >
                  <div
                    className={`flex items-start gap-3 ${
                      !message.isBot && "flex-row-reverse"
                    } max-w-3xl w-full`}
                  >
                    <div className="shrink-0">
                      {message.isBot ? (
                        <div className="p-2 bg-gray-100 rounded-full">
                          <Bot className="w-5 h-5 text-gray-600" />
                        </div>
                      ) : (
                        <div className="p-2 bg-blue-50 rounded-full">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                      )}
                    </div>
                    <div
                      className={`p-4 rounded-xl shadow-sm transition-all ${
                        message.isBot
                          ? "bg-gray-50 border border-gray-100"
                          : "bg-white border border-blue-100"
                      }`}
                    >
                      {message.text && (
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {message.text}
                        </p>
                      )}
                      {message.files?.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {message.files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-gray-100 rounded-lg p-2"
                            >
                              <span className="text-sm text-gray-600">
                                {file.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-2 flex justify-end">
                        <span className="text-xs text-gray-400">
                          {new Date(message.id).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-100 p-4 bg-white">
              {selectedFiles.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {selectedFiles.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center bg-gray-50 rounded-lg px-3 py-1 text-sm"
                    >
                      <span className="text-gray-600 mr-2">{file.name}</span>
                      <button
                        onClick={() => removeFile(file.name)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="relative w-full max-w-3xl mx-auto">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*, .pdf, .doc, .docx, .txt"
                />
                <input
                  type="text"
                  className="w-full border border-gray-200 p-3 pl-11 pr-16 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm text-gray-700 placeholder-gray-400"
                  placeholder="Type your message..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <Paperclip
                  className="absolute left-4 top-3.5 text-gray-400 cursor-pointer hover:text-gray-500"
                  size={18}
                  onClick={handleFileUpload}
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute right-3 top-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
