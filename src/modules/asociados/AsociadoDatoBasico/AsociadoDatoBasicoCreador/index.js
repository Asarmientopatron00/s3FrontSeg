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
} from '../../../../redux/actions/AsociadoAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import AsociadoDatoBasicoForm from './AsociadoDatoBasicoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {onGetColeccionLigera as tipoDocumentoColeccionLigera} from '../../../../redux/actions/TipoDocumentoAction';
import {onGetColeccionLigera as departamentosColeccionLigera} from '../../../../redux/actions/DepartamentoAction';
import {onGetColeccionLigera as ciudadColeccionLigera} from '../../../../redux/actions/CiudadAction';
import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
  VALIDACION_REGEX_DOCUMENTOS,
} from '../../../../shared/constants/Constantes';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const AsociadoDatoBasicoCreator = (props) => {
  const {asociadoDatoBasico, handleOnClose, accion, updateColeccion} = props;

  const dispatch = useDispatch();

  const tiposDocumentos = useSelector(
    ({tipoDocumentoReducer}) => tipoDocumentoReducer.ligera,
  );
  const departamentos = useSelector(
    ({departamentoReducer}) => departamentoReducer.ligera,
  );
  const ciudades = useSelector(({ciudadReducer}) => ciudadReducer.ligera);

  useEffect(() => {
    dispatch(tipoDocumentoColeccionLigera());
    dispatch(departamentosColeccionLigera());
  }, [dispatch]);

  const onChangeDepartamento = (id) => {
    dispatch(ciudadColeccionLigera(id));
  };

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
    tipo_persona: yup.string().required('Requerido'),
    tipo_documento_id: yup
      .number()
      .typeError(mensajeValidacion('numero'))
      .required('Requerido'),
    numero_documento: yup
      .string()
      .matches(VALIDACION_REGEX_DOCUMENTOS, mensajeValidacion('documento'))
      .required('Requerido')
      .when('tipo_persona', {
        is: 'N',
        then: yup
          .string()
          .max(
            LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
            mensajeValidacion(
              'max',
              LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
            ),
          ),
      })
      .when('tipo_persona', {
        is: 'J',
        then: yup
          .string()
          .max(
            LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
            mensajeValidacion(
              'max',
              LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
            ),
          ),
      }),
    nombre: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    segundo_nombre: yup
      .string()
      .nullable()
      .max(128, mensajeValidacion('max', 128)),
    primer_apellido: yup
      .string()
      .max(128, mensajeValidacion('max', 128))
      .nullable()
      .when('tipo_persona', {
        is: 'N',
        then: yup.string().required('Requerido'),
      }),
    segundo_apellido: yup
      .string()
      .nullable()
      .max(128, mensajeValidacion('max', 128)),
    identificacion_usuario: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    nombre_usuario: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    cargo_usuario: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    celular_usuario: yup
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
    email_usuario: yup
      .string()
      .required('Requerido')
      .email('Debe ser tipo e-mail')
      .max(128, mensajeValidacion('max', 128)),
  });
  if (accion === 'crear') {
    validationSchema = yup.object({
      tipo_persona: yup.string().required('Requerido'),
      tipo_documento_id: yup
        .number()
        .typeError(mensajeValidacion('numero'))
        .required('Requerido'),
      numero_documento: yup
        .string()
        .matches(VALIDACION_REGEX_DOCUMENTOS, mensajeValidacion('documento'))
        .required('Requerido')
        .when('tipo_persona', {
          is: 'N',
          then: yup
            .string()
            .max(
              LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
              mensajeValidacion(
                'max',
                LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
              ),
            ),
        })
        .when('tipo_persona', {
          is: 'J',
          then: yup
            .string()
            .max(
              LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
              mensajeValidacion(
                'max',
                LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
              ),
            ),
        }),
      nombre: yup
        .string()
        .required('Requerido')
        .max(128, mensajeValidacion('max', 128)),
      segundo_nombre: yup
        .string()
        .nullable()
        .max(128, mensajeValidacion('max', 128)),
      primer_apellido: yup
        .string()
        .max(128, mensajeValidacion('max', 128))
        .nullable()
        .when('tipo_persona', {
          is: 'N',
          then: yup.string().required('Requerido'),
        }),
      segundo_apellido: yup
        .string()
        .nullable()
        .max(128, mensajeValidacion('max', 128)),
      identificacion_usuario: yup
        .string()
        .required('Requerido')
        .max(128, mensajeValidacion('max', 128)),
      nombre_usuario: yup
        .string()
        .required('Requerido')
        .max(128, mensajeValidacion('max', 128)),
      cargo_usuario: yup
        .string()
        .required('Requerido')
        .max(128, mensajeValidacion('max', 128)),
      celular_usuario: yup
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
      email_usuario: yup
        .string()
        .required('Requerido')
        .email('Debe ser tipo e-mail')
        .max(128, mensajeValidacion('max', 128)),
      clave: yup.string().required('Requerido'),
    });
  }
  const classes = useStyles(props);

  const [showForm, setShowForm] = useState(false);
  let selectedRow = useRef();
  selectedRow = useSelector(({asociadoReducer}) => asociadoReducer.selectedRow);

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
      dispatch(onShow(asociadoDatoBasico));
    }
  }, [accion, dispatch, asociadoDatoBasico]);

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
              tipo_persona: selectedRow ? selectedRow.tipo_persona : 'J',
              tipo_documento_id: selectedRow
                ? selectedRow.tipo_documento_id
                : '',
              numero_documento: selectedRow ? selectedRow.numero_documento : '',
              digito_verificacion: selectedRow
                ? selectedRow.digito_verificacion
                : 0,
              nombre: selectedRow ? selectedRow.nombre : '',
              segundo_nombre: selectedRow ? selectedRow.segundo_nombre : '',
              primer_apellido: selectedRow ? selectedRow.primer_apellido : '',
              segundo_apellido: selectedRow ? selectedRow.segundo_apellido : '',
              identificacion_usuario: selectedRow
                ? selectedRow.identificacion_usuario
                : '',
              nombre_usuario: selectedRow ? selectedRow.nombre_usuario : '',
              cargo_usuario: selectedRow ? selectedRow.cargo_usuario : '',
              celular_usuario: selectedRow ? selectedRow.celular_usuario : '',
              email_usuario: selectedRow ? selectedRow.email_usuario : '',
              clave: selectedRow ? selectedRow.clave : '',
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
              <AsociadoDatoBasicoForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                accion={accion}
                initialValues={initialValues}
                tiposDocumentos={tiposDocumentos}
                departamentos={departamentos}
                ciudades={ciudades}
                onChangeDepartamento={onChangeDepartamento}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default AsociadoDatoBasicoCreator;
