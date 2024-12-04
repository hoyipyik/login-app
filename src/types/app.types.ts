// src/types/app.types.ts
export interface AppCard {
    id: string;
    title: string;
    description: string;
    icon: string;
    path: string;
    enabled: boolean;
    unavailable?: boolean;
  }