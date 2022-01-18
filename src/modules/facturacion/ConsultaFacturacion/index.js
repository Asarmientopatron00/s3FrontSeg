import React, {useState, useEffect} from 'react';
import {Box, Button} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
// import EmailIcon from '@material-ui/icons/Email';
// import FilterListIcon from '@material-ui/icons/FilterList';
import {
  onGetColeccion2,
  // onDelete,
} from '../../../redux/actions/OrdenServicioAction';
import {useDispatch, useSelector} from 'react-redux';
// import {useLocation} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Popover from '@material-ui/core/Popover';
import TuneIcon from '@material-ui/icons/Tune';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import TextField from '@material-ui/core/TextField';
// import Swal from 'sweetalert2';
import {
  ESTADOS_ORDEN_SERVICIO,
  TIPOS_SERVICIOS,
} from '../../../shared/constants/ListasValores';
// import {useHistory} from 'react-router-dom';
import ConsultaOrdenServicio from './../../solicitudesServicio/ConsultaOrdenServicio';
import MenuItem from '@material-ui/core/MenuItem';

const cells = [
  {
    id: 'numero_orden_servicio',
    typeHead: 'numeric',
    label: 'Orden de Servicio',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'fecha_orden_servicio',
    typeHead: 'string',
    label: 'Fecha Orden Servicio',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'estado_orden_servicio',
    typeHead: 'string',
    label: 'Estado',
    value: (value) =>
      ESTADOS_ORDEN_SERVICIO.map((tipo) =>
        tipo.id === value ? tipo.nombre : '',
      ),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'asociado',
    typeHead: 'string',
    label: 'Nombre Asociado',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'fecha_programada_instalacion',
    typeHead: 'string',
    label: 'Fecha Programada Instalacion',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'hora_programada_instalacion',
    typeHead: 'string',
    label: 'Hora Programada Instalacion',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'ciudad_instalacion',
    typeHead: 'string',
    label: 'Ciudad Origen',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'lugar_instalacion',
    typeHead: 'string',
    label: 'Lugar Origen',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'fecha_instalacion_fisica',
    typeHead: 'string',
    label: 'Fecha Ejecucion Instalacion',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'fecha_programada_desinstalacion',
    typeHead: 'string',
    label: 'Fecha Programada Desinstalacion',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'ciudad_desinstalacion',
    typeHead: 'string',
    label: 'Ciudad Destimo',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'lugar_desinstalacion',
    typeHead: 'string',
    label: 'Lugar Destino',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'fecha_desinstalacion_fisica',
    typeHead: 'string',
    label: 'Fecha Ejecucion Desinstalacion',
    value: (value) => value,
    align: 'left',
    width: '180px',
    mostrarInicio: true,
  },
  {
    id: 'recurso_instalacion',
    typeHead: 'string',
    label: 'Recurso Tecnico Origen',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'recurso_desinstalacion',
    typeHead: 'string',
    label: 'Recurso Tecnico Destino',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'hora_instalacion_fisica',
    typeHead: 'string',
    label: 'Hora Inicio Servicio',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'hora_desinstalacion_fisica',
    typeHead: 'string',
    label: 'Hora Fin Servicio',
    value: (value) => value,
    align: 'left',
    mostrarInicio: false,
  },
  {
    id: 'transportador',
    typeHead: 'string',
    label: 'Empresa Transportadora',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'usuario_modificacion_nombre',
    typeHead: 'string',
    label: 'Modificado Por',
    value: (value) => value,
    align: 'left',
    width: '140px',
    mostrarInicio: false,
  },
  {
    id: 'fecha_modificacion',
    typeHead: 'string',
    label: 'Fecha Última Modificación',
    value: (value) => new Date(value).toLocaleString('es-CL'),
    align: 'left',
    width: '180px',
    mostrarInicio: false,
  },
  {
    id: 'usuario_creacion_nombre',
    typeHead: 'string',
    label: 'Creado Por',
    value: (value) => value,
    align: 'left',
    width: '140px',
    mostrarInicio: false,
  },
  {
    id: 'fecha_creacion',
    typeHead: 'string',
    label: 'Fecha Creación',
    value: (value) => new Date(value).toLocaleString('es-CL'),
    align: 'left',
    width: '180px',
    mostrarInicio: false,
  },
];

