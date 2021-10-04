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
import FormLabel from '@material-ui/core/FormLabel';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import {onGetColeccionLigera as ciudadColeccionLigera} from '../../../../redux/actions/CiudadAction';
import {useDispatch} from 'react-redux';

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

const LugarForm = (props) => {
  const {
    handleOnClose,
    accion,
    values,
    initialValues,
    departamentos,
    ciudades,
    asociados,
    titulo,
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
      marginBottom: 5,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 5,
      },
      height: '70px',
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
    MyRadioField: {
      width: '100%',
      marginBottom: 0,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 0,
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

  const [req, setReq] = useState(false);

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
            <MyTextField
              className={classes.myTextField}
              label='Nombre'
              name='nombre'
              disabled={disabled}
              required
            />
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

            <MyTextField
              className={classes.myTextField}
              label='Dirección'
              name='direccion'
              disabled={disabled}
              required
            />

            <Box className={classes.inputs_2}>
              <MyRadioField
                label='Lugar Propio Asociado Negocio'
                className={classes.MyRadioField}
                name='lugar_asociado_negocios'
                disabled={disabled}
                required
                onClick={(event) => {
                  setReq(event.target.value === 'S');
                  if (event.target.value === 'N') {
                    setFieldValue('asociado_id', '');
                  }
                }}
                options={[
                  {value: 'S', label: 'Si'},
                  {value: 'N', label: 'No'},
                ]}
              />

              <MyRadioField
                label='Lugar Aduana Uso General'
                className={classes.MyRadioField}
                name='lugar_aduana_general'
                disabled={disabled}
                required
                options={[
                  {value: 'S', label: 'Si'},
                  {value: 'N', label: 'No'},
                ]}
              />
            </Box>

            <MyAutocomplete
              options={asociados}
              name='asociado_id'
              inputValue={initialValues.asociado_id}
              label='Asociado Negocio'
              //autoHighlight
              className={classes.myTextField}
              required={req}
              disabled={!req}
            />

            <MyTextField
              className={classes.myTextField}
              label='Código Geocerca'
              name='geocerca_id'
              disabled={disabled}
            />

            <MyTextField
              className={classes.myTextField}
              label='Observaciones'
              name='observaciones'
              multiline
              disabled={disabled}
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

export default LugarForm;
