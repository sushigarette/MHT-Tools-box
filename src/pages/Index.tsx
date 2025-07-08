
import { useState } from 'react';
import { Plus, Wrench, Package, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tool } from '@/types/Tool';
import { ToolCard } from '@/components/ToolCard';
import { AddToolForm } from '@/components/AddToolForm';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { Button } from '@/components/ui/button';

// Données d'exemple mises à jour avec operatingSystem
const sampleTools: Tool[] = [
  {
    id: '1',
    name: 'Visual Studio Code',
    description: 'Éditeur de code source léger mais puissant qui fonctionne sur votre bureau',
    category: 'Développement',
    operatingSystem: 'Multiplateforme',
    downloadUrl: 'https://code.visualstudio.com/download',
    fileSize: '95 MB',
    version: '1.85.0',
    createdAt: new Date('2024-01-15'),
    tags: ['éditeur', 'code', 'microsoft', 'gratuit'],
  },
  {
    id: '2',
    name: 'Figma',
    description: 'Outil de design collaboratif pour créer des interfaces utilisateur',
    category: 'Design',
    operatingSystem: 'Web',
    downloadUrl: 'https://www.figma.com/downloads/',
    fileSize: '120 MB',
    version: '116.5.0',
    createdAt: new Date('2024-01-10'),
    tags: ['design', 'ui', 'collaboration'],
  },
  {
    id: '3',
    name: 'Notion',
    description: 'Espace de travail tout-en-un pour notes, tâches, wikis et bases de données',
    category: 'Productivité',
    operatingSystem: 'Multiplateforme',
    downloadUrl: 'https://www.notion.so/desktop',
    fileSize: '140 MB',
    version: '2.1.0',
    createdAt: new Date('2024-01-05'),
    tags: ['productivité', 'notes', 'organisation'],
  },
];

const Index = () => {
  const [tools, setTools] = useState<Tool[]>(sampleTools);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOS, setSelectedOS] = useState('all');

  const handleAddTool = (newTool: Omit<Tool, 'id' | 'createdAt'>) => {
    const tool: Tool = {
      ...newTool,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTools(prev => [tool, ...prev]);
    setShowAddForm(false);
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesOS = selectedOS === 'all' || tool.operatingSystem === selectedOS;
    
    return matchesSearch && matchesCategory && matchesOS;
  });

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <AddToolForm
            onAddTool={handleAddTool}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mes Outils</h1>
                <p className="text-gray-600">Gérez et téléchargez vos outils facilement</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  <LogIn className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
              </Link>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un outil
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedOS={selectedOS}
          onOSChange={setSelectedOS}
        />

        {/* Stats */}
        <div className="flex items-center gap-2 mb-6 text-gray-600">
          <Package className="w-4 h-4" />
          <span className="text-sm">
            {filteredTools.length} outil{filteredTools.length > 1 ? 's' : ''} 
            {searchTerm || selectedCategory !== 'all' || selectedOS !== 'all' ? ' trouvé(s)' : ' au total'}
          </span>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || selectedCategory !== 'all' || selectedOS !== 'all'
                ? 'Aucun outil trouvé' 
                : 'Aucun outil disponible'
              }
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'all' || selectedOS !== 'all'
                ? 'Essayez de modifier vos critères de recherche'
                : 'Commencez par ajouter votre premier outil'
              }
            </p>
            {!searchTerm && selectedCategory === 'all' && selectedOS === 'all' && (
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un outil
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
