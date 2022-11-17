import React, {useEffect, useRef, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '@crema';
import {
  onShow,
  onUpdate,
  onCreate,
} from 'redux/actions/SolicitudCotizacionAction';
import {onGetColeccionDatosBasicos as onGetAsociados} from 'redux/actions/AsociadoAction';
import CotizacionForm from './SolicitudCotizacionV2Form';
import {useParams} from 'react-router-dom';
import {history} from 'redux/store';
import {useAuthUser} from '@crema/utility/AppHooks';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
} from 'shared/constants/Constantes';
import mensajeValidacion from 'shared/functions/MensajeValidacion';

const validationSchema = yup.object({
  numero_servicios_mes: yup.number().required('Requerido'),
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

const SolicitudCotizacionV2Creador = (props) => {
  const {accion, id} = useParams();
  const user = useAuthUser();
  const handleOnClose = () => {
    window.location.href = '/solicitud-cotizacion-v2';
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetAsociados(1, 500));
  }, [dispatch]);

  let selectedRow = useRef();
  selectedRow = useSelector(
    ({solicitudCotizacionReducer}) => solicitudCotizacionReducer.selectedRow,
  );
  const asociados = useSelector(({asociadoReducer}) => asociadoReducer.rows);

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
          fecha_solicitud_cotizacion: selectedRow
            ? selectedRow.fecha_solicitud_cotizacion
            : new Date(Date.now()).toLocaleDateString('es-CL', {
                timeZone: 'UTC',
              }),
          numero_servicios_mes: selectedRow
            ? selectedRow.numero_servicios_mes
              ? selectedRow.numero_servicios_mes
              : ''
            : '',
          nombre_contacto: selectedRow
            ? selectedRow.nombre_contacto
            : user?.rol?.tipo !== 'IN'
            ? user.displayName
            : '',
          email: selectedRow
            ? selectedRow.email
            : user?.rol?.tipo !== 'IN'
            ? user.email
            : '',
          telefono_contacto: selectedRow
            ? selectedRow.telefono_contacto
            : user?.rol?.tipo !== 'IN'
            ? user.telefono
            : '',
          empresa: selectedRow
            ? selectedRow.nombre_empresa
            : user?.rol?.tipo !== 'IN'
            ? user.asociado.nombre
            : '',
          asociado_id: selectedRow
            ? selectedRow.asociado_id
            : user?.rol?.tipo !== 'IN'
            ? user?.asociado?.id
            : '',
          numero_solicitud: selectedRow ? selectedRow.numero_solicitud : '',
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
        onSubmit={(data, {setSubmitting, setFieldError}) => {
          setSubmitting(true);
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
        {({values, initialValues, setFieldValue}) => (
          <CotizacionForm
            values={values}
            setFieldValue={setFieldValue}
            accion={accion}
            initialValues={initialValues}
            setDetalles={setDetalles}
            user={user}
            asociados={asociados}
          />
        )}
      </Formik>
    </Scrollbar>
  );
};

export default SolicitudCotizacionV2Creador;
