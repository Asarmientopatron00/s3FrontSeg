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
import Person from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
// import FilterListIcon from '@material-ui/icons/FilterList';
import ProgramacionOrdenServicioCreador from './ProgramacionOrdenServicioCreador';
import {onGetColeccion} from '../../../redux/actions/OrdenServicioAction';
import {useDispatch, useSelector} from 'react-redux';
// import {useLocation} from 'react-router-dom';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Popover from '@material-ui/core/Popover';
import TuneIcon from '@material-ui/icons/Tune';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import TextField from '@material-ui/core/TextField';
import {
  ESTADOS_ORDEN_SERVICIO,
  ESTADOS_APROBACION_OS,
} from '../../../shared/constants/ListasValores';

// import {MessageView} from '../../../@crema';

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const cells = [
  {
    id: 'numero_orden_servicio',
    typeHead: 'numeric',
    label: 'Orden Servicio',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'fecha_creacion',
    typeHead: 'numeric',
    label: 'Fecha y Hora',
    value: (value) => value,
    align: 'right',
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
    label: 'Nombre',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'tipo_servicio',
    typeHead: 'string',
    label: 'Tipo Proceso',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'fecha_programada',
    typeHead: 'string',
    label: 'Fecha Programada',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'hora_programada',
    typeHead: 'string',
    label: 'Hora Programada',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'ciudad',
    typeHead: 'string',
    label: 'Ciudad',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'lugar',
    typeHead: 'string',
    label: 'Lugar',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'recurso',
    typeHead: 'string',
    label: 'Técnico',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'indicativo_aceptacion',
    typeHead: 'string',
    label: 'Estado Aprobación',
    value: (value) =>
      ESTADOS_APROBACION_OS.map((tipo) =>
        tipo.id === value ? tipo.nombre : '',
      ),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'equipo',
    typeHead: 'string',
    label: 'Equipo',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'estado',
    typeHead: 'boolean',
    label: 'Estado',
    value: (value) => (value === 1 ? 'Activo' : 'Inactivo'),
    align: 'center',
    mostrarInicio: false,
    cellColor: (value) => (value === 1 ? 'green' : 'red'),
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
  // const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };

  return (
    <TableHead>
      <TableRow className={classes.head}>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell> */}
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
                  // onClick={createSortHandler(cell.id)}
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
    gap: '20px',
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
    nombreFiltro,
    fechaOSInicialFiltro,
    fechaOSFinalFiltro,
    fechaProgInicialFiltro,
    fechaProgFinalFiltro,
    ciudadFiltro,
    ordenServicioFiltro,
    limpiarFiltros,
    updateColeccion,
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
          <Box className={classes.contenedorFiltros}>
            <TextField
              label='Fecha Orden Servicio Inicial'
              name='fechaOSInicialFiltro'
              id='fechaOSInicialFiltro'
              onChange={queryFilter}
              value={fechaOSInicialFiltro}
              type='date'
              InputLabelProps={{shrink: true}}
            />
            <TextField
              label='Fecha Orden nServicio Final'
              name='fechaOSFinalFiltro'
              id='fechaOSFinalFiltro'
              onChange={queryFilter}
              value={fechaOSFinalFiltro}
              type='date'
              InputLabelProps={{shrink: true}}
            />
            <Box />
            <TextField
              label='Fecha Programada Inicial'
              name='fechaProgInicialFiltro'
              id='fechaProgInicialFiltro'
              onChange={queryFilter}
              value={fechaProgInicialFiltro}
              type='date'
              InputLabelProps={{shrink: true}}
            />
            <TextField
              label='Fecha Programada Final'
              name='fechaProgFinalFiltro'
              id='fechaProgFinalFiltro'
              onChange={queryFilter}
              value={fechaProgFinalFiltro}
              type='date'
              InputLabelProps={{shrink: true}}
            />
            <Box />
            <TextField
              label='Ciudad'
              name='ciudadFiltro'
              id='ciudadFiltro'
              onChange={queryFilter}
              value={ciudadFiltro}
            />
            <TextField
              label='Nombre'
              name='nombreFiltro'
              id='nombreFiltro'
              onChange={queryFilter}
              value={nombreFiltro}
            />
            <Box>
              <Tooltip title='Limpiar Filtros' onClick={limpiarFiltros}>
                <IconButton
                  className={classes.clearButton}
                  aria-label='filter list'>
                  <ClearAllIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <TextField
              label='Orden Servicio'
              name='ordenServicioFiltro'
              id='ordenServicioFiltro'
              onChange={queryFilter}
              value={ordenServicioFiltro}
              type='number'
            />
            <Box />
            <Box display='grid'>
              <Box display='flex' mb={2}>
                <Tooltip title='Buscar' onClick={updateColeccion}>
                  <IconButton
                    className={classes.createButton}
                    aria-label='filter list'>
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </>
      )}

      {
        numSelected > 0 ? (
          <Tooltip title='Delete'>
            <IconButton aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ''
        )
        //  <Tooltip title="Filtros Avanzados">
        //         <IconButton aria-label="filter list">
        //           <FilterListIcon />
        //         </IconButton>
        //       </Tooltip>
      }
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleOpenPopoverColumns: PropTypes.func.isRequired,
  queryFilter: PropTypes.func.isRequired,
  limpiarFiltros: PropTypes.func.isRequired,
  nombreFiltro: PropTypes.string.isRequired,
  fechaOSInicialFiltro: PropTypes.string.isRequired,
  fechaOSFinalFiltro: PropTypes.string.isRequired,
  fechaProgInicialFiltro: PropTypes.string.isRequired,
  fechaProgFinalFiltro: PropTypes.string.isRequired,
  ciudadFiltro: PropTypes.string.isRequired,
  ordenServicioFiltro: PropTypes.string.isRequired,
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
    padding: '0px 0px 0px 0px',
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
    minWidth: '50px',
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

