export const TIPOS_ROLES = [
  {id: 'IN', nombre: 'Interno', estado: 1},
  {id: 'AC', nombre: 'Administrador asociado', estado: 1},
  {id: 'AU', nombre: 'Autorizado asociado', estado: 1},
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
  {id: 'MO', nombre: 'Monitoreo', estado: 1},
  {id: 'PR', nombre: 'Producción', estado: 1},
  {id: 'TR', nombre: 'Transportador', estado: 1},
  {id: 'OT', nombre: 'Otros', estado: 1},
];

export const ESTADO_COTIZACIONES = [
  {id: 'GEN', nombre: 'Generada', estado: 1},
  {id: 'ENV', nombre: 'Enviada', estado: 1},
  {id: 'ANU', nombre: 'Anulada', estado: 1},
  {id: 'APR', nombre: 'Aprobada', estado: 1},
];

export const ESTADO_ACUERDO_SERVICIO = [
  {id: 'PDT', nombre: 'Pendiente', estado: 1},
  {id: 'ANU', nombre: 'Anulado', estado: 1},
  {id: 'APR', nombre: 'Aprobado', estado: 1},
];

export const TIPOS_RUTAS = [
  {id: 'I', nombre: 'Ingreso', estado: 1},
  {id: 'S', nombre: 'Salida', estado: 1},
  {id: 'A', nombre: 'Ambos', estado: 1},
];

export const TIPOS_PROCESOS = [
  {id: 'I', nombre: 'Instalación', estado: 1},
  {id: 'D', nombre: 'Desinstalación', estado: 1},
];

export const TIPOS_PUESTOS_CONTROL = [
  {id: 'V', nombre: 'Virtual', estado: 1},
  {id: 'F', nombre: 'Físico', estado: 1},
  {id: 'A', nombre: 'Ambos Virtual y fisico', estado: 1},
];

export const TIPOS_ESTADOS_EQUIPOS = [
  {id: 'T', nombre: 'Trabajo', estado: 1},
  {id: 'M', nombre: 'Mantenimiento', estado: 1},
  {id: 'O', nombre: 'Otros', estado: 1},
];

export const TIPOS_SERVICIOS = [
  {id: 'DTA', nombre: 'DTA', estado: 1},
  {id: 'OTM', nombre: 'OTM', estado: 1},
  {id: 'NAC', nombre: 'Nacionalizado', estado: 1},
  {id: 'PER', nombre: 'Pernocta', estado: 1},
  {id: 'EXP', nombre: 'Exportación', estado: 1},
  {id: 'CRD', nombre: 'Cross Docking', estado: 1},
  {id: 'OTR', nombre: 'Otro', estado: 1},
];

export const ESTADOS_ORDEN_SERVICIO = [
  {id: 'REG', nombre: 'Registrada', estado: 1},
  {id: 'REC', nombre: 'Recibida', estado: 1},
  {id: 'PRG', nombre: 'Programada', estado: 1},
  {id: 'ACP', nombre: 'Aceptada', estado: 1},
  {id: 'RUT', nombre: 'En ruta', estado: 1},
  {id: 'TER', nombre: 'Terminada', estado: 1},
  {id: 'PDF', nombre: 'Pendiente de facturar', estado: 1},
  {id: 'FAC', nombre: 'Interfaz facturaciÓn recibida', estado: 1},
  {id: 'ANU', nombre: 'Anulada', estado: 1},
];

export const ESTADOS_APROBACION_OS = [
  {id: 'A', nombre: 'Aceptada', estado: 1},
  {id: 'P', nombre: 'Pendiente', estado: 1},
  {id: 'R', nombre: 'Rechazada', estado: 1},
  {id: '', nombre: '', estado: 1},
];

export const TIPOS_EQUIPOS = [
  {id: 'DET', nombre: 'DETC', estado: 1},
  {id: 'SEN', nombre: 'Señuelo', estado: 1},
];

export const TIPOS_PRODUCTOS = [
  {id: 'ADH', nombre: 'Adhesivo', estado: 1},
  {id: 'ROT', nombre: 'Rotor', estado: 1},
  {id: 'KIT', nombre: 'Kit', estado: 1},
];

export const ESTADO_PEDIDOS = [
  {id: 'REG', nombre: 'Registrado', estado: 1},
  {id: 'CON', nombre: 'Confirmado', estado: 1},
  {id: 'DES', nombre: 'Despachado', estado: 1},
  {id: 'FAC', nombre: 'Facturado', estado: 1},
  {id: 'ANU', nombre: 'Anulado', estado: 1},
];

export const ESTADOS_RECURSOS_TECNICOS = [
  {id: 'D', nombre: 'Disponible', estado: 1},
  {id: 'V', nombre: 'Vacaciones', estado: 1},
  {id: 'I', nombre: 'Incapacitado', estado: 1},
  {id: 'L', nombre: 'Licencia', estado: 1},
  {id: 'R', nombre: 'Retirado', estado: 1},
];
