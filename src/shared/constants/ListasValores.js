export const TIPOS_ROLES = [
  {id: 'IN', nombre: 'Interno', estado: 1},
  {id: 'AC', nombre: 'Administrador cliente', estado: 1},
  {id: 'AU', nombre: 'Autorizado cliente', estado: 1},
];

export const TIPOS_LISTAS_DOCUMENTOS = [
  {id: 'CL', nombre: 'Cliente', estado: 1},
  {id: 'AS', nombre: 'Acuerdo de servicio', estado: 1},
  {id: 'OS', nombre: 'Orden de servicio', estado: 1},
  {id: 'OP', nombre: 'Orden de pedido', estado: 1},
];

export const TIPOS_REQUISITOS_SEGURIDAD = [
  {id: '1', nombre: '1. Análisis y administración del riesgo', estado: 1},
  {id: '2', nombre: '2. Asociados de negocio', estado: 1},
  {
    id: '3',
    nombre: '3. Seguridad del contenedor y demás unidades de carga',
    estado: 1,
  },
  {id: '4', nombre: '4. Controles de acceso físico', estado: 1},
  {id: '5', nombre: '5. Seguridad del personal', estado: 1},
  {id: '6', nombre: '6. Seguridad de los procesos', estado: 1},
  {id: '7', nombre: '7. Seguridad física', estado: 1},
  {id: '8', nombre: '8. Seguridad en tecnología de la información', estado: 1},
  {
    id: '9',
    nombre: '9.Entrenamiento en seguridad y conciencia de amenazas',
    estado: 1,
  },
];

export const TIPOS_TERCEROS = [
  {id: 'TR', nombre: 'Transportador', estado: 1},
  {id: 'AA', nombre: 'Agente de aduanas', estado: 1},
  {id: 'AC', nombre: 'Agente de carga', estado: 1},
  {id: 'AS', nombre: 'Aseguradora', estado: 1},
  {id: 'GC', nombre: 'Generador de carga', estado: 1},
];

export const ESTADOS_PROCESO_ASOCIADOS = [
  {id: 'REG', value: 'REGISTRADO', estado: 1},
  {id: 'APR', value: 'APROBADO', estado: 1},
  {id: 'ACT', value: 'ACTIVO', estado: 1},
];

export const TIPOS_CONTACTOS = [
  {id: 'FR', nombre: 'Facturación', estado: 1},
  {id: 'LG', nombre: 'Logística', estado: 1},
  {id: 'CM', nombre: 'Comercial', estado: 1},
  {id: 'OT', nombre: 'Otros', estado: 1},
];

export const ESTADO_COTIZACIONES = [
  {id: 'ENV', nombre: 'Enviada', estado: 1},
  {id: 'GEN', nombre: 'Generada', estado: 1},
  {id: 'ANU', nombre: 'Anulada', estado: 1},
  {id: 'APR', nombre: 'Aprovada', estado: 1},
];
