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
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
// import FilterListIcon from '@material-ui/icons/FilterList';
import {
  onGetColeccion,
  onDelete,
} from '../../../redux/actions/AcuerdoServicioAction';
import {onGetColeccionLigera as onGetColeccionLigeraAsociado} from '../../../redux/actions/AsociadoAction';
import {useDispatch, useSelector} from 'react-redux';
// import {useLocation} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Popover from '@material-ui/core/Popover';
import TuneIcon from '@material-ui/icons/Tune';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import AcuerdoServicioCreador from './AcuerdoServicioCreador';
import HotelIcon from '@material-ui/icons/Hotel';
import {ESTADO_ACUERDO_SERVICIO} from './../../../shared/constants/ListasValores';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import DirectionsIcon from '@material-ui/icons/Directions';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SwapCallsIcon from '@material-ui/icons/SwapCalls';
import AcuerdoServicioConsulta from './AcuerdoServicioConsulta';
// import MenuItem from '@material-ui/core/MenuItem';
import GetAppIcon from '@material-ui/icons/GetApp';

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
    id: 'numero_acuerdo_servicio',
    typeHead: 'numeric',
    label: 'N° Acuerdo',
    value: (value) => value,
    align: 'right',
    mostrarInicio: true,
  },
  {
    id: 'fecha_acuerdo_servicio',
    typeHead: 'string',
    label: 'Fecha Acuerdo',
    value: (value) =>
      new Date(value).toLocaleDateString('es-CL', {timeZone: 'UTC'}),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'numero_documento',
    typeHead: 'numeric',
    label: 'Documento',
    value: (value) => value,
    align: 'right',
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
    id: 'estado_acuerdo',
    typeHead: 'string',
    label: 'Estado Acuerdo',
    value: (value) =>
      ESTADO_ACUERDO_SERVICIO.map((estado) =>
        estado.id === value ? estado.nombre : '',
      ),
    align: 'left',
    width: '140px',
    mostrarInicio: true,
  },
  {
    id: 'observaciones',
    typeHead: 'string',
    label: 'Observaciones',
    value: (value) => value,
    align: 'left',
    width: '140px',
    mostrarInicio: false,
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
        <TableCell align='center' className={classes.headCellWoMargin}>
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
        <TableCell align='center' className={classes.headCellWoMargin}>
          {'Rutas a Controlar'}
        </TableCell>
        <TableCell align='center' className={classes.headCellWoMargin}>
          {'Puestos de Control'}
        </TableCell>
        <TableCell align='center' className={classes.headCellWoMargin}>
          {'Puestos Paradas'}
        </TableCell>
        <TableCell align='center' className={classes.headCellWoMargin}>
          {'Rutas Autorizadas'}
        </TableCell>
        <TableCell align='center' className={classes.headCellWoMargin}>
          {'Contactos Notificación'}
        </TableCell>
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
    gap: '20px',
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
    onOpenAddAcuerdoServicio,
    handleOpenPopoverColumns,
    queryFilter,
    nombreFiltro,
    numeroDocumentoFiltro,
    limpiarFiltros,
    permisos,
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
              {permisos.indexOf('Crear') >= 0 && (
                <Tooltip
                  title='Crear Acuerdo Servicio'
                  onClick={onOpenAddAcuerdoServicio}>
                  <IconButton
                    className={classes.createButton}
                    aria-label='filter list'>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
          <Box className={classes.contenedorFiltros}>
            <TextField
              label='Nombre'
              name='nombreFiltro'
              id='nombreFiltro'
              onChange={queryFilter}
              value={nombreFiltro}
            />
            <TextField
              label='Número Documento'
              name='numeroDocumentoFiltro'
              id='numeroDocumentoFiltro'
              onChange={queryFilter}
              value={numeroDocumentoFiltro}
            />
            <Box display='grid'>
              <Box display='flex' mb={2}>
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
        // <Tooltip title="Filtros Avanzados">
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
  onOpenAddAcuerdoServicio: PropTypes.func.isRequired,
  handleOpenPopoverColumns: PropTypes.func.isRequired,
  queryFilter: PropTypes.func.isRequired,
  limpiarFiltros: PropTypes.func.isRequired,
  nombreFiltro: PropTypes.string.isRequired,
  numeroDocumentoFiltro: PropTypes.string.isRequired,
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
  headCellWoMargin: {
    padding: '0px',
    width: 'max-content',
    fontSize: '12px',
    [theme.breakpoints.up('xl')]: {
      fontSize: '14px',
    },
  },
  row: {
    // display:'grid',
    // gridTemplateColumns:gridTemplate,
    padding: 'none',
  },
  cell: (props) => ({
    fontSize: '13px',
    [theme.breakpoints.up('xl')]: {
      fontSize: '14px',
    },
    padding: props.vp + ' 0px ' + props.vp + ' 10px',
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
    padding: props.vp + ' 0px ' + props.vp + ' 10px',
    minWidth: '120px',
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
    height: '20px',
    [theme.breakpoints.up('xl')]: {
      height: '25px',
    },
    '&:hover': {
      color: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  editIcon: {
    color: theme.palette.primary.main,
  },
  legalIcon: {
    color: 'black',
  },
  contactIcon: {
    color: 'lightgreen',
  },
  bancariaIcon: {
    color: 'gray',
  },
  comercialIcon: {
    color: 'darkgreen',
  },
  documentosIcon: {
    color: theme.palette.primary.main,
  },
  seguridadIcon: {
    color: 'red',
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

const AcuerdoServicio = (props) => {
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

  const [showForm, setShowForm] = useState(false);
  const [accion, setAccion] = useState('ver');
  const [acuerdoServicioSeleccionado, setAcuerdoServicioSeleccionado] =
    useState(0);
  const {rows, desde, hasta, ultima_pagina, total} = useSelector(
    ({acuerdoServicioReducer}) => acuerdoServicioReducer,
  );
  const textoPaginacion = `Mostrando de ${desde} a ${hasta} de ${total} resultados - Página ${page} de ${ultima_pagina}`;
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [numeroDocumentoFiltro, setNumeroDocumentoFiltro] = useState('');
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
        nombreFiltro,
        orderByToSend,
        numeroDocumentoFiltro,
      ),
    );
  }, [
    dispatch,
    page,
    rowsPerPage,
    nombreFiltro,
    orderByToSend,
    numeroDocumentoFiltro,
  ]);

  const updateColeccion = () => {
    setPage(1);
    dispatch(
      onGetColeccion(
        page,
        rowsPerPage,
        nombreFiltro,
        orderByToSend,
        numeroDocumentoFiltro,
      ),
    );
  };

  useEffect(() => {
    setPage(1);
  }, [nombreFiltro, orderByToSend, numeroDocumentoFiltro]);

  const asociados = useSelector(({asociadoReducer}) => asociadoReducer.ligera);

  useEffect(() => {
    dispatch(onGetColeccionLigeraAsociado());
  }, [dispatch]);

  const queryFilter = (e) => {
    switch (e.target.name) {
      case 'nombreFiltro':
        setNombreFiltro(e.target.value);
        break;
      case 'numeroDocumentoFiltro':
        setNumeroDocumentoFiltro(e.target.value);
        break;
      default:
        break;
    }
  };

  const limpiarFiltros = () => {
    setNombreFiltro('');
    setNumeroDocumentoFiltro('');
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

  const onOpenEditAcuerdoServicio = (id) => {
    setAcuerdoServicioSeleccionado(id);
    setAccion('editar');
    setShowForm(true);
  };

  const onOpenAddAcuerdoServicio = () => {
    setAcuerdoServicioSeleccionado(0);
    setAccion('crear');
    setShowForm(true);
  };

  const onOpenViewAcuerdoServicio = (id) => {
    setAcuerdoServicioSeleccionado(id);
    setAccion('ver');
    setShowForm(true);
  };

  const handleOnClose = () => {
    setShowForm(false);
    setAcuerdoServicioSeleccionado(0);
    setAccion('ver');
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

  const onDeleteAcuerdoServicio = (id) => {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Seguro qué desea anular el acuerdo de servicio?',
      allowEscapeKey: false,
      allowEnterKey: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(onDelete(id));
        Swal.fire(
          'Anulado',
          'El acuerdo de servicio anulado correctamente',
          'success',
        );
        setTimeout(() => {
          updateColeccion();
        }, 1000);
      }
    });
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
            onOpenAddAcuerdoServicio={onOpenAddAcuerdoServicio}
            handleOpenPopoverColumns={handleOpenPopoverColumns}
            queryFilter={queryFilter}
            limpiarFiltros={limpiarFiltros}
            nombreFiltro={nombreFiltro}
            numeroDocumentoFiltro={numeroDocumentoFiltro}
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
                  {
                    // stableSort(rows, getComparator(order, orderBy))
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    rows.map((row, index) => {
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
                          {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell> */}

                          <TableCell
                            align='center'
                            className={classes.acciones}>
                            {permisos.indexOf('Modificar') >= 0 &&
                              row.estado_acuerdo !== 'ANU' && (
                                <Tooltip
                                  title={<IntlMessages id='boton.editar' />}>
                                  <EditIcon
                                    onClick={() =>
                                      onOpenEditAcuerdoServicio(row.id)
                                    }
                                    className={`${classes.generalIcons} ${classes.editIcon}`}></EditIcon>
                                </Tooltip>
                              )}
                            {permisos.indexOf('Listar') >= 0 && (
                              <Tooltip title={<IntlMessages id='boton.ver' />}>
                                <VisibilityIcon
                                  onClick={() =>
                                    onOpenViewAcuerdoServicio(row.id)
                                  }
                                  className={`${classes.generalIcons} ${classes.visivilityIcon}`}></VisibilityIcon>
                              </Tooltip>
                            )}
                            {permisos.indexOf('Eliminar') >= 0 &&
                              row.estado_acuerdo !== 'ANU' && (
                                <Tooltip
                                  title={<IntlMessages id='boton.eliminar' />}>
                                  <DeleteIcon
                                    onClick={() =>
                                      onDeleteAcuerdoServicio(row.id)
                                    }
                                    className={`${classes.generalIcons} ${classes.deleteIcon}`}></DeleteIcon>
                                </Tooltip>
                              )}
                            <Box
                              component='a'
                              href={
                                'http://solicitudesservicio.test/acuerdos-servicio/descargar-formulario/' +
                                row.id
                              }
                              // href={'http://186.97.135.74:3380/solicitudesservicio-backend/public/acuerdos-servicio/descargar-formulario/' + row.id}
                              className={classes.generalIcons}>
                              <Tooltip
                                title={
                                  'Descargar Formulario Representante Legal'
                                }>
                                <GetAppIcon
                                  className={`${classes.generalIcons} ${classes.descargarIcon}`}></GetAppIcon>
                              </Tooltip>
                            </Box>
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
                          <TableCell align='center' className={classes.cell}>
                            <Box
                              component='a'
                              href={'/rutas-control/' + row.id}
                              className={classes.generalIcons}>
                              <Tooltip title={'Rutas a Controlar'}>
                                <SwapCallsIcon
                                  className={`${classes.generalIcons} ${classes.legalIcon}`}></SwapCallsIcon>
                              </Tooltip>
                            </Box>
                          </TableCell>
                          <TableCell align='center' className={classes.cell}>
                            <Box
                              component='a'
                              href={'/puestos-control/' + row.id}
                              className={classes.generalIcons}>
                              <Tooltip
                                title={<IntlMessages id='boton.contactos' />}>
                                <LocalShippingIcon
                                  className={`${classes.generalIcons} ${classes.contactIcon}`}></LocalShippingIcon>
                              </Tooltip>
                            </Box>
                          </TableCell>
                          <TableCell align='center' className={classes.cell}>
                            <Box
                              component='a'
                              href={'/puestos-parada/' + row.id}>
                              <Tooltip title={'Puestos Paradas'}>
                                <HotelIcon
                                  className={`${classes.generalIcons} ${classes.bancariaIcon}`}></HotelIcon>
                              </Tooltip>
                            </Box>
                          </TableCell>
                          <TableCell align='center' className={classes.cell}>
                            <Box
                              component='a'
                              href={'/rutas-autorizacion/' + row.id}>
                              <Tooltip title={'Rutas Autorizadas'}>
                                <DirectionsIcon
                                  className={`${classes.generalIcons} ${classes.comercialIcon}`}></DirectionsIcon>
                              </Tooltip>
                            </Box>
                          </TableCell>
                          <TableCell align='center' className={classes.cell}>
                            <Box
                              component='a'
                              href={'/acuerdos-contactos/' + row.id}>
                              <Tooltip title={'Notificación Contactos'}>
                                <NotificationsActiveIcon
                                  className={`${classes.generalIcons} ${classes.documentosIcon}`}></NotificationsActiveIcon>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  }
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

      {showForm && accion !== 'ver' ? (
        <AcuerdoServicioCreador
          showForm={showForm}
          acuerdoServicio={acuerdoServicioSeleccionado}
          accion={accion}
          handleOnClose={handleOnClose}
          updateColeccion={updateColeccion}
          titulo={titulo}
          asociados={asociados}
        />
      ) : (
        ''
      )}

      {showForm && accion === 'ver' ? (
        <AcuerdoServicioConsulta
          showForm={showForm}
          acuerdoServicio={acuerdoServicioSeleccionado}
          accion={accion}
          handleOnClose={handleOnClose}
          updateColeccion={updateColeccion}
          titulo={titulo}
          asociados={asociados}
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

export default AcuerdoServicio;
