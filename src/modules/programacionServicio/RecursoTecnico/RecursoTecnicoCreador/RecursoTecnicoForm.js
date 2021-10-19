import React, {useEffect, useState, useRef} from 'react';
import {
  Box,
  Button,
  RadioGroup,
  Radio,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Checkbox,
} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import {Field, Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import {Fonts} from '../../../../shared/constants/AppEnums';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import MyAutoCompleteAsociado from '../../../../shared/components/MyAutoCompleteAsociado';
import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
} from '../../../../shared/constants/Constantes';

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

const ProductoForm = (props) => {
  const {
    handleOnClose,
    accion,
    values,
    initialValues,
    titulo,
    ESTADOS_RECURSOS_TECNICOS,
    departamentos,
    tiposDocumentos,
    asociados,
    ciudades,
    onChangeDepartamento,
    setFieldValue,
    errors,
    touched,
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
      marginBottom: 0,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 0,
      },
      height: '65px',
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
    deleteIcon: {
      color: theme.palette.redBottoms,
    },
  }));

  const classes = useStyles(props);

  let onChangeDepartamento1 = useRef();
  onChangeDepartamento1 = (id) => {
    onChangeDepartamento(id);
    values.ciudad_id = '';
  };

  useEffect(() => {
    if (values.departamento_id !== '') {
      onChangeDepartamento1(values.departamento_id);
    } else {
      onChangeDepartamento1(0);
    }
  }, [values.departamento_id]);

  useEffect(() => {
    if (values.tipo_contrato !== 'T') {
      values.asociado_id = '';
    }
  }, [values.tipo_contrato]);

  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.checked ? 'S' : 'N');
    setFieldValue(event.target.name.replace('dia_laboral', 'hora_inicio'), '');
    setFieldValue(event.target.name.replace('dia_laboral', 'hora_fin'), '');
  };
  return (
    <Form
      className=''
      noValidate
      autoComplete='off'
      encType='multipart/form-data'>
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
            <Box className={classes.inputs_2} minWidth='800px'>
              <MyAutocomplete
                options={tiposDocumentos}
                name='tipo_documento_id'
                inputValue={initialValues.tipo_documento_id}
                label='Tipo Documento'
                //autoHighlight
                className={classes.myTextField}
                required
                disabled={disabled}
              />
              <MyTextField
                className={classes.myTextField}
                label='Número Documento'
                name='numero_documento'
                disabled={disabled}
                required
                inputProps={{
                  maxLength: LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
                  style: {
                    fontSize: '14px',
                    paddingBottom: '6px',
                    paddingTop: '8px',
                  },
                }}
              />
            </Box>
            <MyTextField
              className={classes.myTextField}
              label='Nombre Completo'
              name='nombre_completo'
              disabled={disabled}
              required
            />
            <Box className={classes.inputs_2} minWidth='800px'>
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
                disabled={disabled}
                required
              />
              <MyTextField
                className={classes.myTextField}
                label='Telefono Celular'
                name='celular'
                disabled={disabled}
                required
                inputProps={{
                  maxLength: LONGITUD_MAXIMA_TELEFONOS,
                  minLength: LONGITUD_MINIMA_TELEFONOS,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Correo Electrónico'
                name='email'
                disabled={disabled}
              />
            </Box>
            <FormControl
              className={classes.widthFull}
              component='fieldset'
              error={
                errors.tipo_contrato && touched.tipo_contrato ? true : false
              }>
              <FormLabel>Empaque*</FormLabel>
              <Field
                name='tipo_contrato'
                type='radio'
                as={RadioGroup}
                className={classes.myTextField}
                disabled={disabled}
                row
                value={values.tipo_contrato}>
                <FormControlLabel
                  value='C'
                  control={<Radio color='primary' />}
                  label='Contrato'
                  labelPlacement='end'
                  disabled={disabled}
                />
                <FormControlLabel
                  value='S'
                  control={<Radio color='primary' />}
                  label='Servicio'
                  labelPlacement='end'
                  disabled={disabled}
                />
                <FormControlLabel
                  value='T'
                  control={<Radio color='primary' />}
                  label='Tercero'
                  labelPlacement='end'
                  disabled={disabled}
                />
              </Field>
              {errors.tipo_contrato && touched.tipo_contrato && (
                <FormHelperText className={classes.helperText}>
                  Requerido
                </FormHelperText>
              )}
            </FormControl>

            <MyAutoCompleteAsociado
              options={asociados}
              name='asociado_id'
              inputValue={initialValues.asociado_id}
              label='Asociado de negocio'
              //autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled | (values.tipo_contrato !== 'T')}
            />

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dias laborables:</TableCell>
                  <TableCell>Hora Inicio*</TableCell>
                  <TableCell>Hora Fin*:</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <FormGroup row>
                      <FormControlLabel
                        color='red'
                        style={{
                          color: !!errors.dia_laboral_lunes ? 'red' : 'black',
                        }}
                        control={
                          <Checkbox
                            name='dia_laboral_lunes'
                            checked={values.dia_laboral_lunes === 'S'}
                            onChange={handleChange}
                            style={{
                              color: !!errors.dia_laboral_lunes
                                ? 'red'
                                : '#74788d',
                            }}
                          />
                        }
                        label='Lunes'
                        disabled={disabled}
                      />
                    </FormGroup>
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_inicio_lunes'
                      disabled={disabled || values.dia_laboral_lunes === 'N'}
                      type='time'
                      required={values.dia_laboral_lunes === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_fin_lunes'
                      disabled={disabled || values.dia_laboral_lunes === 'N'}
                      type='time'
                      required={values.dia_laboral_lunes === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormGroup row>
                      <FormControlLabel
                        color='red'
                        style={{
                          color: !!errors.dia_laboral_martes ? 'red' : 'black',
                        }}
                        control={
                          <Checkbox
                            name='dia_laboral_martes'
                            checked={values.dia_laboral_martes === 'S'}
                            onChange={handleChange}
                            style={{
                              color: !!errors.dia_laboral_martes
                                ? 'red'
                                : '#74788d',
                            }}
                          />
                        }
                        label='Martes'
                        disabled={disabled}
                      />
                    </FormGroup>
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_inicio_martes'
                      disabled={disabled || values.dia_laboral_martes === 'N'}
                      type='time'
                      required={values.dia_laboral_martes === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_fin_martes'
                      disabled={disabled || values.dia_laboral_martes === 'N'}
                      type='time'
                      required={values.dia_laboral_martes === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormGroup row>
                      <FormControlLabel
                        color='red'
                        style={{
                          color: !!errors.dia_laboral_miercoles
                            ? 'red'
                            : 'black',
                        }}
                        control={
                          <Checkbox
                            name='dia_laboral_miercoles'
                            checked={values.dia_laboral_miercoles === 'S'}
                            onChange={handleChange}
                            style={{
                              color: !!errors.dia_laboral_miercoles
                                ? 'red'
                                : '#74788d',
                            }}
                          />
                        }
                        label='Miércoles'
                        disabled={disabled}
                      />
                    </FormGroup>
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_inicio_miercoles'
                      disabled={
                        disabled || values.dia_laboral_miercoles === 'N'
                      }
                      type='time'
                      required={values.dia_laboral_mirecoles === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_fin_miercoles'
                      disabled={
                        disabled || values.dia_laboral_miercoles === 'N'
                      }
                      type='time'
                      required={values.dia_laboral_mirecoles === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormGroup row>
                      <FormControlLabel
                        color='red'
                        style={{
                          color: !!errors.dia_laboral_jueves ? 'red' : 'black',
                        }}
                        control={
                          <Checkbox
                            name='dia_laboral_jueves'
                            checked={values.dia_laboral_jueves === 'S'}
                            onChange={handleChange}
                            style={{
                              color: !!errors.dia_laboral_jueves
                                ? 'red'
                                : '#74788d',
                            }}
                          />
                        }
                        label='jueves'
                        disabled={disabled}
                      />
                    </FormGroup>
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_inicio_jueves'
                      disabled={disabled || values.dia_laboral_jueves === 'N'}
                      type='time'
                      required={values.dia_laboral_jueves === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_fin_jueves'
                      disabled={disabled || values.dia_laboral_jueves === 'N'}
                      type='time'
                      required={values.dia_laboral_jueves === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormGroup row>
                      <FormControlLabel
                        color='red'
                        style={{
                          color: !!errors.dia_laboral_viernes ? 'red' : 'black',
                        }}
                        control={
                          <Checkbox
                            name='dia_laboral_viernes'
                            checked={values.dia_laboral_viernes === 'S'}
                            onChange={handleChange}
                            style={{
                              color: !!errors.dia_laboral_viernes
                                ? 'red'
                                : '#74788d',
                            }}
                          />
                        }
                        label='Viernes'
                        disabled={disabled}
                      />
                    </FormGroup>
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_inicio_viernes'
                      disabled={disabled || values.dia_laboral_viernes === 'N'}
                      type='time'
                      required={values.dia_laboral_viernes === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_fin_viernes'
                      disabled={disabled || values.dia_laboral_viernes === 'N'}
                      type='time'
                      required={values.dia_laboral_viernes === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormGroup row>
                      <FormControlLabel
                        color='red'
                        style={{
                          color: !!errors.dia_laboral_sabado ? 'red' : 'black',
                        }}
                        control={
                          <Checkbox
                            name='dia_laboral_sabado'
                            checked={values.dia_laboral_sabado === 'S'}
                            onChange={handleChange}
                            style={{
                              color: !!errors.dia_laboral_sabado
                                ? 'red'
                                : '#74788d',
                            }}
                          />
                        }
                        label='Sábado'
                        disabled={disabled}
                      />
                    </FormGroup>
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_inicio_sabado'
                      disabled={disabled || values.dia_laboral_sabado === 'N'}
                      type='time'
                      required={values.dia_laboral_sabado === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_fin_sabado'
                      disabled={disabled || values.dia_laboral_sabado === 'N'}
                      type='time'
                      required={values.dia_laboral_sabado === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormGroup row>
                      <FormControlLabel
                        color='red'
                        style={{
                          color: !!errors.dia_laboral_domingo ? 'red' : 'black',
                        }}
                        control={
                          <Checkbox
                            name='dia_laboral_domingo'
                            checked={values.dia_laboral_domingo === 'S'}
                            onChange={handleChange}
                            style={{
                              color: !!errors.dia_laboral_domingo
                                ? 'red'
                                : '#74788d',
                            }}
                          />
                        }
                        label='Domingo'
                        disabled={disabled}
                      />
                    </FormGroup>
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_inicio_domingo'
                      disabled={disabled || values.dia_laboral_domingo === 'N'}
                      type='time'
                      required={values.dia_laboral_domingo === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <MyTextField
                      className={classes.myTextField}
                      label=' '
                      name='hora_fin_domingo'
                      disabled={disabled || values.dia_laboral_domingo === 'N'}
                      type='time'
                      required={values.dia_laboral_domingo === 'S'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Box className={classes.inputs_2} minWidth='800px'>
              <MyTextField
                className={classes.myTextField}
                label='Número Horas Semana'
                name='numero_horas_semana'
                disabled={disabled}
                required
                type='number'
              />
            </Box>
            <Box className={classes.inputs_2} minWidth='800px'>
              <MyAutocomplete
                options={ESTADOS_RECURSOS_TECNICOS}
                name='estado_recurso'
                inputValue={initialValues.estado_recurso}
                label='Estado Recurso'
                //autoHighlight
                className={classes.myTextField}
                required
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

export default ProductoForm;
