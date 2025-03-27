"use client";

import { useState, useEffect, useRef } from "react";
import { GradientButton } from "./ui/gradient-button";
import { IoMdMic, IoMdSend } from "react-icons/io";
import { RiRobot3Fill } from "react-icons/ri";
import { IoMdMicOff } from "react-icons/io";

export default function Agent({ setOpenOpacity }) {
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);
  const queryRef = useRef(query);

  // Check for speech recognition support
  useEffect(() => {
    setSpeechSupported(
      typeof window !== "undefined" &&
        ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    );
  }, []);

  useEffect(() => {
    queryRef.current = query; // Keep ref updated with query value
    setOpenOpacity(query.length > 0); // Update state based on latest value
  }, [query]); // Runs every time query changes

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newChat = [...chat, { text: query, sender: "user" }];
    setChat(newChat);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setChat([...newChat, { text: data.result, sender: "ai" }]);
    } catch (error) {
      setChat([...newChat, { text: `Error: ${error.message}`, sender: "ai" }]);
    } finally {
      setLoading(false);
    }
  };

  const startListening = async () => {
    if (!speechSupported) return;

    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = false;
      recognitionRef.current.continuous = false;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setQuery("Listening...");
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        
        setIsListening(false);
        setQuery("");
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    } catch (err) {
      console.error("Microphone access error:", err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <div className="flex flex-col gap-3 items-start justify-start min-h-screen bg-gray-950 ">
      {/* Header */}
      <div className="w-full flex justify-center items-center p-4 text-3xl text-white z-10">
  {/* Gradient Background */}
  <div className="absolute border border-red-700 left-25 md:left-165 w-25 rounded-full top-5 h-20 bg-gradient-to-b from-green-500 to-green-400 z-0 blur-3xl" />
 
  
  {/* Icon and Text */}
  <RiRobot3Fill className="animate-bounce z-10 mr-2" /> 
  FreeChat
</div>


      {/* Chat Container */}
      <div className="flex flex-col h-[calc(screen-500px)] md:h-125  w-full justify-center items-center z-10">
        <div className="bg-gray-900 h-full border border-white shadow-lg rounded-lg p-3 w-full max-w-3xl relative">
          {/* Chat Messages */}
          <div className="h-[calc(100vh-200px)] md:h-96 overflow-y-auto p-4 border border-white rounded-md bg-gray-950 custom-scrollbar">
  {chat.map((message, index) => (
    <div
      key={index}
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`px-3 p-1.5 shadow-lg rounded-lg text-black ${
          message.sender === "user"
            ? "bg-white shadow-blue-400 max-w-xs"
            : "w-full text-white"
        }`}
      >
        {message.text}
      </div>
    </div>
  ))}
  <div ref={chatEndRef} />
</div>


          {/* Input Area */}
          <form 
  onSubmit={handleSubmit} 
  className="mt-4 flex"
>
  <textarea
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Prevents new line in textarea
        document.getElementById("sendButton")?.click(); // Programmatically click the submit button
      }
    }}
    placeholder="Type your message..."
    rows={2}
    className="flex-1 p-3 text-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:from-45% bg-gray-800"
  />
  
  {/* Voice Input Button */}
  <div className="flex justify-center items-center ml-2">
    <GradientButton
      type="button"
      onClick={isListening ? stopListening : startListening}
      disabled={!speechSupported}
      className={`px-4 p-3 rounded-full ${
        isListening
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white`}
      aria-label={isListening ? "Stop listening" : "Start listening"}
    >
      {isListening ? <p className="animate-spin"><IoMdMic /></p> : <IoMdMic />}
    </GradientButton>
  </div>
  
  {/* Submit Button */}
  <div className="flex justify-center items-center ml-2">
    <GradientButton
      id="sendButton" // Assign an ID to target the button programmatically
      type="submit"
      variant="variant"
      className="px-4 p-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <IoMdSend />
    </GradientButton>
  </div>
</form>

        </div>
      </div>
    </div>
  );
}