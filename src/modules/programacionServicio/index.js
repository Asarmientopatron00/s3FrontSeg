import React from 'react';

export const programacionServicioConfig = [
  {
    auth: '',
    routes: [
      {
        exact: true,
        path: ['/recursos-tecnicos'],
        component: React.lazy(() => import('./RecursoTecnico')),
      },
    ],
  },
];
