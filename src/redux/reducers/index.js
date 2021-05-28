import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Setting';
import UserList from './UserList';
import Auth from './Auth';
import Common from './Common';
import Usuario from './Usuario';
import ContactApp from './ContactApp';
import Asociado from './Asociado';
import Rol from './Rol';

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
    rol: Rol,
  });
export default reducers;
