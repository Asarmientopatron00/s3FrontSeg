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
} from '../../../../redux/actions/AsociadoContactoLegalAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import AsociadoContactoLegalForm from './AsociadoContactoLegalForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {onGetColeccionLigera as tipoDocumentoColeccionLigera} from '../../../../redux/actions/TipoDocumentoAction';
import {onGetColeccionLigera as ciudadColeccionLigera} from '../../../../redux/actions/CiudadAction';
import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
  VALIDACION_REGEX_DOCUMENTOS,
} from '../../../../shared/constants/Constantes';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const AsociadoCotnactoLegalCreator = (props) => {
  const {
    asociadoContactoLegal,
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
      .number(mensajeValidacion('numero'))
      .required('Requerido'),
    numero_documento: yup
      .string()
      .matches(VALIDACION_REGEX_DOCUMENTOS, mensajeValidacion('documento'))
      .required('Requerido')
      .max(
        LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
        mensajeValidacion('max', LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA),
      ),
    ciudad_expedicion_id: yup
      .number(mensajeValidacion('numero'))
      .required('Requerido'),
    nombre: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    direccion: yup.string().nullable().max(128, mensajeValidacion('max', 128)),
    ciudad_id: yup.number(mensajeValidacion('numero')).nullable(),
    telefono: yup
      .string()
      .nullable()
      .matches(VALIDACION_REGEX_TELEFONOS, mensajeValidacion('telefono'))
      .max(
        LONGITUD_MAXIMA_TELEFONOS,
        mensajeValidacion('max', LONGITUD_MAXIMA_TELEFONOS),
      )
      .min(
        LONGITUD_MINIMA_TELEFONOS,
        mensajeValidacion('min', LONGITUD_MINIMA_TELEFONOS),
      ),
    porcentaje_participacion: yup
      .number(mensajeValidacion('numero'))
      .nullable(),
  });

  const classes = useStyles(props);

  const [showForm, setShowForm] = useState(false);
  let selectedRow = useRef();
  selectedRow = useSelector(
    ({asociadoContactoLegalReducer}) =>
      asociadoContactoLegalReducer.selectedRow,
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
      dispatch(onShow(asociadoContactoLegal));
    }
  }, [accion, dispatch, asociadoContactoLegal]);

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
              tipo: selectedRow ? selectedRow.tipo : 'S',
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
              ciudad_expedicion_id: selectedRow
                ? selectedRow.ciudad_expedicion_id
                  ? selectedRow.ciudad_expedicion_id
                  : ''
                : '',
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
              ciudad_id: selectedRow
                ? selectedRow.ciudad_id
                  ? selectedRow.ciudad_id
                  : ''
                : '',
              telefono: selectedRow
                ? selectedRow.telefono
                  ? selectedRow.telefono
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
              <AsociadoContactoLegalForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                accion={accion}
                initialValues={initialValues}
                tiposDocumentos={tiposDocumentos}
                ciudades={ciudades}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default AsociadoCotnactoLegalCreator;
