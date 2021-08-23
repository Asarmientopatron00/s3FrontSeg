import React, {useEffect, useState} from 'react';
import {Box, Button, Checkbox} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import FormGroup from '@material-ui/core/FormGroup';

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

const AcuerdoServicioForm = (props) => {
  const {
    handleOnClose,
    accion,
    values,
    initialValues,
    asociados,
    setFieldValue,
  } = props;

  const [disabled, setDisabled] = useState(false);
  const [h24, seth24] = useState(false);
  const [diurno, setDiurno] = useState(false);
  const [nocturno, setNocturno] = useState(false);

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
    inputs_3: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '10px',
    },
  }));

  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.checked ? 'S' : 'N');
    if (event.target.name === 'horario_transito_24h') {
      if (event.target.checked) {
        seth24(true);
        setFieldValue('horario_transito_diurno', 'N');
        setFieldValue('horario_transito_diurno_desde', '');
        setFieldValue('horario_transito_diurno_hasta', 'N');
        setFieldValue('horario_transito_nocturno', 'N');
        setFieldValue('horario_transito_nocturno_desde', '');
        setFieldValue('horario_transito_nocturno_hasta', '');
      } else {
        seth24(false);
      }
    }
    if (event.target.name === 'horario_transito_diurno') {
      if (event.target.checked) {
        setDiurno(true);
      } else {
        setDiurno(false);
        setFieldValue('horario_transito_diurno_desde', '');
        setFieldValue('horario_transito_diurno_hasta', 'N');
        // setFieldValue('horario_transito_nocturno_desde','');
        // setFieldValue('horario_transito_nocturno_hasta','');
      }
    }
    if (event.target.name === 'horario_transito_nocturno') {
      if (event.target.checked) {
        setNocturno(true);
      } else {
        setNocturno(false);
        setFieldValue('horario_transito_nocturno_desde', '');
        setFieldValue('horario_transito_nocturno_hasta', '');
      }
    }
  };
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
            <IntlMessages id='configuracion.actividadesEconomicas' />
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <MyAutocomplete
              options={asociados}
              name='asociado_id'
              inputValue={initialValues.asociado_id}
              label='Asociado de negocio'
              autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Fecha'
              name='fecha_acuerdo_servicio'
              disabled={true}
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Box component='p'>Tipo Servicio*</Box>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name='tipo_servicio_dta'
                    checked={values.tipo_servicio_dta === 'S'}
                    onChange={handleChange}
                  />
                }
                label='DTA'
                disabled={disabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='tipo_servicio_otm'
                    checked={values.tipo_servicio_otm === 'S'}
                    onChange={handleChange}
                  />
                }
                label='OTM'
                disabled={disabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='tipo_servicio_nacionalizado'
                    checked={values.tipo_servicio_nacionalizado === 'S'}
                    onChange={handleChange}
                  />
                }
                label='Nacionalizado'
                disabled={disabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='tipo_servicio_pernocta'
                    checked={values.tipo_servicio_pernocta === 'S'}
                    onChange={handleChange}
                  />
                }
                label='Pernocta'
                disabled={disabled}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='tipo_servicio_exportacion'
                    checked={values.tipo_servicio_exportacion === 'S'}
                    onChange={handleChange}
                  />
                }
                label='Exportación'
                disabled={disabled}
              />
              <MyTextField
                label='Otro'
                name='tipo_servicio_otro'
                disabled={disabled}
              />
            </FormGroup>
            <Box component='h4'>Horario autorizado de transito:</Box>
            <FormControlLabel
              control={
                <Checkbox
                  name='horario_transito_24h'
                  checked={values.horario_transito_24h === 'S'}
                  onChange={handleChange}
                />
              }
              label='Veinticuatro horas'
              disabled={disabled}
            />
            <Box className={classes.inputs_3}>
              <FormControlLabel
                control={
                  <Checkbox
                    name='horario_transito_diurno'
                    checked={values.horario_transito_diurno === 'S'}
                    onChange={handleChange}
                  />
                }
                label='Diurno'
                disabled={disabled || h24}
              />
              <MyTextField
                className={classes.myTextField}
                label='Desde'
                name='horario_transito_diurno_desde'
                disabled={disabled || h24 || !diurno}
                required
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Hasta'
                name='horario_transito_diurno_hasta'
                disabled={disabled || h24 || !diurno}
                required
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box className={classes.inputs_3}>
              <FormControlLabel
                control={
                  <Checkbox
                    name='horario_transito_nocturno'
                    checked={values.horario_transito_nocturno === 'S'}
                    onChange={handleChange}
                  />
                }
                label='Nocturno'
                disabled={disabled || h24}
              />
              <MyTextField
                className={classes.myTextField}
                label='Desde'
                name='horario_transito_nocturno_desde'
                disabled={disabled || h24 || !nocturno}
                required
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Hasta'
                name='horario_transito_nocturno_hasta'
                disabled={disabled || h24 || !nocturno}
                required
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box component='p'>Dias de la semana</Box>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name='dia_transito_lunes'
                    checked={values.dia_transito_lunes === 'S'}
                    onChange={handleChange}
                  />
                }
                label='Lunes'
                disabled={accion === 'ver'}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='dia_transito_martes'
                    checked={values.dia_transito_martes === 'S'}
                    onChange={handleChange}
                  />
                }
                label='Martes'
                disabled={accion === 'ver'}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='dia_transito_miercoles'
                    checked={values.dia_transito_miercoles === 'S'}
                    onChange={handleChange}
                  />
                }
                label='Miércoles'
                disabled={accion === 'ver'}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='dia_transito_jueves'
                    checked={values.dia_transito_jueves === 'S'}
                    onChange={handleChange}
                  />
                }
                label='Jueves'
                disabled={accion === 'ver'}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='dia_transito_viernes'
                    checked={values.dia_transito_viernes === 'S'}
                    onChange={handleChange}
                  />
                }
                label='Viernes'
                disabled={accion === 'ver'}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='dia_transito_sabado'
                    checked={values.dia_transito_sabado === 'S'}
                    onChange={handleChange}
                  />
                }
                label='Sábado'
                disabled={accion === 'ver'}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='dia_transito_domingo'
                    checked={values.dia_transito_domingo === 'S'}
                    onChange={handleChange}
                  />
                }
                label='Domingo'
                disabled={accion === 'ver'}
              />
            </FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name='facturacion_servicio'
                  checked={values.facturacion_servicio === 'S'}
                  onChange={handleChange}
                />
              }
              label='Facturación por servicio'
              disabled={accion === 'ver'}
            />

            <MyTextField
              className={classes.myTextField}
              label='Observaciones'
              name='observaciones'
              disabled={disabled}
              multiline
            />
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

export default AcuerdoServicioForm;
