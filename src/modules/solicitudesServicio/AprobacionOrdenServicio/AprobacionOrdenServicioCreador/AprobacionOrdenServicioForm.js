import React from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';

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
  const {handleOnClose, accion, values, titulo} = props;

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
      [theme.breakpoints.up('xl')]: {
        marginBottom: 5,
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
    inputs_3: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '10px',
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
    <Form style={{maxHeight: 600, width: 600}} noValidate autoComplete='off'>
      <Scrollbar style={{maxHeight: 600, maxWidth: 600}}>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Box
            component='h6'
            mb={{xs: 4, xl: 6}}
            fontSize={20}
            fontWeight={Fonts.MEDIUM}>
            {titulo}
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <Box component='h6' mb={2}>
              Datos Iniciales
            </Box>
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='N° Orden de Servicio'
                name='numero_orden_servicio'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
              <MyTextField
                className={classes.myTextField}
                label='Fecha Orden'
                name='fecha_orden_servicio'
                disabled={true}
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Box component='h6' mb={2}>
              Asociado de Negocios
            </Box>
            <Box className={classes.inputs_2}>
              <MyTextField
                name='asociado_documento'
                label='Asociado de negocios'
                className={classes.myTextField}
                required
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label=' '
                name='asociado'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box className={classes.inputs_2}>
              <MyTextField
                name='tipo_servicio'
                label='Tipo Servicio'
                className={classes.myTextField}
                required
                disabled={true}
              />
              <MyTextField
                className={classes.myTextField}
                label='Tipo Servicio Otro'
                name='tipo_servicio_otro'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
                required={values.tipo_servicio === 'OTR'}
              />
            </Box>

            <Box component='h6' mb={2}>
              Instalación
            </Box>
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Fecha Programada'
                name='fecha_programada_instalacion'
                required
                type='date'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Hora Programada'
                name='hora_programada_instalacion'
                disabled={true}
                required
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                name='departamento_instalacion'
                label='Departamento'
                className={classes.myTextField}
                required
                disabled={true}
              />

              <MyTextField
                name='ciudad_instalacion'
                label='Ciudad'
                autoHighlight
                className={classes.myTextField}
                required
                disabled={true}
              />

              <MyTextField
                name='lugar_instalacion'
                label='Nombre Lugar'
                autoHighlight
                className={classes.myTextField}
                required
                disabled={true}
              />

              <MyTextField
                className={classes.myTextField}
                label='Dirección'
                name='direccion_instalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box component='h6' mb={2}>
              Desinstalación
            </Box>
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Fecha Programada'
                name='fecha_programada_desinstalacion'
                required
                type='date'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Hora Programada'
                name='hora_programada_desinstalacion'
                disabled={true}
                required
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                name='departamento_desinstalacion'
                label='Departamento'
                autoHighlight
                className={classes.myTextField}
                required
                disabled={true}
              />

              <MyTextField
                name='ciudad_desinstalacion'
                label='Ciudad'
                autoHighlight
                className={classes.myTextField}
                required
                disabled={true}
              />

              <MyTextField
                name='lugar_desinstalacion'
                label='Nombre Lugar'
                autoHighlight
                className={classes.myTextField}
                required
                disabled={true}
              />

              <MyTextField
                className={classes.myTextField}
                label='Dirección'
                name='direccion_desinstalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
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
            <IntlMessages id='boton.aprobar' />
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
