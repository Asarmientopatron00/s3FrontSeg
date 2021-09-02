import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../@crema';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import SolicitudContactoForm from './SolicitudContactoForm';
import {Fonts} from '../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {
  onCreateContacto,
  onGetInformacionSolicitudContacto,
} from '../../../redux/actions/SolicitudCotizacionAction';
import {Box} from '@material-ui/core';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
} from '../../../shared/constants/Constantes';
import mensajeValidacion from '../../../shared/functions/MensajeValidacion';
import {TIPOS_SERVICIOS} from '../../../shared/constants/ListasValores';

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
  tipo_servicio: yup.string().required('Requerido'),
  tipo_servicio_otro: yup
    .string()
    .nullable()
    .when('tipo_servicio', {
      is: 'OTR',
      then: yup.string().required('Requerido'),
    }),
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
  empresa: yup.string().required('Requerido'),
});

const SolicitudCotizacionCreator = (props) => {
  const [show, setShow] = useState(true);
  const [consecutivo, setConsecutivo] = useState('');
  const titulo = 'Solicitar Cotización';

  const handleOnClose = () => {
    setShow(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetInformacionSolicitudContacto());
  }, [dispatch]);

  const {ciudades, servicios} = useSelector(
    ({solicitudCotizacionReducer}) => solicitudCotizacionReducer,
  );

  const useStyles = makeStyles((theme) => ({
    image: {
      display: 'inline-block',
      cursor: 'pointer',
      width: 100,
      margin: 20,
      marginBottom: 0,
    },
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

  const accion = 'crear';

  return (
    <Dialog
      open={true}
      onClose={handleOnClose}
      aria-labelledby='simple-modal-title'
      TransitionComponent={Transition}
      aria-describedby='simple-modal-description'
      className={classes.dialogBox}
      disableBackdropClick={true}
      maxWidth={'sm'}>
      <Scrollbar>
        {show ? (
          <Formik
            initialStatus={true}
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={{
              fecha_solicitud_cotizacion: new Date(
                Date.now(),
              ).toLocaleDateString('es-CL', {timeZone: 'UTC'}),
              ciudad_origen_id: '',
              ciudad_destino_id: '',
              numero_servicios_mes: '',
              servicio_id: '',
              tipo_servicio: '',
              tipo_servicio_otro: '',
              nombre_contacto: '',
              email: '',
              telefono_contacto: '',
              empresa: '',
              observaciones: '',
              estado_solicitud_cotizacion: 'SOL',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting, resetForm}) => {
              setSubmitting(true);
              dispatch(onCreateContacto(data, handleOnClose, setConsecutivo));
              setSubmitting(false);
            }}>
            {({values, initialValues, setFieldValue}) => (
              <SolicitudContactoForm
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
        ) : (
          <Box>
            <Box>
              <img
                className={classes.image}
                src='/assets/images/LogoSecSel.png'
                alt='Logo Sec Sel'
              />
            </Box>
            <Box
              component='h2'
              margin='auto'
              padding='20px'
              textAlign='justify'>
              {'Nuestro equipo comercial lo contactará para detallar las condiciones del servicio solicitado. En caso de requerir información adicional, puede comunicarse con nosotros y hacer referencia al número de solicitud de cotización ' +
                consecutivo +
                '.'}
            </Box>
          </Box>
        )}
      </Scrollbar>
    </Dialog>
  );
};

export default SolicitudCotizacionCreator;
