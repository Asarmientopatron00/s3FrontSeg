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
} from '../../../../redux/actions/TerceroServicioAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import TerceroServicioForm from './TerceroServicioForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {onGetColeccionLigera as tipoDocumentoColeccionLigera} from '../../../../redux/actions/TipoDocumentoAction';
import {onGetColeccionLigera as departamentosColeccionLigera} from '../../../../redux/actions/DepartamentoAction';
import {onGetColeccionLigera as ciudadColeccionLigera} from '../../../../redux/actions/CiudadAction';
import {onGetColeccionDatosBasicos as onGetAsociados} from 'redux/actions/AsociadoAction';
import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
} from './../../../../shared/constants/Constantes';
import mensajeValidacion from './../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  tipo: yup.string().required('Requerido').max(2, mensajeValidacion('max', 2)),
  tipo_persona: yup.string().required('Requerido'),
  tipo_documento_id: yup
    .number()
    .typeError(mensajeValidacion('numero'))
    .required('Requerido'),
  numero_documento: yup
    .string()
    // .matches(VALIDACION_REGEX_DOCUMENTOS, mensajeValidacion('documento'))
    .required('Requerido')
    .when('tipo_persona', {
      is: 'N',
      then: yup
        .string()
        .max(
          LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
          mensajeValidacion('max', LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL),
        ),
    })
    .when('tipo_persona', {
      is: 'J',
      then: yup
        .string()
        .max(
          LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
          mensajeValidacion('max', LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA),
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
  departamento_id: yup
    .number()
    .typeError(mensajeValidacion('numero'))
    .required('Requerido'),
  ciudad_id: yup
    .number()
    .typeError(mensajeValidacion('numero'))
    .required('Requerido'),
  direccion: yup
    .string()
    .required('Requerido')
    .max(128, mensajeValidacion('max', 128)),
  telefono: yup
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
  celular: yup
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
  email: yup
    .string()
    .nullable()
    .email('Debe ser tipo e-mail')
    .max(128, mensajeValidacion('max', 128)),
  pagina_web: yup.string().nullable().max(128, mensajeValidacion('max', 128)),
  nombre_contacto: yup
    .string()
    .required('Requerido')
    .max(128, mensajeValidacion('max', 128)),
  cargo_contacto: yup
    .string()
    .nullable()
    .max(128, mensajeValidacion('max', 128)),
  email_contacto: yup
    .string()
    .nullable()
    .email('Debe ser tipo e-mail')
    .max(128, mensajeValidacion('max', 128)),
  telefono_contacto: yup
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
  celular_contacto: yup
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
});

const TerceroServicioCreator = (props) => {
  const {terceroServicio, handleOnClose, accion, updateColeccion, titulo} =
    props;

  const dispatch = useDispatch();

  const tiposDocumentos = useSelector(
    ({tipoDocumentoReducer}) => tipoDocumentoReducer.ligera,
  );
  const departamentos = useSelector(
    ({departamentoReducer}) => departamentoReducer.ligera,
  );
  const ciudades = useSelector(({ciudadReducer}) => ciudadReducer.ligera);
  const asociados = useSelector(({asociadoReducer}) => asociadoReducer.rows);

  useEffect(() => {
    dispatch(tipoDocumentoColeccionLigera());
    dispatch(departamentosColeccionLigera());
    dispatch(onGetAsociados(1, 500));
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

  const classes = useStyles(props);

  const [showForm, setShowForm] = useState(false);
  let selectedRow = useRef();
  selectedRow = useSelector(
    ({terceroServicioReducer}) => terceroServicioReducer.selectedRow,
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
      dispatch(onShow(terceroServicio));
    }
  }, [accion, dispatch, terceroServicio]);

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
              tipo_persona: selectedRow
                ? selectedRow.tipo_persona
                  ? selectedRow.tipo_persona
                  : ''
                : '',
              tipo: selectedRow ? selectedRow.tipo : '',
              departamento_id: selectedRow
                ? selectedRow.departamento_id
                  ? selectedRow.departamento_id
                  : ''
                : '',
              ciudad_id: selectedRow
                ? selectedRow.ciudad_id
                  ? selectedRow.ciudad_id
                  : ''
                : '',
              direccion: selectedRow ? selectedRow.direccion : '',
              telefono: selectedRow ? selectedRow.telefono : '',
              celular: selectedRow ? selectedRow.celular : '',
              pagina_web: selectedRow ? selectedRow.pagina_web : '',
              email: selectedRow ? selectedRow.email : '',
              nombre_contacto: selectedRow ? selectedRow.nombre_contacto : '',
              cargo_contacto: selectedRow ? selectedRow.cargo_contacto : '',
              email_contacto: selectedRow ? selectedRow.email_contacto : '',
              telefono_contacto: selectedRow
                ? selectedRow.telefono_contacto
                : '',
              celular_contacto: selectedRow ? selectedRow.celular_contacto : '',
              estado: selectedRow
                ? selectedRow.estado === 1
                  ? '1'
                  : '0'
                : '1',
              asociado: '',
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
              <TerceroServicioForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                tiposDocumentos={tiposDocumentos}
                departamentos={departamentos}
                ciudades={ciudades}
                asociados={asociados}
                onChangeDepartamento={onChangeDepartamento}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default TerceroServicioCreator;
