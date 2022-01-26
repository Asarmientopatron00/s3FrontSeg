import React, {useState, useEffect} from 'react';
import {Box} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
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
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import ConsultaAgendaServicioCreador from './ConsultaAgendaServicioCreador';
// import FilterListIcon from '@material-ui/icons/FilterList';
import {onGetColeccionAgenda as onGetColeccion} from '../../../redux/actions/OrdenServicioAction';
import {useDispatch, useSelector} from 'react-redux';
// import {useLocation} from 'react-router-dom';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import TextField from '@material-ui/core/TextField';
// import {Calendar, Views, momentLocalizer} from 'react-big-calendar';
import {momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import {StyledCalendar} from './StyledCalendar';
import {Formik, Form, useField} from 'formik';
import {onGetColeccionLigera as onGetColeccionLigeraCiudad} from '../../../redux/actions/CiudadAction';
import {onGetColeccionLigera as onGetColeccionLigeraAsociado} from '../../../redux/actions/AsociadoAction';
import {onGetColeccionLigera as onGetColeccionRecursoTecnico} from '../../../redux/actions/RecursoTecnicoAction';
import MyAutoCompleteCiudad from '../../../shared/components/MyAutoCompleteCiudad';
import MyAutoCompleteAsociado from '../../../shared/components/MyAutoCompleteAsociado';
import MyAutoCompleteRecursoTecnico from '../../../shared/components/MyAutoCompleteRecursoTecnico';
import * as yup from 'yup';
import format from 'date-fns/format';
import defaultConfig from '@crema/utility/ContextProvider/defaultConfig';
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
        {columnasMostradas.map((cell, index) => {
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

const validationSchema = yup.object().shape(
  {
    one: yup
      .string()
      .when(
        [
          'fechaOSIFiltro',
          'fechaOSFFiltro',
          'fechaProgIIFiltro',
          'fechaProgIFFiltro',
          'ciudadFiltro',
          'fechaProgDIFiltro',
          'fechaProgDFFiltro',
          'nombreAsociadoFiltro',
          'odsIFiltro',
          'odsFFiltro',
          'recursoTecnicoFiltro',
        ],
        {
          is: (
            fechaOSIFiltro,
            fechaOSFFiltro,
            fechaProgIIFiltro,
            fechaProgIFFiltro,
            ciudadFiltro,
            fechaProgDIFiltro,
            fechaProgDFFiltro,
            nombreAsociadoFiltro,
            odsIFiltro,
            odsFFiltro,
            recursoTecnicoFiltro,
          ) =>
            !fechaOSIFiltro &&
            !fechaOSFFiltro &&
            !fechaProgIIFiltro &&
            !fechaProgIFFiltro &&
            !ciudadFiltro &&
            !fechaProgDIFiltro &&
            !fechaProgDFFiltro &&
            !nombreAsociadoFiltro &&
            !odsIFiltro &&
            !odsFFiltro &&
            !recursoTecnicoFiltro,
          then: yup.string().required('Debe seleccionar al Menos 1 Filtro'),
          otherwise: yup.string().nullable(),
        },
      ),
    two: yup
      .string()
      .when(
        [
          'fechaOSIFiltro',
          'fechaOSFFiltro',
          'fechaProgIIFiltro',
          'fechaProgIFFiltro',
          'ciudadFiltro',
          'fechaProgDIFiltro',
          'fechaProgDFFiltro',
          'nombreAsociadoFiltro',
        ],
        {
          is: (
            fechaOSIFiltro,
            fechaOSFFiltro,
            fechaProgIIFiltro,
            fechaProgIFFiltro,
            ciudadFiltro,
            fechaProgDIFiltro,
            fechaProgDFFiltro,
            nombreAsociadoFiltro,
          ) =>
            (ciudadFiltro || nombreAsociadoFiltro) &&
            !fechaOSIFiltro &&
            !fechaOSFFiltro &&
            !fechaProgIIFiltro &&
            !fechaProgIFFiltro &&
            !fechaProgDIFiltro &&
            !fechaProgDFFiltro,
          then: yup
            .string()
            .required(
              'Al seleccionar criterio de ciudad o asociado de negocio, debe seleccionar al menos un rango de fechas',
            ),
          otherwise: yup.string().nullable(),
        },
      ),
    fechaOSIFiltro: yup
      .date()
      .nullable()
      .when('fechaOSFFiltro', {
        is: (fechaOSFFiltro) => !fechaOSFFiltro,
        then: yup.date().nullable(),
        otherwise: yup
          .date()
          .required(
            'Fecha Orden Servicio Inicial es requerida cuando se indica una Final',
          ),
      }),
    fechaOSFFiltro: yup
      .date()
      .nullable()
      .when(
        'fechaOSIFiltro',
        (fechaOSIFiltro, schema) =>
          fechaOSIFiltro &&
          schema.min(
            fechaOSIFiltro,
            'Fecha Orden Servicio Final debe ser mayor que Fecha Orden Servicio Inicial',
          ),
      )
      .when('fechaOSIFiltro', {
        is: (fechaOSIFiltro) => fechaOSIFiltro,
        then: yup
          .date()
          .required(
            'Fecha Orden Servicio Final es requerida cuando se indica una Fecha Orden Servicio Inicial',
          ),
      }),

    fechaProgIIFiltro: yup
      .date()
      .nullable()
      .when('fechaProgIFFiltro', {
        is: (fechaProgIFFiltro) => !fechaProgIFFiltro,
        then: yup.date().nullable(),
        otherwise: yup
          .date()
          .required(
            'Fecha Programada Instalación Inicial es requerida cuando se indica una Fecha Programada Instalación Final',
          ),
      }),
    fechaProgIFFiltro: yup
      .date()
      .nullable()
      .when(
        'fechaProgIIFiltro',
        (fechaProgIIFiltro, schema) =>
          fechaProgIIFiltro &&
          schema.min(
            fechaProgIIFiltro,
            'Fecha Programada Instalación Final debe ser mayor que Fecha Programada Instalación Inicial',
          ),
      )
      .when('fechaProgIIFiltro', {
        is: (fechaProgIIFiltro) => fechaProgIIFiltro,
        then: yup
          .date()
          .required(
            'Fecha Programada Instalación Final es requerida cuando se indica una Fecha Programada Instalación Inicial',
          ),
      }),

    fechaProgDIFiltro: yup
      .date()
      .nullable()
      .when('fechaProgDFFiltro', {
        is: (fechaProgDFFiltro) => !fechaProgDFFiltro,
        then: yup.date().nullable(),
        otherwise: yup
          .date()
          .required(
            'Fecha Programada Desinstalación Inicial es requerida cuando se indica una Fecha Programada Desinstalación Final',
          ),
      }),
    fechaProgDFFiltro: yup
      .date()
      .nullable()
      .when(
        'fechaProgDIFiltro',
        (fechaProgDIFiltro, schema) =>
          fechaProgDIFiltro &&
          schema.min(
            fechaProgDIFiltro,
            'Fecha Programada Desinstalación Final debe ser mayor que Fecha Programada Desinstalación Inicial',
          ),
      )
      .when('fechaProgDIFiltro', {
        is: (fechaProgDIFiltro) => fechaProgDIFiltro,
        then: yup
          .date()
          .required(
            'Fecha Programada Desinstalación Final es requerida cuando se indica una Fecha Programada Desinstalación Inicial',
          ),
      }),

    odsIFiltro: yup
      .number()
      .nullable()
      .when('odsFFiltro', {
        is: (odsFFiltro) => !odsFFiltro,
        then: yup.number().nullable(),
        otherwise: yup
          .number()
          .required(
            'Número Orden Servicio Inicial es requerida cuando se indica una Número Orden Servicio Final',
          ),
      }),
    odsFFiltro: yup
      .number()
      .nullable()
      .when(
        'odsIFiltro',
        (odsIFiltro, schema) =>
          odsIFiltro &&
          schema.min(
            odsIFiltro,
            'Número Orden Servicio Final debe ser mayor que Número Orden Servicio Inicial',
          ),
      )
      .when('odsIFiltro', {
        is: (odsIFiltro) => odsIFiltro,
        then: yup
          .number()
          .required(
            'Número Orden Servicio Final es requerida cuando se indica una Número Orden Servicio Inicial',
          ),
      }),

    ciudadFiltro: yup.number().nullable(),
    nombreAsociadoFiltro: yup.number().nullable(),
    recursoTecnicoFiltro: yup.number().nullable(),
  },
  [
    ['fechaOSFFiltro', 'fechaOSIFiltro'],
    ['fechaProgIIFiltro', 'fechaProgIFFiltro'],
    ['fechaProgDIFiltro', 'fechaProgDFFiltro'],
    ['odsIFiltro', 'odsFFiltro'],
  ],
);

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {numSelected, titulo, ciudades, asociados, recursosTecnicos} = props;
  const dispatch = useDispatch();

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
            <Typography className={classes.title} variant='h6' component='div'>
              {titulo}
            </Typography>
          </Box>
          <Formik
            validateOnBlur={true}
            enableReinitialize={true}
            initialValues={{
              fechaOSIFiltro: '',
              fechaOSFFiltro: '',
              fechaProgIIFiltro: '',
              fechaProgIFFiltro: '',
              ciudadFiltro: '',
              fechaProgDIFiltro: '',
              fechaProgDFFiltro: '',
              nombreAsociadoFiltro: '',
              odsIFiltro: '',
              odsFFiltro: '',
              recursoTecnicoFiltro: '',
              one: '',
              two: '',
            }}
            // onReset={() => {
            //   dispatch(
            //     onGetColeccion({
            //       fechaOSIFiltro: '',
            //       fechaOSFFiltro: '',
            //       fechaProgIIFiltro: '',
            //       fechaProgIFFiltro: '',
            //       ciudadFiltro: '',
            //       fechaProgDIFiltro: '',
            //       fechaProgDFFiltro: '',
            //       nombreAsociadoFiltro: '',
            //       odsIFiltro: '',
            //       odsFFiltro: '',
            //       recursoTecnicoFiltro: '',
            //     }),
            //   );
            // }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting}) => {
              setSubmitting(true);
              dispatch(onGetColeccion(data));
              setSubmitting(false);
            }}>
            {({values, initialValues, errors}) => (
              <Form noValidate>
                <Box className={classes.contenedorFiltros2}>
                  <MyTextField
                    label='Fecha Orden Servicio Inicial'
                    name='fechaOSIFiltro'
                    type='date'
                    InputLabelProps={{shrink: true}}
                  />
                  <MyTextField
                    label='Fecha Orden Servicio Final'
                    name='fechaOSFFiltro'
                    type='date'
                    InputLabelProps={{shrink: true}}
                  />
                  <Box display={'flex'} justifyContent={'space-around'}>
                    <Box>
                      <Tooltip title='Limpiar Filtros' type='reset'>
                        <IconButton
                          className={classes.clearButton}
                          aria-label='filter list'>
                          <ClearAllIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box>
                      <Tooltip title='Buscar'>
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
                <Box className={classes.contenedorFiltros2}>
                  <MyTextField
                    label='Fecha Programada Instalación Inicial'
                    name='fechaProgIIFiltro'
                    type='date'
                    InputLabelProps={{shrink: true}}
                  />
                  <MyTextField
                    label='Fecha Programada Instalación Final'
                    name='fechaProgIFFiltro'
                    type='date'
                    InputLabelProps={{shrink: true}}
                  />
                  <MyAutoCompleteCiudad
                    options={ciudades}
                    name='ciudadFiltro'
                    label='Ciudad'
                  />
                </Box>
                <Box className={classes.contenedorFiltros2}>
                  <MyTextField
                    label='Fecha Programada Desinstalación Inicial'
                    name='fechaProgDIFiltro'
                    type='date'
                    InputLabelProps={{shrink: true}}
                  />
                  <MyTextField
                    label='Fecha Programada Desinstalación Final'
                    name='fechaProgDFFiltro'
                    type='date'
                    InputLabelProps={{shrink: true}}
                  />
                  <MyAutoCompleteAsociado
                    options={asociados}
                    name='nombreAsociadoFiltro'
                    label='Asociado Negocio'
                  />
                </Box>
                <Box className={classes.contenedorFiltros2}>
                  <MyTextField
                    label='Número Orden Servicio Inicial'
                    name='odsIFiltro'
                  />
                  <MyTextField
                    label='Número Orden Servicio Final'
                    name='odsFFiltro'
                  />
                  <MyAutoCompleteRecursoTecnico
                    options={recursosTecnicos}
                    name='recursoTecnicoFiltro'
                    label='Recurso Técnico'
                  />
                </Box>
                <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                  <MyTextField name='one' label='' type='hidden' />
                </Box>
                <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                  <MyTextField name='two' label='' type='hidden' />
                </Box>
              </Form>
            )}
          </Formik>
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

const useStyles = makeStyles((theme) => ({
  marcoTabla: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
    borderRadius: '4px',
    paddingLeft: '15px',
    paddingRight: '15px',
    marginTop: '5px',
    paddingTop: '5px',
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

const ConsultaAgendaServicio = (props) => {
  const [showForm, setShowForm] = useState(false);
  const dense = true; //Borrar cuando se use el change

  const [accion, setAccion] = useState('ver');
  const [
    ConsultaAgendaServicioSeleccionado,
    setConsultaAgendaServicioSeleccionado,
  ] = useState('');
  const {agenda} = useSelector(
    ({ordenServicioReducer}) => ordenServicioReducer,
  );

  let vp = '15px';
  if (dense === true) {
    vp = '0px';
  }
  const classes = useStyles({vp: vp});

  const {user} = useSelector(({auth}) => auth);
  const [permisos, setPermisos] = useState('');
  const [titulo, setTitulo] = useState('');
  const [defaultDay, setDefaultDay] = useState(new Date(Date.now()));

  const ciudades = useSelector(({ciudadReducer}) => ciudadReducer.ligera);

  const asociados = useSelector(({asociadoReducer}) => asociadoReducer.ligera);

  const recursosTecnicos = useSelector(
    ({recursoTecnicoReducer}) => recursoTecnicoReducer.ligera,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetColeccionLigeraCiudad());
    dispatch(onGetColeccionLigeraAsociado());
    dispatch(onGetColeccionRecursoTecnico());
  }, [dispatch]);

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

  const [events, setEvents] = useState([]);
  useEffect(() => {
    let aux = [];
    let minDate = new Date(Date.now());
    agenda.forEach((element) => {
      if (new Date(element['fecha_programada']) < minDate) {
        minDate = new Date(element['fecha_programada']);
        setDefaultDay(minDate);
      }
      let date_array = element['fecha_programada'].split('-');
      aux.push({
        title: 'Instalación: ' + element['instalacion'],
        start: new Date(
          date_array[0],
          date_array[1] - 1,
          date_array[2],
          7,
          30,
          0,
        ),
        end: new Date(date_array[0], date_array[1] - 1, date_array[2], 8, 0, 0),
      });
      aux.push({
        title: 'Desinstalación: ' + element['desinstalacion'],
        start: new Date(
          date_array[0],
          date_array[1] - 1,
          date_array[2],
          8,
          30,
          0,
        ),
        end: new Date(date_array[0], date_array[1] - 1, date_array[2], 9, 0, 0),
      });
      aux.push({
        title: 'Total: ' + (element['instalacion'] + element['desinstalacion']),
        start: new Date(
          date_array[0],
          date_array[1] - 1,
          date_array[2],
          9,
          30,
          0,
        ),
        end: new Date(
          date_array[0],
          date_array[1] - 1,
          date_array[2],
          10,
          0,
          0,
        ),
      });
    });
    setEvents(aux);
  }, [agenda]);

  const ColoredDateCellWrapper = ({children}) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: 'lightblue',
      },
    });
  const localizer = momentLocalizer(moment);

  const CustomEvent = (event) => {
    return (
      <p
        style={{
          backgroundColor: event.title.includes('Instalación')
            ? defaultConfig.theme.palette.primary.main
            : event.title.includes('Desinstalación')
            ? 'gray'
            : 'red',
          borderRadius: '5px',
          paddingLeft: '5px',
        }}>
        {event.title}
      </p>
    );
  };

  const handleOnClose = () => {
    setShowForm(false);
    setConsultaAgendaServicioSeleccionado('');
    setAccion('ver');
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {permisos && (
          <EnhancedTableToolbar
            numSelected={[]}
            titulo={titulo}
            ciudades={ciudades}
            asociados={asociados}
            recursosTecnicos={recursosTecnicos}
          />
        )}

        {
          <Box className={classes.marcoTabla}>
            <StyledCalendar
              // <Calendar
              events={events}
              views={['month']}
              step={60}
              date={defaultDay}
              components={{
                timeSlotWrapper: ColoredDateCellWrapper,
                month: {
                  dateHeader: ({date, label}) => {
                    let highlightDate = false;

                    events.forEach((event) => {
                      if (
                        format(event.end, 'yyyy-MM-dd') ===
                        format(date, 'yyyy-MM-dd')
                      ) {
                        highlightDate = true;
                      }
                    });
                    return (
                      <p
                        style={{cursor: highlightDate ? 'pointer' : 'auto'}}
                        onClick={() => {
                          setConsultaAgendaServicioSeleccionado(
                            format(date, 'yyyy-MM-dd'),
                          );
                          setShowForm(true);
                        }}>
                        {label}
                      </p>
                    );
                  },
                },
                event: CustomEvent,
              }}
              localizer={localizer}
              onSelectEvent={(event) => {
                setConsultaAgendaServicioSeleccionado(
                  format(event.end, 'yyyy-MM-dd'),
                );
                setShowForm(true);
              }}
            />
          </Box>
        }
      </Paper>
      {showForm ? (
        <ConsultaAgendaServicioCreador
          showForm={showForm}
          consultaAgendaServicio={ConsultaAgendaServicioSeleccionado}
          accion={accion}
          handleOnClose={handleOnClose}
          titulo={titulo}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default ConsultaAgendaServicio;
