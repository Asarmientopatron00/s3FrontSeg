import React, {useEffect, useRef, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShow,
  onUpdate,
  onCreate,
} from '../../../../redux/actions/SolicitudCotizacionProductoAction';
import SolicitudCotizacionProductoForm from './SolicitudCotizacionProductoForm';
// import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import {useParams} from 'react-router-dom';
import {history} from 'redux/store';
// import format from 'date-fns/format';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
} from '../../../../shared/constants/Constantes';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const SolicitudCotizacionProductoCreator = (props) => {
  const {accion, id} = useParams();
  const handleOnClose = () => {
    window.location.href = '/solicitud-cotizacion-producto';
  };

  const user = useAuthUser();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(onGetColeccionLigera(true));
  // }, [dispatch]);

  let selectedRow = useRef();
  selectedRow = useSelector(
    ({solicitudCotizacionProductoReducer}) =>
      solicitudCotizacionProductoReducer.selectedRow,
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
    nombre_contacto: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    email: yup
      .string()
      .required('Requerido')
      .email('Debe ser tipo e-mail')
      .max(128, mensajeValidacion('max', 128)),
    telefono_contacto: yup
      .string()
      .required('Requerido')
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

  const [detalles, setDetalles] = useState();
  return (
    <Scrollbar>
      <Formik
        initialStatus={true}
        enableReinitialize={true}
        validateOnBlur={false}
        initialValues={{
          id: selectedRow ? selectedRow.id : '',
          fecha_solicitud_cotizacion: selectedRow
            ? selectedRow.fecha_solicitud_cotizacion
            : new Date(Date.now()).toLocaleDateString('es-CL', {
                timeZone: 'UTC',
              }),
          numero_solicitud_cotizacion: selectedRow
            ? selectedRow.numero_solicitud_cotizacion
              ? selectedRow.numero_solicitud_cotizacion
              : ''
            : '',
          nombre_contacto: selectedRow
            ? selectedRow.nombre_contacto
            : user.displayName,
          email: selectedRow ? selectedRow.email : user.email,
          telefono_contacto: selectedRow
            ? selectedRow.telefono_contacto
            : user.telefono,
          nombre_empresa: selectedRow
            ? selectedRow.nombre_empresa
            : user.asociado.nombre,

          telefono_contacto: selectedRow
            ? selectedRow.telefono_contacto
            : user.telefono,

          asociado_id: selectedRow ? selectedRow.asociado_id : user.asociado.id,

          observaciones: selectedRow
            ? selectedRow.observaciones
              ? selectedRow.observaciones
              : ''
            : '',
          estado_solicitud_cotizacion: selectedRow
            ? selectedRow.estado_solicitud_cotizacion
            : 'SOL',
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
          <SolicitudCotizacionProductoForm
            values={values}
            setFieldValue={setFieldValue}
            accion={accion}
            initialValues={initialValues}
            setDetalles={setDetalles}
          />
        )}
      </Formik>
    </Scrollbar>
  );
};

export default SolicitudCotizacionProductoCreator;
