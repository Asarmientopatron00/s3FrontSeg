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

const PuestoControl = (props) => {
  const {
    handleOnClose,
    accion,
    initialValues,
    TIPOS_PUESTOS_CONTROL,
    encabezado,
    departamentos,
    ciudades,
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
      gap: 20,
      marginBottom: 20,
    },
  }));

  const dispatch = useDispatch();

  let onChangeDepartamento1 = useRef();
  onChangeDepartamento1 = (id) => {
    dispatch(ciudadColeccionLigera(id));
    values.ciudad_id = '';
  };

  useEffect(() => {
    if (values.departamento_id !== '') {
      onChangeDepartamento1(values.departamento_id);
    } else {
      onChangeDepartamento1(0);
    }
  }, [values.departamento_id]);

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
            {'Acuerdos operativos de servicio - Puestos de control de ruta'}
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

          <Box className={classes.inputs_2}>
            <MyAutocomplete
              options={departamentos}
              name='departamento_id'
              inputValue={initialValues.departamento_id}
              label='Departamento'
              autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />

            <MyAutocomplete
              options={ciudades}
              name='ciudad_id'
              inputValue={initialValues.ciudad_id}
              label='Ciudad'
              autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />
          </Box>

          <MyTextField
            className={classes.myTextField}
            label='Nombre Puesto Control'
            name='nombre'
            disabled={disabled}
            required
          />

          <MyAutocomplete
            options={TIPOS_PUESTOS_CONTROL}
            name='tipo_puesto_control'
            inputValue={initialValues.tipo_puesto_control}
            label='Tipo Puesto Control'
            autoHighlight
            className={classes.myTextField}
            required
            disabled={disabled}
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

export default PuestoControl;
