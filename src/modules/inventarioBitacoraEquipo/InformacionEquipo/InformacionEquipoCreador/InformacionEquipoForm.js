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

const InformacionEquipoForm = (props) => {
  const {
    handleOnClose,
    accion,
    values,
    initialValues,
    TIPOS_EQUIPOS,
    titulo,
    errors,
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
    helperText: {
      color: 'red',
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
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Número Serial'
                name='numero_serial'
                disabled={disabled}
                required
              />
              <MyAutocomplete
                options={TIPOS_EQUIPOS}
                name='tipo_equipo'
                inputValue={initialValues.tipo_equipo}
                label='Tipo Equipo'
                autoHighlight
                className={classes.myTextField}
                required
                disabled={disabled}
              />
            </Box>

            <MyTextField
              className={classes.myTextField}
              label='Nombre Equipo'
              name='nombre_equipo'
              disabled={disabled}
              required
            />

            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Fecha Compra'
                name='fecha_compra_equipo'
                required
                type='date'
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Fecha Activación'
                name='fecha_activacion_equipo'
                required
                type='date'
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Valor Costo USD'
                name='valor_costo_equipo_USD'
                disabled={disabled}
              />

              <MyTextField
                className={classes.myTextField}
                label='Nombre proveedor'
                name='nombre_proveedor'
                disabled={disabled}
              />
            </Box>

            <MyTextField
              className={classes.myTextField}
              label='Observaciones'
              name='observaciones'
              disabled={disabled}
              multiline
            />

            <Box className={classes.inputs_2}>
              <FormControl
                className={classes.widthFull}
                component='fieldset'
                error={errors.equipo_desechable ? true : false}>
                <FormLabel>Desechable*</FormLabel>
                <Field
                  name='equipo_desechable'
                  type='radio'
                  as={RadioGroup}
                  className={classes.myTextField}
                  disabled={disabled}
                  row
                  value={values.equipo_desechable}>
                  <FormControlLabel
                    value='S'
                    control={<Radio color='primary' />}
                    label='Si'
                    labelPlacement='end'
                    disabled={disabled}
                  />
                  <FormControlLabel
                    value='N'
                    control={<Radio color='primary' />}
                    label='No'
                    labelPlacement='end'
                    disabled={disabled}
                  />
                </Field>
                {errors.equipo_desechable && (
                  <FormHelperText className={classes.helperText}>
                    Requerido
                  </FormHelperText>
                )}
              </FormControl>
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

export default InformacionEquipoForm;
