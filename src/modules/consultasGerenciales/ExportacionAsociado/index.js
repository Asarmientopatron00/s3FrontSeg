import React, {useState, useEffect} from 'react';
import {Box, RadioGroup, Radio} from '@material-ui/core';
import * as yup from 'yup';
import {Formik, Form, useField, Field} from 'formik';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import defaultConfig from '../../../@crema/utility/ContextProvider/defaultConfig';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

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

const MyRadioField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <FormControl error={!!errorText} component='fieldset'>
      <FormLabel {...props} {...field}>
        {props.label}
      </FormLabel>
      <Field {...props} {...field} type='radio' as={RadioGroup} row>
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
      </Field>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    padding: '15px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
    borderRadius: '4px',
    display: 'grid',
  },
  title: {
    flex: '1 1 100%',
  },
  clearButton: {
    backgroundColor: theme.palette.grayBottoms,
    color: 'white',
    maxHeight: 48,
    maxWidth: 48,
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  titleTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  contenedorFiltros2: {
    width: '90%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    columnGap: '20px',
  },
  exportButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    marginLeft: 100,
    maxHeight: 48,
    maxWidth: 48,
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
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {titulo, validationSchema, getValues, options} = props;
  return (
    <Toolbar className={clsx(classes.root)}>
      <Box className={classes.titleTop} style={{marginBottom: 10}}>
        <Typography
          className={classes.title}
          variant='h6'
          id='tableTitle'
          component='div'>
          {titulo}
        </Typography>
      </Box>
      <Formik
        validateOnBlur={false}
        enableReinitialize={true}
        initialValues={{
          fechaIniFiltro: '',
          fechaFinFiltro: '',
          activosFiltro: '',
          inactivosFiltro: '',
        }}
        validationSchema={validationSchema}>
        {({values, handleReset, isValid}) => (
          <Form noValidate>
            <Box className={classes.contenedorFiltros2}>
              <MyTextField
                label='Fecha Creacion Inicial'
                name='fechaIniFiltro'
                id='fechaIniFiltro'
                type='date'
                InputLabelProps={{shrink: true}}
              />
              <MyTextField
                label='Fecha Creacion Final'
                name='fechaFinFiltro'
                id='fechaFinFiltro'
                type='date'
                InputLabelProps={{shrink: true}}
              />
              <Box display='grid'>
                <Box display='flex' mb={2} justifyContent={'flex-end'}>
                  <Tooltip title='Limpiar Filtros' onClick={handleReset}>
                    <IconButton
                      className={classes.clearButton}
                      aria-label='filter list'>
                      <ClearAllIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Exportar'>
                    <IconButton
                      type='submit'
                      className={classes.exportButton}
                      href={
                        isValid && getValues(values)
                          ? defaultConfig.API_URL +
                            '/consultas-gerenciales/asociado' +
                            '?fechaInicial=' +
                            values.fechaIniFiltro +
                            '&fechaFinal=' +
                            values.fechaFinFiltro +
                            '&activos=' +
                            values.activosFiltro +
                            '&inactivos=' +
                            values.inactivosFiltro
                          : ''
                      }
                      aria-label='filter list'>
                      <Box component='span' className={classes.x}>
                        X
                      </Box>
                      <InsertDriveFileIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
            <Box className={classes.contenedorFiltros2}>
              <MyRadioField
                label='Activos'
                name='activosFiltro'
                required
                options={options}
              />
              <MyRadioField
                label='Inactivos'
                name='inactivosFiltro'
                required
                options={options}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%%',
    padding: '20px',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
}));

const ConsultaFacturacion = (props) => {
  const classes = useStyles();

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
  }, [user, props.route]); // eslint-disable-line

  const today = new Date();

  const validationSchema = yup.object().shape(
    {
      fechaIniFiltro: yup
        .date()
        .nullable()
        .when('fechaFinFiltro', {
          is: (fechaFinFiltro) => !fechaFinFiltro,
          then: yup.date().nullable(),
          otherwise: yup
            .date()
            .required(
              'Fecha ODS Inicial es requerida cuando se indica una Final',
            ),
        }),
      fechaFinFiltro: yup
        .date()
        .nullable()
        .when('fechaIniFiltro', {
          is: (fechaIniFiltro) => !fechaIniFiltro,
          then: yup.date().nullable(),
          otherwise: yup
            .date()
            .required(
              'Se requiere fecha final cuando se especifica una inicial',
            )
            .min(
              yup.ref('fechaIniFiltro'),
              'Fecha ODS Final debe ser mayor que Inicial',
            ),
        }),
      activosFiltro: yup.string().required('Requerido'),
      inactivosFiltro: yup.string().required('Requerido'),
    },
    [['fechaFinFiltro', 'fechaIniFiltro']],
  );

  const getValues = (value) => {
    return Object.values(value).some((item) => item); // check if all properties in value object are null or an empty string
  };

  const options = [
    {value: 'S', label: 'Sí', estado: 1},
    {value: 'N', label: 'No', estado: 1},
  ];

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {permisos && (
          <EnhancedTableToolbar
            permisos={permisos}
            titulo={titulo}
            validationSchema={validationSchema}
            getValues={getValues}
            options={options}
          />
        )}
      </Paper>
    </div>
  );
};

export default ConsultaFacturacion;
