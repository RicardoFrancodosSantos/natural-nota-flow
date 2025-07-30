import { Button } from "@/components/ui/button";
import { FileText, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            NotaFácil IA
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#emitir" className="text-foreground hover:text-primary transition-colors">
            Emitir NF
          </a>
          <a href="#historico" className="text-foreground hover:text-primary transition-colors">
            Histórico
          </a>
          <Button variant="gradient" size="sm">
            Entrar
          </Button>
        </nav>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;