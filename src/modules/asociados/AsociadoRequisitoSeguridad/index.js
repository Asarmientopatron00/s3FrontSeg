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
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
import {
  onGetColeccion,
  onUpdate,
} from '../../../redux/actions/AsociadoRequisitoSeguridadAction';
import {useDispatch, useSelector} from 'react-redux';
// import {useLocation} from 'react-router-dom';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import TextField from '@material-ui/core/TextField';
import {useParams} from 'react-router-dom';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import {RadioGroup, Radio} from '@material-ui/core';
import {TIPOS_REQUISITOS_SEGURIDAD} from './../../../shared/constants/ListasValores';
import {Formik, Form, Field, useField} from 'formik';
import {history} from 'redux/store';
import * as yup from 'yup';
import FormHelperText from '@material-ui/core/FormHelperText';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
} from '../../../shared/constants/ActionTypes';
import {onGetTipoRol} from '../../../redux/actions/AsociadoAction';
import GetUsuario from '../../../shared/functions/GetUsuario';
import {onVerificarInformacion} from '../../../redux/actions/AsociadoAction';

const MyRadioField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <FormControl error={!!errorText} component='fieldset'>
      <Box display='flex'>
        <Field {...props} {...field} type='radio' as={RadioGroup} row>
          <Box display='flex'>
            {props.options.map((option, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={option.value}
                  control={<Radio color='primary' />}
                  label={option.label}
                  labelPlacement='end'
                  disabled={props.disabled}
                />
              );
            })}
          </Box>
        </Field>
        <Box display='flex' alignItems='center'>
          <FormHelperText>{errorText}</FormHelperText>
        </Box>
      </Box>
    </FormControl>
  );
};

