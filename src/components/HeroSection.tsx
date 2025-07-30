import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Sparkles, CheckCircle, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

interface InvoiceData {
  service?: string;
  client?: string;
  value?: string;
  hours?: string;
  description?: string;
}

const HeroSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Olá! Vou te ajudar a emitir sua nota fiscal. Qual serviço você prestou?', isBot: true }
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({});
  const [emailNotification, setEmailNotification] = useState(false);
  const [whatsappNotification, setWhatsappNotification] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const questions = [
    "Qual serviço você prestou?",
    "Para qual cliente foi prestado o serviço?",
    "Qual o valor total do serviço?",
    "Quantas horas foram trabalhadas?",
    "Gostaria de adicionar alguma descrição adicional?"
  ];

  const dataKeys: (keyof InvoiceData)[] = ['service', 'client', 'value', 'hours', 'description'];

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentInput,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);

    // Save user input to invoice data
    if (currentStep < dataKeys.length) {
      setInvoiceData(prev => ({
        ...prev,
        [dataKeys[currentStep]]: currentInput
      }));
    }

    setCurrentInput("");

    // Add bot response after a delay
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        const nextStep = currentStep + 1;
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: questions[nextStep],
          isBot: true
        };
        setMessages(prev => [...prev, botMessage]);
        setCurrentStep(nextStep);
      } else {
        // All questions answered, show summary
        const summaryMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Perfeito! Agora vou gerar sua nota fiscal com as informações fornecidas.",
          isBot: true
        };
        setMessages(prev => [...prev, summaryMessage]);
        handleGenerate();
      }
    }, 1000);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simular geração da nota fiscal
    setTimeout(() => {
      setIsGenerating(false);
      const successMessage: Message = {
        id: Date.now().toString(),
        text: "✅ Nota fiscal gerada com sucesso! Você receberá o documento conforme suas preferências de notificação.",
        isBot: true
      };
      setMessages(prev => [...prev, successMessage]);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section 
      id="emitir" 
      className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background to-secondary/30"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.9), rgba(240, 249, 255, 0.9)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Emita Notas Fiscais com IA
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Converse com nossa IA para gerar automaticamente sua nota fiscal de serviços.
            </p>
          </div>

          <Card className="p-6 shadow-[var(--shadow-elegant)] bg-card/80 backdrop-blur-sm">
            {/* Chat Messages Area */}
            <div className="mb-6">
              <div className="h-64 overflow-y-auto border rounded-lg bg-background/50 p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      {message.isBot && (
                        <div className="flex items-center gap-2 mb-1">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-xs font-medium">NotaFácil IA</span>
                        </div>
                      )}
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isGenerating && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground max-w-[80%] p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs font-medium">NotaFácil IA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Gerando sua nota fiscal...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua resposta..."
                  disabled={isGenerating || currentStep >= questions.length}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!currentInput.trim() || isGenerating || currentStep >= questions.length}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Notification Preferences */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="email" 
                    checked={emailNotification}
                    onCheckedChange={(checked) => setEmailNotification(checked === true)}
                  />
                  <label htmlFor="email" className="text-sm font-medium cursor-pointer">
                    Receber NF via email
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="whatsapp" 
                    checked={whatsappNotification}
                    onCheckedChange={(checked) => setWhatsappNotification(checked === true)}
                  />
                  <label htmlFor="whatsapp" className="text-sm font-medium cursor-pointer">
                    Receber NF via WhatsApp
                  </label>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-3">
              <CheckCircle className="h-12 w-12 text-accent mx-auto" />
              <h3 className="font-semibold">Rápido e Fácil</h3>
              <p className="text-sm text-muted-foreground">
                Gere suas notas fiscais em segundos com linguagem natural
              </p>
            </div>
            
            <div className="space-y-3">
              <CheckCircle className="h-12 w-12 text-accent mx-auto" />
              <h3 className="font-semibold">Totalmente Automatizado</h3>
              <p className="text-sm text-muted-foreground">
                Nossa IA cuida de todos os detalhes técnicos para você
              </p>
            </div>
            
            <div className="space-y-3">
              <CheckCircle className="h-12 w-12 text-accent mx-auto" />
              <h3 className="font-semibold">Entrega Flexível</h3>
              <p className="text-sm text-muted-foreground">
                Receba por email ou WhatsApp conforme sua preferência
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;