
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  operatingSystem: string;
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

export const operatingSystems = [
  'Windows',
  'macOS',
  'Linux',
  'Android',
  'iOS',
  'Web',
  'Multiplateforme'
] as const;

export type Category = typeof categories[number];
export type OperatingSystem = typeof operatingSystems[number];