const MyCell = (props) => {
  const {align, width, claseBase, value, cellColor} = props;
  const classes = useStyles({width: width, cellColor: cellColor});

  let allClassName = claseBase;

  if (width !== undefined) {
    allClassName = `${allClassName} ${classes.cellWidth}`;
  }

  return (
    <TableCell align={align} className={allClassName}>
      <span className={cellColor ? classes.cellColor : ''}>{value}</span>
    </TableCell>
  );
};

function EnhancedTableHead(props) {
  const {classes, order, orderBy, onRequestSort, columnasMostradas} = props;

  return (
    <TableHead>
      <TableRow className={classes.head}>
        <TableCell align='center' className={classes.headCell}>
          {'Acciones'}
        </TableCell>
        {columnasMostradas.map((cell) => {
          if (cell.mostrar) {
            return (
              <TableCell
                key={cell.id}
                align={
                  cell.typeHead === 'string'
                    ? 'left'
                    : cell.typeHead === 'numeric'
                    ? 'right'
                    : 'center'
                }
                className={classes.cell}
                sortDirection={orderBy === cell.id ? order : false}>
                <TableSortLabel
                  active={orderBy === cell.id}
                  direction={orderBy === cell.id ? order : 'asc'}
                  onClick={() => {
                    onRequestSort(cell.id);
                  }}>
                  {cell.label}
                  {orderBy === cell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          } else {
            return <th key={cell.id}></th>;
          }
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columnasMostradas: PropTypes.array.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    padding: '15px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
    borderRadius: '4px',
    display: 'grid',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  createButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  clearButton: {
    backgroundColor: theme.palette.grayBottoms,
    color: 'white',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  horizontalBottoms: {
    width: 'min-content',
    display: 'flex',
    gap: '5px',
  },
  titleTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  columnFilterButton: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  contenedorFiltros: {
    width: '90%',
    display: 'grid',
    gridTemplateColumns: '4fr 4fr 1fr',
    columnGap: '20px',
  },
  contenedorFiltros2: {
    width: '90%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    columnGap: '20px',
  },
  pairFilters: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    minWidth: '100px',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    titulo,
    handleOpenPopoverColumns,
    queryFilter,
    fechaOSIFiltro,
    fechaOSFFiltro,
    fechaProgIFiltro,
    fechaProgFFiltro,
    fechaEjecIFiltro,
    fechaEjecFFiltro,
    odsIFiltro,
    odsFFiltro,
    ciudadIFiltro,
    ciudadFFiltro,
    estadoFiltro,
    nombreAsociadoFiltro,
    nombreTransportadoraFiltro,
    limpiarFiltros,
  } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <Box className={classes.titleTop}>
            <Typography
              className={classes.title}
              variant='h6'
              id='tableTitle'
              component='div'>
              {titulo}
            </Typography>
            <Box className={classes.horizontalBottoms}>
              <Tooltip
                title='Mostrar/Ocultar Columnas'
                onClick={handleOpenPopoverColumns}>
                <IconButton
                  className={classes.columnFilterButton}
                  aria-label='filter list'>
                  <TuneIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box className={classes.contenedorFiltros2}>
            <TextField
              label='Fecha Orden Servicio Inicial'
              name='fechaOSIFiltro'
              id='fechaOSIFiltro'
              onChange={queryFilter}
              value={fechaOSIFiltro}
              type='date'
              InputLabelProps={{shrink: true}}
            />
            <TextField
              label='Fecha Orden Servicio Final'
              name='fechaOSFFiltro'
              id='fechaOSFFiltro'
              onChange={queryFilter}
              value={fechaOSFFiltro}
              type='date'
              InputLabelProps={{shrink: true}}
            />
          </Box>
          <Box className={classes.contenedorFiltros2}>
            <TextField
              label='Fecha Programada Inicial'
              name='fechaProgIFiltro'
              id='fechaProgIFiltro'
              onChange={queryFilter}
              value={fechaProgIFiltro}
              type='date'
              InputLabelProps={{shrink: true}}
            />
            <TextField
              label='Fecha Programada Final'
              name='fechaProgFFiltro'
              id='fechaProgFFiltro'
              onChange={queryFilter}
              value={fechaProgFFiltro}
              type='date'
              InputLabelProps={{shrink: true}}
            />
            <Box display='grid'>
              <Box display='flex' mb={2} justifyContent={'flex-end'}>
                <Tooltip title='Limpiar Filtros' onClick={limpiarFiltros}>
                  <IconButton
                    className={classes.clearButton}
                    aria-label='filter list'>
                    <ClearAllIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
          <Box className={classes.contenedorFiltros2}>
            <TextField
              label='Fecha Ejecucion Inicial'
              name='fechaEjecIFiltro'
              id='fechaEjecIFiltro'
              onChange={queryFilter}
              value={fechaEjecIFiltro}
              type='date'
              InputLabelProps={{shrink: true}}
            />
            <TextField
              label='Fecha Ejecucion Final'
              name='fechaEjecFFiltro'
              id='fechaEjecFFiltro'
              onChange={queryFilter}
              value={fechaEjecFFiltro}
              type='date'
              InputLabelProps={{shrink: true}}
            />
            <TextField
              label='Estado'
              name='estadoFiltro'
              id='estadoFiltro'
              select={true}
              onChange={queryFilter}
              value={estadoFiltro}>
              {ESTADOS_ORDEN_SERVICIO.map((estado) => {
                return (
                  <MenuItem
                    value={estado.id}
                    key={estado.id}
                    id={estado.id}
                    className={classes.pointer}>
                    {estado.nombre}
                  </MenuItem>
                );
              })}
            </TextField>
          </Box>
          <Box className={classes.contenedorFiltros2}>
            <TextField
              label='Orden de Servicio Inicial'
              name='odsIFiltro'
              id='odsIFiltro'
              onChange={queryFilter}
              value={odsIFiltro}
              type='number'
              inputProps={{min: 0}}
            />
            <TextField
              label='Orden de Servicio Final'
              name='odsFFiltro'
              id='odsFFiltro'
              onChange={queryFilter}
              value={odsFFiltro}
              type='number'
              inputProps={{min: 0}}
            />
            <TextField
              label='Asociado Negocio'
              name='nombreAsociadoFiltro'
              id='nombreAsociadoFiltro'
              onChange={queryFilter}
              value={nombreAsociadoFiltro}
            />
          </Box>
          <Box className={classes.contenedorFiltros2}>
            <TextField
              label='Ciudad Origen'
              name='ciudadIFiltro'
              id='ciudadIFiltro'
              onChange={queryFilter}
              value={ciudadIFiltro}
            />
            <TextField
              label='Ciudad Destino'
              name='ciudadFFiltro'
              id='ciudadFFiltro'
              onChange={queryFilter}
              value={ciudadFFiltro}
            />
            <TextField
              label='Empresa Transportadora'
              name='nombreTransportadoraFiltro'
              id='nombreTransportadoraFiltro'
              onChange={queryFilter}
              value={nombreTransportadoraFiltro}
            />
          </Box>
          <Box className={classes.contenedorFiltros}></Box>
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ''
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleOpenPopoverColumns: PropTypes.func.isRequired,
  queryFilter: PropTypes.func.isRequired,
  limpiarFiltros: PropTypes.func.isRequired,
  fechaOSIFiltro: PropTypes.string.isRequired,
  fechaOSFFiltro: PropTypes.string.isRequired,
  fechaProgIFiltro: PropTypes.string.isRequired,
  fechaProgFFiltro: PropTypes.string.isRequired,
  fechaEjecIFiltro: PropTypes.string.isRequired,
  fechaEjecFFiltro: PropTypes.string.isRequired,
  odsIFiltro: PropTypes.string.isRequired,
  odsFFiltro: PropTypes.string.isRequired,
  ciudadIFiltro: PropTypes.string.isRequired,
  ciudadFFiltro: PropTypes.string.isRequired,
  estadoFiltro: PropTypes.string.isRequired,
  nombreAsociadoFiltro: PropTypes.string.isRequired,
  nombreTransportadoraFiltro: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  marcoTabla: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
    borderRadius: '4px',
    paddingLeft: '15px',
    paddingRight: '15px',
    marginTop: '5px',
  },
  root: {
    width: '100%%',
    padding: '20px',
  },
  head: {
    borderTop: '2px solid #dee2e6',
    borderBottom: '2px solid #dee2e6',
    // display:'grid',
    // gridTemplateColumns:gridTemplate,
  },
  headCell: {
    padding: '0px 0px 0px 15px',
  },
  row: {
    // display:'grid',
    // gridTemplateColumns:gridTemplate,
    padding: 'none',
  },
  cell: (props) => ({
    padding: props.vp + ' 0px ' + props.vp + ' 15px',
    whiteSpace: 'nowrap',
  }),
  cellWidth: (props) => ({
    minWidth: props.width,
  }),
  cellColor: (props) => ({
    backgroundColor: props.cellColor,
    color: 'white',
  }),
  acciones: (props) => ({
    padding: props.vp + ' 0px ' + props.vp + ' 15px',
    minWidth: '100px',
  }),
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  table: {
    minWidth: '100%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  generalIcons: {
    '&:hover': {
      color: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  editIcon: {
    color: theme.palette.primary.main,
  },
  visivilityIcon: {
    color: theme.palette.grayBottoms,
  },
  deleteIcon: {
    color: theme.palette.redBottoms,
  },
  enviarIcon: {
    color: theme.palette.enviaEmailBottoms,
  },
  popoverColumns: {
    display: 'grid',
    padding: '10px',
    color: theme.palette.grayBottoms,
  },
  paginacion: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
    paddingBottom: '5px',
  },
  rowsPerPageOptions: {
    marginRight: '10px',
  },
}));

const ConsultaFacturacion = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [accion, setAccion] = useState('ver');
  const [ordenServicioSeleccionado, setOrdenServicioSeleccionado] = useState(0);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [orderByToSend, setOrderByToSend] = React.useState(
    'fecha_modificacion:desc',
  );
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  // const [dense, setDense] = React.useState(false);
  const dense = true; //Borrar cuando se use el change
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rowsPerPageOptions = [5, 10, 15, 25, 50];

  const {rows, desde, hasta, ultima_pagina, total} = useSelector(
    ({ordenServicioReducer}) => ordenServicioReducer,
  );

  const textoPaginacion = `Mostrando de ${desde} a ${hasta} de ${total} resultados - Página ${page} de ${ultima_pagina}`;
  const [fechaOSIFiltro, setFechaOSIFiltro] = useState('');
  const [fechaOSFFiltro, setFechaOSFFiltro] = useState('');
  const [fechaProgIFiltro, setFechaProgIFiltro] = useState('');
  const [fechaProgFFiltro, setFechaProgFFiltro] = useState('');
  const [fechaEjecIFiltro, setFechaEjecIFiltro] = useState('');
  const [fechaEjecFFiltro, setFechaEjecFFiltro] = useState('');
  const [odsIFiltro, setODSIFiltro] = useState('');
  const [odsFFiltro, setODSFFiltro] = useState('');
  const [ciudadIFiltro, setCiudadIFiltro] = useState('');
  const [ciudadFFiltro, setCiudadFFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [nombreAsociadoFiltro, setNombreAsociadoFiltro] = useState('');
  const [nombreTransportadoraFiltro, setNombreTransportadoraFiltro] =
    useState('');
  // const {pathname} = useLocation();
  const [openPopOver, setOpenPopOver] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState(null);

  let columnasMostradasInicial = [];

  cells.forEach((cell) => {
    columnasMostradasInicial.push({
      id: cell.id,
      mostrar: cell.mostrarInicio,
      typeHead: cell.typeHead,
      label: cell.label,
      value: cell.value,
      align: cell.align,
      width: cell.width,
      cellColor: cell.cellColor,
    });
  });

  const [columnasMostradas, setColumnasMostradas] = useState(
    columnasMostradasInicial,
  );

  let vp = '15px';
  if (dense === true) {
    vp = '0px';
  }
  const classes = useStyles({vp: vp});
  const dispatch = useDispatch();

  const {user} = useSelector(({auth}) => auth);
  const [permisos, setPermisos] = useState('');
  const [titulo, setTitulo] = useState('');

  useEffect(() => {
    user &&
      user.permisos.forEach((modulo) => {
        modulo.opciones.forEach((opcion) => {
          if (opcion.url === props.route.path[0]) {
            setTitulo(opcion.nombre);
            const permisoAux = [];
            opcion.permisos.forEach((permiso) => {
              if (permiso.permitido) {
                permisoAux.push(permiso.titulo);
              }
            });
            setPermisos(permisoAux);
          }
        });
      });
  }, [user, props.route]);
  useEffect(() => {
    dispatch(
      onGetColeccion2(
        page,
        rowsPerPage,
        orderByToSend,
        fechaOSIFiltro,
        fechaOSFFiltro,
        fechaProgIFiltro,
        fechaProgFFiltro,
        fechaEjecIFiltro,
        fechaEjecFFiltro,
        odsIFiltro,
        odsFFiltro,
        ciudadIFiltro,
        ciudadFFiltro,
        estadoFiltro,
        nombreAsociadoFiltro,
        nombreTransportadoraFiltro,
      ),
    );
  }, [
    dispatch,
    page,
    rowsPerPage,
    orderByToSend,
    fechaOSIFiltro,
    fechaOSFFiltro,
    fechaProgIFiltro,
    fechaProgFFiltro,
    fechaEjecIFiltro,
    fechaEjecFFiltro,
    odsIFiltro,
    odsFFiltro,
    ciudadIFiltro,
    ciudadFFiltro,
    estadoFiltro,
    nombreAsociadoFiltro,
    nombreTransportadoraFiltro,
  ]);

  const updateColeccion = () => {
    dispatch(
      onGetColeccion2(
        1,
        rowsPerPage,
        orderByToSend,
        fechaOSIFiltro,
        fechaOSFFiltro,
        fechaProgIFiltro,
        fechaProgFFiltro,
        fechaEjecIFiltro,
        fechaEjecFFiltro,
        odsIFiltro,
        odsFFiltro,
        ciudadIFiltro,
        ciudadFFiltro,
        estadoFiltro,
        nombreAsociadoFiltro,
        nombreTransportadoraFiltro,
      ),
    );
  };
  useEffect(() => {
    setPage(1);
  }, [
    fechaOSIFiltro,
    orderByToSend,
    fechaOSFFiltro,
    fechaProgIFiltro,
    fechaProgFFiltro,
    fechaEjecIFiltro,
    fechaEjecFFiltro,
    odsIFiltro,
    odsFFiltro,
    ciudadIFiltro,
    ciudadFFiltro,
    estadoFiltro,
    nombreAsociadoFiltro,
    nombreTransportadoraFiltro,
  ]);

  const queryFilter = (e) => {
    switch (e.target.name) {
      case 'fechaOSIFiltro':
        setFechaOSIFiltro(e.target.value);
        break;
      case 'fechaOSFFiltro':
        setFechaOSFFiltro(e.target.value);
        break;
      case 'fechaProgIFiltro':
        setFechaProgIFiltro(e.target.value);
        break;
      case 'fechaProgFFiltro':
        setFechaProgFFiltro(e.target.value);
        break;
      case 'fechaEjecIFiltro':
        setFechaEjecIFiltro(e.target.value);
        break;
      case 'fechaEjecFFiltro':
        setFechaEjecFFiltro(e.target.value);
        break;
      case 'odsIFiltro':
        setODSIFiltro(e.target.value);
        break;
      case 'odsFFiltro':
        setODSFFiltro(e.target.value);
        break;
      case 'ciudadIFiltro':
        setCiudadIFiltro(e.target.value);
        break;
      case 'ciudadFFiltro':
        setCiudadFFiltro(e.target.value);
        break;
      case 'estadoFiltro':
        setEstadoFiltro(e.target.value);
        break;
      case 'nombreTransportadoraFiltro':
        setNombreTransportadoraFiltro(e.target.value);
        break;
      case 'nombreAsociadoFiltro':
        setNombreAsociadoFiltro(e.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {}, [dispatch]);

  const limpiarFiltros = () => {
    setFechaOSIFiltro('');
    setFechaOSFFiltro('');
    setFechaProgIFiltro('');
    setFechaProgFFiltro('');
    setFechaEjecIFiltro('');
    setFechaEjecFFiltro('');
    setODSIFiltro('');
    setODSFFiltro('');
    setCiudadIFiltro('');
    setCiudadFFiltro('');
    setEstadoFiltro('');
    setNombreTransportadoraFiltro('');
    setNombreAsociadoFiltro('');
  };

  const changeOrderBy = (id) => {
    if (orderBy === id) {
      if (order === 'asc') {
        setOrder('desc');
        setOrderByToSend(id + ':desc');
      } else {
        setOrder('asc');
        setOrderByToSend(id + ':asc');
      }
    } else {
      setOrder('asc');
      setOrderBy(id);
      setOrderByToSend(id + ':asc');
    }
  };

  const handleClosePopover = () => {
    setOpenPopOver(false);
    setPopoverTarget(null);
  };

  const handleOpenPopoverColumns = (e) => {
    setPopoverTarget(e.currentTarget);
    setOpenPopOver(true);
  };

  const handleOnchangeMostrarColumna = (e) => {
    let aux = columnasMostradas;
    setColumnasMostradas(
      aux.map((column) => {
        if (column.id === e.target.id) {
          return {...column, mostrar: !column.mostrar};
        } else {
          return column;
        }
      }),
    );
  };

  const onOpenViewAprobacionOrdenServicio = (id) => {
    setOrdenServicioSeleccionado(id);
    setAccion('ver');
    setShowForm(true);
  };

  const handleOnClose = () => {
    setShowForm(false);
    setOrdenServicioSeleccionado(0);
    setAccion('ver');
  };

  const showAllColumns = () => {
    let aux = columnasMostradas;
    setColumnasMostradas(
      aux.map((column) => {
        return {...column, mostrar: true};
      }),
    );
  };

  const reiniciarColumns = () => {
    setColumnasMostradas(columnasMostradasInicial);
  };

  // const onDeleteOrdenServicio = (id) => {
  //   Swal.fire({
  //     title: 'Confirmar',
  //     text: '¿Seguro que dese anular la orden de servicio?',
  //     allowEscapeKey: false,
  //     allowEnterKey: false,
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: 'NO',
  //     confirmButtonText: 'SI',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(onDelete(id, updateColeccion));
  //       Swal.fire(
  //         'Anulado',
  //         'La orden de servicio fue anulada correctamente',
  //         'success',
  //       );
  //     }
  //   });
  // };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const [showTable, setShowTable] = useState(true);
  useEffect(() => {
    if (rows.length === 0) {
      setShowTable(false);
    } else {
      setShowTable(true);
    }
  }, [rows]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {permisos && (
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleOpenPopoverColumns={handleOpenPopoverColumns}
            queryFilter={queryFilter}
            limpiarFiltros={limpiarFiltros}
            fechaOSIFiltro={fechaOSIFiltro}
            fechaOSFFiltro={fechaOSFFiltro}
            fechaProgIFiltro={fechaProgIFiltro}
            fechaProgFFiltro={fechaProgFFiltro}
            fechaEjecIFiltro={fechaEjecIFiltro}
            fechaEjecFFiltro={fechaEjecFFiltro}
            odsIFiltro={odsIFiltro}
            odsFFiltro={odsFFiltro}
            ciudadIFiltro={ciudadIFiltro}
            ciudadFFiltro={ciudadFFiltro}
            estadoFiltro={estadoFiltro}
            nombreAsociadoFiltro={nombreAsociadoFiltro}
            nombreTransportadoraFiltro={nombreTransportadoraFiltro}
            permisos={permisos}
            titulo={titulo}
          />
        )}
        {showTable && permisos ? (
          <Box className={classes.marcoTabla}>
            <Box className={classes.paginacion}>
              <Box>
                <p>{textoPaginacion}</p>
              </Box>
              <Box className={classes.paginacion}>
                <select
                  className={classes.rowsPerPageOptions}
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}>
                  {rowsPerPageOptions.map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
                <Pagination
                  showFirstButton
                  showLastButton
                  onChange={handleChangePage}
                  count={ultima_pagina}
                  page={page}
                />
              </Box>
            </Box>

            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby='tableTitle'
                size={dense ? 'small' : 'medium'}
                aria-label='enhanced table'>
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={changeOrderBy}
                  rowCount={rows.length}
                  columnasMostradas={columnasMostradas}
                />
                <TableBody>
                  {rows.map((row, index) => {
                    const isItemSelected = isSelected(row.name);

                    return (
                      <TableRow
                        hover
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        className={classes.row}>
                        <TableCell align='center' className={classes.acciones}>
                          {permisos.indexOf('Listar') >= 0 && (
                            <Tooltip title={<IntlMessages id='boton.ver' />}>
                              <VisibilityIcon
                                className={`${classes.generalIcons} ${classes.visivilityIcon}`}
                                onClick={() =>
                                  onOpenViewAprobacionOrdenServicio(row.id)
                                }
                              />
                            </Tooltip>
                          )}
                        </TableCell>

                        {columnasMostradas.map((columna) => {
                          if (columna.mostrar) {
                            return (
                              <MyCell
                                key={row.id + columna.id}
                                align={columna.align}
                                width={columna.width}
                                claseBase={classes.cell}
                                value={columna.value(row[columna.id])}
                                cellColor={
                                  columna.cellColor
                                    ? columna.cellColor(row[columna.id])
                                    : ''
                                }
                              />
                            );
                          } else {
                            return <th key={row.id + columna.id}></th>;
                          }
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Box className={classes.paginacion}>
              <Box>
                <p>{textoPaginacion}</p>
              </Box>
              <Box className={classes.paginacion}>
                <select
                  className={classes.rowsPerPageOptions}
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}>
                  {rowsPerPageOptions.map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
                <Pagination
                  showFirstButton
                  showLastButton
                  onChange={handleChangePage}
                  count={ultima_pagina}
                  page={page}
                />
              </Box>
            </Box>
          </Box>
        ) : permisos ? (
          <Box
            component='h2'
            padding={4}
            fontSize={19}
            className={classes.marcoTabla}>
            <IntlMessages id='sinResultados' />
          </Box>
        ) : (
          <Box
            component='h2'
            padding={4}
            fontSize={19}
            className={classes.marcoTabla}>
            <IntlMessages id='noAutorizado' />
          </Box>
        )}
      </Paper>

      {showForm && accion === 'ver' ? (
        <ConsultaOrdenServicio
          showForm={showForm}
          ordenServicio={ordenServicioSeleccionado}
          accion={accion}
          handleOnClose={handleOnClose}
          updateColeccion={updateColeccion}
          titulo={titulo}
          TIPOS_SERVICIOS={TIPOS_SERVICIOS}
          ESTADOS_ORDEN_SERVICIO={ESTADOS_ORDEN_SERVICIO}
        />
      ) : (
        ''
      )}

      <Popover
        id='popoverColumns'
        open={openPopOver}
        anchorEl={popoverTarget}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Box className={classes.popoverColumns}>
          {columnasMostradas.map((column) => {
            return (
              <FormControlLabel
                key={column.id}
                control={
                  <Switch
                    id={column.id}
                    checked={column.mostrar}
                    onChange={handleOnchangeMostrarColumna}
                  />
                }
                label={column.label}
              />
            );
          })}
          <Box>
            <Button onClick={showAllColumns}>Mostrar Todos</Button>
            <Button onClick={reiniciarColumns}>Reiniciar Vista</Button>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default ConsultaFacturacion;
