import React, {useState, useEffect} from 'react';
import {Box, Button} from '@material-ui/core';
import PropTypes from 'prop-types';
import DetalleCotizacionCreador from './DetalleSolicitudCotizacionV2Creador';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import {onGetColeccion} from 'redux/actions/DetalleSolicitudCotizacionServicioAction';
import {onGetColeccionLigera as onGetColeccionLigeraCiudad} from 'redux/actions/CiudadAction';
import {onGetColeccionLigera as onGetColeccionLigeraServicio} from 'redux/actions/ServicioAction';
import {useDispatch, useSelector} from 'react-redux';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IntlMessages from '@crema/utility/IntlMessages';
import Popover from '@material-ui/core/Popover';
import TuneIcon from '@material-ui/icons/Tune';
import Swal from 'sweetalert2';
import {
  DELETE_DETALLE_COTIZACION,
  DELETE_DETALLE_SOLICITUD_COTIZACION_SERVICIO,
} from 'shared/constants/ActionTypes';
import {TIPOS_SERVICIOS} from 'shared/constants/ListasValores';

const cells = [
  {
    id: 'ciudad_origen',
    typeHead: 'string',
    label: 'Ciudad Origen',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'ciudad_destino',
    typeHead: 'string',
    label: 'Ciudad Destino',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'servicio',
    typeHead: 'string',
    label: 'Servicio',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'tipo_servicio',
    typeHead: 'string',
    label: 'Tipo Servicio',
    value: (value) =>
      TIPOS_SERVICIOS.map((TIPO) => (TIPO.id === value ? TIPO.nombre : '')),
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'tipo_servicio_otro',
    typeHead: 'string',
    label: 'Tipo Servicio Otro',
    value: (value) => value,
    align: 'left',
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
  onRequestSort: PropTypes.func.isRequired,
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
    width: '100%',
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
  const {handleOpenPopoverColumns, onOpenAddDetalleCotizacion} = props;
  return (
    <Toolbar>
      <>
        <Box className={classes.titleTop}>
          <Typography
            className={classes.title}
            variant='h6'
            id='tableTitle'
            component='div'>
            Detalle Solicitud Cotización
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

            <Tooltip
              title='Crear Solicitud Cotizacion'
              onClick={() => {
                onOpenAddDetalleCotizacion();
              }}>
              <IconButton
                className={classes.createButton}
                aria-label='filter list'>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  handleOpenPopoverColumns: PropTypes.func.isRequired,
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
    paddingTop: '20px',
    paddingBottom: '20px',
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

const DetalleSolicitudCotizacionV2 = (props) => {
  const [idAux, setIdAux] = useState(-1000);
  const {empresa, fecha, id, accionDetalle, setDetalles, asociado_id} = props;
  const [showForm, setShowForm] = useState(false);
  const [accion, setAccion] = useState('ver');
  const [detalleCotizacionSeleccionado, setDetalleCotizacionSeleccionado] =
    useState(0);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [orderByToSend, setOrderByToSend] = React.useState(
    'fecha_modificacion:desc',
  );
  const [page, setPage] = React.useState(1);
  // const [dense, setDense] = React.useState(false);
  const dense = true; //Borrar cuando se use el change
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rowsPerPageOptions = [5, 10, 15, 25, 50];

  const {rows, desde, hasta, ultima_pagina, total} = useSelector(
    ({detalleSolicitudCotizacionServicioReducer}) =>
      detalleSolicitudCotizacionServicioReducer,
  );

  const textoPaginacion = `Mostrando de ${desde} a ${hasta} de ${total} resultados - Página ${page} de ${ultima_pagina}`;
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

  const ciudades = useSelector(({ciudadReducer}) => ciudadReducer.ligera);
  const servicios = useSelector(({servicioReducer}) => servicioReducer.ligera);

  useEffect(() => {
    dispatch(onGetColeccionLigeraCiudad());
    dispatch(onGetColeccionLigeraServicio());
  }, [dispatch]);

  useEffect(() => {
    if (accionDetalle !== 'crear' && id) {
      dispatch(onGetColeccion(page, rowsPerPage, orderByToSend, id));
    }
  }, [dispatch, page, rowsPerPage, orderByToSend, id, accionDetalle]);

  useEffect(() => {
    setDetalles(rows);
  }, [rows, setDetalles]);

  useEffect(() => {
    setPage(1);
  }, [orderByToSend]);

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

  const onOpenEditDetalleCotizacion = (id) => {
    setDetalleCotizacionSeleccionado(id);
    setAccion('editar');
    setShowForm(true);
  };

  const onOpenAddDetalleCotizacion = () => {
    setDetalleCotizacionSeleccionado(0);
    setAccion('crear');
    setShowForm(true);
  };

  const onOpenViewDetalleCotizacion = (id) => {
    setDetalleCotizacionSeleccionado(id);
    setAccion('ver');
    setShowForm(true);
  };

  const handleOnClose = () => {
    setShowForm(false);
    setDetalleCotizacionSeleccionado(0);
    setAccion('ver');
  };

  const onDeleteCotizacion = (id) => {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Seguro Que Desea Eliminar La Solicitud Cotizacion?',
      allowEscapeKey: false,
      allowEnterKey: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: DELETE_DETALLE_SOLICITUD_COTIZACION_SERVICIO,
          payload: rows.filter((row) => row.id !== id),
        });
        Swal.fire(
          'Eliminado',
          'El Detalle Fue Eliminado Correctamente',
          'success',
        );
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <Box className={classes.marcoTabla}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          handleOpenPopoverColumns={handleOpenPopoverColumns}
          onOpenAddDetalleCotizacion={onOpenAddDetalleCotizacion}
        />
        <>
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
                order={order}
                orderBy={orderBy}
                onRequestSort={changeOrderBy}
                rowCount={rows.length}
                columnasMostradas={columnasMostradas}
              />
              <TableBody>
                {typeof rows === 'object' &&
                  rows.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                        className={classes.row}>
                        <TableCell align='center' className={classes.acciones}>
                          <Tooltip
                            title={<IntlMessages id='boton.editar' />}
                            onClick={() => onOpenEditDetalleCotizacion(row.id)}>
                            <EditIcon
                              className={`${classes.generalIcons} ${classes.editIcon}`}
                            />
                          </Tooltip>
                          <Tooltip title={<IntlMessages id='boton.ver' />}>
                            <VisibilityIcon
                              className={`${classes.generalIcons} ${classes.visivilityIcon}`}
                              onClick={() =>
                                onOpenViewDetalleCotizacion(row.id)
                              }
                            />
                          </Tooltip>
                          <Tooltip title={<IntlMessages id='boton.eliminar' />}>
                            <DeleteIcon
                              onClick={() => onDeleteCotizacion(row.id)}
                              className={`${classes.generalIcons} ${classes.deleteIcon}`}></DeleteIcon>
                          </Tooltip>
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
        </>
      </Paper>

      {showForm && (
        <DetalleCotizacionCreador
          showForm={showForm}
          detalleCotizacion={detalleCotizacionSeleccionado}
          accion={accion}
          handleOnClose={handleOnClose}
          titulo='Detalle Solicitud Cotización'
          empresa={empresa}
          asociado_id={asociado_id}
          fecha={fecha}
          ciudades={ciudades}
          servicios={servicios}
          rows={rows}
          id={id}
          idAux={idAux}
          setIdAux={setIdAux}
          TIPOS_SERVICIOS={TIPOS_SERVICIOS}
        />
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
    </Box>
  );
};

export default DetalleSolicitudCotizacionV2;
