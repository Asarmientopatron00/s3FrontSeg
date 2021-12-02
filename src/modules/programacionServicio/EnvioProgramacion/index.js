import React, {useState, useEffect} from 'react';
import {
  Box,
  Button,
  Checkbox,
  Table,
  TableContainer,
  TableHead,
} from '@material-ui/core';
import clsx from 'clsx';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {Fonts} from '../../../shared/constants/AppEnums';
import {Form, Formik} from 'formik';
import {
  onGetEnvioCorreos,
  onEnvioCorreos,
} from '../../../redux/actions/OrdenServicioAction';
import * as yup from 'yup';
import format from 'date-fns/format';

const validationSchema = yup.object({
  fechaMinima: yup.date().nullable(),
  fechaInicial: yup
    .date()
    .required('Requerido')
    .min(
      yup.ref('fechaMinima'),
      'La fecha de entrega debe ser mayor a Fecha fin horario generado',
    ),
  numeroDias: yup.string().required('Requerido'),
});

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
  contenedorFiltros1: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  pairFilters: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    minWidth: '100px',
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
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {numSelected, titulo, fecha, setFecha, errorText} = props;

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
            <Box className={classes.horizontalBottoms}></Box>
          </Box>
          <Box className={classes.contenedorFiltros1}>
            <TextField
              label='Fecha programación servicios:'
              name='fecha'
              type='date'
              className={classes.contenedorFiltros1}
              value={fecha}
              InputLabelProps={{
                shrink: true,
              }}
              helperText={errorText}
              error={!!errorText}
              onChange={(e) => {
                setFecha(e.target.value);
                // setFieldValue('fecha',e.target.value)
              }}
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

