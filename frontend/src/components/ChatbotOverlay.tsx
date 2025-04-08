import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockDegreePrograms } from "@/data/mockData";
import { courseSelectorService } from "@/services/courseSelector";
import { useToast } from "@/hooks/use-toast";

interface ChatbotOverlayProps {
  show: boolean;
  onClose: () => void;
  selectedDegree?: string | null;
  selectedProfession?: string | null;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatbotOverlay = ({ show, onClose, selectedDegree, selectedProfession }: ChatbotOverlayProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your PathwayAI advisor. How can I help you with course selection today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // If the user has selected a degree or profession, send a welcome message
    if ((selectedDegree || selectedProfession) && messages.length === 1) {
      let welcomeText = "I see you're ";
      
      if (selectedDegree) {
        const degree = mockDegreePrograms.find(d => d.id === selectedDegree);
        welcomeText += `interested in the ${degree?.name} program. `;
      }
      
      if (selectedProfession) {
        welcomeText += `planning a career as a ${selectedProfession}. `;
      }
      
      welcomeText += "How can I help you plan your academic journey?";
      
      // Add a short delay to make it feel more natural
      setTimeout(() => {
        addBotMessage(welcomeText);
      }, 1000);
    }
  }, [selectedDegree, selectedProfession]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (text: string) => {
    // Format the message to handle course lists
    let formattedText = text;
    
    // Add line breaks after the introduction
    formattedText = formattedText.replace(/(here is a list of \d+ courses.*?:)/, '$1\n\n');
    
    // Format each course on a new line
    formattedText = formattedText.replace(/(\d+\.\s+[A-Z]+\s+[A-Z]\d+:\s+[^0-9]+)/g, '\n$1');
    
    // Add line break before the conclusion
    formattedText = formattedText.replace(/(These courses are)/, '\n\n$1');
    
      const botMessage: Message = {
        id: messages.length + 1,
      text: formattedText,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Show loading toast for recommendations
    if (inputValue.toLowerCase().includes('recommend') || 
        inputValue.toLowerCase().includes('suggest') ||
        inputValue.toLowerCase().includes('courses')) {
      toast({
        title: "Searching for recommendations...",
        description: "Please wait while I find the best courses for you.",
        duration: 5000,
      });
    }

    try {
      // Call the OpenAI assistant through our service
      const response = await courseSelectorService.sendMessage(inputValue, threadId);
      
      // Save the threadId for continued conversation
      if (response.threadId) {
        setThreadId(response.threadId);
      }
      
      // Add the bot's response
      addBotMessage(response.message);

      // Show success toast for recommendations
      if (inputValue.toLowerCase().includes('recommend') || 
          inputValue.toLowerCase().includes('suggest') ||
          inputValue.toLowerCase().includes('courses')) {
        toast({
          title: "Recommendations ready!",
          description: "I've found some courses that might interest you.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error getting response:', error);
      addBotMessage("I apologize, but I'm having trouble processing your request. Please try again.");
      
      // Show error toast
      toast({
        title: "Error",
        description: "There was a problem getting your recommendations. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-16 right-4 w-80 md:w-96 z-50 animate-slide-in-right">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="py-3 px-4 flex flex-row justify-between items-center border-b bg-primary/5">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-4 w-4" /></AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-medium">PathwayAI Assistant</h3>
              <p className="text-xs text-muted-foreground">
                {isTyping ? "Thinking..." : "Online"}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="hover:bg-primary/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 h-80 overflow-y-auto bg-muted/20">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-white"
                  }`}
                >
                  {message.text}
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-primary-foreground/80"
                        : "text-white/80"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-secondary max-w-[80%] rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="p-3 border-t bg-card">
          <div className="flex w-full gap-2">
            <Input
              placeholder={isTyping ? "Please wait..." : "Ask about courses, prerequisites, career paths..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isTyping && handleSendMessage()}
              className="flex-1"
              disabled={isTyping}
            />
            <Button size="icon" onClick={handleSendMessage} disabled={isTyping || !inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatbotOverlay;
