// src/data/appCards.ts
import { AppCard } from '../types/app.types';

export const dashboardApps: AppCard[] = [
    {
        id: '1',
        title: 'Analytics',
        description: 'View your data insights',
        icon: '📊',
        path: '/analytics',
        enabled: true,
      },
      {
        id: '2',
        title: 'Reports',
        description: 'Generate custom reports',
        icon: '📄',
        path: '/reports',
        enabled: false,
      },
      {
        id: '3',
        title: 'Settings',
        description: 'Configure your preferences',
        icon: '⚙️',
        path: '/settings',
        enabled: true,
      },
      {
        id: '4',
        title: 'Beta Features',
        description: 'Coming soon',
        icon: '🔬',
        path: '/beta',
        enabled: false,
        unavailable: true,
      },
];

export const services: AppCard[] = [
  {
    id: 'userManagement',
    title: 'User Management',
    description: 'Manage users and permissions',
    icon: '👥',
    path: '/app/users',
    enabled: true
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Configure system settings',
    icon: '⚙️',
    path: '/app/settings',
    enabled: true
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Manage your notifications',
    icon: '🔔',
    path: '/app/notifications',
    enabled: false
  }
];