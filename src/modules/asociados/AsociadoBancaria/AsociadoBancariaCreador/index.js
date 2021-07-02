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
} from '../../../../redux/actions/AsociadoBancariaAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import AsociadoBancariaForm from './AsociadoBancariaForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {onGetColeccionLigera as tipoDocumentoColeccionLigera} from '../../../../redux/actions/TipoDocumentoAction';
import {onGetColeccionLigera as ciudadColeccionLigera} from '../../../../redux/actions/CiudadAction';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
  VALIDACION_REGEX_NUMEROS,
} from '../../../../shared/constants/Constantes';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import {TIPOS_CONTACTOS} from '../../../../shared/constants/ListasValores';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const AsociadoCotnactoLegalCreator = (props) => {
  const {
    asociadoBancaria,
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
    banco: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    numero_cuenta: yup
      .string()
      .matches(VALIDACION_REGEX_NUMEROS, mensajeValidacion('numero'))
      .required('Requerido'),
    tipo_cuenta: yup.string().required('Requerido'),
    sucursal: yup.string().nullable().max(128, mensajeValidacion('max', 128)),
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
  });

  const classes = useStyles(props);

  const [showForm, setShowForm] = useState(false);
  let selectedRow = useRef();
  selectedRow = useSelector(
    ({asociadoBancariaReducer}) => asociadoBancariaReducer.selectedRow,
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
      dispatch(onShow(asociadoBancaria));
    }
  }, [accion, dispatch, asociadoBancaria]);

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
              banco: selectedRow
                ? selectedRow.banco
                  ? selectedRow.banco
                  : ''
                : '',
              numero_cuenta: selectedRow
                ? selectedRow.numero_cuenta
                  ? selectedRow.numero_cuenta
                  : ''
                : '',
              tipo_cuenta: selectedRow
                ? selectedRow.tipo_cuenta
                  ? selectedRow.tipo_cuenta
                  : 'C'
                : '',
              sucursal: selectedRow
                ? selectedRow.sucursal
                  ? selectedRow.sucursal
                  : ''
                : '',
              telefono: selectedRow
                ? selectedRow.telefono
                  ? selectedRow.telefono
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
              <AsociadoBancariaForm
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
