import React, {useEffect, useState, useRef} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import {useDispatch} from 'react-redux';
import {onGetColeccionLigera as ciudadColeccionLigera} from '../../../../redux/actions/CiudadAction';
import {onGetColeccionLigera as coleccionLigeraLugar} from '../../../../redux/actions/LugarAction';
import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
} from '../../../../shared/constants/Constantes';
import MyRadioField from '../../../../shared/components/MyRadioField';

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

const RutaControl = (props) => {
  const {
    handleOnClose,
    accion,
    initialValues,
    TIPOS_PROCESOS,
    tiposDocumentos,
    encabezado,
    departamentos,
    ciudades,
    lugares,
    setFieldValue,
    values,
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
      marginBottom: 5,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 5,
      },
      height: '70px',
    },
    MyRadioField: {
      width: '100%',
      marginBottom: 0,
      marginTop: 5,
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
    contenedorFiltros: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 15,
      marginBottom: 20,
    },
  }));

  const dispatch = useDispatch();

  let onChangeDepartamento1 = useRef();
  onChangeDepartamento1 = (id) => {
    dispatch(ciudadColeccionLigera(id));
    values.ciudad_id = '';
  };

  let onChangeCiudad1 = useRef();
  onChangeCiudad1 = (id) => {
    dispatch(coleccionLigeraLugar(id, encabezado?.id));
  };

  useEffect(() => {
    if (values.departamento_id !== '') {
      onChangeDepartamento1(values.departamento_id);
    } else {
      onChangeDepartamento1(0);
    }
  }, [values.departamento_id]);

  useEffect(() => {
    if (values.ciudad_id !== '') {
      onChangeCiudad1(values.ciudad_id);
    } else {
      onChangeCiudad1(0);
    }
  }, [values.ciudad_id]);

  useEffect(() => {
    if (values.lugar_id !== '') {
      const lugar = lugares.find((lugar) => lugar.id === values.lugar_id);
      setFieldValue('nombre', lugar?.nombre ?? '');
      setFieldValue('direccion', lugar?.direccion ?? '');
    }
  }, [values.lugar_id]);

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
            {
              'Acuerdos operativos de servicio - Lugares Instalación/Desinstalación'
            }
          </Box>

          <Box className={classes.contenedorFiltros}>
            <TextField
              label='Tipo Documento'
              InputLabelProps={{
                shrink: true,
                style: {
                  fontWeight: 'bold',
                  color: 'black',
                },
              }}
              InputProps={{readOnly: true, style: {fontSize: '13px'}}}
              name='tipoDocumento'
              value={encabezado.tipo_documento ? encabezado.tipo_documento : ''}
              disabled={true}
            />
            <TextField
              label='Número Documento'
              InputLabelProps={{
                shrink: true,
                style: {
                  fontWeight: 'bold',
                  color: 'black',
                },
              }}
              InputProps={{readOnly: true, style: {fontSize: '13px'}}}
              name='numeroDocumento'
              value={
                encabezado.numero_documento ? encabezado.numero_documento : ''
              }
              disabled={true}
            />
            <TextField
              label='Nombre'
              InputLabelProps={{
                shrink: true,
                style: {
                  fontWeight: 'bold',
                  color: 'black',
                },
              }}
              InputProps={{readOnly: true, style: {fontSize: '13px'}}}
              name='nombre'
              value={encabezado.nombre ? encabezado.nombre : ''}
              disabled={true}
            />
            <TextField
              label='Ciudad'
              InputLabelProps={{
                shrink: true,
                style: {
                  fontWeight: 'bold',
                  color: 'black',
                },
              }}
              InputProps={{readOnly: true, style: {fontSize: '13px'}}}
              name='ciudad'
              value={encabezado.ciudad ? encabezado.ciudad : ''}
              disabled={true}
            />
          </Box>

          <MyAutocomplete
            options={TIPOS_PROCESOS}
            name='tipo_proceso'
            inputValue={initialValues.tipo_proceso}
            label='Tipo Proceso'
            //autoHighlight
            className={classes.myTextField}
            required
            disabled={disabled}
          />

          <Box className={classes.inputs_2}>
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

            <MyAutocomplete
              options={lugares}
              name='lugar_id'
              inputValue={initialValues.lugar_id}
              label='Lugar'
              //autoHighlight
              className={classes.myTextField}
              disabled={disabled}
            />
          </Box>

          <MyTextField
            className={classes.myTextField}
            label='Nombre Lugar'
            name='nombre'
            disabled
          />

          <MyTextField
            className={classes.myTextField}
            label='Dirección Lugar'
            name='direccion'
            disabled
          />

          <Box component='h3'>Información persona encargada:</Box>
          <Box className={classes.inputs_2}>
            {/* <MyAutocomplete
              options={recursosTecnicos}
              name='recurso_tecnico_id'
              inputValue={initialValues.recurso_tecnico_id}
              label='Recurso Técnico'
              //autoHighlight
              className={classes.myTextField}
              disabled={disabled}
            /> */}
            <MyRadioField
              label='Encargado SecSel'
              className={classes.MyRadioField}
              name='encargado_inst_desinst_secsecl'
              disabled={disabled}
              required
              options={[
                {value: 'S', label: 'Sí'},
                {value: 'N', label: 'No'},
              ]}
            />
            <Box sx={{display: 'hidden'}}></Box>
            <MyAutocomplete
              options={tiposDocumentos}
              name='tipo_documento_id'
              inputValue={initialValues.ciudad_id}
              label='Tipo Documento'
              //autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />

            <MyTextField
              className={classes.myTextField}
              label='Número Identificación'
              name='numero_documento'
              disabled={disabled}
              required
              inputProps={{
                maxLength: LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
              }}
            />
          </Box>
          <MyTextField
            className={classes.myTextField}
            label='Nombre Completo'
            name='nombre_encargado'
            disabled={disabled}
            required
          />
          <MyTextField
            className={classes.myTextField}
            label='Celular'
            name='celular_encargado'
            disabled={disabled}
            required
            inputProps={{
              maxLength: LONGITUD_MAXIMA_TELEFONOS,
              minLength: LONGITUD_MINIMA_TELEFONOS,
            }}
          />
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

export default RutaControl;
