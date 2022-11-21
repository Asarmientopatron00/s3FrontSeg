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
} from '../../../../redux/actions/NotificacionContactoAction';
import {onGetColeccion as onGetContactos} from 'redux/actions/AsociadoContactoAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import NotificacionContactoForm from './NotificacionContactoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
} from '../../../../shared/constants/Constantes';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const AsociadoCotnactoLegalCreator = (props) => {
  const {
    notificacionContacto,
    handleOnClose,
    accion,
    updateColeccion,
    eventosNotificaciones,
    encabezado,
    acuerdo_id,
  } = props;

  const dispatch = useDispatch();

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

  let validationSchema = yup.object({
    evento_notificacion_id: yup.string().required('Requerido'),
    nombre: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    celular: yup
      .string()
      .matches(VALIDACION_REGEX_TELEFONOS, mensajeValidacion('telefono'))
      .required('Requerido')
      .max(
        LONGITUD_MAXIMA_TELEFONOS,
        mensajeValidacion('max', LONGITUD_MAXIMA_TELEFONOS),
      )
      .min(
        LONGITUD_MINIMA_TELEFONOS,
        mensajeValidacion('min', LONGITUD_MINIMA_TELEFONOS),
      ),
    telefono: yup
      .string()
      .matches(VALIDACION_REGEX_TELEFONOS, mensajeValidacion('telefono'))
      .max(
        LONGITUD_MAXIMA_TELEFONOS,
        mensajeValidacion('max', LONGITUD_MAXIMA_TELEFONOS),
      )
      .min(
        LONGITUD_MINIMA_TELEFONOS,
        mensajeValidacion('min', LONGITUD_MINIMA_TELEFONOS),
      ),
    email: yup
      .string()
      .required('Requerido')
      .email('Ingrese un email válido')
      .max(128, mensajeValidacion('max', 128)),
  });

  const classes = useStyles(props);

  const [showForm, setShowForm] = useState(false);
  let selectedRow = useRef();
  selectedRow = useSelector(
    ({notificacionContactoReducer}) => notificacionContactoReducer.selectedRow,
  );
  const contactos = useSelector(
    ({asociadoContactoReducer}) => asociadoContactoReducer.rows,
  );

  const initializeSelectedRow = () => {
    selectedRow = null;
  };
  useEffect(() => {
    initializeSelectedRow();
    if (encabezado?.id) {
      dispatch(onGetContactos(1, 500, 'nombre:asc', encabezado.id));
    }
  }, [encabezado.id]);

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
      dispatch(onShow(notificacionContacto));
    }
  }, [accion, dispatch, notificacionContacto]);

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
              asociado_id: selectedRow
                ? selectedRow.asociado_id
                : encabezado.id,
              acuerdo_id: selectedRow ? selectedRow.acuerdo_id : acuerdo_id,
              evento_notificacion_id: selectedRow
                ? selectedRow.evento_notificacion_id
                : '',
              nombre: selectedRow
                ? selectedRow.nombre
                  ? selectedRow.nombre
                  : ''
                : '',
              celular: selectedRow
                ? selectedRow.celular
                  ? selectedRow.celular
                  : ''
                : '',
              telefono: selectedRow
                ? selectedRow.telefono
                  ? selectedRow.telefono
                  : 'C'
                : '',
              email: selectedRow
                ? selectedRow.email
                  ? selectedRow.email
                  : ''
                : '',
              estado: selectedRow
                ? selectedRow.estado === 1
                  ? '1'
                  : '0'
                : '1',
              contacto: '',
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
              <NotificacionContactoForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                accion={accion}
                initialValues={initialValues}
                eventosNotificaciones={eventosNotificaciones}
                encabezado={encabezado}
                contactos={contactos}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default AsociadoCotnactoLegalCreator;
