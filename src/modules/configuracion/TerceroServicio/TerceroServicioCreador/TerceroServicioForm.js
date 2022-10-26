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
import {TIPOS_TERCEROS} from './../../../../shared/constants/ListasValores';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';

import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
} from './../../../../shared/constants/Constantes';

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
const TerceroServicioForm = (props) => {
  const {
    handleOnClose,
    accion,
    values,
    initialValues,
    tiposDocumentos,
    departamentos,
    ciudades,
    onChangeDepartamento,
    titulo,
    asociados,
    setFieldValue,
  } = props;

  // const factores = [41, 37, 29, 23, 19, 17, 13, 7, 3];

  let calcularDV = useRef();
  calcularDV = (documento) => {
    let suma = 0;
    const factores = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
    if (documento !== '' && documento !== undefined) {
      console.log(documento);
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

  useEffect(() => {
    if (values.asociado) {
      const asociado = asociados.find(
        (asocciate) => asocciate.id === parseInt(values.asociado),
      );
      if (asociado) {
        setFieldValue('tipo_persona', asociado.tipo_persona ?? '');
        setFieldValue('tipo_documento_id', asociado.tipo_documento_id ?? '');
        setFieldValue('numero_documento', asociado.numero_documento ?? '');
        setFieldValue('nombre', asociado.primer_nombre ?? '');
        setFieldValue('segundo_nombre', asociado.segundo_nombre ?? '');
        setFieldValue('primer_apellido', asociado.primer_apellido ?? '');
        setFieldValue('segundo_apellido', asociado.segundo_apellido ?? '');
        setFieldValue('departamento_id', asociado.departamento_id ?? '');
        setTimeout(() => {
          setFieldValue('ciudad_id', asociado.ciudad_id ?? '');
        }, 800);
        setFieldValue('direccion', asociado.direccion ?? '');
        setFieldValue('telefono', asociado.telefono ?? '');
        setFieldValue('celular', asociado.celular ?? '');
        setFieldValue('email', asociado.email ?? '');
        setFieldValue('pagina_web', asociado.pagina_web ?? '');
      }
    }
  }, [values.asociado]);

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
            {accion === 'crear' && (
              <Box className={classes.inputs_2}>
                <MyAutocompleteAsociado
                  options={asociados}
                  name='asociado'
                  inputValue={initialValues.tipo}
                  label='Asociado de Negocios Base'
                  complete={'true'}
                  className={classes.myTextField}
                  disabled={disabled}
                />
              </Box>
            )}
            <Box className={classes.inputs_2}>
              <MyAutocomplete
                options={TIPOS_TERCEROS}
                name='tipo'
                inputValue={initialValues.tipo}
                label='Tipo de Tercero'
                //autoHighlight
                className={classes.myTextField}
                required
                disabled={disabled}
              />
              {/* <MyTextField
                className={classes.myTextField}
                label='Tipo de Tercero'
                name='tipo'
                disabled={disabled}
                select={true}
                required>
                {TIPOS_TERCEROS.map((tipoTercero) => {
                  return (
                    <MenuItem
                      value={tipoTercero.id}
                      key={tipoTercero.id}
                      className={classes.pointer}>
                      {tipoTercero.nombre}
                    </MenuItem>
                  );
                })}
              </MyTextField> */}

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

              <MyAutocomplete
                options={departamentos}
                name='departamento_id'
                inputValue={initialValues.departamento_id}
                label='Departamento'
                //autoHighlight
                className={classes.myTextField}
                required
                disabled={disabled}
              />

              {/* <MyTextField
                className={classes.myTextField}
                label='Departamento'
                name='departamento_id'
                disabled={disabled}
                select={true}
                required>
                {departamentos.map((departamento) => {
                  return (
                    <MenuItem
                      value={departamento.id}
                      key={departamento.id}
                      className={classes.pointer}
                      style={
                        departamento.estado === 0 ? {display: 'none'} : {}
                      }>
                      {departamento.nombre}
                    </MenuItem>
                  );
                })}
              </MyTextField> */}

              <MyAutocomplete
                options={ciudades}
                name='ciudad_id'
                inputValue={initialValues.ciudad_id}
                label='Ciudad'
                //autoHighlight
                className={classes.myTextField}
                required
                disabled={disabled}
              />
              {/* <MyTextField
                className={classes.myTextField}
                label='Ciudad'
                name='ciudad_id'
                disabled={disabled}
                select={true}
                required>
                {ciudades.map((ciudad) => {
                  return (
                    <MenuItem
                      value={ciudad.id}
                      key={ciudad.id}
                      className={classes.pointer}
                      style={ciudad.estado === 0 ? {display: 'none'} : {}}>
                      {ciudad.nombre}
                    </MenuItem>
                  );
                })}
              </MyTextField> */}
            </Box>

            <MyTextField
              className={classes.myTextField}
              label='Dirección'
              name='direccion'
              disabled={disabled}
              required
            />

            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Teléfono'
                name='telefono'
                disabled={disabled}
                required
                inputProps={{
                  maxLength: LONGITUD_MAXIMA_TELEFONOS,
                  minLength: LONGITUD_MINIMA_TELEFONOS,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Celular'
                name='celular'
                disabled={disabled}
                inputProps={{
                  maxLength: LONGITUD_MAXIMA_TELEFONOS,
                  minLength: LONGITUD_MINIMA_TELEFONOS,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Correo Electrónico'
                name='email'
                disabled={disabled}
              />

              <MyTextField
                className={classes.myTextField}
                label='Página Web'
                name='pagina_web'
                disabled={disabled}
              />
            </Box>

            <Box component='h6' fontSize={16} fontWeight='bold'>
              Contacto de Servicio
            </Box>

            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Nombre'
                name='nombre_contacto'
                disabled={disabled}
                required
              />

              <MyTextField
                className={classes.myTextField}
                label='Cargo'
                name='cargo_contacto'
                disabled={disabled}
              />

              <MyTextField
                className={classes.myTextField}
                label='Correo electrónico'
                name='email_contacto'
                disabled={disabled}
              />

              <MyTextField
                className={classes.myTextField}
                label='Telefono'
                name='telefono_contacto'
                disabled={disabled}
                required
                inputProps={{
                  maxLength: LONGITUD_MAXIMA_TELEFONOS,
                  minLength: LONGITUD_MINIMA_TELEFONOS,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Celular'
                name='celular_contacto'
                disabled={disabled}
                inputProps={{
                  maxLength: LONGITUD_MAXIMA_TELEFONOS,
                  minLength: LONGITUD_MINIMA_TELEFONOS,
                }}
              />

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

export default TerceroServicioForm;
