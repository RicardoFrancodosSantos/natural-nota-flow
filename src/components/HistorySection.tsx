import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Calendar, Download, Eye } from "lucide-react";

interface InvoiceData {
  id: string;
  description: string;
  value: number;
  date: string;
  status: "emitida" | "enviada" | "processando";
  client: string;
}

const mockInvoices: InvoiceData[] = [
  {
    id: "NF-001",
    description: "Consultoria em marketing digital",
    value: 2000,
    date: "2024-01-29",
    status: "emitida",
    client: "Empresa XYZ Ltda"
  },
  {
    id: "NF-002", 
    description: "Desenvolvimento de website",
    value: 5500,
    date: "2024-01-28",
    status: "enviada",
    client: "Tech Solutions"
  },
  {
    id: "NF-003",
    description: "Auditoria de sistemas",
    value: 1200,
    date: "2024-01-25",
    status: "emitida",
    client: "Inovação Corp"
  }
];

const HistorySection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState<"all" | "yesterday" | "week">("all");

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    const invoiceDate = new Date(invoice.date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    switch (filterPeriod) {
      case "yesterday":
        return invoiceDate.toDateString() === yesterday.toDateString();
      case "week":
        return invoiceDate >= weekAgo;
      default:
        return true;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "emitida": return "bg-accent text-accent-foreground";
      case "enviada": return "bg-primary text-primary-foreground";
      case "processando": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <section id="historico" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Histórico de Notas Fiscais
            </h2>
            <p className="text-lg text-muted-foreground">
              Acesse e gerencie todas as suas notas fiscais emitidas
            </p>
          </div>

          <Card className="p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por descrição, cliente ou número..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={filterPeriod === "all" ? "default" : "outline"}
                  onClick={() => setFilterPeriod("all")}
                  size="sm"
                >
                  Todas
                </Button>
                <Button
                  variant={filterPeriod === "yesterday" ? "default" : "outline"}
                  onClick={() => setFilterPeriod("yesterday")}
                  size="sm"
                >
                  Ontem
                </Button>
                <Button
                  variant={filterPeriod === "week" ? "default" : "outline"}
                  onClick={() => setFilterPeriod("week")}
                  size="sm"
                >
                  Última Semana
                </Button>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {filteredInvoices.length === 0 ? (
              <Card className="p-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma nota fiscal encontrada</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Tente ajustar sua pesquisa" : "Você ainda não emitiu nenhuma nota fiscal"}
                </p>
              </Card>
            ) : (
              filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{invoice.id}</h3>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-1">{invoice.description}</p>
                      <p className="text-sm text-muted-foreground">Cliente: {invoice.client}</p>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency(invoice.value)}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(invoice.date)}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                          Baixar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;