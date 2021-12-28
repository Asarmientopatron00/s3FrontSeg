import React, {useEffect, useState, useRef} from 'react';
import {Box, Button, RadioGroup, Radio} from '@material-ui/core';
import {Field, Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import {Fonts} from '../../../../shared/constants/AppEnums';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';

import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
} from '../../../../shared/constants/Constantes';

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
const AsociadoDatoBasicoForm = (props) => {
  const {
    handleOnClose,
    accion,
    values,
    initialValues,
    tiposDocumentos,
    onChangeDepartamento,
    titulo,
  } = props;

  // const factores = [41, 37, 29, 23, 19, 17, 13, 7, 3];

  let calcularDV = useRef();
  calcularDV = (documento) => {
    let suma = 0;
    const factores = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
    if (documento !== '' && documento !== undefined) {
      for (let i = 0; i < documento.length; i++) {
        suma += parseFloat(documento[i]) * factores[documento.length - i - 1];
      }
      const cv = suma % 11;
      if ((cv === 0) | (cv === 1)) {
        values.digito_verificacion = cv;
      } else {
        values.digito_verificacion = 11 - cv;
      }
    } else {
      values.digito_verificacion = 0;
    }
  };

  useEffect(() => {
    calcularDV(values.numero_documento);
  }, [values.numero_documento]);

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (accion === 'ver' || initialValues.estado === '0') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]);

  let onChangeDepartamento1 = useRef();
  onChangeDepartamento1 = (id) => {
    onChangeDepartamento(id);
    values.ciudad_id = '';
  };

  useEffect(() => {
    if (values.departamento_id !== '') {
      onChangeDepartamento1(values.departamento_id);
    } else {
      onChangeDepartamento1(0);
    }
  }, [values.departamento_id]);

  const [tipoPersona, setTipoPersona] = useState('N');
  useEffect(() => {
    setTipoPersona(values.tipo_persona);
  }, [values.tipo_persona]);

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
      marginBottom: 5,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 5,
      },
      height: '70px',
    },
    MyRadioField: {
      width: '100%',
      marginBottom: 0,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 0,
      },
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
  }));

  const classes = useStyles(props);

  return (
    <Form className='' noValidate autoComplete='off'>
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
            <Box className={classes.inputs_2} minHeight='80px'>
              <MyRadioField
                label='Tipo de Persona'
                className={classes.MyRadioField}
                name='tipo_persona'
                disabled={disabled}
                required
                options={[
                  {value: 'N', label: 'Natural'},
                  {value: 'J', label: 'Jurídica'},
                ]}
              />
            </Box>

            <Box className={classes.inputs_2}>
              <MyAutocomplete
                options={tiposDocumentos}
                name='tipo_documento_id'
                inputValue={initialValues.tipo_documento_id}
                label='Tipo de Documento'
                //autoHighlight
                className={classes.myTextField}
                required
                disabled={disabled}
              />
              {/* <MyTextField
                className={classes.myTextField}
                label='Tipo de Documento'
                name='tipo_documento_id'
                disabled={disabled}
                select={true}
                required>
                {tiposDocumentos.map((tipoDocumento) => {
                  return (
                    <MenuItem
                      value={tipoDocumento.id}
                      key={tipoDocumento.id}
                      className={classes.pointer}
                      style={
                        tipoDocumento.estado === 0 ? {display: 'none'} : {}
                      }>
                      {tipoDocumento.nombre}
                    </MenuItem>
                  );
                })}
              </MyTextField> */}

              <Box display='grid' gridTemplateColumns='2fr 1fr' gap='10px'>
                <Box mr={3}>
                  <MyTextField
                    className={classes.myTextField}
                    label='Número Documento'
                    name='numero_documento'
                    disabled={disabled}
                    required
                    inputProps={
                      tipoPersona === 'J'
                        ? {
                            maxLength:
                              LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
                          }
                        : {
                            maxLength:
                              LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
                          }
                    }
                  />
                </Box>
                <MyTextField
                  className={classes.myTextField}
                  label='Dígito Verificación'
                  name='digito_verificacion'
                  disabled={true}
                />
              </Box>
            </Box>

            <Box>
              <MyTextField
                className={classes.myTextField}
                label='Nombre'
                name='nombre'
                disabled={disabled}
                required
              />

              {tipoPersona !== 'J' ? (
                <>
                  <MyTextField
                    className={classes.myTextField}
                    label='Segundo Nombre'
                    name='segundo_nombre'
                    disabled={disabled}
                  />
                  <MyTextField
                    className={classes.myTextField}
                    label='Primer Apellido'
                    name='primer_apellido'
                    disabled={disabled}
                    required
                  />
                  <MyTextField
                    className={classes.myTextField}
                    label='Segundo Apellido'
                    name='segundo_apellido'
                    disabled={disabled}
                  />
                </>
              ) : (
                ''
              )}
            </Box>

            <Box component='h6' fontSize={16} fontWeight='bold'>
              Contacto
            </Box>

            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Identificación Usuario'
                name='identificacion_usuario'
                disabled={disabled}
                required
              />

              <MyTextField
                className={classes.myTextField}
                label='Nombre Completo'
                name='nombre_usuario'
                disabled={disabled}
                required
              />
              <MyTextField
                className={classes.myTextField}
                label='Cargo'
                name='cargo_usuario'
                disabled={disabled}
                required
              />

              <MyTextField
                className={classes.myTextField}
                label='Celular'
                name='celular_usuario'
                disabled={disabled}
                inputProps={{
                  maxLength: LONGITUD_MAXIMA_TELEFONOS,
                  minLength: LONGITUD_MINIMA_TELEFONOS,
                }}
                required
              />

              <MyTextField
                className={classes.myTextField}
                label='Correo electrónico'
                name='email_usuario'
                disabled={disabled}
                required
              />

              {accion === 'crear' ? (
                <MyTextField
                  className={classes.myTextField}
                  label='Contraseña'
                  name='clave'
                  disabled={disabled}
                  required
                  type='password'
                  autoComplete={false}
                />
              ) : (
                ''
              )}

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

export default AsociadoDatoBasicoForm;
