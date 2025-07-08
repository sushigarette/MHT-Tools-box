
import { Download, Calendar, Tag, Monitor } from 'lucide-react';
import { Tool } from '@/types/Tool';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ToolCardProps {
  tool: Tool;
}

const categoryColors: Record<string, string> = {
  'Développement': 'bg-blue-500',
  'Design': 'bg-purple-500',
  'Productivité': 'bg-green-500',
  'Utilitaires': 'bg-orange-500',
  'Multimédia': 'bg-pink-500',
  'Sécurité': 'bg-red-500',
  'Autre': 'bg-gray-500',
};

const osColors: Record<string, string> = {
  'Windows': 'bg-blue-600',
  'macOS': 'bg-gray-600',
  'Linux': 'bg-yellow-600',
  'Android': 'bg-green-600',
  'iOS': 'bg-gray-700',
  'Web': 'bg-purple-600',
  'Multiplateforme': 'bg-indigo-600',
};

export const ToolCard = ({ tool }: ToolCardProps) => {
  const handleDownload = () => {
    // Pour l'instant, on simule le téléchargement
    console.log(`Téléchargement de ${tool.name}`);
    window.open(tool.downloadUrl, '_blank');
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {tool.name}
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-gray-600">
              {tool.description}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge 
              className={`${categoryColors[tool.category] || categoryColors['Autre']} text-white`}
            >
              {tool.category}
            </Badge>
            <Badge 
              className={`${osColors[tool.operatingSystem] || osColors['Multiplateforme']} text-white`}
            >
              <Monitor className="w-3 h-3 mr-1" />
              {tool.operatingSystem}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            {tool.version && (
              <span className="font-medium">v{tool.version}</span>
            )}
            {tool.fileSize && (
              <span>{tool.fileSize}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{tool.createdAt.toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
        
        <Button 
          onClick={handleDownload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Télécharger
        </Button>
      </CardContent>
    </Card>
  );
};
