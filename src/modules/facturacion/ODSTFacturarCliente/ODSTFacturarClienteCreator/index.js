import React, {useEffect, useRef, useState} from 'react';
import {Formik} from 'formik';
import Dialog from '@material-ui/core/Dialog';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {onShow} from '../../../../redux/actions/ODSTFacturarServicioAction';
import {
  onGetColeccionLigeraAsociado,
  onGetColeccionLigeraTerceroServicio,
  onGetRutas,
} from '../../../../redux/actions/OrdenServicioAction';
import ODSTFacturarServicioForm from './ODSTFacturarServicioForm';
// import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import Slide from '@material-ui/core/Slide';
import format from 'date-fns/format';
import {
  TIPOS_SERVICIOS,
  ESTADOS_ORDEN_SERVICIO,
} from '../../../../shared/constants/ListasValores';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  VALIDACION_REGEX_DOCUMENTOS,
} from '../../../../shared/constants/Constantes';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const ODSTFacturarServicioCreator = (props) => {
  const {oDSTFacturarServicio, handleOnClose, accion, titulo} = props;

  const dispatch = useDispatch();

  let selectedRow = useRef();
  const [showForm, setShowForm] = useState(false);
  selectedRow = useSelector(
    ({oDSTFacturarServicioReducer}) => oDSTFacturarServicioReducer.selectedRow,
  );

  const asociados = useSelector(
    ({ordenServicioReducer}) => ordenServicioReducer.asociados,
  );

  const useStyles = makeStyles((theme) => ({
    dialogBox: {
      position: 'relative',
      '& .MuiDialog-paperWidthSm': {
        maxWidth: 1200,
        width: '100%',
        // maxHeight:'fit-content'
      },
      '& .MuiTypography-h6': {
        fontWeight: Fonts.LIGHT,
      },
    },
  }));

  const classes = useStyles(props);

  const {rows} = useSelector(
    ({ordenServicioDocumentoReducer}) => ordenServicioDocumentoReducer,
  );

  const tercerosServicios = useSelector(
    ({ordenServicioReducer}) => ordenServicioReducer.tercerosServicios,
  );

  useEffect(() => {
    dispatch(onGetColeccionLigeraAsociado());
    dispatch(onGetColeccionLigeraTerceroServicio());
  }, [dispatch]);

  let rutas = [];
  rutas = useSelector(({ordenServicioReducer}) => ordenServicioReducer.rutas);

  const initializeSelectedRow = () => {
    selectedRow = null;
  };
  useEffect(() => {
    initializeSelectedRow();
  }, []);

  if (accion === 'crear') {
    initializeSelectedRow();
  }

  useEffect(() => {
    if (selectedRow) {
      setShowForm(true);
    } else if (accion === 'crear') {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [selectedRow, accion]);

  useEffect(() => {
    if ((accion === 'editar') | (accion === 'ver')) {
      dispatch(onShow(oDSTFacturarServicio));
    }
  }, [accion, dispatch, oDSTFacturarServicio]);

  const validationSchema = yup.object({
    fecha_orden_servicio: yup.date().required('Requerido'),
    asociado_id: yup.string().required('Requerido'),
    tipo_servicio: yup.string().required('Requerido'),
    tipo_servicio_otro: yup
      .string()
      .nullable()
      .when('tipo_servicio', {
        is: 'OTR',
        then: yup.string().required('Requerido'),
      }),
    fecha_programada_instalacion: yup.date().required('Requerido'),
    hora_programada_instalacion: yup.string().nullable(),
    departamento_id_instalacion: yup.string().required('Requerido'),
    ciudad_id_instalacion: yup.string().required('Requerido'),
    lugar_id_instalacion: yup.string().nullable(),
    fecha_programada_desinstalacion: yup.date().nullable(),
    hora_programada_desinstalacion: yup.string().nullable(),
    departamento_id_desinstalacion: yup.string().required('Requerido'),
    ciudad_id_desinstalacion: yup.string().required('Requerido'),
    lugar_id_desinstalacion: yup.string().nullable(),
    transportador_id: yup.string().nullable(),
    placa_trailer: yup.string().nullable(),
    numero_contenedor: yup.string().nullable(),
    nombre_conductor: yup.string().nullable(),
    cedula_conductor: yup
      .string()
      .matches(VALIDACION_REGEX_DOCUMENTOS, mensajeValidacion('documento'))
      .nullable()
      .max(
        LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
        mensajeValidacion('max', LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL),
      )
      .min(7, mensajeValidacion('min', 7)),
    celular_conductor: yup
      .string()
      .nullable()
      .matches(VALIDACION_REGEX_TELEFONOS, mensajeValidacion('telefono'))
      .max(
        LONGITUD_MAXIMA_TELEFONOS,
        mensajeValidacion('max', LONGITUD_MAXIMA_TELEFONOS),
      )
      .min(
        LONGITUD_MINIMA_TELEFONOS,
        mensajeValidacion('min', LONGITUD_MINIMA_TELEFONOS),
      ),
  });

  const updateRutas = (asociado_id) => {
    dispatch(onGetRutas(asociado_id));
  };

  return (
    showForm && (
      <Dialog
        open={showForm}
        onClose={handleOnClose}
        aria-labelledby='simple-modal-title'
        TransitionComponent={Transition}
        aria-describedby='simple-modal-description'
        className={classes.dialogBox}
        disableBackdropClick={true}
        fullWidth={true}
        maxWidth={'lg'}>
        <Scrollbar>
          <Formik
            initialStatus={true}
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={{
              id: selectedRow ? selectedRow.id : '',
              numero_orden_servicio: selectedRow
                ? selectedRow.numero_orden_servicio
                  ? selectedRow.numero_orden_servicio
                  : ''
                : '',
              estado_orden: selectedRow
                ? selectedRow.estado_orden_servicio
                  ? ESTADOS_ORDEN_SERVICIO.filter(
                      (tipo) => tipo.id === selectedRow.estado_orden_servicio,
                    )[0]
                    ? ESTADOS_ORDEN_SERVICIO.filter(
                        (tipo) => tipo.id === selectedRow.estado_orden_servicio,
                      )[0].nombre
                    : ''
                  : ''
                : '',
              fecha_orden_servicio: selectedRow
                ? selectedRow.fecha_orden_servicio
                : format(new Date(Date.now()), 'yyyy-MM-dd'),
              asociado_documento: selectedRow
                ? selectedRow.asociado.numero_documento
                  ? selectedRow.asociado.numero_documento
                  : ''
                : '',
              asociado: selectedRow
                ? selectedRow.asociado.nombre
                  ? selectedRow.asociado.nombre
                  : ''
                : '',
              contacto_asociado: selectedRow
                ? selectedRow.asociado.contacto
                  ? selectedRow.asociado.contacto
                  : ''
                : '',
              telefono_asociado: selectedRow
                ? selectedRow.asociado.telefono
                  ? selectedRow.asociado.telefono
                  : ''
                : '',
              email_asociado: selectedRow
                ? selectedRow.asociado.email
                  ? selectedRow.asociado.email
                  : ''
                : '',
              documento_agente_aduana: selectedRow
                ? selectedRow.agenteAduana
                  ? selectedRow.agenteAduana.numero_documento
                  : ''
                : '',
              agente_aduana: selectedRow
                ? selectedRow.agenteAduana
                  ? selectedRow.agenteAduana.nombre
                  : ''
                : '',
              referencia_factura: selectedRow
                ? selectedRow.referencia_factura
                  ? selectedRow.referencia_factura
                  : ''
                : '',
              cliente_factura: selectedRow
                ? selectedRow.clienteFactura
                  ? selectedRow.clienteFactura.nombre
                  : ''
                : '',
              numero_factura: selectedRow
                ? selectedRow.numero_factura
                  ? selectedRow.clienteFactura.nombre
                  : ''
                : '',
              fecha_factura: selectedRow
                ? selectedRow.fecha_factura
                  ? selectedRow.clienteFactura.nombre
                  : ''
                : '',
              tipo_servicio: selectedRow
                ? selectedRow.tipo_servicio
                  ? TIPOS_SERVICIOS.filter(
                      (tipo) => tipo.id === selectedRow.tipo_servicio,
                    )[0]
                    ? TIPOS_SERVICIOS.filter(
                        (tipo) => tipo.id === selectedRow.tipo_servicio,
                      )[0].nombre
                    : ''
                  : ''
                : '',
              tipo_servicio_otro: selectedRow
                ? selectedRow.tipo_servicio_otro
                  ? selectedRow.tipo_servicio_otro
                  : ''
                : '',
              observaciones_odes: selectedRow
                ? selectedRow.observaciones_odes
                  ? selectedRow.observaciones_odes
                  : ''
                : '',

              fecha_programada_instalacion: selectedRow
                ? selectedRow.fecha_programada_instalacion
                  ? selectedRow.fecha_programada_instalacion
                  : ''
                : '',
              fecha_instalacion: selectedRow
                ? selectedRow.fecha_instalacion
                  ? selectedRow.fecha_instalacion
                  : ''
                : '',
              hora_programada_instalacion: selectedRow
                ? selectedRow.hora_programada_instalacion
                  ? selectedRow.hora_programada_instalacion
                  : ''
                : '',
              hora_inicio_instalacion: selectedRow
                ? selectedRow.hora_inicio_instalacion
                  ? selectedRow.hora_inicio_instalacion
                  : ''
                : '',
              departamento_instalacion: selectedRow
                ? selectedRow.departamentoInstalacion
                  ? selectedRow.departamentoInstalacion.nombre
                  : ''
                : '',
              hora_final_instalacion: selectedRow
                ? selectedRow.hora_final_instalacion
                  ? selectedRow.hora_final_instalacion
                  : ''
                : '',
              ciudad_instalacion: selectedRow
                ? selectedRow.ciudadInstalacion
                  ? selectedRow.ciudadInstalacion.nombre
                  : ''
                : '',
              lugar_instalacion: selectedRow
                ? selectedRow.lugarInstalacion
                  ? selectedRow.lugarInstalacion.nombre
                  : ''
                : '',
              direccion_instalacion: selectedRow
                ? selectedRow.lugarInstalacion
                  ? selectedRow.lugarInstalacion.direccion
                  : ''
                : '',
              equipo_id: selectedRow
                ? selectedRow.equipo_id
                  ? selectedRow.equipo_id
                  : ''
                : '',
              recurso_tecnico_instalacion: selectedRow
                ? selectedRow.recursoInstalacion
                  ? selectedRow.recursoInstalacion.nombre
                  : ''
                : '',
              numero_viaje: selectedRow
                ? selectedRow.numero_viaje
                  ? selectedRow.numero_viaje
                  : ''
                : '',
              indicativo_aceptacion_instalacion: selectedRow
                ? selectedRow.indicativo_aceptacion_instalacion
                  ? selectedRow.indicativo_aceptacion_instalacion === 'A'
                    ? 'Aprobada'
                    : 'Rechazada'
                  : ''
                : '',
              observaciones_rechazo_instalacion: selectedRow
                ? selectedRow.observaciones_rechazo_instalacion
                  ? selectedRow.observaciones_rechazo_instalacion
                  : ''
                : '',
              observaciones_programacion_instalacion: selectedRow
                ? selectedRow.observaciones_programacion_instalacion
                  ? selectedRow.observaciones_programacion_instalacion
                  : ''
                : '',
              observaciones_ejecucion_instalacion: selectedRow
                ? selectedRow.observaciones_ejecucion_instalacion
                  ? selectedRow.observaciones_ejecucion_instalacion
                  : ''
                : '',

              fecha_programada_desinstalacion: selectedRow
                ? selectedRow.fecha_programada_desinstalacion
                  ? selectedRow.fecha_programada_desinstalacion
                  : ''
                : '',
              fecha_desinstalacion: selectedRow
                ? selectedRow.fecha_desinstalacion
                  ? selectedRow.fecha_desinstalacion
                  : ''
                : '',
              hora_programada_desinstalacion: selectedRow
                ? selectedRow.hora_programada_desinstalacion
                  ? selectedRow.hora_programada_desinstalacion
                  : ''
                : '',
              hora_inicio_desinstalacion: selectedRow
                ? selectedRow.hora_inicio_desinstalacion
                  ? selectedRow.hora_inicio_desinstalacion
                  : ''
                : '',
              departamento_desinstalacion: selectedRow
                ? selectedRow.departamentoDesinstalacion
                  ? selectedRow.departamentoDesinstalacion.nombre
                  : ''
                : '',
              hora_final_desinstalacion: selectedRow
                ? selectedRow.hora_final_desinstalacion
                  ? selectedRow.hora_final_desinstalacion
                  : ''
                : '',
              ciudad_desinstalacion: selectedRow
                ? selectedRow.ciudadDesinstalacion
                  ? selectedRow.ciudadDesinstalacion.nombre
                  : ''
                : '',
              lugar_desinstalacion: selectedRow
                ? selectedRow.lugarDesinstalacion
                  ? selectedRow.lugarDesinstalacion.nombre
                  : ''
                : '',
              direccion_desinstalacion: selectedRow
                ? selectedRow.lugarDesinstalacion
                  ? selectedRow.lugarDesinstalacion.direccion
                  : ''
                : '',
              recurso_tecnico_desinstalacion: selectedRow
                ? selectedRow.recursoDesinstalacion
                  ? selectedRow.recursoDesinstalacion.nombre
                  : ''
                : '',
              indicativo_aceptacion_desinstalacion: selectedRow
                ? selectedRow.indicativo_aceptacion_desinstalacion
                  ? selectedRow.indicativo_aceptacion_desinstalacion
                  : ''
                : '',
              observaciones_rechazo_desinstalacion: selectedRow
                ? selectedRow.observaciones_rechazo_desinstalacion
                  ? selectedRow.observaciones_rechazo_desinstalacion
                  : ''
                : '',
              observaciones_programacion_desinstalacion: selectedRow
                ? selectedRow.observaciones_programacion_desinstalacion
                  ? selectedRow.observaciones_programacion_desinstalacion
                  : ''
                : '',
              observaciones_ejecucion_desinstalacion: selectedRow
                ? selectedRow.observaciones_ejecucion_desinstalacion
                  ? selectedRow.observaciones_ejecucion_desinstalacion
                  : ''
                : '',
              transportador_documento: selectedRow
                ? selectedRow.transportador
                  ? selectedRow.transportador.numero_documento
                  : ''
                : '',
              transportador: selectedRow
                ? selectedRow.transportador
                  ? selectedRow.transportador.nombre
                  : ''
                : '',
              contacto_transportador: selectedRow
                ? selectedRow.transportador
                  ? selectedRow.transportador.nombre_contacto
                  : ''
                : '',
              telefono_transportador: selectedRow
                ? selectedRow.transportador
                  ? selectedRow.transportador.telefono_contacto
                  : ''
                : '',
              celular_transportador: selectedRow
                ? selectedRow.transportador
                  ? selectedRow.transportador.celular_contacto
                  : ''
                : '',
              email_transportador: selectedRow
                ? selectedRow.transportador
                  ? selectedRow.transportador.email_contacto
                  : ''
                : '',
              placa_vehiculo: selectedRow
                ? selectedRow.placa_vehiculo
                  ? selectedRow.placa_vehiculo
                  : ''
                : '',
              placa_trailer: selectedRow
                ? selectedRow.placa_trailer
                  ? selectedRow.placa_trailer
                  : ''
                : '',
              numero_contenedor: selectedRow
                ? selectedRow.numero_contenedor
                  ? selectedRow.numero_contenedor
                  : ''
                : '',
              nombre_conductor: selectedRow
                ? selectedRow.nombre_conductor
                  ? selectedRow.nombre_conductor
                  : ''
                : '',
              cedula_conductor: selectedRow
                ? selectedRow.cedula_conductor
                  ? selectedRow.cedula_conductor
                  : ''
                : '',
              celular_conductor: selectedRow
                ? selectedRow.celular_conductor
                  ? selectedRow.celular_conductor
                  : ''
                : '',
              estado: selectedRow
                ? selectedRow.estado === 1
                  ? '1'
                  : '0'
                : '1',
            }}
            validationSchema={validationSchema}>
            {({
              values,
              initialValues,
              setFieldValue,
              setFieldError,
              touched,
            }) => (
              <ODSTFacturarServicioForm
                values={values}
                setFieldValue={setFieldValue}
                accion={accion}
                titulo={titulo}
                touched={touched}
                handleOnClose={handleOnClose}
                initialValues={initialValues}
                asociados={asociados}
                TIPOS_SERVICIOS={TIPOS_SERVICIOS}
                tercerosServicios={tercerosServicios}
                rutas={rutas}
                rows={rows}
                updateRutas={updateRutas}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default ODSTFacturarServicioCreator;
