import React, {useState, useRef, useEffect} from 'react';
import {Box, Button} from '@material-ui/core';
import clsx from 'clsx';
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
import {Form, Formik, useField} from 'formik';
import {
  getFechasGeneracion,
  programarHorarios,
} from '../../../redux/actions/HorarioRecursoTecnicoAction';
import * as yup from 'yup';
import IntlMessages from '../../../@crema/utility/IntlMessages';

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
      size='small'
    />
  );
};

const validationSchema = yup.object({
  fechaInicial: yup.date().required('Requerido'),
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
    width: '90%',
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
  const {numSelected, titulo} = props;
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFechasGeneracion());
  }, [dispatch]);

  let fechas = useRef();
  fechas = useSelector(
    ({horarioRecursoTecnicoReducer}) => horarioRecursoTecnicoReducer.fechas,
  );

  useEffect(() => {
    if (fechas) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [fechas]);

  return (
    show && (
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
            <Formik
              validationSchema={validationSchema}
              validateOnChange={false}
              initialValues={{
                fechaMaxima: fechas ? fechas['fechaMaxima'] : '',
                fechaInicial: fechas ? fechas['fechaInicial'] : '',
                numeroDias: fechas ? fechas['numeroDias'] : '',
              }}
              onSubmit={(data, {setSubmitting}) => {
                setSubmitting(true);
                dispatch(programarHorarios(data));
                setSubmitting(false);
              }}>
              {({values, initialValues, setFieldValue, resetForm}) => (
                <Form>
                  <Box className={classes.contenedorFiltros}>
                    <Box className={classes.contenedorFiltros1}>
                      <MyTextField
                        label='Fecha fin horario generado'
                        name='fechaMaxima'
                        disabled={true}
                        type='date'
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <MyTextField
                        label='Fecha inicial generación horario'
                        name='fechaInicial'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type='date'
                      />

                      <MyTextField
                        label='Número dias generacion horario'
                        name='numeroDias'
                        required
                        type='number'
                      />
                    </Box>
                    <Box></Box>
                    <Box></Box>
                    <Box>
                      <Button
                        className={`${classes.btnRoot} ${classes.btnPrymary}`}
                        variant='contained'
                        type='submit'>
                        Generar
                      </Button>
                    </Box>
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
          // <Tooltip title="Filtros Avanzados">
          //         <IconButton aria-label="filter list">
          //           <FilterListIcon />
          //         </IconButton>
          //       </Tooltip>
        }
      </Toolbar>
    )
  );
};

const useStyles = makeStyles((theme) => ({
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
        />
      </Paper>
    </div>
  );
};

export default GeneracionHorarios;
