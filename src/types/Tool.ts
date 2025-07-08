
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  downloadUrl: string;
  fileSize?: string;
  version?: string;
  createdAt: Date;
  tags: string[];
}

export const categories = [
  'Développement',
  'Design',
  'Productivité',
  'Utilitaires',
  'Multimédia',
  'Sécurité',
  'Autre'
] as const;

export type Category = typeof categories[number];
