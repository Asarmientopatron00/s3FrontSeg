import React, {useEffect, useState, useRef} from 'react';
import {Box, Button, RadioGroup, Radio} from '@material-ui/core';
import {Field, Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
// import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import {Fonts} from '../../../../shared/constants/AppEnums';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
} from '../../../../shared/constants/Constantes';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  FETCH_ERROR,
  FETCH_START,
} from '../../../../shared/constants/ActionTypes';
import {useDispatch, useSelector} from 'react-redux';
import {onGetTipoRol} from '../../../../redux/actions/AsociadoAction';

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

const MyAutocomplete = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <Autocomplete
      {...props}
      renderOption={(option) => (
        <React.Fragment>{option.nombre}</React.Fragment>
      )}
      onChange={props.onChange}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            {...field}
            name={props.name}
            className={props.className}
            label={props.label}
            required={props.required}
            helperText={errorText}
            error={!!errorText}
          />
        );
      }}
    />
  );
};

const AsociadoNegocioForm = (props) => {
  const {
    handleOnClose,
    accion,
    values,
    initialValues,
    tiposDocumentos,
    onChangeDepartamento,
    departamentos,
    ciudades,
    ciudadesOtra,
    onChangeDepartamentoOtra,
    actividadesEconomicas,
    usuario,
    setFieldValue,
  } = props;

  const dispatch = useDispatch();

  // const factores = [41, 37, 29, 23, 19, 17, 13, 7, 3];

  let calcularDV = useRef();
  calcularDV = (documento) => {
    let suma = 0;
    const factores = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
    if (documento !== '') {
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

  let onChangeDepartamentoOtra1 = useRef();
  onChangeDepartamentoOtra1 = (id) => {
    onChangeDepartamentoOtra(id);
    values.ciudad_otra_id = '';
  };

  useEffect(() => {
    if (values.departamento_id !== '') {
      onChangeDepartamento1(values.departamento_id);
    } else {
      onChangeDepartamento1(0);
    }
  }, [values.departamento_id]);

  useEffect(() => {
    if (values.departamento_otro_id !== '') {
      onChangeDepartamentoOtra1(values.departamento_otro_id);
    } else {
      onChangeDepartamentoOtra1(0);
    }
  }, [values.departamento_otro_id]);

  let changeActividadEconomica = useRef();
  changeActividadEconomica = () => {
    actividadesEconomicas.map((actividad) => {
      if (values.actividad_economica_id === actividad.id) {
        values.nombre_actividad_Economica = actividad.nombre;
      }
      return actividad.nombre;
    });
  };

  useEffect(() => {
    changeActividadEconomica();
  }, [values.actividad_economica_id, actividadesEconomicas]);

  const [tipoPersona, setTipoPersona] = useState('N');
  useEffect(() => {
    setTipoPersona(values.tipo_persona);
  }, [values.tipo_persona]);

  const tiposRol = useSelector(({asociadoReducer}) => asociadoReducer.tipo_rol);

  useEffect(() => {
    dispatch(onGetTipoRol());
  }, [dispatch]);

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
      height: '60px',
      paddingRight: '20px',
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
    },
    inputs_3: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 3fr 3fr',
    },
    inputs_4: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
    },
    marco: {
      padding: '20px',
      backgroundColor: 'white',
      boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
      borderRadius: '4px',
    },
    root: {
      padding: '20px',
      backgroundColor: theme.palette.gray[200],
    },
    actividad_eca: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 3fr',
    },
  }));

  const [focusedSelect, setFocusedSelect] = useState(false);
  const onFocus = () => setFocusedSelect(true);
  const onBlur = () => setFocusedSelect(false);
  const classes = useStyles(props);
  return (
    <Form noValidate autoComplete='off' className={classes.root}>
      <Box className={classes.marco}>
        <Box
          component='h6'
          mb={{xs: 4, xl: 6}}
          fontSize={20}
          fontWeight={Fonts.MEDIUM}>
          <IntlMessages id='asociados' />
        </Box>

        <Box px={{md: 5, lg: 8, xl: 10}}>
          <Box className={classes.inputs_2} minHeight='70px'>
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

            <MyRadioField
              label='Entidad Pública'
              className={classes.MyRadioField}
              name='entidad_publica'
              disabled={disabled}
              required
              options={[
                {value: 'S', label: 'Si'},
                {value: 'N', label: 'No'},
              ]}
            />
          </Box>

          <Box className={classes.inputs_2}>
            <MyTextField
              className={classes.myTextField}
              label='Tipo de Documento'
              name='tipo_documento_id'
              disabled={disabled}
              select={true}
              required
              SelectProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}>
              {tiposDocumentos.map((tipoDocumento) => {
                return (
                  <MenuItem
                    value={tipoDocumento.id}
                    key={tipoDocumento.id}
                    className={classes.pointer}
                    style={
                      tipoDocumento.estado === 0
                        ? {display: 'none'}
                        : {paddingTop: '3px', paddingBotttom: '3px'}
                    }>
                    {tipoDocumento.nombre}
                  </MenuItem>
                );
              })}
            </MyTextField>

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
                          style: {
                            fontSize: '14px',
                            paddingBottom: '6px',
                            paddingTop: '8px',
                          },
                        }
                      : {
                          maxLength: LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
                          style: {
                            fontSize: '14px',
                            paddingBottom: '6px',
                            paddingTop: '8px',
                          },
                        }
                  }
                />
              </Box>
              <MyTextField
                className={classes.myTextField}
                label='Dígito Verificación'
                name='digito_verificacion'
                disabled={true}
                inputProps={{
                  style: {
                    fontSize: '14px',
                    paddingBottom: '3px',
                    paddingTop: '2px',
                  },
                }}
              />
            </Box>

            <MyTextField
              className={classes.myTextField}
              label='Nombre'
              name='nombre'
              disabled={disabled}
              required
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />

            {tipoPersona !== 'J' ? (
              <>
                <MyTextField
                  className={classes.myTextField}
                  label='Segundo Nombre'
                  name='segundo_nombre'
                  disabled={disabled}
                  inputProps={{
                    style: {
                      fontSize: '14px',
                      paddingBottom: '3px',
                      paddingTop: '2px',
                    },
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Primer Apellido'
                  name='primer_apellido'
                  disabled={disabled}
                  required
                  inputProps={{
                    style: {
                      fontSize: '14px',
                      paddingBottom: '3px',
                      paddingTop: '2px',
                    },
                  }}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Segundo Apellido'
                  name='segundo_apellido'
                  disabled={disabled}
                  inputProps={{
                    style: {
                      fontSize: '14px',
                      paddingBottom: '3px',
                      paddingTop: '2px',
                    },
                  }}
                />
              </>
            ) : (
              ''
            )}
          </Box>

          <Box component='h6' fontSize={16} fontWeight='bold' mb={3}>
            Dirección Principal:
          </Box>

          <Box className={classes.inputs_2}>
            <MyTextField
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
                    style={departamento.estado === 0 ? {display: 'none'} : {}}>
                    {departamento.nombre}
                  </MenuItem>
                );
              })}
            </MyTextField>

            <MyTextField
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
            </MyTextField>

            <MyTextField
              className={classes.myTextField}
              label='Direccion'
              name='direccion'
              disabled={disabled}
              required
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />

            <MyTextField
              className={classes.myTextField}
              label='Telefono'
              name='telefono'
              disabled={disabled}
              inputProps={{
                maxLength: LONGITUD_MAXIMA_TELEFONOS,
                minLength: LONGITUD_MINIMA_TELEFONOS,
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
              required
            />

            <MyTextField
              className={classes.myTextField}
              label='Celular'
              name='celular'
              disabled={disabled}
              inputProps={{
                maxLength: LONGITUD_MAXIMA_TELEFONOS,
                minLength: LONGITUD_MINIMA_TELEFONOS,
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />

            <MyTextField
              className={classes.myTextField}
              label='Correo Electrónico'
              name='email'
              disabled={disabled}
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />

            <MyTextField
              className={classes.myTextField}
              label='Página Web'
              name='pagina_web'
              disabled={disabled}
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />
          </Box>

          <Box component='h6' fontSize={16} fontWeight='bold' mb={3}>
            Dirección Otra Sede:
          </Box>

          <Box className={classes.inputs_2}>
            <MyTextField
              className={classes.myTextField}
              label='Departamento'
              name='departamento_otro_id'
              disabled={disabled}
              select={true}>
              {departamentos.map((departamento) => {
                return (
                  <MenuItem
                    value={departamento.id}
                    key={departamento.id}
                    className={classes.pointer}
                    style={departamento.estado === 0 ? {display: 'none'} : {}}>
                    {departamento.nombre}
                  </MenuItem>
                );
              })}
            </MyTextField>

            <MyTextField
              className={classes.myTextField}
              label='Ciudad'
              name='ciudad_otra_id'
              disabled={disabled}
              select={true}>
              {ciudadesOtra.map((ciudad) => {
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
            </MyTextField>

            <MyTextField
              className={classes.myTextField}
              label='Dirección'
              name='direccion_otra_sede'
              disabled={disabled}
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />

            <MyTextField
              className={classes.myTextField}
              label='Teléfono'
              name='telefono_otra_sede'
              disabled={disabled}
              inputProps={{
                maxLength: LONGITUD_MAXIMA_TELEFONOS,
                minLength: LONGITUD_MINIMA_TELEFONOS,
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />

            <MyTextField
              className={classes.myTextField}
              label='Celular'
              name='celular_otra_sede'
              disabled={disabled}
              inputProps={{
                maxLength: LONGITUD_MAXIMA_TELEFONOS,
                minLength: LONGITUD_MINIMA_TELEFONOS,
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />
          </Box>

          <Box component='h6' fontSize={16} fontWeight='bold' mb={3}>
            Informacion Tributaria:
          </Box>

          <MyTextField
            className={classes.myTextField}
            label='Descripción Actividad Económica'
            name='descripcion_actividad_economica'
            disabled={disabled}
            required
            multiline
            inputProps={{
              style: {
                fontSize: '14px',
                paddingBottom: '3px',
                paddingTop: '2px',
              },
            }}
          />

          <Box className={classes.actividad_eca}>
            <MyTextField
              className={classes.myTextField}
              label='Código CIIU'
              name='actividad_economica_id'
              disabled={disabled}
              select={true}
              required
              SelectProps={{
                native: false,
                onOpen: onFocus,
                onClose: onBlur,
              }}>
              {actividadesEconomicas.map((actividad) => {
                return (
                  <MenuItem
                    key={actividad.id}
                    value={actividad.id}
                    className={classes.pointer}
                    style={actividad.estado === 0 ? {display: 'none'} : {}}>
                    {focusedSelect
                      ? actividad.codigo_ciiu + '-' + actividad.nombre
                      : actividad.codigo_ciiu}
                  </MenuItem>
                );
              })}
            </MyTextField>

            <MyTextField
              className={classes.myTextField}
              label='Nombre Actividad Económica'
              name='nombre_actividad_Economica'
              inputProps={{
                readOnly: true,
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={disabled}
              multiline
            />
          </Box>

          <Box className={classes.inputs_2}>
            <MyTextField
              className={classes.myTextField}
              label='Capital Registrado'
              name='capital_registrado'
              disabled={disabled}
              type='number'
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />
            <Box display='flex' justifyContent='space-around'>
              <MyRadioField
                label='Responsable Iva'
                className={classes.MyRadioField}
                name='responsable_iva'
                disabled={disabled}
                required
                options={[
                  {value: 'S', label: 'Si'},
                  {value: 'N', label: 'No'},
                ]}
              />

              <MyRadioField
                label='Exento Impuesto de Renta'
                className={classes.MyRadioField}
                name='exento_impuesto_renta'
                disabled={disabled}
                required
                options={[
                  {value: 'S', label: 'Si'},
                  {value: 'N', label: 'No'},
                ]}
              />
            </Box>
          </Box>

          <Box className={classes.inputs_3}>
            <MyRadioField
              label='Gran Contribuyente'
              className={classes.MyRadioField}
              name='gran_contribuyente'
              disabled={disabled}
              required
              options={[
                {value: 'S', label: 'Si'},
                {value: 'N', label: 'No'},
              ]}
            />
            <MyTextField
              className={classes.myTextField}
              label='Número Resolución'
              name='numero_resolucion_gran_c'
              disabled={disabled}
              required={values.gran_contribuyente === 'S'}
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />
            <MyTextField
              className={classes.myTextField}
              label='Fecha'
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
              name='fecha_resolucion_gran_c'
              disabled={disabled}
              type='date'
            />
            <MyRadioField
              label='Autoretenedor'
              className={classes.MyRadioField}
              name='autorretenedor'
              disabled={disabled}
              required
              options={[
                {value: 'S', label: 'Si'},
                {value: 'N', label: 'No'},
              ]}
            />
            <MyTextField
              className={classes.myTextField}
              label='Número Resolución'
              name='resolucion_autorretenedor'
              disabled={disabled}
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />
            <MyTextField
              className={classes.myTextField}
              label='Fecha'
              InputLabelProps={{
                shrink: true,
              }}
              name='fecha_resolucion_autorretenedor'
              disabled={disabled}
              type='date'
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />
          </Box>

          <Box className={classes.inputs_2}>
            <MyTextField
              className={classes.myTextField}
              label='Origen de los Fondos'
              name='origen_fondos'
              disabled={disabled}
              required
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />
          </Box>

          <Box component='h6' fontSize={16} fontWeight='bold' mb={3}>
            Certificados Sistemas e Gestión:
          </Box>

          <Box className={classes.inputs_4}>
            <MyRadioField
              label='OEA'
              className={classes.MyRadioField}
              name='certificado_oea'
              disabled={disabled}
              required
              options={[
                {value: 'S', label: 'Si'},
                {value: 'N', label: 'No'},
              ]}
            />

            <MyRadioField
              label='BASC'
              className={classes.MyRadioField}
              name='certificado_basc'
              disabled={disabled}
              required
              options={[
                {value: 'S', label: 'Si'},
                {value: 'N', label: 'No'},
              ]}
            />

            <MyRadioField
              label='ISO 28001'
              className={classes.MyRadioField}
              name='certificado_iso_28001'
              disabled={disabled}
              required
              options={[
                {value: 'S', label: 'Si'},
                {value: 'N', label: 'No'},
              ]}
            />

            <MyRadioField
              label='ISO 9001'
              className={classes.MyRadioField}
              name='certificado_iso_9001'
              disabled={disabled}
              required
              options={[
                {value: 'S', label: 'Si'},
                {value: 'N', label: 'No'},
              ]}
            />
          </Box>

          <Box className={classes.actividad_eca}>
            <MyRadioField
              label='C-TPAT'
              className={classes.MyRadioField}
              name='certificado_c_tpat'
              disabled={disabled}
              required
              options={[
                {value: 'S', label: 'Si'},
                {value: 'N', label: 'No'},
              ]}
            />

            <MyTextField
              className={classes.myTextField}
              label='Otro Certificado'
              name='otro_certificado'
              disabled={disabled}
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />
          </Box>

          <Box component='h6' fontSize={16} fontWeight='bold' mb={3}>
            Información para Facturación:
          </Box>

          <Box className={classes.inputs_2}>
            <MyTextField
              className={classes.myTextField}
              label='Tipo de Documento'
              name='tipo_documento_facturacion_id'
              disabled={disabled}
              select={true}>
              {tiposDocumentos.map((tipoDocumento) => {
                return (
                  <MenuItem
                    value={tipoDocumento.id}
                    key={tipoDocumento.id}
                    className={classes.pointer}
                    style={tipoDocumento.estado === 0 ? {display: 'none'} : {}}>
                    {tipoDocumento.nombre}
                  </MenuItem>
                );
              })}
            </MyTextField>

            <MyAutocomplete
              className={classes.myTextField}
              name='tipo_documento_facturacion_id'
              label='Tipo de Documento'
              options={tiposDocumentos}
              autoHighlight
              onBlur={(event) => {
                let valor = '';
                tiposDocumentos.forEach((tipoDocumento) => {
                  if (tipoDocumento.nombre === event.target.value) {
                    valor = tipoDocumento.id;
                  }
                });
                setFieldValue('tipo_documento_facturacion_id', valor);
              }}
              getOptionLabel={(option) => option.nombre}
              filterSelectedOptions
            />

            <MyTextField
              className={classes.myTextField}
              label='Número Documento Empresa Facturación'
              name='numero_documento_facturacion'
              disabled={disabled}
              inputProps={{
                maxLength: LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />

            <MyTextField
              className={classes.myTextField}
              label='Día Cierre Facturación'
              name='dia_cierre_facturacion'
              disabled={disabled}
              required
              inputProps={{
                maxLength: 2,
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
              type='number'
            />

            <MyTextField
              className={classes.myTextField}
              label='Código Postal Facturación'
              name='codigo_postal_facturacion'
              disabled={disabled}
              inputProps={{
                maxLength: 6,
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
              required
            />

            <MyTextField
              className={classes.myTextField}
              label='Correo Envío Facturación Electrónica'
              name='correo_envio_facturacion_electronica'
              disabled={disabled}
              required
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />

            <MyTextField
              className={classes.myTextField}
              label='Correo Recepción Facturación Electrónica'
              name='correo_recepcion_facturacion_electronica'
              disabled={disabled}
              required
              inputProps={{
                style: {
                  fontSize: '14px',
                  paddingBottom: '3px',
                  paddingTop: '2px',
                },
              }}
            />
          </Box>

          <Box mb={5}>
            <MyTextField
              className={classes.widthFull}
              label='Circular 070'
              name='circular070'
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
                style: {
                  height: '20px',
                  fontSize: '22px',
                },
              }}
              disabled={disabled}
              multiline
            />
          </Box>
          <Box mb={8}>
            <MyRadioField
              label='Acepta las condiciones de la circular'
              className={classes.MyRadioField}
              name='aceptar_condiciones_circular_070'
              disabled={disabled}
              required
              options={[
                {value: 'S', label: 'Si'},
                {value: 'N', label: 'No'},
              ]}
            />
          </Box>

          <Box mb={5}>
            <MyTextField
              className={classes.widthFull}
              label='Autorizacion Manejo Datos Personales'
              name='datos_personales'
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
                style: {
                  height: '20px',
                  fontSize: '22px',
                },
              }}
              disabled={disabled}
              multiline
            />
          </Box>
          <Box mb={8}>
            <MyRadioField
              label='Autoriza manejo de datos personales'
              className={classes.MyRadioField}
              name='autorizacion_datos_personales'
              disabled={disabled}
              required
              options={[
                {value: 'S', label: 'Si'},
                {value: 'N', label: 'No'},
              ]}
            />
          </Box>

          <Box mb={5}>
            <MyTextField
              className={classes.widthFull}
              label='Clausula de Confidencialidad'
              name='clausula_confidencialidad'
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
                style: {
                  height: '20px',
                  fontSize: '22px',
                },
              }}
              disabled={disabled}
              multiline
            />
          </Box>
          <Box mb={8}>
            <MyRadioField
              label='Autoriza clausula de confidencialidad'
              className={classes.MyRadioField}
              name='autorizacion_clausula_confidencialidad'
              disabled={disabled}
              required
              options={[
                {value: 'S', label: 'Si'},
                {value: 'N', label: 'No'},
              ]}
            />
          </Box>

          {usuario.rol.tipo === tiposRol['TIPO_ROL_INTERNO'] ? (
            <Box className={classes.inputs_2}>
              <MyRadioField
                label='Información Verificada'
                className={classes.MyRadioField}
                name='informacion_verificada_asociado'
                disabled={disabled}
                required
                onClick={(event) => {
                  setTimeout(function () {
                    dispatch({type: FETCH_START});
                  }, 1000);

                  if (event.target.value === 'S') {
                    if (
                      values.autorizacion_clausula_confidencialidad === 'N' ||
                      values.autorizacion_clausula_confidencialidad === 'N' ||
                      values.aceptar_condiciones_circular_070 === 'N'
                    ) {
                      event.target.value = 'N';
                      dispatch({
                        type: FETCH_ERROR,
                        payload:
                          'No cumple condiciones para dar información por verificada',
                      });
                    }
                  }
                }}
                options={[
                  {value: 'S', label: 'Si'},
                  {value: 'N', label: 'No'},
                ]}
              />

              <MyRadioField
                label='Enviar solicitud de aprobacion del representante legal'
                className={classes.MyRadioField}
                name='firma_representante_legal'
                disabled={disabled}
                required
                options={[
                  {value: 'S', label: 'Si'},
                  {value: 'N', label: 'No'},
                ]}
              />
            </Box>
          ) : (
            ''
          )}

          <Box className={classes.inputs_2}>
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
          {accion !== 'crear' ? (
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Usuario Creación'
                name='usuario_creacion_nombre'
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />

              <MyTextField
                className={classes.myTextField}
                label='Usuario Última Modificación'
                name='usuario_modificacion_nombre'
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />

              <MyTextField
                className={classes.myTextField}
                label='Fecha Creación Creación'
                name='fecha_creacion'
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />

              <MyTextField
                className={classes.myTextField}
                label='Fecha Última Modificación'
                name='fecha_modificacion'
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />
            </Box>
          ) : (
            ''
          )}
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
      </Box>
    </Form>
  );
};

export default AsociadoNegocioForm;
