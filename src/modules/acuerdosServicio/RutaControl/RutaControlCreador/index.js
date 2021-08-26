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
} from '../../../../redux/actions/RutaControlAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import RutaControlForm from './RutaControlForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
  VALIDACION_REGEX_DOCUMENTOS,
} from '../../../../shared/constants/Constantes';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const RutaControlCreator = (props) => {
  const {
    rutaControl,
    handleOnClose,
    accion,
    updateColeccion,
    ciudades,
    departamentos,
    TIPOS_PROCESOS,
    encabezado,
    acuerdo_id,
    tiposDocumentos,
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
    tipo_proceso: yup.string().required('Requerido'),
    nombre: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    departamento_id: yup.string().required('Requerido'),
    ciudad_id: yup.string().required('Requerido'),
    direccion: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    tipo_documento_id: yup.string().required('Requerido'),
    numero_documento: yup
      .string()
      .matches(VALIDACION_REGEX_DOCUMENTOS, mensajeValidacion('documento'))
      .max(
        LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
        mensajeValidacion('max', LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL),
      ),
    nombre_encargado: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    celular_encargado: yup
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

  const classes = useStyles(props);

  const [showForm, setShowForm] = useState(false);
  let selectedRow = useRef();
  selectedRow = useSelector(
    ({rutaControlReducer}) => rutaControlReducer.selectedRow,
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
      dispatch(onShow(rutaControl));
    }
  }, [accion, dispatch, rutaControl]);

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
        maxWidth={'lg'}>
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
              tipo_proceso: selectedRow ? selectedRow.tipo_proceso : '',
              departamento_id: selectedRow ? selectedRow.departamento_id : '',
              ciudad_id: selectedRow ? selectedRow.ciudad_id : '',
              nombre: selectedRow
                ? selectedRow.nombre
                  ? selectedRow.nombre
                  : ''
                : '',
              direccion: selectedRow
                ? selectedRow.direccion
                  ? selectedRow.direccion
                  : ''
                : '',
              tipo_documento_id: selectedRow
                ? selectedRow.tipo_documento_id
                  ? selectedRow.tipo_documento_id
                  : ''
                : '',
              numero_documento: selectedRow
                ? selectedRow.numero_documento
                  ? selectedRow.numero_documento
                  : ''
                : '',
              nombre_encargado: selectedRow
                ? selectedRow.nombre_encargado
                  ? selectedRow.nombre_encargado
                  : ''
                : '',
              celular_encargado: selectedRow
                ? selectedRow.celular_encargado
                  ? selectedRow.celular_encargado
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
              <RutaControlForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                accion={accion}
                initialValues={initialValues}
                ciudades={ciudades}
                departamentos={departamentos}
                TIPOS_PROCESOS={TIPOS_PROCESOS}
                tiposDocumentos={tiposDocumentos}
                encabezado={encabezado}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default RutaControlCreator;
