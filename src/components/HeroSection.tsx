import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Sparkles, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [prompt, setPrompt] = useState("");
  const [emailNotification, setEmailNotification] = useState(false);
  const [whatsappNotification, setWhatsappNotification] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simular geração da nota fiscal
    setTimeout(() => {
      setIsGenerating(false);
      setPrompt("");
    }, 3000);
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
              Descreva seu serviço em linguagem natural e nossa IA gera automaticamente sua nota fiscal de serviços.
            </p>
          </div>

          <Card className="p-8 shadow-[var(--shadow-elegant)] bg-card/80 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="text-left">
                <label className="text-sm font-medium mb-2 block">
                  Descreva o serviço que você quer emitir a nota fiscal:
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Consultoria em marketing digital para empresa XYZ, 20 horas de trabalho, valor total R$ 2.000,00"
                  className="min-h-24 resize-none text-base"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 text-left">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="email" 
                    checked={emailNotification}
                    onCheckedChange={(checked) => setEmailNotification(checked === true)}
                  />
                  <label htmlFor="email" className="text-sm font-medium cursor-pointer">
                    Desejo receber minha NF via email
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="whatsapp" 
                    checked={whatsappNotification}
                    onCheckedChange={(checked) => setWhatsappNotification(checked === true)}
                  />
                  <label htmlFor="whatsapp" className="text-sm font-medium cursor-pointer">
                    Desejo receber minha NF via WhatsApp
                  </label>
                </div>
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full sm:w-auto"
                variant="gradient"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-5 w-5 animate-spin" />
                    Gerando nota fiscal...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Gerar Nota Fiscal
                  </>
                )}
              </Button>
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