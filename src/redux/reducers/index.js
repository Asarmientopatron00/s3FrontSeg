import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Setting';
import UserList from './UserList';
import Auth from './Auth';
import Common from './Common';
import Usuario from './UsuarioReducer';
import ContactApp from './ContactApp';
import Asociado from './Asociado';
import RolReducer from './RolReducer';
import Close from './Close';
import TipoDocumentoReducer from './TipoDocumentoReducer';
import PaisReducer from './PaisReducer';

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    userList: UserList,
    common: Common,
    contactApp: ContactApp,
    usuario: Usuario,
    asociado: Asociado,
    close: Close,
    tipoDocumentoReducer: TipoDocumentoReducer,
    paisReducer: PaisReducer,
    rolReducer: RolReducer,
  });
export default reducers;
