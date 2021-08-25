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
} from '../../../../redux/actions/RutaAutorizacionAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import RutaAutorizacionForm from './RutaAutorizacionForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const RutaAutorizacionCreator = (props) => {
  const {
    rutaAutorizacion,
    handleOnClose,
    accion,
    updateColeccion,
    ciudades,
    departamentos,
    TIPOS_RUTAS,
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
    tipo_ruta: yup.string().required('Requerido'),
    nombre_ruta: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    departamento_id: yup.string().required('Requerido'),
    ciudad_id: yup.string().required('Requerido'),
  });

  const classes = useStyles(props);

  const [showForm, setShowForm] = useState(false);
  let selectedRow = useRef();
  selectedRow = useSelector(
    ({rutaAutorizacionReducer}) => rutaAutorizacionReducer.selectedRow,
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
      dispatch(onShow(rutaAutorizacion));
    }
  }, [accion, dispatch, rutaAutorizacion]);

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
              departamento_id: selectedRow ? selectedRow.departamento_id : '',
              ciudad_id: selectedRow ? selectedRow.ciudad_id : '',
              tipo_ruta: selectedRow
                ? selectedRow.tipo_ruta
                  ? selectedRow.tipo_ruta
                  : ''
                : '',
              nombre_ruta: selectedRow
                ? selectedRow.nombre_ruta
                  ? selectedRow.nombre_ruta
                  : ''
                : '',
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
              <RutaAutorizacionForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                accion={accion}
                initialValues={initialValues}
                ciudades={ciudades}
                departamentos={departamentos}
                TIPOS_RUTAS={TIPOS_RUTAS}
                encabezado={encabezado}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default RutaAutorizacionCreator;
