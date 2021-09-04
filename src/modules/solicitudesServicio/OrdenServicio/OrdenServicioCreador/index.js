import React, {useEffect, useRef, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShow,
  onUpdate,
  onCreate,
  onGetColeccionLigeraAsociado,
} from '../../../../redux/actions/OrdenServicioAction';
import {onGetColeccionLigera} from '../../../../redux/actions/SolicitudCotizacionAction';
import OrdenServicioForm from './OrdenServicioForm';
// import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import {useParams} from 'react-router-dom';
import {history} from 'redux/store';
import format from 'date-fns/format';

const OrdenServicioCreator = (props) => {
  const {accion, id} = useParams();
  const handleOnClose = () => {
    window.location.href = '/ordenes-servicio';
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetColeccionLigera(true));
  }, [dispatch]);

  let selectedRow = useRef();
  selectedRow = useSelector(
    ({ordenServicioReducer}) => ordenServicioReducer.selectedRow,
  );

  const asociados = useSelector(
    ({ordenServicioReducer}) => ordenServicioReducer.asociados,
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

  if (accion !== 'editar' && accion !== 'ver' && accion !== 'crear') {
    history.goBack();
  }

  useEffect(() => {
    if ((accion === 'editar') | (accion === 'ver')) {
      dispatch(onShow(id));
    }
  }, [accion, dispatch, id]);
  const validationSchema = yup.object({
    solicitud_cotizacion_id: yup.string().required('Requerido'),
    fecha_cotizacion: yup.date().required('Requerido'),
    fecha_vigencia_cotizacion: yup.date().required('Requerido'),
    plazo_pago_cotizacion: yup.number().required('Requerido'),
  });

  useEffect(() => {
    dispatch(onGetColeccionLigeraAsociado());
  }, [dispatch]);

  const [detalles, setDetalles] = useState();
  return (
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
          fecha_orden_servicio: selectedRow
            ? selectedRow.fecha_orden_servicio
            : format(new Date(Date.now()), 'yyyy-MM-dd'),
          asociado_id: selectedRow
            ? selectedRow.asociado_id
              ? selectedRow.asociado_id
              : ''
            : '',
          asociado: selectedRow
            ? selectedRow.asociado.nombre
              ? selectedRow.asociado.nombre
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
          contacto_asociado: selectedRow
            ? selectedRow.asociado.contacto
              ? selectedRow.asociado.contacto
              : ''
            : '',

          referencia_factura: selectedRow
            ? selectedRow.referencia_factura
              ? selectedRow.referencia_factura
              : ''
            : '',
          cliente_factura: selectedRow
            ? selectedRow.cliente_factura
              ? selectedRow.cliente_factura
              : ''
            : '',
          tipo_servicio: selectedRow
            ? selectedRow.tipo_servicio
              ? selectedRow.tipo_servicio
              : ''
            : '',
          tipo_servicio_otro: selectedRow
            ? selectedRow.tipo_servicio_otro
              ? selectedRow.tipo_servicio_otro
              : ''
            : '',
          agente_aduana_id: selectedRow
            ? selectedRow.agente_aduana_id
              ? selectedRow.agente_aduana_id
              : ''
            : '',
          fecha_programada_instalacion: selectedRow
            ? selectedRow.fecha_programada_instalacion
              ? selectedRow.fecha_programada_instalacion
              : ''
            : '',
          hora_programada_instalacion: selectedRow
            ? selectedRow.hora_programada_instalacion
              ? selectedRow.hora_programada_instalacion
              : ''
            : '',
          departamento_id_instalacion: selectedRow
            ? selectedRow.departamento_id_instalacion
              ? selectedRow.departamento_id_instalacion
              : ''
            : '',
          ciudad_id_instalacion: selectedRow
            ? selectedRow.ciudad_id_instalacion
              ? selectedRow.ciudad_id_instalacion
              : ''
            : '',
          lugar_id_instalacion: selectedRow
            ? selectedRow.lugar_id_instalacion
              ? selectedRow.lugar_id_instalacion
              : ''
            : '',
          fecha_programada_desinstalacion: selectedRow
            ? selectedRow.fecha_programada_desinstalacion
              ? selectedRow.fecha_programada_desinstalacion
              : ''
            : '',
          hora_programada_desinstalacion: selectedRow
            ? selectedRow.hora_programada_desinstalacion
              ? selectedRow.hora_programada_desinstalacion
              : ''
            : '',
          departamento_id_desinstalacion: selectedRow
            ? selectedRow.departamento_id_desinstalacion
              ? selectedRow.departamento_id_desinstalacion
              : ''
            : '',
          ciudad_id_desinstalacion: selectedRow
            ? selectedRow.ciudad_id_desinstalacion
              ? selectedRow.ciudad_id_desinstalacion
              : ''
            : '',
          lugar_id_desinstalacion: selectedRow
            ? selectedRow.lugar_id_desinstalacion
              ? selectedRow.lugar_id_desinstalacion
              : ''
            : '',
          transportador_id: selectedRow
            ? selectedRow.transportador_id
              ? selectedRow.transportador_id
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
          observaciones: selectedRow
            ? selectedRow.observaciones
              ? selectedRow.observaciones
              : ''
            : '',
          estado_orden_servicio: selectedRow
            ? selectedRow.estado_orden_servicio
            : 'REG',
          estado: selectedRow ? (selectedRow.estado === 1 ? '1' : '0') : '1',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm, setFieldError}) => {
          setSubmitting(true);
          if (data.fecha_cotizacion >= data.fecha_vigencia_cotizacion) {
            setFieldError(
              'fecha_vigencia_cotizacion',
              'La fecha de vigencia debe ser mayor a la fecha de cotización',
            );
          }
          if (detalles.length === 0) {
            return;
          }

          if (accion === 'crear') {
            dispatch(onCreate(data, handleOnClose, detalles));
          } else if (accion === 'editar') {
            if (selectedRow) {
              dispatch(onUpdate(data, handleOnClose, detalles));
            }
          }
          setSubmitting(false);
        }}>
        {({values, initialValues, setFieldValue, setFieldError}) => (
          <OrdenServicioForm
            values={values}
            setFieldValue={setFieldValue}
            accion={accion}
            initialValues={initialValues}
            asociados={asociados}
          />
        )}
      </Formik>
    </Scrollbar>
  );
};

export default OrdenServicioCreator;
