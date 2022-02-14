import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Setting';
import UserList from './UserList';
import Auth from './Auth';
import Common from './Common';
import UsuarioReducer from './UsuarioReducer';
import AsociadoReducer from './AsociadoReducer';
import RolReducer from './RolReducer';
import Close from './Close';
import PaisReducer from './PaisReducer';
import ActividadEconomicaReducer from './ActividadEconomicaReducer';
import ListaDocumentoReducer from './ListaDocumentoReducer';
import TipoDocumentoReducer from './TipoDocumentoReducer';
import RequisitoSeguridadReducer from './RequisitoSeguridadReducer';
import ParametroConstanteReducer from './ParametroConstanteReducer';
import DepartamentoReducer from './DepartamentoReducer';
import CiudadReducer from './CiudadReducer';
import ServicioReducer from './ServicioReducer';
import TerceroServicioReducer from './TerceroServicioReducer';
import EventoNotificacionReducer from './EventoNotificacionReducer';
import ParametroCorreoReducer from './ParametroCorreoReducer';
import AsociadoContactoLegalReducer from './AsociadoContactoLegalReducer';
import AsociadoContactoReducer from './AsociadoContactoReducer';
import AsociadoBancariaReducer from './AsociadoBancariaReducer';
import AsociadoComercialReducer from './AsociadoComercialReducer';
import AsociadoRequisitoSeguridadReducer from './AsociadoRequisitoSeguridadReducer';
import AsociadoDocumentoReducer from './AsociadoDocumentoReducer';
import AplicacionReducer from './AplicacionReducer';
import ModuloReducer from './ModuloReducer';
import OpcionSistemaReducer from './OpcionSistemaReducer';
import PermisoReducer from './PermisoReducer';
import ConsultaAuditoriaReducer from './ConsultaAuditoriaReducer';
import SolicitudCotizacionReducer from './SolicitudCotizacionReducer';
import RutaReducer from './RutaReducer';
import TarifaReducer from './TarifaReducer';
import CotizacionReducer from './CotizacionReducer';
import DetalleCotizacionReducer from './DetalleCotizacionReducer';
import LugarReducer from './LugarReducer';
import AcuerdoServicioReducer from './AcuerdoServicioReducer';
import NotificacionContactoReducer from './NotificacionContactoReducer';
import RutaAutorizacionReducer from './RutaAutorizacionReducer';
import PuestoParadaReducer from './PuestoParadaReducer';
import RutaControlReducer from './RutaControlReducer';
import PuestoControlReducer from './PuestoControlReducer';
import EstadoEquipoReducer from './EstadoEquipoReducer';
import EventoBitacoraEquipoReducer from './EventoBitacoraEquipoReducer';
import OrdenServicioReducer from './OrdenServicioReducer';
import OrdenServicioDocumentoReducer from './OrdenServicioDocumentoReducer';
import InformacionEquipoReducer from './InformacionEquipoReducer';
import ProductoReducer from './ProductoReducer';
import PedidoReducer from './PedidoReducer';
import DetallePedidoReducer from './DetallePedidoReducer';
import TipoProductoReducer from './TipoProductoReducer';
import ColorReducer from './ColorReducer';
import RecursoTecnicoReducer from './RecursoTecnicoReducer';
import HorarioRecursoTecnicoReducer from './HorarioRecursoTecnicoReducer';
import SolicitudCotizacionProductoReducer from './SolicitudCotizacionProductoReducer';
import DetalleSolicitudCotizacionProductoReducer from './DetalleSolicitudCotizacionProductoReducer';
import CotizacionProductoReducer from './CotizacionProductoReducer';
import DetalleCotizacionProductoReducer from './DetalleCotizacionProductoReducer';
import BitacoraEquipoReducer from './BitacoraEquipoReducer';
import ODSTFacturarServicioReducer from './ODSTFacturarServicioReducer';
import ODSTFacturarClienteReducer from './ODSTFacturarClienteReducer';
import CGAsociadoNegocioReducer from './CGAsociadoNegocioReducer';
import CGOrdenCompraReducer from './CGOrdenCompraReducer';
import CGCotizacionReducer from './CGCotizacionReducer';
import CGOrdenServicioReducer from './CGOrdenServicioReducer';
import CGServiciosReducer from './CGServiciosReducer';

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    userList: UserList,
    common: Common,
    usuarioReducer: UsuarioReducer,
    asociadoReducer: AsociadoReducer,
    close: Close,
    tipoDocumentoReducer: TipoDocumentoReducer,
    paisReducer: PaisReducer,
    rolReducer: RolReducer,
    actividadEconomicaReducer: ActividadEconomicaReducer,
    listaDocumentoReducer: ListaDocumentoReducer,
    requisitoSeguridadReducer: RequisitoSeguridadReducer,
    parametroConstanteReducer: ParametroConstanteReducer,
    departamentoReducer: DepartamentoReducer,
    ciudadReducer: CiudadReducer,
    servicioReducer: ServicioReducer,
    terceroServicioReducer: TerceroServicioReducer,
    eventoNotificacionReducer: EventoNotificacionReducer,
    parametroCorreoReducer: ParametroCorreoReducer,
    asociadoContactoLegalReducer: AsociadoContactoLegalReducer,
    asociadoContactoReducer: AsociadoContactoReducer,
    asociadoBancariaReducer: AsociadoBancariaReducer,
    asociadoComercialReducer: AsociadoComercialReducer,
    asociadoRequisitoSeguridadReducer: AsociadoRequisitoSeguridadReducer,
    asociadoDocumentoReducer: AsociadoDocumentoReducer,
    aplicacionReducer: AplicacionReducer,
    moduloReducer: ModuloReducer,
    opcionSistemaReducer: OpcionSistemaReducer,
    permisoReducer: PermisoReducer,
    consultaAuditoriaReducer: ConsultaAuditoriaReducer,
    solicitudCotizacionReducer: SolicitudCotizacionReducer,
    rutaReducer: RutaReducer,
    tarifaReducer: TarifaReducer,
    cotizacionReducer: CotizacionReducer,
    detalleCotizacionReducer: DetalleCotizacionReducer,
    lugarReducer: LugarReducer,
    acuerdoServicioReducer: AcuerdoServicioReducer,
    notificacionContactoReducer: NotificacionContactoReducer,
    rutaAutorizacionReducer: RutaAutorizacionReducer,
    puestoParadaReducer: PuestoParadaReducer,
    rutaControlReducer: RutaControlReducer,
    puestoControlReducer: PuestoControlReducer,
    estadoEquipoReducer: EstadoEquipoReducer,
    eventoBitacoraEquipoReducer: EventoBitacoraEquipoReducer,
    ordenServicioReducer: OrdenServicioReducer,
    ordenServicioDocumentoReducer: OrdenServicioDocumentoReducer,
    informacionEquipoReducer: InformacionEquipoReducer,
    productoReducer: ProductoReducer,
    pedidoReducer: PedidoReducer,
    detallePedidoReducer: DetallePedidoReducer,
    tipoProductoReducer: TipoProductoReducer,
    colorReducer: ColorReducer,
    recursoTecnicoReducer: RecursoTecnicoReducer,
    horarioRecursoTecnicoReducer: HorarioRecursoTecnicoReducer,
    solicitudCotizacionProductoReducer: SolicitudCotizacionProductoReducer,
    detalleSolicitudCotizacionProductoReducer:
      DetalleSolicitudCotizacionProductoReducer,
    cotizacionProductoReducer: CotizacionProductoReducer,
    detalleCotizacionProductoReducer: DetalleCotizacionProductoReducer,
    bitacoraEquipoReducer: BitacoraEquipoReducer,
    oDSTFacturarServicioReducer: ODSTFacturarServicioReducer,
    oDSTFacturarClienteReducer: ODSTFacturarClienteReducer,
    cGAsociadoNegocioReducer: CGAsociadoNegocioReducer,
    cGOrdenCompraReducer: CGOrdenCompraReducer,
    cGCotizacionReducer: CGCotizacionReducer,
    cGOrdenServicioReducer: CGOrdenServicioReducer,
    cGServiciosReducer: CGServiciosReducer,
  });
export default reducers;
