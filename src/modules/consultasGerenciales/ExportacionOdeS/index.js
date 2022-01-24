import React, {useState, useEffect} from 'react';
import {Box} from '@material-ui/core';
import * as yup from 'yup';
import {Formik, Form, useField} from 'formik';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import {useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {ESTADOS_ORDEN_SERVICIO} from '../../../shared/constants/ListasValores';
import MenuItem from '@material-ui/core/MenuItem';
import defaultConfig from '../../../@crema/utility/ContextProvider/defaultConfig';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

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
  const {titulo, validationSchema, getValues} = props;
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
          odsIFiltro: '',
          odsFFiltro: '',
          fechaOSIFiltro: '',
          fechaOSFFiltro: '',
          fechaProgIFiltro: '',
          fechaProgFFiltro: '',
          fechaEjecIFiltro: '',
          fechaEjecFFiltro: '',
          estadoFiltro: '',
          nombreAsociadoFiltro: '',
          ciudadIFiltro: '',
          ciudadFFiltro: '',
          nombreTransportadoraFiltro: '',
        }}
        validationSchema={validationSchema}>
        {({values, handleReset, isValid}) => (
          <Form noValidate>
            <Box className={classes.contenedorFiltros2}>
              <MyTextField
                label='Fecha Orden Servicio Inicial'
                name='fechaOSIFiltro'
                id='fechaOSIFiltro'
                type='date'
                InputLabelProps={{shrink: true}}
              />
              <MyTextField
                label='Fecha Orden Servicio Final'
                name='fechaOSFFiltro'
                id='fechaOSFFiltro'
                type='date'
                InputLabelProps={{shrink: true}}
              />
            </Box>
            <Box className={classes.contenedorFiltros2}>
              <MyTextField
                label='Fecha Programada Inicial'
                name='fechaProgIFiltro'
                id='fechaProgIFiltro'
                type='date'
                InputLabelProps={{shrink: true}}
              />
              <MyTextField
                label='Fecha Programada Final'
                name='fechaProgFFiltro'
                id='fechaProgFFiltro'
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
                            '/consultas-gerenciales/odes' +
                            '?ODSInicial=' +
                            values.odsIFiltro +
                            '&ODSFinal=' +
                            values.odsFFiltro +
                            '&fechaOSInicial=' +
                            values.fechaOSIFiltro +
                            '&fechaOSFinal=' +
                            values.fechaOSFFiltro +
                            '&fechaProgInicial=' +
                            values.fechaProgIFiltro +
                            '&fechaProgFinal=' +
                            values.fechaProgFFiltro +
                            '&fechaEjecInicial=' +
                            values.fechaEjecIFiltro +
                            '&fechaEjecFinal=' +
                            values.fechaEjecFFiltro +
                            '&estado=' +
                            values.estadoFiltro +
                            '&ciudadOri=' +
                            values.ciudadIFiltro +
                            '&ciudadDes=' +
                            values.ciudadFFiltro +
                            '&asociado=' +
                            values.nombreAsociadoFiltro +
                            '&transportador=' +
                            values.nombreTransportadoraFiltro
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
              <MyTextField
                label='Fecha Ejecucion Inicial'
                name='fechaEjecIFiltro'
                id='fechaEjecIFiltro'
                type='date'
                InputLabelProps={{shrink: true}}
              />
              <MyTextField
                label='Fecha Ejecucion Final'
                name='fechaEjecFFiltro'
                id='fechaEjecFFiltro'
                type='date'
                InputLabelProps={{shrink: true}}
              />
              <MyTextField
                label='Estado'
                name='estadoFiltro'
                id='estadoFiltro'
                select={true}>
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
              </MyTextField>
            </Box>
            <Box className={classes.contenedorFiltros2}>
              <MyTextField
                label='Orden de Servicio Inicial'
                name='odsIFiltro'
                id='odsIFiltro'
                type='number'
                inputProps={{min: 0}}
              />
              <MyTextField
                label='Orden de Servicio Final'
                name='odsFFiltro'
                id='odsFFiltro'
                type='number'
                inputProps={{min: 0}}
              />
              <MyTextField
                label='Asociado Negocio'
                name='nombreAsociadoFiltro'
                id='nombreAsociadoFiltro'
              />
            </Box>
            <Box className={classes.contenedorFiltros2}>
              <MyTextField
                label='Ciudad Origen'
                name='ciudadIFiltro'
                id='ciudadIFiltro'
              />
              <MyTextField
                label='Ciudad Destino'
                name='ciudadFFiltro'
                id='ciudadFFiltro'
              />
              <MyTextField
                label='Empresa Transportadora'
                name='nombreTransportadoraFiltro'
                id='nombreTransportadoraFiltro'
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
      odsIFiltro: yup
        .number()
        .nullable()
        .when('odsFFiltro', {
          is: (odsFFiltro) => !odsFFiltro,
          then: yup.number().nullable(),
          otherwise: yup
            .number()
            .required('ODS Inicial es requerida cuando se indica una Final'),
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
              'Numero de ODS Final debe ser mayor que ODS Inicial',
            ),
        ),
      fechaOSIFiltro: yup
        .date()
        .nullable()
        .min(
          new Date(today.setMonth(today.getMonth() - 18)),
          'La fecha seleccionada no debe ser menor a dieciocho meses en el pasado',
        )
        .when('fechaOSFFiltro', {
          is: (fechaOSFFiltro) => !fechaOSFFiltro,
          then: yup.date().nullable(),
          otherwise: yup
            .date()
            .required(
              'Fecha ODS Inicial es requerida cuando se indica una Final',
            ),
        }),
      fechaOSFFiltro: yup
        .date()
        .nullable()
        .when('fechaOSIFiltro', {
          is: (fechaOSIFiltro) => !fechaOSIFiltro,
          then: yup.date().nullable(),
          otherwise: yup
            .date()
            .required(
              'Se requiere fecha final cuando se especifica una inicial',
            )
            .min(
              yup.ref('fechaOSIFiltro'),
              'Fecha ODS Final debe ser mayor que Inicial',
            ),
        }),
      fechaProgIFiltro: yup
        .date()
        .nullable()
        .min(
          new Date(today.setMonth(today.getMonth() - 18)),
          'La fecha seleccionada no debe ser menor a dieciocho meses en el pasado',
        )
        .when('fechaProgFFiltro', {
          is: (fechaProgFFiltro) => !fechaProgFFiltro,
          then: yup.date().nullable(),
          otherwise: yup
            .date()
            .required(
              'Fecha Programacion Inicial es requerida cuando se indica una Final',
            ),
        }),
      fechaProgFFiltro: yup
        .date()
        .nullable()
        .when('fechaProgIFiltro', {
          is: (fechaProgIFiltro) => !fechaProgIFiltro,
          then: yup.date().nullable(),
          otherwise: yup
            .date()
            .required(
              'Se requiere fecha final cuando se especifica una inicial',
            )
            .min(
              yup.ref('fechaProgIFiltro'),
              'Fecha Programacion Final debe ser mayor que Inicial',
            ),
        }),
      fechaEjecIFiltro: yup
        .date()
        .nullable()
        .min(
          new Date(today.setMonth(today.getMonth() - 18)),
          'La fecha seleccionada no debe ser menor a dieciocho meses en el pasado',
        )
        .when('fechaEjecFFiltro', {
          is: (fechaEjecFFiltro) => !fechaEjecFFiltro,
          then: yup.date().nullable(),
          otherwise: yup
            .date()
            .required(
              'Fecha Ejecucion Inicial es requerida cuando se indica una Final',
            ),
        }),
      fechaEjecFFiltro: yup
        .date()
        .nullable()
        .when('fechaEjecIFiltro', {
          is: (fechaEjecIFiltro) => !fechaEjecIFiltro,
          then: yup.date().nullable(),
          otherwise: yup
            .date()
            .required(
              'Se requiere fecha final cuando se especifica una inicial',
            )
            .min(
              yup.ref('fechaEjecIFiltro'),
              'Fecha Ejecucion Final debe ser mayor que Inicial',
            ),
        }),
      estadoFiltro: yup.string().nullable(),
      nombreAsociadoFiltro: yup.string().nullable(),
      ciudadIFiltro: yup.string().nullable(),
      ciudadFFiltro: yup.string().nullable(),
      nombreTransportadoraFiltro: yup.string().nullable(),
    },
    [
      ['fechaOSFFiltro', 'fechaOSIFiltro'],
      ['fechaProgFFiltro', 'fechaProgIFiltro'],
      ['fechaEjecFFiltro', 'fechaEjecIFiltro'],
      ['odsFFiltro', 'odsIFiltro'],
    ],
  );

  const getValues = (value) => {
    return Object.values(value).some((item) => item); // check if all properties in value object are null or an empty string
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {permisos && (
          <EnhancedTableToolbar
            permisos={permisos}
            titulo={titulo}
            validationSchema={validationSchema}
            getValues={getValues}
          />
        )}
      </Paper>
    </div>
  );
};

export default ConsultaFacturacion;