// import MenuItem from '@material-ui/core/MenuItem';

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
    id: 'tipo_requisito',
    typeHead: 'string',
    label: 'Tipo',
    value: (value) =>
      TIPOS_REQUISITOS_SEGURIDAD.map((tipoDocumento) =>
        tipoDocumento.id === value ? tipoDocumento.nombre : '',
      ),
    width: '300px',
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'nombre_requisito',
    typeHead: 'string',
    label: 'Requisito Seguridad',
    value: (value) => value,
    align: 'left',
    mostrarInicio: true,
  },
  {
    id: 'compromiso*',
    typeHead: 'boolean',
    label: 'Compromiso',
    value: (value) => value,
    align: 'center',
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
        {columnasMostradas.map((cell, index) => {
          if (cell.mostrar) {
            return (
              <TableCell
                key={index}
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
            return <th key={index}></th>;
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
    gridTemplateColumns: '1fr 1fr',
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
  const {numSelected, encabezado} = props;
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
              <IntlMessages id='asociados' /> <span> - </span>
              <IntlMessages id='asociados.requisitos' />
            </Typography>
            <Box className={classes.horizontalBottoms}></Box>
          </Box>
          <Box className={classes.contenedorFiltros}>
            <TextField
              label='Tipo Documento'
              InputLabelProps={{
                shrink: true,
                style: {
                  fontWeight: 'bold',
                  color: 'black',
                },
              }}
              InputProps={{readOnly: true, style: {fontSize: '13px'}}}
              name='tipoDocumento'
              value={encabezado.tipo_documento ? encabezado.tipo_documento : ''}
              disabled={true}
            />
            <TextField
              label='Número Documento'
              InputLabelProps={{
                shrink: true,
                style: {
                  fontWeight: 'bold',
                  color: 'black',
                },
              }}
              InputProps={{readOnly: true, style: {fontSize: '13px'}}}
              name='numeroDocumento'
              value={
                encabezado.numero_documento ? encabezado.numero_documento : ''
              }
              disabled={true}
            />
            <TextField
              label='Nombre'
              InputLabelProps={{
                shrink: true,
                style: {
                  fontWeight: 'bold',
                  color: 'black',
                },
              }}
              InputProps={{readOnly: true, style: {fontSize: '13px'}}}
              name='nombre'
              value={encabezado.nombre ? encabezado.nombre : ''}
              disabled={true}
            />
            <TextField
              label='Ciudad'
              InputLabelProps={{
                shrink: true,
                style: {
                  fontWeight: 'bold',
                  color: 'black',
                },
              }}
              InputProps={{readOnly: true, style: {fontSize: '13px'}}}
              name='ciudad'
              value={encabezado.ciudad ? encabezado.ciudad : ''}
              disabled={true}
            />
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
};

const useStyles = makeStyles((theme) => ({
  MyRadioField: {
    width: '100%',
    marginBottom: 0,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 0,
    },
  },
  bottomsGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: '20px',
    gap: '10px',
    backgroundColor: 'white',
    paddingRight: '20px',
    position: 'sticky',
    left: 0,
    bottom: 0,
  },
  btnRoot: {
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  btnPrymary: {
    backgroundColor: theme.palette.primary.main,
  },
  btnSecundary: {
    backgroundColor: theme.palette.grayBottoms,
  },
  marcoTabla: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
    borderRadius: '4px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '15px',
    paddingBottom: '15px',
    marginTop: '5px',
  },
  root: {
    width: '100%%',
    padding: '20px',
  },
  head: {
    borderTop: '2px solid #dee2e6',
    borderBottom: '2px solid #dee2e6',
    marginTop: '20px',
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

const AsociadoRequisitoSeguridad = () => {
  const {asociado_id} = useParams();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [orderByToSend, setOrderByToSend] = React.useState(
    'fecha_modificacion:desc',
  );
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  // const [dense, setDense] = React.useState(false);
  const dense = true; //Borrar cuando se use el change

  const {rows, encabezado} = useSelector(
    ({asociadoRequisitoSeguridadReducer}) => asociadoRequisitoSeguridadReducer,
  );
  // const {pathname} = useLocation();

  const [compromisos, setCompromisos] = useState(Array(100).fill(''));
  const [idRequisitos, setIdRequisitos] = useState([]);

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

  const [columnasMostradas] = useState(columnasMostradasInicial);

  let vp = '15px';
  if (dense === true) {
    vp = '0px';
  }
  const classes = useStyles({vp: vp});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetColeccion(page, orderByToSend, asociado_id));
  }, [dispatch, page, orderByToSend, asociado_id]);

  const updateColeccion = () => {
    dispatch(onGetColeccion(page, orderByToSend, asociado_id));
  };

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

  const handleOnClose = () => {
    history.goBack();
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

  const tiposRol = useSelector(({asociadoReducer}) => asociadoReducer.tipo_rol);

  useEffect(() => {
    dispatch(onGetTipoRol());
  }, [dispatch]);

  const usuario = GetUsuario();

  useEffect(() => {
    setCompromisos(Array(rows.length).fill(''));
    rows.forEach((row, index) => {
      let aux = compromisos;
      aux[index] = row.compromiso !== null ? row.compromiso : '';
      setCompromisos(aux);
      aux = idRequisitos;
      aux[index] = row.id_requisito;
      setIdRequisitos(aux);
    });

    return () => {
      setCompromisos([]);
    };
  }, [rows, idRequisitos, compromisos]);
  const validationSchema = yup.object().shape({
    compromisos: yup
      .array()
      .of(yup.lazy((value) => yup.string().required('Requerido'))),
  });
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          encabezado={encabezado}
        />

        {showTable ? (
          <Box className={classes.marcoTabla}>
            <Formik
              initialStatus={true}
              enableReinitialize={true}
              validateOnBlur={false}
              initialValues={{
                asociado_id: asociado_id,
                id_requisitos: idRequisitos,
                compromisos: compromisos,
              }}
              validationSchema={validationSchema}
              onSubmit={(data, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                dispatch(onUpdate(data, updateColeccion));
                setSubmitting(false);
              }}>
              {({values, initialValues, setFieldValue, errors}) => (
                <Form>
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
                              key={index}
                              selected={isItemSelected}
                              className={classes.row}>
                              <MyCell
                                align={columnasMostradas[0].align}
                                width='300px'
                                claseBase={classes.cell}
                                value={columnasMostradas[0].value(
                                  row[columnasMostradas[0].id],
                                )}
                              />
                              <MyCell
                                align={columnasMostradas[1].align}
                                width={columnasMostradas[1].width}
                                claseBase={classes.cell}
                                value={columnasMostradas[1].value(
                                  row[columnasMostradas[1].id],
                                )}
                              />
                              <TableCell>
                                <Box display='flex' justifyContent='center'>
                                  <MyRadioField
                                    className={classes.MyRadioField}
                                    name={'compromisos[' + index + ']'}
                                    required
                                    options={[
                                      {value: 'S', label: 'Si'},
                                      {value: 'N', label: 'No'},
                                      {value: 'A', label: 'N/A'},
                                    ]}
                                  />
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box
                    py={6}
                    px={4}
                    display='grid'
                    gridTemplateColumns='1fr 1fr'>
                    <Box>
                      {usuario.rol.tipo === tiposRol['TIPO_ROL_INTERNO'] && (
                        <FormControl>
                          <Box
                            display='flex'
                            alignItems='center'
                            style={{gap: '20px'}}>
                            <FormLabel>Información Verificada</FormLabel>
                            <RadioGroup
                              row
                              defaultValue={
                                encabezado.informacion_verificada_seguridad ===
                                'S'
                                  ? 'S'
                                  : encabezado.informacion_verificada_seguridad ===
                                    'N'
                                  ? 'N'
                                  : ''
                              }
                              onClick={(event) => {
                                setTimeout(function () {
                                  dispatch({type: FETCH_START});
                                }, 1000);
                                setTimeout(function () {
                                  dispatch({type: FETCH_SUCCESS});
                                }, 1000);
                                if (event.target.value === 'S') {
                                  let verificada = true;
                                  rows.forEach((row) => {
                                    if (
                                      (row.compromiso !== 'S') &
                                      (row.compromiso !== 'N') &
                                      (row.compromiso !== 'A')
                                    ) {
                                      verificada = false;
                                    }
                                  });
                                  if (!verificada) {
                                    event.target.value = 'N';
                                    dispatch({
                                      type: FETCH_ERROR,
                                      payload:
                                        'No cumple condiciones para dar información por verificada',
                                    });
                                  } else {
                                    dispatch(
                                      onVerificarInformacion({
                                        id: asociado_id,
                                        tipo_informacion:
                                          'informacion_verificada_seguridad',
                                        valor: 'S',
                                        verificar: true,
                                      }),
                                    );
                                  }
                                }
                              }}>
                              <FormControlLabel
                                value='S'
                                control={<Radio color='primary' />}
                                label='Si'
                                labelPlacement='end'
                              />
                              <FormControlLabel
                                value='N'
                                control={<Radio color='primary' />}
                                label='No'
                                labelPlacement='end'
                              />
                            </RadioGroup>
                          </Box>
                        </FormControl>
                      )}
                    </Box>
                    <Box className={classes.bottomsGroup}>
                      <Button
                        className={`${classes.btnRoot} ${classes.btnPrymary}`}
                        variant='contained'
                        type='submit'>
                        <IntlMessages id='boton.submit' />
                      </Button>
                      <Button
                        className={`${classes.btnRoot} ${classes.btnSecundary}`}
                        onClick={handleOnClose}>
                        <IntlMessages id='boton.cancel' />
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        ) : (
          <Box
            component='h2'
            padding={4}
            fontSize={19}
            className={classes.marcoTabla}>
            <IntlMessages id='sinResultados' />
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default AsociadoRequisitoSeguridad;
