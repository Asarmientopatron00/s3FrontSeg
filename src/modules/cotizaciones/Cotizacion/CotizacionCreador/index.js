import React, {useEffect, useRef, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '@crema';
import {onShow, onUpdate, onCreate} from 'redux/actions/CotizacionAction';
import {onGetColeccionLigera} from 'redux/actions/SolicitudCotizacionAction';
import CotizacionForm from './CotizacionForm';
import {onGetColeccionLigera as onGetColeccionLigeraCiudad} from 'redux/actions/CiudadAction';
import {onGetColeccionLigera as onGetColeccionLigeraServicio} from 'redux/actions/ServicioAction';
// import mensajeValidacion from 'shared/functions/MensajeValidacion';
import {useParams} from 'react-router-dom';
import {history} from 'redux/store';
import format from 'date-fns/format';

const CotizacionCreator = (props) => {
  const {accion, id} = useParams();
  const handleOnClose = () => {
    window.location.href = '/cotizaciones';
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetColeccionLigera(true));
  }, [dispatch]);

  let selectedRow = useRef();
  selectedRow = useSelector(
    ({cotizacionReducer}) => cotizacionReducer.selectedRow,
  );
  const ciudades = useSelector(({ciudadReducer}) => ciudadReducer.ligera);
  const servicios = useSelector(({servicioReducer}) => servicioReducer.ligera);

  const solicitudes = useSelector(
    ({solicitudCotizacionReducer}) => solicitudCotizacionReducer.ligera,
  );

  const initializeSelectedRow = () => {
    selectedRow = null;
  };
  useEffect(() => {
    initializeSelectedRow();
    dispatch(onGetColeccionLigeraCiudad());
    dispatch(onGetColeccionLigeraServicio());
  }, []); // eslint-disable-line

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
    numero_viajes_mes: yup.number().required('Requerido'),
  });

  const [detalles, setDetalles] = useState();
  return (
    <Scrollbar>
      <Formik
        initialStatus={true}
        enableReinitialize={true}
        validateOnBlur={false}
        initialValues={{
          id: selectedRow ? selectedRow.id : '',
          numero_cotizacion_servicio: selectedRow
            ? selectedRow.numero_cotizacion_servicio
              ? selectedRow.numero_cotizacion_servicio
              : ''
            : '',
          solicitud_cotizacion_id: selectedRow
            ? selectedRow.solicitud_cotizacion_id
              ? selectedRow.solicitud_cotizacion_id
              : ''
            : '',
          numero_solicitud_cotizacion: selectedRow
            ? selectedRow.numero_solicitud_cotizacion
              ? selectedRow.numero_solicitud_cotizacion
              : ''
            : '',
          empresa_cotizacion: selectedRow
            ? selectedRow.empresa_cotizacion
              ? selectedRow.empresa_cotizacion
              : ''
            : '',
          asociado_id: selectedRow
            ? selectedRow.asociado_id
              ? selectedRow.asociado_id
              : ''
            : '',
          fecha_cotizacion: selectedRow
            ? selectedRow.fecha_cotizacion
            : format(new Date(Date.now()), 'yyyy-MM-dd'),
          fecha_vigencia_cotizacion: selectedRow
            ? selectedRow.fecha_vigencia_cotizacion
            : '',
          plazo_pago_cotizacion: selectedRow
            ? selectedRow.plazo_pago_cotizacion
              ? selectedRow.plazo_pago_cotizacion
              : ''
            : '',
          numero_viajes_mes: selectedRow
            ? selectedRow.numero_viajes_mes
              ? selectedRow.numero_viajes_mes
              : ''
            : '',
          observaciones: selectedRow
            ? selectedRow.observaciones
              ? selectedRow.observaciones
              : ''
            : '',
          estado_cotizacion: selectedRow
            ? selectedRow.estado_cotizacion
            : 'GEN',
          estado: selectedRow ? (selectedRow.estado === 1 ? '1' : '0') : '1',
          nombre_empresa: selectedRow
            ? selectedRow.nombre_empresa
              ? selectedRow.nombre_empresa
              : ''
            : '',
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
          <CotizacionForm
            values={values}
            setFieldValue={setFieldValue}
            accion={accion}
            initialValues={initialValues}
            solicitudes={solicitudes}
            setDetalles={setDetalles}
            ciudades={ciudades}
            servicios={servicios}
            dispatch={dispatch}
          />
        )}
      </Formik>
    </Scrollbar>
  );
};

export default CotizacionCreator;
