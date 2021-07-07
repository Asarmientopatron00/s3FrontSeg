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
} from '../../../../redux/actions/AsociadoContactoAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import AsociadoContactoForm from './AsociadoContactoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {onGetColeccionLigera as tipoDocumentoColeccionLigera} from '../../../../redux/actions/TipoDocumentoAction';
import {onGetColeccionLigera as ciudadColeccionLigera} from '../../../../redux/actions/CiudadAction';
import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
  VALIDACION_REGEX_DOCUMENTOS,
} from '../../../../shared/constants/Constantes';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import {TIPOS_CONTACTOS} from './../../../../shared/constants/ListasValores';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const AsociadoCotnactoLegalCreator = (props) => {
  const {
    asociadoContacto,
    handleOnClose,
    accion,
    updateColeccion,
    asociado_id,
  } = props;

  const dispatch = useDispatch();

  const tiposDocumentos = useSelector(
    ({tipoDocumentoReducer}) => tipoDocumentoReducer.ligera,
  );
  const ciudades = useSelector(({ciudadReducer}) => ciudadReducer.ligera);

  useEffect(() => {
    dispatch(tipoDocumentoColeccionLigera());
    dispatch(ciudadColeccionLigera());
  }, [dispatch]);

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
    tipo: yup.string().required('Requerido'),
    tipo_documento_id: yup
      .number()
      .typeError(mensajeValidacion('numero'))
      .required('Requerido'),
    numero_documento: yup
      .string()
      .matches(VALIDACION_REGEX_DOCUMENTOS, mensajeValidacion('documento'))
      .required('Requerido')
      .max(
        LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
        mensajeValidacion('max', LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL),
      ),
    nombre: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    cargo: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    email: yup
      .string()
      .required('Requerido')
      .email('Debe ser tipo e-mail')
      .max(128, mensajeValidacion('max', 128)),
    telefono: yup
      .string()
      // .when('celular', {
      //   is: '',
      //   then: yup
      //     .string()
      //     .required('Requerido'),
      //   otherwise: yup
      //     .string()
      //     .nullable(),
      // })
      .matches(VALIDACION_REGEX_TELEFONOS, mensajeValidacion('telefono'))
      .max(
        LONGITUD_MAXIMA_TELEFONOS,
        mensajeValidacion('max', LONGITUD_MAXIMA_TELEFONOS),
      )
      .min(
        LONGITUD_MINIMA_TELEFONOS,
        mensajeValidacion('min', LONGITUD_MINIMA_TELEFONOS),
      ),
    celular: yup
      .string()
      // .when('telefono', {
      //   is: '',
      //   then: yup
      //     .string()
      //     .required('Requerido'),
      //   otherwise: yup
      //     .string()
      //     .nullable(),
      // })
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
    ({asociadoContactoReducer}) => asociadoContactoReducer.selectedRow,
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
      dispatch(onShow(asociadoContacto));
    }
  }, [accion, dispatch, asociadoContacto]);

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
              asociado_id: asociado_id,
              id: selectedRow ? selectedRow.id : '',
              tipo: selectedRow ? selectedRow.tipo : '',
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
              nombre: selectedRow
                ? selectedRow.nombre
                  ? selectedRow.nombre
                  : ''
                : '',
              cargo: selectedRow
                ? selectedRow.cargo
                  ? selectedRow.cargo
                  : ''
                : '',
              email: selectedRow
                ? selectedRow.email
                  ? selectedRow.email
                  : ''
                : '',
              telefono: selectedRow
                ? selectedRow.telefono
                  ? selectedRow.telefono
                  : ''
                : '',
              celular: selectedRow
                ? selectedRow.celular
                  ? selectedRow.celular
                  : ''
                : '',
              porcentaje_participacion: selectedRow
                ? selectedRow.porcentaje_participacion
                  ? selectedRow.porcentaje_participacion
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
              <AsociadoContactoForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                accion={accion}
                initialValues={initialValues}
                tiposDocumentos={tiposDocumentos}
                ciudades={ciudades}
                tiposContactos={TIPOS_CONTACTOS}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default AsociadoCotnactoLegalCreator;
