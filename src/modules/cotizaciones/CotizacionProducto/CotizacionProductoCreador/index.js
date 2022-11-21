import React, {useEffect, useRef, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '@crema';
import {
  onShow,
  onUpdate,
  onCreate,
} from 'redux/actions/CotizacionProductoAction';
import {onGetColeccionLigera} from 'redux/actions/SolicitudCotizacionProductoAction';
import {onGetColeccionLigera as onGetColeccionLigeraColor} from 'redux/actions/ColorAction';
import {onGetColeccionLigera as onGetColeccionLigeraProducto} from 'redux/actions/ProductoAction';
import CotizacionProductoForm from './CotizacionProductoForm';
// import mensajeValidacion from 'shared/functions/MensajeValidacion';
import {useParams} from 'react-router-dom';
import {history} from 'redux/store';
import format from 'date-fns/format';

const validationSchema = yup.object({
  solicitud_cotizacion_id: yup.string().required('Requerido'),
  fecha_cotizacion: yup.date().required('Requerido'),
  fecha_vigencia_cotizacion: yup.date().required('Requerido'),
  plazo_pago_cotizacion: yup.number().required('Requerido'),
  tiempo_estimado_entrega: yup.number().required('Requerido'),
});

const CotizacionCreator = (props) => {
  const {accion, id} = useParams();
  const handleOnClose = () => {
    window.location.href = '/cotizaciones-productos';
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetColeccionLigera(true));
    dispatch(onGetColeccionLigeraColor());
    dispatch(onGetColeccionLigeraProducto());
  }, [dispatch]);

  let selectedRow = useRef();
  selectedRow = useSelector(
    ({cotizacionProductoReducer}) => cotizacionProductoReducer.selectedRow,
  );
  const colores = useSelector(({colorReducer}) => colorReducer.ligera);
  const productos = useSelector(({productoReducer}) => productoReducer.ligera);

  const solicitudes = useSelector(
    ({solicitudCotizacionProductoReducer}) =>
      solicitudCotizacionProductoReducer.ligera,
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

  const [detalles, setDetalles] = useState();
  return (
    <Scrollbar>
      <Formik
        initialStatus={true}
        enableReinitialize={true}
        validateOnBlur={false}
        initialValues={{
          id: selectedRow ? selectedRow.id : '',
          numero_cotizacion_producto: selectedRow
            ? selectedRow.numero_cotizacion_producto
              ? selectedRow.numero_cotizacion_producto
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
          tiempo_estimado_entrega: selectedRow
            ? selectedRow.tiempo_estimado_entrega
              ? selectedRow.tiempo_estimado_entrega
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
          <CotizacionProductoForm
            values={values}
            setFieldValue={setFieldValue}
            accion={accion}
            initialValues={initialValues}
            solicitudes={solicitudes}
            setDetalles={setDetalles}
            colores={colores}
            productos={productos}
            dispatch={dispatch}
          />
        )}
      </Formik>
    </Scrollbar>
  );
};

export default CotizacionCreator;
