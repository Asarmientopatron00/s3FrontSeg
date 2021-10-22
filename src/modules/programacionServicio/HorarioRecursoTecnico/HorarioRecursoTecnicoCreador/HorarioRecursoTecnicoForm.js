import React, {useEffect, useState} from 'react';
import {Box, Button, RadioGroup, Radio} from '@material-ui/core';
import {Field, Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import {Fonts} from '../../../../shared/constants/AppEnums';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';

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
    setFieldValue,
  } = props;
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (accion === 'ver' || initialValues.estado === '0') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]);
  const useStyles = makeStyles((theme) => ({
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
      height: '60px',
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
            mb={{xs: 4, xl: 6}}
            fontSize={20}
            fontWeight={Fonts.MEDIUM}>
            {titulo}
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <MyAutocomplete
              options={recursosTecnicos}
              name='recurso_tecnico_id'
              inputValue={initialValues.recurso_tecnico_id}
              label='Recurso Técnico'
              //autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />
            <Box className={classes.inputs_2} minWidth='800px'>
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Tipo Documento'
                name='tipo_documento'
                disabled={true}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Número Documento'
                name='numero_documento'
                disabled={true}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Nombre Completo'
                name='nombre_completo'
                disabled={true}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Tipo contrato'
                name='tipo_contrato'
                disabled={true}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Departamento'
                name='departamento'
                disabled={true}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Ciudad'
                name='ciudad'
                disabled={true}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Celular'
                name='celular'
                disabled={true}
              />
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Correo Electrónico'
                name='email'
                disabled={true}
              />
            </Box>
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Fecha'
                name='fecha_horario'
                disabled={disabled}
                required
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Hora Inicio'
                name='hora_inicio_horario'
                disabled={disabled}
                required
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Hora Final'
                name='hora_final_horario'
                disabled={disabled}
                required
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <FormControl className={classes.widthFull} component='fieldset'>
              <FormLabel>Estado*</FormLabel>
              <Field
                name='estado'
                type='radio'
                as={RadioGroup}
                className={classes.myTextField}
                disabled={accion === 'ver'}
                row
                value={values.estado}>
                <FormControlLabel
                  value='1'
                  control={<Radio color='primary' />}
                  label='Activo'
                  labelPlacement='end'
                  disabled={accion === 'ver'}
                />
                <FormControlLabel
                  value='0'
                  control={<Radio color='primary' />}
                  label='Inactivo'
                  labelPlacement='end'
                  disabled={accion === 'ver'}
                />
              </Field>
            </FormControl>
          </Box>
        </Box>
      </Scrollbar>
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
    </Form>
  );
};

export default HorarioRecursoTecnicoForm;
