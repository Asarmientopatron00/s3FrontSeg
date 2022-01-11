import React, {useEffect, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import MyAutoCompleteRecursoTecnico from '../../../../shared/components/MyAutoCompleteRecursoTecnico';
import MyAutoCompleteEquipo from '../../../../shared/components/MyAutoCompleteEquipo';

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

const HorarioRecursoTecnicoForm = (props) => {
  const {
    handleOnClose,
    accion,
    values,
    initialValues,
    titulo,
    recursosTecnicos,
    equipos,
    setFieldValue,
  } = props;
  const [disabled, setDisabled] = useState(false);
  console.log();
  useEffect(
    (accion) => {
      if (accion === 'ver') {
        setDisabled(true);
      }
    },
    [initialValues.estado, accion],
  );
  const useStyles = makeStyles((theme) => ({
    bottomsGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: '20px',
      gap: '10px',
      backgroundColor: 'white',
      paddingRight: '20px',
      // position: 'sticky',
      left: 0,
      bottom: 0,
    },
    myTextField: {
      width: '100%',
      marginBottom: 0,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 0,
      },
      height: '65px',
    },
    myTextFieldSmall: {
      width: '100%',
      marginBottom: 0,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 0,
      },
      height: '55px',
    },
    MySelectField: {
      width: 'auto',
      marginBottom: 16,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 24,
      },
      color: theme.palette.primary.main,
      '&:target': {
        color: theme.palette.primary.main,
      },
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
    widthFull: {
      width: '100%',
    },
    pointer: {
      cursor: 'pointer',
    },
    inputs_2: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      columnGap: '20px',
    },
    deleteIcon: {
      color: theme.palette.redBottoms,
    },
  }));

  const classes = useStyles(props);

  useEffect(() => {
    let recursoTecnico = '';
    let tipoDocumento = '';
    let numeroDocumento = '';
    let nombreCompleto = '';
    let tipoContrato = '';
    let departamento = '';
    let ciudad = '';
    let celular = '';
    let email = '';
    recursosTecnicos.forEach((temporal) => {
      if (temporal.id === values.recurso_tecnico_id) {
        recursoTecnico = temporal.recursoTecnico;
        tipoDocumento = temporal.tipo_documento;
        numeroDocumento = temporal.numero_documento;
        nombreCompleto = temporal.nombre_completo;
        tipoContrato = temporal.tipo_contrato;
        departamento = temporal.departamento;
        ciudad = temporal.ciudad;
        celular = temporal.celular;
        email = temporal.email;
      }
    });

    if (recursoTecnico !== '') {
      setFieldValue('tipo_documento', tipoDocumento);
      setFieldValue('numero_documento', numeroDocumento);
      setFieldValue('nombre_completo', nombreCompleto);
      if (tipoContrato === 'S') {
        setFieldValue('tipo_contrato', 'Servicio');
      } else {
        if (tipoContrato === 'F') {
          setFieldValue('tipo_contrato', 'Fijo');
        } else {
          setFieldValue('tipo_contrato', 'Tercero');
        }
      }
      setFieldValue('departamento', departamento);
      setFieldValue('ciudad', ciudad);
      setFieldValue('celular', celular);
      setFieldValue('email', email);
    }
  }, [values.recurso_tecnico_id, setFieldValue, recursosTecnicos]);

  return (
    <Form
      className=''
      noValidate
      autoComplete='off'
      encType='multipart/form-data'>
      <Scrollbar style={{maxHeight: 600}}>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Box
            component='h6'
            mb={{xs: 1, xl: 1}}
            fontSize={20}
            fontWeight={Fonts.MEDIUM}>
            {titulo}
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <Box className={classes.inputs_2} minWidth='800px'>
              <MyTextField
                className={classes.myTextFieldSmall}
                label=' Nº Orden de servicio'
                name='numero_orden_servicio'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Fecha Orden'
                name='fecha_creacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <MyTextField
              className={classes.myTextFieldSmall}
              label='Asociado negocios'
              name='asociado'
              disabled={true}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box className={classes.inputs_2} minWidth='800px'>
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Tipo Proceso'
                name='tipo_servicio'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Número de Viaje'
                name='numero_viaje'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Box className={classes.inputs_2} minWidth='800px'>
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Fecha Programada'
                name='fecha_programada'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Hora Inicio Programada'
                name='hora_programada'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Departamento'
                name='departamento'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Ciudad'
                name='ciudad'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box className={classes.inputs_2} minWidth='800px'>
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Nombre Lugar'
                name='lugar'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Dirección Lugar'
                name='direccion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <MyAutoCompleteRecursoTecnico
              options={recursosTecnicos}
              name='recurso_id'
              inputValue={initialValues.recurso_id}
              label='Recurso Técnico'
              //autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />
            <MyAutoCompleteEquipo
              options={equipos}
              name='equipo_id'
              inputValue={initialValues.equipo_id}
              label='Equipo'
              //autoHighlight
              className={classes.myTextField}
              required
              disabled={
                disabled || initialValues.tipo_servicio === 'Desinstalación'
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
            <MyTextField
              className={classes.myTextField}
              label='Observaciones Programación'
              name='observaciones_programacion'
              disabled={disabled}
              multiline
            />
          </Box>
        </Box>
        <Box className={classes.bottomsGroup}>
          {accion !== 'ver' ? (
            <Button
              className={`${classes.btnRoot} ${classes.btnPrymary}`}
              variant='contained'
              type='submit'>
              <IntlMessages id='boton.submit' />
            </Button>
          ) : (
            ''
          )}
          <Button
            className={`${classes.btnRoot} ${classes.btnSecundary}`}
            onClick={handleOnClose}>
            <IntlMessages id='boton.cancel' />
          </Button>
        </Box>
      </Scrollbar>
    </Form>
  );
};

export default HorarioRecursoTecnicoForm;
