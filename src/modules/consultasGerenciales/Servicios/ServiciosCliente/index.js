import React, {useState, useEffect} from 'react';
import {Box, Button} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import {Form, Formik, useField} from 'formik';
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
import * as yup from 'yup';
// import FilterListIcon from '@material-ui/icons/FilterList';
import {
  onGetColeccionCliente,
  onGetColeccionDatosCliente,
} from '../../../../redux/actions/CGServiciosAction';
import {useDispatch, useSelector} from 'react-redux';
// import {useLocation} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IntlMessages from '@crema/utility/IntlMessages';
import Popover from '@material-ui/core/Popover';
import TuneIcon from '@material-ui/icons/Tune';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CustomPieChart from 'shared/components/PieChart';
import MyTable from 'shared/components/Table';
import {
  ESTADOS_ORDEN_SERVICIO,
  TIPOS_SERVICIOS,
} from 'shared/constants/ListasValores';
import ConsultaOrdenServicio from './../../../solicitudesServicio/ConsultaOrdenServicio';

const cellsTable = [
  {
    id: 'name',
    typeHead: 'string',
    label: 'Estado',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'value',
    typeHead: 'numeric',
    label: 'Numero',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'porcentaje',
    typeHead: 'numeric',
    label: 'Participacion',
    value: (value) => `${(value * 100).toFixed(2)}%`,
    align: 'right',
    mostrarInicio: true,
  },
];