const ProgramacionOrdenServicio = (props) => {
  const [showForm, setShowForm] = useState(false);
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

  const [accion, setAccion] = useState('ver');
  const [
    programacionOrdenServicioSeleccionado,
    setProgramacionOrdenServicioSeleccionado,
  ] = useState(0);
  const {desde, hasta, ultima_pagina, total} = useSelector(
    ({ordenServicioReducer}) => ordenServicioReducer,
  );

  const rowsAux = useSelector(
    ({ordenServicioReducer}) => ordenServicioReducer.rows,
  );

  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows([]);
    let aux = [];
    rowsAux.forEach((row) => {
      aux.push({
        id: row.id,
        numero_orden_servicio: row.numero_orden_servicio,
        fecha_creacion: row.fecha_creacion,
        estado_orden_servicio: row.estado_orden_servicio,
        asociado: row.asociado,
        fecha_programada: row.fecha_programada_instalacion,
        hora_programada: row.hora_programada_instalacion,
        departamento: row.departamento_instalacion,
        departamento_id: row.departamento_id_instalacion,
        ciudad: row.ciudad_instalacion,
        lugar: row.lugar_instalacion,
        direccion: row.direccion_instalacion,
        recurso: row.recurso_instalacion,
        tipo_servicio: 'Instalación',
        numero_viaje: row.numero_viaje,
        recurso_id: row.recurso_id_instalacion,
        equipo_id: row.equipo_id,
        equipo: row.equipo,
        observaciones_programacion: row.observaciones_programacion_instalacion,
        indicativo_aceptacion: row.indicativo_aceptacion_instalacion,
      });
      aux.push({
        id: row.id,
        numero_orden_servicio: row.numero_orden_servicio,
        fecha_creacion: row.fecha_creacion,
        estado_orden_servicio: row.estado_orden_servicio,
        asociado: row.asociado,
        fecha_programada: row.fecha_programada_desinstalacion,
        hora_programada: row.hora_programada_desinstalacion,
        departamento: row.departamento_desinstalacion,
        departamento_id: row.departamento_id_desinstalacion,
        ciudad: row.ciudad_desinstalacion,
        lugar: row.lugar_desinstalacion,
        direccion: row.direccion_desinstalacion,
        recurso: row.recurso_desinstalacion,
        tipo_servicio: 'Desinstalación',
        numero_viaje: row.numero_viaje,
        recurso_id: row.recurso_id_desinstalacion,
        equipo_id: row.equipo_id,
        equipo: row.equipo,
        observaciones_programacion:
          row.observaciones_programacion_desinstalacion,
        indicativo_aceptacion: row.indicativo_aceptacion_desinstalacion,
      });
    });
    setRows(aux);
  }, [rowsAux]);

  const textoPaginacion = `Mostrando de ${desde} a ${hasta} de ${total} resultados - Página ${page} de ${ultima_pagina}`;
  const [nombreFiltro, setnombreFiltro] = useState('');
  const [fechaOSInicialFiltro, setfechaOSInicialFiltro] = useState('');
  const [fechaOSFinalFiltro, setfechaOSFinalFiltro] = useState('');
  const [fechaProgInicialFiltro, setfechaProgInicialFiltro] = useState('');
  const [fechaProgFinalFiltro, setfechaProgFinalFiltro] = useState('');
  const [ciudadFiltro, setciudadFiltro] = useState('');
  const [ordenServicioFiltro, setordenServicioFiltro] = useState('');
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
      onGetColeccion(
        page,
        rowsPerPage,
        ordenServicioFiltro,
        orderByToSend,
        nombreFiltro,
        '',
        'REC,PRG,RUT',
        fechaOSInicialFiltro,
        fechaOSFinalFiltro,
        fechaProgInicialFiltro,
        fechaProgFinalFiltro,
        ciudadFiltro,
      ),
    );
  }, [dispatch, page, rowsPerPage, orderByToSend]);

  const updateColeccion = () => {
    dispatch(
      onGetColeccion(
        1,
        rowsPerPage,
        ordenServicioFiltro,
        orderByToSend,
        nombreFiltro,
        '',
        'REC,PRG,RUT',
        fechaOSInicialFiltro,
        fechaOSFinalFiltro,
        fechaProgInicialFiltro,
        fechaProgFinalFiltro,
        ciudadFiltro,
      ),
    );
  };

  const queryFilter = (e) => {
    switch (e.target.name) {
      case 'nombreFiltro':
        setnombreFiltro(e.target.value);
        break;
      case 'fechaOSInicialFiltro':
        setfechaOSInicialFiltro(e.target.value);
        break;
      case 'fechaOSFinalFiltro':
        setfechaOSFinalFiltro(e.target.value);
        break;
      case 'fechaProgInicialFiltro':
        setfechaProgInicialFiltro(e.target.value);
        break;
      case 'fechaProgFinalFiltro':
        setfechaProgFinalFiltro(e.target.value);
        break;
      case 'ciudadFiltro':
        setciudadFiltro(e.target.value);
        break;
      case 'ordenServicioFiltro':
        setordenServicioFiltro(e.target.value);
        break;
      default:
        break;
    }
  };

  const limpiarFiltros = () => {
    setnombreFiltro('');
    setfechaOSInicialFiltro('');
    setfechaOSFinalFiltro('');
    setfechaProgInicialFiltro('');
    setfechaProgFinalFiltro('');
    setciudadFiltro('');
    setordenServicioFiltro('');
    dispatch(
      onGetColeccion(
        1,
        rowsPerPage,
        ordenServicioFiltro,
        orderByToSend,
        '',
        '',
        'REC,PRG,RUT',
        '',
        '',
        '',
        '',
        '',
      ),
    );
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

  const onOpenEditProgramacionOrdenServicio = (row) => {
    setProgramacionOrdenServicioSeleccionado(row);
    setAccion('editar');
    setShowForm(true);
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

  const onOpenViewProgramacionOrdenServicio = (id) => {
    setProgramacionOrdenServicioSeleccionado(id);
    setAccion('ver');
    setShowForm(true);
  };

  const handleOnClose = () => {
    setShowForm(false);
    setProgramacionOrdenServicioSeleccionado(0);
    setAccion('ver');
  };
  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
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

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
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
            nombreFiltro={nombreFiltro}
            fechaOSInicialFiltro={fechaOSInicialFiltro}
            fechaOSFinalFiltro={fechaOSFinalFiltro}
            fechaProgInicialFiltro={fechaProgInicialFiltro}
            fechaProgFinalFiltro={fechaProgFinalFiltro}
            ciudadFiltro={ciudadFiltro}
            ordenServicioFiltro={ordenServicioFiltro}
            titulo={titulo}
            updateColeccion={updateColeccion}
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
                    // subRows.map(subRow=>{
                    return (
                      <TableRow
                        hover
                        // role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        className={classes.row}>
                        <TableCell align='center' className={classes.acciones}>
                          {permisos.indexOf('Programar') >= 0 && (
                            <Tooltip title={<IntlMessages id='boton.editar' />}>
                              <Person
                                onClick={() =>
                                  onOpenEditProgramacionOrdenServicio(row)
                                }
                                className={`${classes.generalIcons} ${classes.editIcon}`}></Person>
                            </Tooltip>
                          )}
                          {/* {permisos.indexOf('Listar') >= 0 && (
                                <Tooltip title={<IntlMessages id='boton.ver' />}>
                                  <VisibilityIcon
                                    onClick={() =>
                                      onOpenViewProgramacionOrdenServicio(row)
                                    }
                                    className={`${classes.generalIcons} ${classes.visivilityIcon}`}></VisibilityIcon>
                                </Tooltip>
                              )} */}
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
                    // });
                  })}
                  {/* {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}

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

      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Cambiar Densidad"
      /> */}
      {showForm ? (
        <ProgramacionOrdenServicioCreador
          showForm={showForm}
          selectedRow={programacionOrdenServicioSeleccionado}
          accion={accion}
          handleOnClose={handleOnClose}
          updateColeccion={updateColeccion}
          titulo={titulo}
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
      {/* <MessageView variant='error' message='sss' /> */}
    </div>
  );
};

export default ProgramacionOrdenServicio;
