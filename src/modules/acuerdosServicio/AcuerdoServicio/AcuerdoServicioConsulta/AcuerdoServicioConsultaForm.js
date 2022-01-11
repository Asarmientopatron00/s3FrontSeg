import React, {useEffect, useState} from 'react';
import {Box, Button, Checkbox} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  TIPOS_PUESTOS_CONTROL,
  TIPOS_RUTAS,
} from '../../../../shared/constants/ListasValores';

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

const MyAutocompleteAsociado = (props) => {
  const [field, meta, form] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  let myvalueAux = '';
  if (field.value !== '') {
    props.options.forEach((option) => {
      if (option.id === field.value) {
        myvalueAux = option.numero_documento;
      }
    });
  }
  let myvalue = '';
  if (myvalueAux === '') {
    myvalue = field.value;
  } else {
    myvalue = myvalueAux;
  }
  return (
    <Autocomplete
      selectOnFocus={false}
      openOnFocus
      onKeyDown={(e) =>
        e.key === 'Backspace' && typeof field.value === 'number'
          ? form.setValue('')
          : ''
      }
      {...props}
      onChange={(event, newValue, reasons, details, trial) =>
        newValue ? form.setValue(newValue.id) : form.setValue('')
      }
      inputValue={myvalue}
      renderOption={(option) => {
        return <React.Fragment>{option.nombre}</React.Fragment>;
      }}
      getOptionLabel={(option) => option.nombre}
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

const AcuerdoServicioForm = (props) => {
  const {
    handleOnClose,
    accion,
    values,
    initialValues,
    asociados,
    setFieldValue,
    titulo,
    errors,
    detalles,
  } = props;

  const [h24, seth24] = useState(false);
  const [diurno, setDiurno] = useState(false);
  const [nocturno, setNocturno] = useState(false);
  const [rutasControl, setRutasControl] = useState(false);
  const [puestosControl, setPuestosControl] = useState(false);
  const [puestosParada, setPuestosParada] = useState(false);
  const [rutasAutorizadas, setRutasAutorizadas] = useState(false);
  const [contactosNotificacion, setContactosNotificacion] = useState(false);

  useEffect(() => {
    setFieldValue('asociado', '');
    asociados.forEach((asociado) => {
      if (asociado.id === values.asociado_id) {
        setFieldValue('asociado', asociado.nombre);
      }
    });
  }, [values.asociado_id, asociados, setFieldValue]);
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
    inputs_2: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      columnGap: '20px',
    },
    disabled: {
      color: '#909098',
    },
    tableHead: {
      fontWeight: 'bold',
      padding: '2px',
      color: '#909098',
    },
    tableCell: {
      padding: '2px',
      color: '#909098',
    },
  }));

  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.checked ? 'S' : 'N');
    if (event.target.name === 'horario_transito_24h') {
      if (event.target.checked) {
        seth24(true);
        setFieldValue('horario_transito_diurno', 'N');
        setFieldValue('horario_transito_diurno_desde', '');
        setFieldValue('horario_transito_diurno_hasta', '');
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
        setFieldValue('horario_transito_diurno_hasta', '');
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
            {titulo}
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Número Acuerdo'
                name='numero_acuerdo_servicio'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
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
              <MyAutocompleteAsociado
                options={asociados}
                name='asociado_id'
                inputValue={initialValues.asociado_id}
                label='Asociado de negocio'
                //autoHighlight
                className={classes.myTextField}
                required
                disabled={true}
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
            <Box
              component='p'
              color={!!errors.tipo_servicio_dta ? 'red' : 'black'}>
              Tipo Servicio*
            </Box>
            <FormGroup row>
              <FormControlLabel
                color='red'
                style={{color: !!errors.tipo_servicio_dta ? 'red' : 'black'}}
                control={
                  <Checkbox
                    name='tipo_servicio_dta'
                    checked={values.tipo_servicio_dta === 'S'}
                    onChange={handleChange}
                    style={{
                      color: !!errors.tipo_servicio_dta ? 'red' : '#74788d',
                    }}
                  />
                }
                label='DTA'
                disabled={true}
              />
              <FormControlLabel
                style={{color: !!errors.tipo_servicio_dta ? 'red' : 'black'}}
                control={
                  <Checkbox
                    name='tipo_servicio_otm'
                    checked={values.tipo_servicio_otm === 'S'}
                    onChange={handleChange}
                    style={{
                      color: !!errors.tipo_servicio_dta ? 'red' : '#74788d',
                    }}
                  />
                }
                label='OTM'
                disabled={true}
              />
              <FormControlLabel
                style={{color: !!errors.tipo_servicio_dta ? 'red' : 'black'}}
                control={
                  <Checkbox
                    name='tipo_servicio_nacionalizado'
                    checked={values.tipo_servicio_nacionalizado === 'S'}
                    onChange={handleChange}
                    style={{
                      color: !!errors.tipo_servicio_dta ? 'red' : '#74788d',
                    }}
                  />
                }
                label='Nacionalizado'
                disabled={true}
              />
              <FormControlLabel
                style={{color: !!errors.tipo_servicio_dta ? 'red' : 'black'}}
                control={
                  <Checkbox
                    name='tipo_servicio_pernocta'
                    checked={values.tipo_servicio_pernocta === 'S'}
                    onChange={handleChange}
                    style={{
                      color: !!errors.tipo_servicio_dta ? 'red' : '#74788d',
                    }}
                  />
                }
                label='Pernocta'
                disabled={true}
              />
              <FormControlLabel
                style={{color: !!errors.tipo_servicio_dta ? 'red' : 'black'}}
                control={
                  <Checkbox
                    name='tipo_servicio_exportacion'
                    checked={values.tipo_servicio_exportacion === 'S'}
                    onChange={handleChange}
                    style={{
                      color: !!errors.tipo_servicio_dta ? 'red' : '#74788d',
                    }}
                  />
                }
                label='Exportación'
                disabled={true}
              />
              <MyTextField
                label='Otro'
                name='tipo_servicio_otro'
                disabled={true}
              />
            </FormGroup>
            {!!errors.tipo_servicio_dta && (
              <FormHelperText error>{errors.tipo_servicio_dta}</FormHelperText>
            )}
            <Box component='h4' marginTop={2}>
              Horario autorizado de transito:
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  name='horario_transito_24h'
                  checked={values.horario_transito_24h === 'S'}
                  onChange={handleChange}
                />
              }
              label='Veinticuatro horas'
              disabled={true}
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
                disabled={true || h24}
              />
              <MyTextField
                className={classes.myTextField}
                label='Desde'
                name='horario_transito_diurno_desde'
                disabled={true || h24 || !diurno}
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
                disabled={true || h24 || !diurno}
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
                disabled={true || h24}
              />
              <MyTextField
                className={classes.myTextField}
                label='Desde'
                name='horario_transito_nocturno_desde'
                disabled={true || h24 || !nocturno}
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
                disabled={true || h24 || !nocturno}
                required
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box
              component='p'
              color={!!errors.tipo_servicio_dta ? 'red' : 'black'}>
              Dias de la semana*
            </Box>
            <FormGroup row>
              <FormControlLabel
                style={{color: !!errors.dia_transito_lunes ? 'red' : 'black'}}
                control={
                  <Checkbox
                    name='dia_transito_lunes'
                    checked={values.dia_transito_lunes === 'S'}
                    onChange={handleChange}
                    style={{
                      color: !!errors.dia_transito_lunes ? 'red' : '#74788d',
                    }}
                  />
                }
                label='Lunes'
                disabled={accion === 'ver'}
              />
              <FormControlLabel
                style={{color: !!errors.dia_transito_lunes ? 'red' : 'black'}}
                control={
                  <Checkbox
                    name='dia_transito_martes'
                    checked={values.dia_transito_martes === 'S'}
                    onChange={handleChange}
                    style={{
                      color: !!errors.dia_transito_lunes ? 'red' : '#74788d',
                    }}
                  />
                }
                label='Martes'
                disabled={accion === 'ver'}
              />
              <FormControlLabel
                style={{color: !!errors.dia_transito_lunes ? 'red' : 'black'}}
                control={
                  <Checkbox
                    name='dia_transito_miercoles'
                    checked={values.dia_transito_miercoles === 'S'}
                    onChange={handleChange}
                    style={{
                      color: !!errors.dia_transito_lunes ? 'red' : '#74788d',
                    }}
                  />
                }
                label='Miércoles'
                disabled={accion === 'ver'}
              />
              <FormControlLabel
                style={{color: !!errors.dia_transito_lunes ? 'red' : 'black'}}
                control={
                  <Checkbox
                    name='dia_transito_jueves'
                    checked={values.dia_transito_jueves === 'S'}
                    onChange={handleChange}
                    style={{
                      color: !!errors.dia_transito_lunes ? 'red' : '#74788d',
                    }}
                  />
                }
                label='Jueves'
                disabled={accion === 'ver'}
              />
              <FormControlLabel
                style={{color: !!errors.dia_transito_lunes ? 'red' : 'black'}}
                control={
                  <Checkbox
                    name='dia_transito_viernes'
                    checked={values.dia_transito_viernes === 'S'}
                    onChange={handleChange}
                    style={{
                      color: !!errors.dia_transito_lunes ? 'red' : '#74788d',
                    }}
                  />
                }
                label='Viernes'
                disabled={accion === 'ver'}
              />
              <FormControlLabel
                style={{color: !!errors.dia_transito_lunes ? 'red' : 'black'}}
                control={
                  <Checkbox
                    name='dia_transito_sabado'
                    checked={values.dia_transito_sabado === 'S'}
                    onChange={handleChange}
                    style={{
                      color: !!errors.dia_transito_lunes ? 'red' : '#74788d',
                    }}
                  />
                }
                label='Sábado'
                disabled={accion === 'ver'}
              />
              <FormControlLabel
                style={{color: !!errors.dia_transito_lunes ? 'red' : 'black'}}
                control={
                  <Checkbox
                    name='dia_transito_domingo'
                    checked={values.dia_transito_domingo === 'S'}
                    onChange={handleChange}
                    style={{
                      color: !!errors.dia_transito_lunes ? 'red' : '#74788d',
                    }}
                  />
                }
                label='Domingo'
                disabled={accion === 'ver'}
              />
            </FormGroup>
            {!!errors.dia_transito_lunes && (
              <FormHelperText error>{errors.dia_transito_lunes}</FormHelperText>
            )}
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
              disabled={true}
              multiline
            />
          </Box>

          <Box
            className={classes.disabled}
            component='h4'
            fontWeight='300'
            display='flex'
            alignItems='center'
            onClick={() => {
              setRutasControl(!rutasControl);
            }}>
            {rutasControl ? (
              <KeyboardArrowDownIcon className={classes.disabled} />
            ) : (
              <KeyboardArrowRightIcon className={classes.disabled} />
            )}
            {'Rutas a controlar'}
          </Box>
          {rutasControl && detalles.rutaControl.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>Tipo</TableCell>
                  <TableCell className={classes.tableHead}>
                    Departamento
                  </TableCell>
                  <TableCell className={classes.tableHead}>Ciudad</TableCell>
                  <TableCell className={classes.tableHead}>Lugar</TableCell>
                  <TableCell className={classes.tableHead}>Documento</TableCell>
                  <TableCell className={classes.tableHead}>Nombre</TableCell>
                  <TableCell className={classes.tableHead}>Celular</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detalles.rutaControl.map((row) => {
                  return (
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        {row.tipo_proceso === 'I'
                          ? 'Instalación'
                          : 'Desinstalación'}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.departamento}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.ciudad}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.nombre}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.numero_documento}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.nombre_encargado}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.celular_encargado}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            ''
          )}

          <Box
            className={classes.disabled}
            component='h4'
            fontWeight='300'
            display='flex'
            alignItems='center'
            onClick={() => {
              setPuestosControl(!puestosControl);
            }}>
            {puestosControl ? (
              <KeyboardArrowDownIcon className={classes.disabled} />
            ) : (
              <KeyboardArrowRightIcon className={classes.disabled} />
            )}
            {'Puestos de Control'}
          </Box>
          {puestosControl && detalles.puestoControl.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>
                    Departamento
                  </TableCell>
                  <TableCell className={classes.tableHead}>Ciudad</TableCell>
                  <TableCell className={classes.tableHead}>
                    Puesto Control
                  </TableCell>
                  <TableCell className={classes.tableHead}>
                    Tipo Puesto
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detalles.puestoControl.map((row) => {
                  return (
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        {row.departamento}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.ciudad}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.nombre}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {TIPOS_PUESTOS_CONTROL.map((TIPO) =>
                          TIPO.id === row.tipo_puesto_control
                            ? TIPO.nombre
                            : '',
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            ''
          )}

          <Box
            className={classes.disabled}
            component='h4'
            fontWeight='300'
            display='flex'
            alignItems='center'
            onClick={() => {
              setPuestosParada(!puestosParada);
            }}>
            {puestosParada ? (
              <KeyboardArrowDownIcon className={classes.disabled} />
            ) : (
              <KeyboardArrowRightIcon className={classes.disabled} />
            )}
            {'Puestos Parada'}
          </Box>
          {puestosParada && detalles.puestoParada.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>
                    Tipo Parada
                  </TableCell>
                  <TableCell className={classes.tableHead}>
                    Departamento
                  </TableCell>
                  <TableCell className={classes.tableHead}>Ciudad</TableCell>
                  <TableCell className={classes.tableHead}>
                    Nombre Puesto
                  </TableCell>
                  <TableCell className={classes.tableHead}>
                    indicaciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detalles.puestoParada.map((row) => {
                  return (
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        {row.tipo_parada === 'A' ? 'Autorizada' : 'Prohibida'}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.departamento}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.ciudad}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.nombre}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.indicaciones}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            ''
          )}

          <Box
            className={classes.disabled}
            component='h4'
            fontWeight='300'
            display='flex'
            alignItems='center'
            onClick={() => {
              setRutasAutorizadas(!rutasAutorizadas);
            }}>
            {rutasAutorizadas ? (
              <KeyboardArrowDownIcon className={classes.disabled} />
            ) : (
              <KeyboardArrowRightIcon className={classes.disabled} />
            )}
            {'Rutas Autorizadas'}
          </Box>
          {rutasAutorizadas && detalles.rutaAutorizacion.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>Tipo Ruta</TableCell>
                  <TableCell className={classes.tableHead}>
                    Departamento
                  </TableCell>
                  <TableCell className={classes.tableHead}>Ciudad</TableCell>
                  <TableCell className={classes.tableHead}>
                    Nombre Ruta
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detalles.rutaAutorizacion.map((row) => {
                  return (
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        {TIPOS_RUTAS.map((TIPO) =>
                          TIPO.id === row.tipo_ruta ? TIPO.nombre : '',
                        )}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.departamento}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.ciudad}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.nombre_ruta}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            ''
          )}

          <Box
            className={classes.disabled}
            component='h4'
            fontWeight='300'
            display='flex'
            alignItems='center'
            onClick={() => {
              setContactosNotificacion(!contactosNotificacion);
            }}>
            {contactosNotificacion ? (
              <KeyboardArrowDownIcon className={classes.disabled} />
            ) : (
              <KeyboardArrowRightIcon className={classes.disabled} />
            )}
            {'Contactos Notificación'}
          </Box>
          {contactosNotificacion && detalles.contactoNotificacion.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>Evento</TableCell>
                  <TableCell className={classes.tableHead}>
                    Nombre Contacto
                  </TableCell>
                  <TableCell className={classes.tableHead}>Celular</TableCell>
                  <TableCell className={classes.tableHead}>Telefono</TableCell>
                  <TableCell className={classes.tableHead}>e-mail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detalles.contactoNotificacion.map((row) => {
                  return (
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        {row.evento_notificacion}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.nombre}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.celular}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.telefono}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.email}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            ''
          )}
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
