import React from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../@crema/core/Scrollbar';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../shared/constants/AppEnums';
import defaultConfig from '@crema/utility/ContextProvider/defaultConfig';

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
  const {handleOnClose, accion, titulo, rows} = props;

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
    <Form noValidate autoComplete='off'>
      <Scrollbar>
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
              />
              <MyTextField
                className={classes.myTextField}
                label='Estado'
                name='estado_orden'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
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
            <Box className={classes.inputs_2} marginBottom='15px'>
              <MyTextField
                name='asociado_documento'
                label='Asociado de negocios'
                className={classes.myTextField}
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
              <MyTextField
                className={classes.myTextField}
                label='Contacto'
                name='contacto_asociado'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Telefono'
                name='telefono_asociado'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Correo'
                name='email_asociado'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box className={classes.inputs_2}>
              <MyTextField
                name='referencia_factura'
                label='Referencia Factura'
                className={classes.myTextField}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />
              <MyTextField
                name='cliente_factura'
                label='Facturar A'
                className={classes.myTextField}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />
              <MyTextField
                name='numero_factura'
                label='N° Factura'
                className={classes.myTextField}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />
              <MyTextField
                name='fecha_factura'
                label='Fecha Factura'
                className={classes.myTextField}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />
              <MyTextField
                name='servicio'
                label='Servicio'
                className={classes.myTextField}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />
              <MyTextField
                name='tipo_servicio'
                label='Tipo Servicio'
                className={classes.myTextField}
                InputLabelProps={{
                  shrink: true,
                }}
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
              />
            </Box>
            <Box className={classes.inputs_2}>
              <MyTextField
                name='documento_agente_aduana'
                label='Agente Aduana'
                className={classes.myTextField}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />
              <MyTextField
                name='agente_aduana'
                label=' '
                className={classes.myTextField}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />
              <MyTextField
                name='observaciones_odes'
                label='Observaciones O de S'
                className={classes.myTextField}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={true}
              />
            </Box>

            <Box component='h6' mb={2}>
              Instalación
            </Box>
            <Box className={classes.inputs_2}>
              <Box component='h6' mb={2}>
                Datos programación
              </Box>
              <Box component='h6' mb={2}>
                Datos prestación servicio
              </Box>
              <MyTextField
                className={classes.myTextField}
                label='Fecha Programada'
                name='fecha_programada_instalacion'
                type='date'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Fecha Prestación Servicio'
                name='fecha_instalacion'
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
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Hora Inicio Servicio'
                name='hora_inicio_instalacion'
                disabled={true}
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                name='departamento_instalacion'
                label='Departamento'
                className={classes.myTextField}
                disabled={true}
              />
              <MyTextField
                className={classes.myTextField}
                label='Hora Final Servicio'
                name='hora_final_instalacion'
                disabled={true}
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                name='ciudad_instalacion'
                label='Ciudad'
                //autoHighlight
                className={classes.myTextField}
                disabled={true}
              />
              <Box></Box>

              <MyTextField
                name='lugar_instalacion'
                label='Nombre Lugar'
                //autoHighlight
                className={classes.myTextField}
                disabled={true}
              />
              <Box></Box>

              <MyTextField
                className={classes.myTextField}
                label='Dirección'
                name='direccion_instalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Box></Box>

              <MyTextField
                className={classes.myTextField}
                label='Equipo'
                name='equipo_id'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Box></Box>

              <MyTextField
                className={classes.myTextField}
                label='Recurso Técnico'
                name='recurso_tecnico'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='N° Viaje'
                name='numero_viaje'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                className={classes.myTextField}
                label='Aprobada/Rechazada'
                name='indicativo_aceptacion_instalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Observación Rechazo'
                name='observaciones_rechazo_instalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
              />

              <MyTextField
                className={classes.myTextField}
                label='Observaciones'
                name='observaciones_programacion_instalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
              />
              <MyTextField
                className={classes.myTextField}
                label='Observación'
                name='observaciones_ejecucion_instalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
              />
            </Box>

            <Box component='h6' mb={2}>
              Desinstalación
            </Box>
            <Box className={classes.inputs_2}>
              <Box component='h6' mb={2}>
                Datos programación
              </Box>
              <Box component='h6' mb={2}>
                Datos prestación servicio
              </Box>
              <MyTextField
                className={classes.myTextField}
                label='Fecha Programada'
                name='fecha_programada_desinstalacion'
                type='date'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Fecha Prestación Servicio'
                name='fecha_desinstalacion'
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
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Hora Inicio Servicio'
                name='hora_inicio_desinstalacion'
                disabled={true}
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                name='departamento_desinstalacion'
                label='Departamento'
                className={classes.myTextField}
                disabled={true}
              />
              <MyTextField
                className={classes.myTextField}
                label='Hora Final Servicio'
                name='hora_final_desinstalacion'
                disabled={true}
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MyTextField
                name='ciudad_desinstalacion'
                label='Ciudad'
                //autoHighlight
                className={classes.myTextField}
                disabled={true}
              />
              <Box></Box>

              <MyTextField
                name='lugar_desinstalacion'
                label='Nombre Lugar'
                //autoHighlight
                className={classes.myTextField}
                disabled={true}
              />
              <Box></Box>

              <MyTextField
                className={classes.myTextField}
                label='Dirección'
                name='direccion_desinstalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Box></Box>

              <MyTextField
                className={classes.myTextField}
                label='Recurso Técnico'
                name='recurso_tecnico'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Box></Box>

              <MyTextField
                className={classes.myTextField}
                label='Aprobada/Rechazada'
                name='indicativo_aceptacion_desinstalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Observación Rechazo'
                name='observaciones_rechazo_desinstalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
              />

              <MyTextField
                className={classes.myTextField}
                label='Observaciones'
                name='observaciones_programacion_desinstalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
              />
              <MyTextField
                className={classes.myTextField}
                label='Observación'
                name='observaciones_ejecucion_desinstalacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
              />
            </Box>
            <Box component='h6' mb={2}>
              Datos Transportador
            </Box>
            <Box className={classes.inputs_2} marginBottom='15px'>
              <MyTextField
                name='transportador_documento'
                label='Transportador'
                className={classes.myTextField}
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label=' '
                name='transportador'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Contacto'
                name='contacto_transportador'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Teléfono'
                name='telefono_transportador'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Celular'
                name='celular_transportador'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Correo'
                name='email_transportador'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Box className={classes.inputs_2} marginBottom='15px'>
              <MyTextField
                className={classes.myTextField}
                label='Placa Vehículo'
                name='placa_vehiculo'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Placa Trailer'
                name='placa_trailer'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='N° Contenedor'
                name='numero_contenedor'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Box></Box>
              <MyTextField
                className={classes.myTextField}
                label='Nombre Conductor'
                name='nombre_conductor'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Cédula Conductor'
                name='cedula_conductor'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Celular Conductor'
                name='celular_conductor'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Box></Box>
            </Box>

            <Box component='h6' mb={2}>
              Indexacion de Documentos:
            </Box>
            <Box className={classes.inputs_2} marginBottom='15px'>
              <Box component='h6' mb={2}>
                Documento
              </Box>
              <Box component='h6' mb={2}>
                Nombre Documento
              </Box>
              {rows.map((row) => {
                return (
                  <>
                    <Box component='a' mb={2}>
                      {row.nombre_documento}
                    </Box>
                    <Box
                      component='a'
                      className={classes.linkDocumento}
                      href={
                        defaultConfig.API_URL +
                        '/ordenes-servicios-documentos/' +
                        row.id
                      }
                      display='flex'
                      justifyContent='center'>
                      {row.nombre_archivo}
                    </Box>
                  </>
                );
              })}
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