const useStyles = makeStyles((theme) => ({
  contenedorFiltros: {
    width: '90%',
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    gap: '20px',
  },
  contenedorFiltros1: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  chargedFile: {
    padding: '0px',
  },
  linkDocumento: {
    textDecoration: 'underline',
    color: 'blue',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  dialogBox: {
    minHeight: '600px',
    position: 'relative',
    '& .MuiDialog-paperWidthSm': {
      width: '100%',
      minHeight: '800px',
      // maxHeight:'fit-content'
    },
    '& .MuiTypography-h6': {
      fontWeight: Fonts.LIGHT,
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
    padding: '0px 15px 0px 15px',
  },
  row: {
    // display:'grid',
    // gridTemplateColumns:gridTemplate,
    padding: 'none',
  },
  cell: (props) => ({
    padding: props.vp + ' 15px ' + props.vp + ' 15px',
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

const GeneracionHorarios = (props) => {
  const dense = true; //Borrar cuando se use el change

  // const {pathname} = useLocation();

  let vp = '15px';
  if (dense === true) {
    vp = '0px';
  }

  const classes = useStyles({vp: vp});

  const {user} = useSelector(({auth}) => auth);

  const [permisos, setPermisos] = useState('');
  const [titulo, setTitulo] = useState('');

  const [show] = useState(true);
  const dispatch = useDispatch();
  const today = format(new Date(Date.now()), 'yyyy-MM-dd');
  const [fecha, setFecha] = useState(today);
  const [numSelected, setnumSelected] = useState(0);
  const [asociados, setasociados] = useState([]);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    dispatch(onGetEnvioCorreos(fecha));
  }, [dispatch, fecha]);

  const rowsAux = useSelector(
    ({ordenServicioReducer}) => ordenServicioReducer.ordenesEnviar,
  );

  const [rows, setRows] = useState([]);
  useEffect(() => {
    const aux = rowsAux.map((row) => {
      return {...row, selected: false};
    });
    setRows(aux);
  }, [rowsAux]);

  const onSelectAllClick = (event) => {
    if (event.target.checked) {
      const aux = rows.map((row) => {
        return {...row, selected: true};
      });
      setRows(aux);
      setnumSelected(rows.length);
      return;
    }
    const aux = rows.map((row) => {
      return {...row, selected: false};
    });
    setRows(aux);
    setnumSelected(0);
  };

  const selecItem = (id, selected) => {
    if (selected) {
      const aux = rows.map((row) => {
        if (row.id === id) {
          return {...row, selected: false};
        } else {
          return row;
        }
      });
      setRows(aux);

      return;
    }
    const aux = rows.map((row) => {
      if (row.id === id) {
        return {...row, selected: true};
      } else {
        return row;
      }
    });
    setRows(aux);
  };

  useEffect(() => {
    let auxasociados = [];
    let cantidad = 0;
    rows.forEach((row) => {
      if (row.selected) {
        auxasociados.push(row.id);
        cantidad = cantidad + 1;
      }
    });
    setnumSelected(cantidad);
    setasociados(auxasociados);
  }, [rows]);

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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={0}
          titulo={titulo}
          permisos={permisos}
          fecha={fecha}
          setFecha={setFecha}
          errorText={errorText}
        />
        <Box className={classes.marcoTabla}>
          {show && (
            <Formik
              validationSchema={validationSchema}
              validateOnChange={false}
              onSubmit={(data, {setSubmitting, setFieldValue}) => {
                setSubmitting(true);
                if (asociados.length > 0) {
                  dispatch(onEnvioCorreos(fecha, asociados.toString()));
                }

                // const date = new Date(data.fechaInicial);
                // const date2 = new Date(data.fechaInicial);
                // date.setDate(date.getDate() + data.numeroDias)
                // date2.setDate(date2.getDate() + data.numeroDias +1)
                // console.log(date,date2)
                // setFieldValue('fechaMaxima',date)
                // setFieldValue('fechaInicial',date2)
                // setFieldValue('fechaMinima',date2)
                setSubmitting(true);
              }}>
              {({values, initialValues, setFieldValue, resetForm}) => {
                return (
                  <Form>
                    <Box className={classes.contenedorFiltros}>
                      <Box className={classes.contenedorFiltros1}>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow className={classes.head}>
                                <TableCell
                                  padding='checkbox'
                                  className={classes.row}>
                                  <Checkbox
                                    indeterminate={
                                      numSelected > 0 &&
                                      numSelected < rows.length
                                    }
                                    checked={
                                      rows.length > 0 &&
                                      numSelected === rows.length
                                    }
                                    onChange={onSelectAllClick}
                                    inputProps={{
                                      'aria-label': 'select all desserts',
                                    }}
                                  />
                                </TableCell>
                                <TableCell
                                  align='right'
                                  className={classes.headCell}>
                                  {'Documento'}
                                </TableCell>
                                <TableCell
                                  align='left'
                                  className={classes.headCell}>
                                  {'Nombre'}
                                </TableCell>
                                <TableCell
                                  align='right'
                                  className={classes.headCell}>
                                  {'Nº Ordenes'}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.length > 0 &&
                                rows.map((row, index) => {
                                  return (
                                    <TableRow
                                      hover
                                      role='checkbox'
                                      aria-checked={row.selected}
                                      tabIndex={-1}
                                      key={row.id}
                                      selected={row.selected}
                                      className={classes.row}>
                                      <TableCell padding='checkbox'>
                                        <Checkbox
                                          checked={row.selected}
                                          id={row.id}
                                          // inputProps={{ 'aria-labelledby': labelId }}
                                          onClick={() =>
                                            selecItem(row.id, row.selected)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell
                                        align='right'
                                        className={classes.headCell}>
                                        {row.numero_documento}
                                      </TableCell>
                                      <TableCell
                                        align='left'
                                        className={classes.headCell}>
                                        {row.nombre}
                                      </TableCell>
                                      <TableCell
                                        align='right'
                                        className={classes.headCell}>
                                        {row.numero_ordenes}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                      <Box></Box>
                      <Box></Box>
                      <Box>
                        {numSelected > 0 && (
                          <Button
                            className={`${classes.btnRoot} ${classes.btnPrymary}`}
                            variant='contained'
                            // type='submit'
                            onClick={() => {
                              console.log();
                              if (fecha >= today) {
                                setErrorText('');
                                if (asociados.length > 0) {
                                  dispatch(
                                    onEnvioCorreos(fecha, asociados.toString()),
                                  );
                                }
                              } else {
                                setErrorText(
                                  'Debe ser mayor o igual a la fecha actual.',
                                );
                              }
                            }}>
                            Enviar
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default GeneracionHorarios;
