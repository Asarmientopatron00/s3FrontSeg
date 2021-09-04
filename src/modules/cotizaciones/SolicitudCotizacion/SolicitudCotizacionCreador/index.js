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
} from '../../../../redux/actions/SolicitudCotizacionAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import SolicitudCotizacionForm from './SolicitudCotizacionForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
} from '../../../../shared/constants/Constantes';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

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
  numero_servicios_mes: yup.number().required('Requerido'),
  tipo_servicio: yup.string().required('Requerido'),
  tipo_servicio_otro: yup
    .string()
    .nullable()
    .when('tipo_servicio', {
      is: 'OTR',
      then: yup.string().required('Requerido'),
    }),
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

const SolicitudCotizacionCreator = (props) => {
  const {
    solicitudCotizacion,
    handleOnClose,
    accion,
    updateColeccion,
    ciudades,
    servicios,
    titulo,
    TIPOS_SERVICIOS,
  } = props;

  const user = useAuthUser();

  const dispatch = useDispatch();

  const [consecutivo, setConsecutivo] = useState('');

  const useStyles = makeStyles((theme) => ({
    dialogBox: {
      position: 'relative',
      '& .MuiDialog-paperWidthSm': {
        maxWidth: 600,
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
    ({solicitudCotizacionReducer}) => solicitudCotizacionReducer.selectedRow,
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
      dispatch(onShow(solicitudCotizacion));
    }
  }, [accion, dispatch, solicitudCotizacion]);
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
        maxWidth={'md'}>
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
              ciudad_origen_id: selectedRow
                ? selectedRow.ciudad_origen_id
                  ? selectedRow.ciudad_origen_id
                  : ''
                : '',
              ciudad_destino_id: selectedRow
                ? selectedRow.ciudad_destino_id
                  ? selectedRow.ciudad_destino_id
                  : ''
                : '',
              servicio_id: selectedRow
                ? selectedRow.servicio_id
                  ? selectedRow.servicio_id
                  : ''
                : '',
              tipo_servicio: selectedRow ? selectedRow.tipo_servicio : '',
              tipo_servicio_otro: selectedRow
                ? selectedRow.tipo_servicio_otro
                : '',
              numero_servicios_mes: selectedRow
                ? selectedRow.numero_servicios_mes
                  ? selectedRow.numero_servicios_mes
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
              asociado_id: selectedRow
                ? selectedRow.asociado_id
                : user.asociado.id,
              numero_solicitud: selectedRow ? selectedRow.numero_solicitud : '',
              observaciones: selectedRow
                ? selectedRow.observaciones
                  ? selectedRow.observaciones
                  : ''
                : '',
              estado_solicitud_cotizacion: selectedRow
                ? selectedRow.estado_solicitud_cotizacion
                : 'SOL',
              estado: selectedRow
                ? selectedRow.estado === 1
                  ? '1'
                  : '0'
                : '1',
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
              <SolicitudCotizacionForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                ciudades={ciudades}
                servicios={servicios}
                TIPOS_SERVICIOS={TIPOS_SERVICIOS}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default SolicitudCotizacionCreator;
