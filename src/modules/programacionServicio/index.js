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
      {
        exact: true,
        path: ['/horarios-recursos-tecnicos'],
        component: React.lazy(() => import('./HorarioRecursoTecnico')),
      },
      {
        exact: true,
        path: ['/programacion-orden-servicio'],
        component: React.lazy(() => import('./ProgramacionOrdenServicio')),
      },
      {
        exact: true,
        path: ['/generacion-horarios'],
        component: React.lazy(() => import('./GeneracionHorarios')),
      },
    ],
  },
];
