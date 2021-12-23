import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  RadioGroup,
  Radio,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
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

const HistoriaEquipoForm = (props) => {
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
                label='Serial'
                name='numero_serial'
                disabled={disabled}
                required
              />
              <MyAutocomplete
                options={TIPOS_EQUIPOS}
                name='tipo_equipo'
                inputValue={initialValues.tipo_equipo}
                label='Tipo Equipo'
                //autoHighlight
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
                label='Ciudad'
                name='ciudad'
                required
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Lugar'
                name='lugar'
                required
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Responsable'
                name='responsable'
                required
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Estado'
                name='estado_servicio'
                required
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Fecha Activación Equipo'
                name='fecha_activacion_equipo'
                required
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Fecha Último Mantenimiento'
                name='ultimo_mantenimiento_equipo'
                required
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Dias Equipo'
                name='dias_equipo'
                required
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Horas Equipo'
                name='horas_equipo'
                required
                disabled={disabled}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box component={'h6'}> Tiempo Trabajado</Box>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>Porcentaje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.trabajo.map((elemento) => {
                  return (
                    <TableRow>
                      <TableCell>{'Horas ' + elemento.nombre}</TableCell>
                      <TableCell>{elemento.n_horas}</TableCell>
                      <TableCell>
                        {parseFloat(
                          (elemento.n_horas * 100) / values.horas_equipo,
                        ).toFixed(2) + '%'}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell>Total Horas Trabajadas:</TableCell>
                  <TableCell>{values.horasTrabajo}</TableCell>
                  <TableCell>
                    {parseFloat(
                      (values.horasTrabajo * 100) / values.horas_equipo,
                    ).toFixed(2) + '%'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box component={'h6'}> Tiempo Mantenimiento</Box>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>Porcentaje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.mantenimiento.map((elemento) => {
                  return (
                    <TableRow>
                      <TableCell>{'Horas ' + elemento.nombre}</TableCell>
                      <TableCell>{elemento.n_horas}</TableCell>
                      <TableCell>
                        {parseFloat(
                          (elemento.n_horas * 100) / values.horas_equipo,
                        ).toFixed(2) + '%'}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell>Total Mantenimiento:</TableCell>
                  <TableCell>{values.horasMantenimiento}</TableCell>
                  <TableCell>
                    {parseFloat(
                      (values.horasMantenimiento * 100) / values.horas_equipo,
                    ).toFixed(2) + '%'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box component={'h6'}> Tiempo Otros</Box>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>Porcentaje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.otros.map((elemento) => {
                  return (
                    <TableRow>
                      <TableCell>{'Horas ' + elemento.nombre}</TableCell>
                      <TableCell>{elemento.n_horas}</TableCell>
                      <TableCell>
                        {parseFloat(
                          (elemento.n_horas * 100) / values.horas_equipo,
                        ).toFixed(2) + '%'}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell>Total Mantenimiento:</TableCell>
                  <TableCell>{values.horasOtro}</TableCell>
                  <TableCell>
                    {parseFloat(
                      (values.horasOtro * 100) / values.horas_equipo,
                    ).toFixed(2) + '%'}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Horas Disponibles:</TableCell>
                  <TableCell>{values.horas_disponibles}</TableCell>
                  <TableCell>
                    {parseFloat(
                      (values.horas_disponibles * 100) / values.horas_equipo,
                    ).toFixed(2) + '%'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {values.detalles.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Box component={'h6'}>Fecha Novedad</Box>
                    </TableCell>
                    <TableCell>
                      <Box component={'h6'}>Novedad</Box>
                    </TableCell>
                    <TableCell>
                      <Box component={'h6'}>Estado</Box>
                    </TableCell>
                    <TableCell>
                      <Box component={'h6'}>Orden de Servicio</Box>
                    </TableCell>
                    <TableCell>
                      <Box component={'h6'}>Asociado</Box>
                    </TableCell>
                    <TableCell>
                      <Box component={'h6'}>Ciudad Origen</Box>
                    </TableCell>
                    <TableCell>
                      <Box component={'h6'}>Ciudad Destino</Box>
                    </TableCell>
                    <TableCell>
                      <Box component={'h6'}>Número Horas</Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.detalles.map((elemento) => {
                    return (
                      <TableRow>
                        <TableCell>{elemento.fecha_evento}</TableCell>
                        <TableCell>{elemento.novedad}</TableCell>
                        <TableCell>{elemento.estado}</TableCell>
                        <TableCell>{elemento.orden_servicio}</TableCell>
                        <TableCell>{elemento.asociado}</TableCell>
                        <TableCell>{elemento.ciudad_origen}</TableCell>
                        <TableCell>{elemento.ciudad_destino}</TableCell>
                        <TableCell>{elemento.numero_horas}</TableCell>
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

export default HistoriaEquipoForm;
