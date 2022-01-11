import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
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

const ConsultaHorarioTrabajoForm = (props) => {
  const {handleOnClose, accion, values, initialValues, titulo} = props;

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
      height: '50px',
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
    rowHoras: {
      display: 'grid',
      gridTemplateColumns: '40% 15% 15%',
    },
    cellHoras: {
      padding: '3px',
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
                label='Nombre Técnico'
                name='numero_documento'
                disabled={disabled}
              />
              <MyTextField
                className={classes.myTextField}
                label=' '
                name='nombre_completo'
                disabled={disabled}
              />
            </Box>

            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Ciudad'
                name='ciudad'
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Tipo Contrato'
                name='tipo_contrato'
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Fecha'
                name='fecha_horario'
                disabled={disabled}
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Hora Fin'
                name='hora_final_horario'
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Horas Turno'
                name='total_horas_turno'
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Horas Trabajas'
                name='horas_trabajadas'
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Horas Disponibles'
                name='horas_disponibles'
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Horas Extras'
                name='horas_extras'
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            {values.ordenes.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Fecha Novedad</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Orden Servicio</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Ciudad</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Asociado Negocios</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Lugar</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Tipo Servicio</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Hora Cita</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Hora Inicio Servicio</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Hora Fin Servicio</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Tiempo Trabajado</Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.ordenes.map((elemento) => {
                    return (
                      <TableRow>
                        <TableCell className={classes.cellHoras}>
                          {elemento.fecha_novedad}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.numero_orden_servicio}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.asociado_negocio}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.ciudad}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.lugar}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.tipo_servicio}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.hora_cita}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.hora_inicio_servicio}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.hora_fin_servicio}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.tiempo_trabajado}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
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

export default ConsultaHorarioTrabajoForm;
