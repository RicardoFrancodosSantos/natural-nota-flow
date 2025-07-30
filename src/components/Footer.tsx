import { FileText, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">NotaFácil IA</span>
            </div>
            <p className="text-muted-foreground">
              Simplifique a emissão de suas notas fiscais com inteligência artificial.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contato@notafacil.ia</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Links Úteis</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Suporte
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 NotaFácil IA. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;