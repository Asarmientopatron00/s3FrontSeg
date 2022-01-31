import React, {useEffect, useRef, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../@crema';
import {onShow, onApprove} from '../../../redux/actions/OrdenServicioAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import AprobacionOrdenServicioForm from './ConsultaOrdenServicioForm';
import {Fonts} from '../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import format from 'date-fns/format';
import {onGetColeccion} from '../../../redux/actions/OrdenServicioDocumentoAction';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const AprobacionOrdenServicioCreator = (props) => {
  const {
    ordenServicio,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
    TIPOS_SERVICIOS,
    ESTADOS_ORDEN_SERVICIO,
  } = props;

  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    dialogBox: {
      position: 'relative',
      '& .MuiDialog-paperWidthSm': {
        maxWidth: 800,
        width: '100%',
        // maxHeight:'fit-content'
      },
      '& .MuiTypography-h6': {
        fontWeight: Fonts.LIGHT,
      },
    },
  }));

  const classes = useStyles(props);
  const [showForm, setShowForm] = useState(false);
  let selectedRow = useRef();
  selectedRow = useSelector(
    ({ordenServicioReducer}) => ordenServicioReducer.selectedRow,
  );

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
    if ((accion === 'editar') | (accion === 'ver') | (accion === 'aprobar')) {
      dispatch(onShow(ordenServicio));
    }
  }, [accion, dispatch, ordenServicio]);

  const {rows} = useSelector(
    ({ordenServicioDocumentoReducer}) => ordenServicioDocumentoReducer,
  );

  useEffect(() => {
    dispatch(onGetColeccion(ordenServicio));
  }, [dispatch, ordenServicio]);

  return (
    showForm && (
      <Dialog
        open={showForm}
        fullWidth={true}
        onClose={handleOnClose}
        aria-labelledby='simple-modal-title'
        TransitionComponent={Transition}
        aria-describedby='simple-modal-description'
        className={classes.dialogBox}
        disableBackdropClick={true}
        maxWidth={'xl'}>
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
              servicio: selectedRow
                ? selectedRow.servicio
                  ? selectedRow.servicio.nombre
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
              fecha_instalacion_fisica: selectedRow
                ? selectedRow.fecha_instalacion_fisica
                  ? selectedRow.fecha_instalacion_fisica
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
              hora_instalacion_fisica: selectedRow
                ? selectedRow.hora_instalacion_fisica
                  ? selectedRow.hora_instalacion_fisica
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
              equipo: selectedRow
                ? selectedRow.equipo
                  ? selectedRow.equipo
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
              fecha_desinstalacion_fisica: selectedRow
                ? selectedRow.fecha_desinstalacion_fisica
                  ? selectedRow.fecha_desinstalacion_fisica
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
              hora_desinstalacion_fisica: selectedRow
                ? selectedRow.hora_desinstalacion_fisica
                  ? selectedRow.hora_desinstalacion_fisica
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
                  ? selectedRow.indicativo_aceptacion_desinstalacion === 'A'
                    ? 'Aprobada'
                    : 'Rechazada'
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
            onSubmit={(
              data,
              {setSubmitting, resetForm, setFieldError, errors},
            ) => {
              setSubmitting(true);
              if (accion === 'aprobar') {
                dispatch(
                  onApprove({id: data.id}, handleOnClose, updateColeccion),
                );
              }
              // resetForm();
              setSubmitting(false);
              // handleOnClose();
              // updateColeccion();
            }}>
            {({values, initialValues, setFieldValue, errors}) => (
              <AprobacionOrdenServicioForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                errors={errors}
                rows={rows}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default AprobacionOrdenServicioCreator;
