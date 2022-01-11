import React, {useEffect, useRef, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShow,
  onUpdate,
  onCreate,
} from '../../../../redux/actions/CotizacionProductoAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import ConsultaCotizacionProductoForm from './ConsultaCotizacionProductoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
} from '../../../../shared/constants/Constantes';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import {onGetColeccion} from '../../../../redux/actions/DetalleCotizacionProductoAction';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  ciudad_origen_id: yup.string().required('Requerido'),
  ciudad_destino_id: yup
    .string()
    .required('Requerido')
    .notOneOf(
      [yup.ref('ciudad_origen_id')],
      'Ciudad de destino debe ser diferente a ciudad de origen',
    ),
  servicio_id: yup.string().required('Requerido'),
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

const ConsultaCotizacionProductoCreator = (props) => {
  const {consultaCotizacion, handleOnClose, accion, updateColeccion, titulo} =
    props;

  const dispatch = useDispatch();

  const [consecutivo, setConsecutivo] = useState('');

  const useStyles = makeStyles((theme) => ({
    dialogBox: {
      position: 'relative',
      '& .MuiDialog-paperWidthSm': {
        maxWidth: 900,
        width: '900px',
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
    ({cotizacionProductoReducer}) => cotizacionProductoReducer.selectedRow,
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
    if ((accion === 'editar') | (accion === 'ver')) {
      dispatch(onShow(consultaCotizacion));
    }
  }, [accion, dispatch, consultaCotizacion]);

  useEffect(() => {
    dispatch(onGetColeccion(1, 20, 'id:desc', consultaCotizacion));
  }, [dispatch, consultaCotizacion]);

  const {rows} = useSelector(
    ({detalleCotizacionProductoReducer}) => detalleCotizacionProductoReducer,
  );

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
        maxWidth={'xl'}>
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
              fecha_cotizacion: selectedRow ? selectedRow.fecha_cotizacion : '',
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
              usuario_creacion_nombre: selectedRow
                ? selectedRow.usuario_creacion_nombre
                  ? selectedRow.usuario_creacion_nombre
                  : ''
                : '',
              usuario_modificacion_nombre: selectedRow
                ? selectedRow.usuario_modificacion_nombre
                  ? selectedRow.usuario_modificacion_nombre
                  : ''
                : '',
              fecha_creacion: selectedRow
                ? selectedRow.fecha_creacion
                  ? selectedRow.fecha_creacion
                  : ''
                : '',
              fecha_modificacion: selectedRow
                ? selectedRow.fecha_modificacion
                  ? selectedRow.fecha_modificacion
                  : ''
                : '',
              fecha_solicitud_cotizacion: selectedRow
                ? selectedRow.solicitud_cotizacion
                  ? selectedRow.solicitud_cotizacion.fecha_solicitud_cotizacion
                  : ''
                : '',
              estado_cotizacion: selectedRow
                ? selectedRow.estado_cotizacion === 'ENV'
                  ? 'Enviada'
                  : selectedRow.estado_cotizacion === 'APR'
                  ? 'Aprobada'
                  : selectedRow.estado_cotizacion === 'ANU'
                  ? 'Anulada'
                  : 'Generada'
                : '',
              estado: selectedRow
                ? selectedRow.estado === 1
                  ? '1'
                  : '0'
                : '1',
              nombre_empresa: selectedRow
                ? selectedRow.nombre_empresa
                  ? selectedRow.nombre_empresa
                  : ''
                : '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting, resetForm}) => {
              setSubmitting(true);
              console.log(consecutivo);
              if (accion === 'crear') {
                dispatch(
                  onCreate(
                    data,
                    handleOnClose,
                    updateColeccion,
                    setConsecutivo,
                  ),
                );
              } else if (accion === 'editar') {
                if (selectedRow) {
                  dispatch(onUpdate(data, handleOnClose, updateColeccion));
                }
              }
              // resetForm();
              setSubmitting(false);
              // handleOnClose();
              // updateColeccion();
            }}>
            {({values, initialValues, setFieldValue}) => (
              <ConsultaCotizacionProductoForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                rows={rows}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default ConsultaCotizacionProductoCreator;
