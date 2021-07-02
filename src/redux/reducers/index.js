import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Setting';
import UserList from './UserList';
import Auth from './Auth';
import Common from './Common';
import UsuarioReducer from './UsuarioReducer';
import ContactApp from './ContactApp';
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

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    userList: UserList,
    common: Common,
    contactApp: ContactApp,
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
  });
export default reducers;
