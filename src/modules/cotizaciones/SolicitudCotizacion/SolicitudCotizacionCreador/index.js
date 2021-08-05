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
import {onActualizarConsecutivo} from '../../../../redux/actions/SolicitudCotizacionAction';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';

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
  } = props;

  const user = useAuthUser();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onActualizarConsecutivo());
  }, [dispatch]);

  const consecutivo = useSelector(
    ({solicitudCotizacionReducer}) => solicitudCotizacionReducer.consecutivo,
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
        maxWidth={'sm'}>
        <Scrollbar>
          <Formik
            initialStatus={true}
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={{
              id: selectedRow ? selectedRow.id : '',
              fecha_solicitud_cotizacion: selectedRow
                ? selectedRow.fecha_solicitud_cotizacion
                : new Date(Date.now()).toLocaleDateString('es-CL'),
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
              observaciones: selectedRow
                ? selectedRow.observaciones
                  ? selectedRow.observaciones
                  : ''
                : '',
              numero_solicitud: selectedRow
                ? selectedRow.numero_solicitud
                : consecutivo,
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
              if (accion === 'crear') {
                dispatch(onCreate(data, handleOnClose, updateColeccion));
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
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default SolicitudCotizacionCreator;