const cells = [
  {
    id: 'numero_documento',
    typeHead: 'numeric',
    label: 'NIT',
    value: (value) => value,
    align: 'right',
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
    id: 'numero_orden_servicio',
    typeHead: 'numeric',
    label: 'Numero Orden',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'numero_viaje',
    typeHead: 'numeric',
    label: 'Numero Viaje',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'tipo_servicio',
    typeHead: 'string',
    label: 'Tipo Servicio',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'fecha_creacion',
    typeHead: 'string',
    label: 'Fecha de Registro',
    value: (value) => new Date(value).toLocaleDateString('es-CL'),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'usuario_creacion_nombre',
    typeHead: 'string',
    label: 'Usuario Grabacion',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'fecha_orden_servicio',
    typeHead: 'string',
    label: 'Fecha Solicitud',
    value: (value) => new Date(value).toLocaleDateString('es-CL'),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'dias_recibido',
    typeHead: 'numeric',
    label: 'Dias Recibido',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'dias_programacion',
    typeHead: 'numeric',
    label: 'Dias Programacion',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'dias_inicio_viaje',
    typeHead: 'numeric',
    label: 'Dias Inicio Viaje',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'dias_ruta_viaje',
    typeHead: 'numeric',
    label: 'Dias Ruta Viaje',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'dias_interfaz_facturacion',
    typeHead: 'numeric',
    label: 'Dias Interfaz Fact.',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'dias_facturacion',
    typeHead: 'numeric',
    label: 'Dias Facturacion',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'dias_anulacion',
    typeHead: 'numeric',
    label: 'Dias Anulacion',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'dias_solicitud_facturacion',
    typeHead: 'numeric',
    label: 'Dias Solicitud/Facturacion',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'dias_inicio_facturacion',
    typeHead: 'numeric',
    label: 'Dias Inicio/Facturacion',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
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

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
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
  exportButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  x: {
    position: 'absolute',
    color: '#4caf50',
    fontSize: '14px',
    top: '19px',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    maxHeight: 48,
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
    maxHeight: 48,
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
    gridTemplateColumns: '2fr 2fr 1fr',
    gap: '20px',
  },
  pairFilters: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    minWidth: '100px',
  },
  exportButton2: {
    backgroundColor: '#00254A',
    color: 'white',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  check: {
    position: 'absolute',
    color: '#00254A',
    fontSize: '14px',
    top: '19px',
    fontWeight: 'bold',
  },
  MyRadioField: {
    width: '100%',
    marginBottom: 0,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 0,
    },
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    titulo,
    handleOpenPopoverColumns,
    fechaFinalFiltro,
    fechaInicialFiltro,
    fechaInstInicialFiltro,
    fechaInstFinalFiltro,
    limpiarFiltros,
    permisos,
    validationSchema,
    getValues,
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
          <Formik
            validateOnBlur={false}
            enableReinitialize={true}
            initialValues={{
              fechaFinalFiltro: '',
              fechaInicialFiltro: '',
              fechaInstInicialFiltro: '',
              fechaInstFinalFiltro: '',
              one: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              getValues(values);
            }}>
            {({values, handleReset, isValid, resetForm}) => (
              <Form noValidate>
                <Box className={classes.contenedorFiltros}>
                  <MyTextField
                    label='Fecha Solicitud Inicial'
                    name='fechaInicialFiltro'
                    value={fechaInicialFiltro}
                    id='fechaInicialFiltro'
                    disabled={
                      values.fechaInstFinalFiltro ||
                      values.fechaInstInicialFiltro
                    }
                    type='date'
                    InputLabelProps={{shrink: true}}
                  />
                  <MyTextField
                    label='Fecha Solicitud Final'
                    name='fechaFinalFiltro'
                    value={fechaFinalFiltro}
                    id='fechaFinalFiltro'
                    disabled={
                      values.fechaInstFinalFiltro ||
                      values.fechaInstInicialFiltro
                    }
                    type='date'
                    InputLabelProps={{shrink: true}}
                  />
                  <Box display='grid'>
                    <Box display='flex' mb={2} justifyContent={'flex-end'}>
                      <Tooltip
                        title='Limpiar Filtros'
                        onClick={() => {
                          resetForm();
                          limpiarFiltros();
                        }}>
                        <IconButton
                          className={classes.clearButton}
                          aria-label='filter list'>
                          <ClearAllIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Buscar' style={{marginLeft: 20}}>
                        <IconButton
                          type='submit'
                          className={classes.createButton}
                          aria-label='filter list'>
                          <SearchIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
                <Box className={classes.contenedorFiltros}>
                  <MyTextField
                    label='Fecha Instalacion Inicial'
                    name='fechaInstInicialFiltro'
                    value={fechaInstInicialFiltro}
                    id='fechaInstInicialFiltro'
                    disabled={
                      values.fechaFinalFiltro || values.fechaInicialFiltro
                    }
                    type='date'
                    InputLabelProps={{shrink: true}}
                  />
                  <MyTextField
                    label='Fecha Instalacion Final'
                    name='fechaInstFinalFiltro'
                    value={fechaInstFinalFiltro}
                    id='fechaInstFinalFiltro'
                    disabled={
                      values.fechaFinalFiltro || values.fechaInicialFiltro
                    }
                    type='date'
                    InputLabelProps={{shrink: true}}
                  />
                </Box>
                <Box className={classes.contenedorFiltros}>
                  <Box width={'100%'} display={'flex'}>
                    <MyTextField name='one' label='' type='hidden' />
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleOpenPopoverColumns: PropTypes.func.isRequired,
  queryFilter: PropTypes.func.isRequired,
  limpiarFiltros: PropTypes.func.isRequired,
  fechaFinalFiltro: PropTypes.string.isRequired,
  fechaInicialFiltro: PropTypes.string.isRequired,
  fechaInstFinalFiltro: PropTypes.string.isRequired,
  fechaInstInicialFiltro: PropTypes.string.isRequired,
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

const ServiciosClienteConsulta = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [accion, setAccion] = useState('ver');
  const [ordenServicioSeleccionado, setOrdenServicioSeleccionado] = useState(0);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [orderByToSend, setOrderByToSend] = React.useState(
    'numero_cotizacion_servicio:desc',
  );
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  // const [dense, setDense] = React.useState(false);
  const dense = true; //Borrar cuando se use el change
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rowsPerPageOptions = [5, 10, 15, 25, 50];

  const {rows, desde, hasta, ultima_pagina, total} = useSelector(
    ({cGOrdenServicioReducer}) => cGOrdenServicioReducer,
  );
  const datosTabla = useSelector(
    ({cGOrdenServicioReducer}) => cGOrdenServicioReducer.ligera,
  );
  const textoPaginacion = `Mostrando de ${desde} a ${hasta} de ${total} resultados - Página ${page} de ${ultima_pagina}`;
  const [fechaFinalFiltro, setFechaFinalFiltro] = useState('');
  const [fechaInicialFiltro, setFechaInicialFiltro] = useState('');
  const [fechaInstFinalFiltro, setFechaInstFinalFiltro] = useState('');
  const [fechaInstInicialFiltro, setFechaInstInicialFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  // const {pathname} = useLocation();
  const [openPopOver, setOpenPopOver] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState(null);
  const [showData, setShowData] = useState(false);
  //const [tipoCotizacion, setTipoCotizacion] = useState('Servicios');

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

  const columnasTabla = [];

  cellsTable.forEach((cell) => {
    columnasTabla.push({
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

  useEffect(() => {
    if (
      (fechaInicialFiltro && fechaFinalFiltro) ||
      (fechaInstInicialFiltro && fechaInstFinalFiltro)
    ) {
      dispatch(
        onGetColeccionDatosCliente(
          fechaInicialFiltro,
          fechaFinalFiltro,
          fechaInstInicialFiltro,
          fechaInstFinalFiltro,
        ),
      );
      setShowData(true);
    } else {
      setShowData(false);
    }
  }, [
    dispatch,
    fechaInicialFiltro,
    fechaFinalFiltro,
    fechaInstInicialFiltro,
    fechaInstFinalFiltro,
  ]);

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
      onGetColeccionCliente(
        page,
        rowsPerPage,
        fechaInicialFiltro,
        fechaFinalFiltro,
        fechaInstInicialFiltro,
        fechaInstFinalFiltro,
        estadoFiltro,
        orderByToSend,
      ),
    );
  }, [
    dispatch,
    page,
    rowsPerPage,
    fechaInicialFiltro,
    fechaFinalFiltro,
    fechaInstInicialFiltro,
    fechaInstFinalFiltro,
    estadoFiltro,
    orderByToSend,
  ]);

  const updateColeccion = () => {
    dispatch(
      onGetColeccionCliente(
        page,
        rowsPerPage,
        fechaInicialFiltro,
        fechaFinalFiltro,
        fechaInstInicialFiltro,
        fechaInstFinalFiltro,
        estadoFiltro,
        orderByToSend,
      ),
    );
  };

  const queryFilter = (e) => {
    switch (e.target.name) {
      case 'fechaFinalFiltro':
        setFechaFinalFiltro(e.target.value);
        break;
      case 'fechaInicialFiltro':
        setFechaInicialFiltro(e.target.value);
        break;
      case 'fechaInstInicialFiltro':
        setFechaInstInicialFiltro(e.target.value);
        break;
      case 'fechaInstFinalFiltro':
        setFechaInstFinalFiltro(e.target.value);
        break;
      case 'estadoFiltro':
        setEstadoFiltro(e.target.value);
        break;
      default:
        break;
    }
  };

  const limpiarFiltros = () => {
    setFechaFinalFiltro('');
    setFechaInicialFiltro('');
    setFechaInstInicialFiltro('');
    setFechaInstFinalFiltro('');
    setEstadoFiltro('');
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

  const onOpenViewOrdenServicio = (id) => {
    setOrdenServicioSeleccionado(id);
    setAccion('ver');
    setShowForm(true);
  };

  const handleOnClose = () => {
    setShowForm(false);
    setOrdenServicioSeleccionado(0);
    setAccion('ver');
  };

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

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const [showTable, setShowTable] = useState(true);
  useEffect(() => {
    if (rows.length === 0) {
      setShowTable(false);
    } else {
      setShowTable(true);
    }
  }, [rows]);

  const validationSchema = yup.object().shape(
    {
      fechaInicialFiltro: yup
        .date()
        .nullable()
        .when('fechaFinalFiltro', {
          is: (fechaFinalFiltro) => !fechaFinalFiltro,
          then: yup.date().nullable(),
          otherwise: yup
            .date()
            .required(
              'Fecha inicial es requerida cuando se especifica una final',
            ),
        }),
      fechaFinalFiltro: yup
        .date()
        .nullable()
        .when(['fechaInicialFiltro'], {
          is: (fechaInicialFiltro) => !fechaInicialFiltro,
          then: yup.date().nullable(),
          otherwise: yup
            .date()
            .required(
              'Fecha final es requerida cuando se especifica una inicial',
            )
            .min(
              yup.ref('fechaInicialFiltro'),
              'Fecha Final debe ser mayor que inicial',
            ),
        }),
      fechaInstInicialFiltro: yup
        .date()
        .nullable()
        .when('fechaInstFinalFiltro', {
          is: (fechaInstFinalFiltro) => !fechaInstFinalFiltro,
          then: yup.date().nullable(),
          otherwise: yup
            .date()
            .required(
              'Fecha inicial es requerida cuando se especifica una final',
            ),
        }),
      fechaInstFinalFiltro: yup
        .date()
        .nullable()
        .when(['fechaInstInicialFiltro'], {
          is: (fechaInstInicialFiltro) => !fechaInstInicialFiltro,
          then: yup.date().nullable(),
          otherwise: yup
            .date()
            .required(
              'Fecha final es requerida cuando se especifica una inicial',
            )
            .min(
              yup.ref('fechaInstInicialFiltro'),
              'Fecha Final debe ser mayor que inicial',
            ),
        }),
      one: yup
        .string()
        .when(
          [
            'fechaFinalFiltro',
            'fechaInicialFiltro',
            'fechaInstFinalFiltro',
            'fechaInstInicialFiltro',
          ],
          {
            is: (
              fechaFinalFiltro,
              fechaInicialFiltro,
              fechaInstFinalFiltro,
              fechaInstInicialFiltro,
            ) =>
              !fechaFinalFiltro &&
              !fechaInicialFiltro &&
              !fechaInstFinalFiltro &&
              !fechaInstInicialFiltro,
            then: yup.string().required('Debe seleccionar al Menos 1 Filtro'),
            otherwise: yup.string().nullable(),
          },
        ),
    },
    [
      ['fechaInicialFiltro', 'fechaFinalFiltro'],
      ['fechaInstInicialFiltro', 'fechaInstFinalFiltro'],
    ],
  );

  const getValues = (value) => {
    setFechaInicialFiltro(value.fechaInicialFiltro);
    setFechaFinalFiltro(value.fechaFinalFiltro);
    setFechaInstInicialFiltro(value.fechaInstInicialFiltro);
    setFechaInstFinalFiltro(value.fechaInstFinalFiltro);
  };

  const setEstado = (estado) => {
    setEstadoFiltro(estado);
  };

  const calcProms = () => {
    let receiveDays = [];
    let programDays = [];
    let starTripDays = [];
    let routeTripDays = [];
    let intFactDays = [];
    let factDays = [];
    let anulDays = [];
    let solToFactDays = [];
    let startToFactDays = [];
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
    rows.map((row, index) => {
      // eslint-disable-line
      receiveDays[index] = row.dias_recibido;
      programDays[index] = row.dias_programacion;
      starTripDays[index] = row.dias_inicio_viaje;
      routeTripDays[index] = row.dias_ruta_viaje;
      intFactDays[index] = row.dias_interfaz_facturacion;
      factDays[index] = row.dias_facturacion;
      anulDays[index] = row.dias_anulacion;
      solToFactDays[index] = row.dias_solicitud_facturacion;
      startToFactDays[index] = row.dias_inicio_facturacion;
    });
    let promReceiveDays = 0;
    let promProgramDays = 0;
    let promStarTripDays = 0;
    let promRouteTripDays = 0;
    let promIntFactDays = 0;
    let promFactDays = 0;
    let promAnulDays = 0;
    let promSolToFactDays = 0;
    let promStartToFactDays = 0;
    if (receiveDays.length) {
      promReceiveDays = (
        receiveDays.reduce(reducer) / receiveDays.length
      ).toFixed(2);
      promProgramDays = (
        programDays.reduce(reducer) / receiveDays.length
      ).toFixed(2);
      promStarTripDays = (
        starTripDays.reduce(reducer) / receiveDays.length
      ).toFixed(2);
      promRouteTripDays = (
        routeTripDays.reduce(reducer) / receiveDays.length
      ).toFixed(2);
      promIntFactDays = (
        intFactDays.reduce(reducer) / receiveDays.length
      ).toFixed(2);
      promFactDays = (factDays.reduce(reducer) / receiveDays.length).toFixed(2);
      promAnulDays = (anulDays.reduce(reducer) / receiveDays.length).toFixed(2);
      promSolToFactDays = (
        solToFactDays.reduce(reducer) / receiveDays.length
      ).toFixed(2);
      promStartToFactDays = (
        startToFactDays.reduce(reducer) / receiveDays.length
      ).toFixed(2);
    }
    return {
      promReceiveDays,
      promProgramDays,
      promStarTripDays,
      promRouteTripDays,
      promIntFactDays,
      promFactDays,
      promAnulDays,
      promSolToFactDays,
      promStartToFactDays,
    };
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {permisos && (
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleOpenPopoverColumns={handleOpenPopoverColumns}
            queryFilter={queryFilter}
            limpiarFiltros={limpiarFiltros}
            fechaFinalFiltro={fechaFinalFiltro}
            fechaInicialFiltro={fechaInicialFiltro}
            fechaInstInicialFiltro={fechaInstInicialFiltro}
            fechaInstFinalFiltro={fechaInstFinalFiltro}
            estadoFiltro={estadoFiltro}
            permisos={permisos}
            titulo={titulo}
            getValues={getValues}
            validationSchema={validationSchema}
          />
        )}
        <Box className={classes.marcoTabla}>
          {showData && (
            <CustomPieChart
              datos={datosTabla}
              titulo={'Ordenes de Servicio'}
              onClick={setEstado}
            />
          )}
          {showData && (
            <MyTable
              headers={['Estado', 'Numero', 'Participacion']}
              data={datosTabla}
              columns={columnasTabla}
            />
          )}
        </Box>
        {!permisos ? (
          <Box
            component='h2'
            padding={4}
            fontSize={19}
            className={classes.marcoTabla}>
            <IntlMessages id='noAutorizado' />
          </Box>
        ) : !fechaInicialFiltro &&
          !fechaFinalFiltro &&
          !fechaInstInicialFiltro &&
          !fechaInstFinalFiltro ? (
          ''
        ) : !showTable ? (
          <Box
            component='h2'
            padding={4}
            fontSize={19}
            className={classes.marcoTabla}>
            <IntlMessages id='sinResultados' />
          </Box>
        ) : showTable && !estadoFiltro ? (
          ''
        ) : (
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
                        // role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        className={classes.row}>
                        <TableCell align='center' className={classes.acciones}>
                          {permisos.indexOf('Listar') >= 0 && (
                            <Tooltip title={<IntlMessages id='boton.ver' />}>
                              <VisibilityIcon
                                onClick={() => onOpenViewOrdenServicio(row.id)}
                                className={`${classes.generalIcons} ${classes.visivilityIcon}`}></VisibilityIcon>
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
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={236789}
                    className={classes.row}>
                    <MyCell
                      value={''}
                      align={'left'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={''}
                      align={'left'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={''}
                      align={'left'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={''}
                      align={'left'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={''}
                      align={'left'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={''}
                      align={'left'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={''}
                      align={'left'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={''}
                      align={'left'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={'Promedio:'}
                      align={'left'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={calcProms().promReceiveDays}
                      align={'right'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={calcProms().promProgramDays}
                      align={'right'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={calcProms().promStarTripDays}
                      align={'right'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={calcProms().promRouteTripDays}
                      align={'right'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={calcProms().promIntFactDays}
                      align={'right'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={calcProms().promFactDays}
                      align={'right'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={calcProms().promAnulDays}
                      align={'right'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={calcProms().promSolToFactDays}
                      align={'right'}
                      claseBase={classes.cell}
                    />
                    <MyCell
                      value={calcProms().promStartToFactDays}
                      align={'right'}
                      claseBase={classes.cell}
                    />
                  </TableRow>
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
        )}
      </Paper>

      {showForm ? (
        <ConsultaOrdenServicio
          showForm={showForm}
          ordenServicio={ordenServicioSeleccionado}
          accion={accion}
          handleOnClose={handleOnClose}
          updateColeccion={updateColeccion}
          titulo={'Consulta Orden Servicio'}
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
      {/* <MessageView variant='error' message='sss' /> */}
    </div>
  );
};

export default ServiciosClienteConsulta;
