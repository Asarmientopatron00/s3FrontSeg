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
  onActualizarConsecutivo,
  onGetInformacionSolicitudContacto,
} from '../../../redux/actions/SolicitudCotizacionAction';
import {Box} from '@material-ui/core';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  ciudad_origen_id: yup.string().required('Requerido'),
  ciudad_destino_id: yup.string().required('Requerido'),
  servicio_id: yup.string().required('Requerido'),
  nombre_contacto: yup.string().required('Requerido'),
  email: yup.string().required('Requerido'),
  telefono_contacto: yup.string().required('Requerido'),
  empresa: yup.string().required('Requerido'),
});

const SolicitudCotizacionCreator = (props) => {
  const [show, setShow] = useState(true);
  const titulo = 'Solicitar Cotización';

  const handleOnClose = () => {
    setShow(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onActualizarConsecutivo());
    dispatch(onGetInformacionSolicitudContacto());
  }, [dispatch]);

  const consecutivo = useSelector(
    ({solicitudCotizacionReducer}) => solicitudCotizacionReducer.consecutivo,
  );
  const {ciudades, servicios} = useSelector(
    ({solicitudCotizacionReducer}) => solicitudCotizacionReducer,
  );

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

  const accion = 'crear';

  return show ? (
    <Dialog
      open={show}
      onClose={handleOnClose}
      aria-labelledby='simple-modal-title'
      TransitionComponent={Transition}
      aria-describedby='simple-modal-description'
      className={classes.dialogBox}
      disableBackdropClick={true}
      maxWidth={'sm'}>
      <Scrollbar>
        <Formik
          initialStatus={true}
          enableReinitialize={true}
          validateOnBlur={false}
          initialValues={{
            fecha_solicitud_cotizacion: new Date(Date.now()).toLocaleDateString(
              'es-CL',
            ),
            ciudad_origen_id: '',
            ciudad_destino_id: '',
            servicio_id: '',
            nombre_contacto: '',
            email: '',
            telefono_contacto: '',
            empresa: '',
            observaciones: '',
            numero_solicitud: consecutivo,
            estado_solicitud_cotizacion: 'SOL',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            dispatch(onCreateContacto(data, handleOnClose));
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
            />
          )}
        </Formik>
      </Scrollbar>
    </Dialog>
  ) : (
    <Box component='h6' margin='auto' width='50%'>
      {'Nuestro equipo comercial lo contactará para detallar las condiciones del servicio solicitado. En caso de requerir información adicional, puede comunicarse con nosotros y hacer referencia al número de solicitud de cotización ' +
        consecutivo +
        '.'}
    </Box>
  );
};

export default SolicitudCotizacionCreator;
