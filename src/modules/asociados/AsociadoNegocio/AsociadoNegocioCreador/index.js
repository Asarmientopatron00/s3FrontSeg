import React, {useEffect, useRef} from 'react';
// import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShow,
  onUpdate,
  onCreate,
  onGetColeccionLigeraCiudad,
  onGetColeccionLigeraCiudadOtra,
  onGetColeccionLigeraActividadesEconomicas,
  onGetClausulas,
} from '../../../../redux/actions/AsociadoAction';
// import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import AsociadoNegocioForm from './AsociadoNegocioForm';
// import {Fonts} from '../../../../shared/constants/AppEnums';
// import {makeStyles} from '@material-ui/core/styles/index';
import {onGetColeccionLigera as tipoDocumentoColeccionLigera} from '../../../../redux/actions/TipoDocumentoAction';
import {onGetColeccionLigera as departamentosColeccionLigera} from '../../../../redux/actions/DepartamentoAction';
import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
  VALIDACION_REGEX_DOCUMENTOS,
  VALIDACION_REGEX_NUMEROS,
} from '../../../../shared/constants/Constantes';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import {useParams} from 'react-router-dom';
import {history} from 'redux/store';
import GetUsuario from '../../../../shared/functions/GetUsuario';
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction='down' ref={ref} {...props} />;
// });

const AsociadoDatoBasicoCreator = (props) => {
  const {accion, id} = useParams();
  const handleOnClose = () => {
    history.goBack();
  };

  const usuario = GetUsuario();

  const dispatch = useDispatch();

  const tiposDocumentos = useSelector(
    ({tipoDocumentoReducer}) => tipoDocumentoReducer.ligera,
  );
  const departamentos = useSelector(
    ({departamentoReducer}) => departamentoReducer.ligera,
  );
  const ciudades = useSelector(({asociadoReducer}) => asociadoReducer.ciudades);
  const ciudadesOtra = useSelector(
    ({asociadoReducer}) => asociadoReducer.ciudades_otra,
  );
  const actividadesEconomicas = useSelector(
    ({asociadoReducer}) => asociadoReducer.actividades_economicas,
  );
  const clausulas = useSelector(
    ({asociadoReducer}) => asociadoReducer.clausulas,
  );

  useEffect(() => {
    dispatch(tipoDocumentoColeccionLigera());
    dispatch(departamentosColeccionLigera());
    dispatch(onGetColeccionLigeraActividadesEconomicas());
    dispatch(onGetClausulas());
  }, [dispatch]);

  const onChangeDepartamento = (id) => {
    dispatch(onGetColeccionLigeraCiudad(id));
  };
  const onChangeDepartamentoOtra = (id) => {
    dispatch(onGetColeccionLigeraCiudadOtra(id));
  };

  // const useStyles = makeStyles((theme) => ({
  //   dialogBox: {
  //     position: 'relative',
  //     '& .MuiDialog-paperWidthSm': {
  //       maxWidth: 600,
  //       width: '100%',
  //       // maxHeight:'fit-content'
  //     },
  //     '& .MuiTypography-h6': {
  //       fontWeight: Fonts.LIGHT,
  //     },
  //   },
  // }));

  let validationSchema = yup.object({
    tipo_persona: yup.string().required('Requerido'),
    entidad_publica: yup.string().required('Requerido'),
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
    departamento_otro_id: yup
      .number()
      .typeError(mensajeValidacion('numero'))
      .nullable(),
    ciudad_otra_id: yup
      .number()
      .typeError(mensajeValidacion('numero'))
      .nullable()
      .when('departamento_otro_id', {
        is: undefined,
        then: yup.number().nullable(),
        otherwise: yup.number().required('Requerido'),
      }),
    direccion_otra_sede: yup
      .string()
      .max(128, mensajeValidacion('max', 128))
      .when('departamento_otro_id', {
        is: undefined,
        then: yup.string().nullable(),
        otherwise: yup.string().required('Requerido'),
      }),
    telefono_otra_sede: yup
      .string()
      .nullable('')
      .matches(VALIDACION_REGEX_TELEFONOS, mensajeValidacion('telefono'))
      .max(
        LONGITUD_MAXIMA_TELEFONOS,
        mensajeValidacion('max', LONGITUD_MAXIMA_TELEFONOS),
      )
      .min(
        LONGITUD_MINIMA_TELEFONOS,
        mensajeValidacion('min', LONGITUD_MINIMA_TELEFONOS),
      ),
    celular_otra_sede: yup
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
    descripcion_actividad_economica: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    actividad_economica_id: yup
      .number()
      .typeError(mensajeValidacion('numero'))
      .required('Requerido'),
    capital_registrado: yup
      .number()
      .typeError(mensajeValidacion('numero'))
      .required('Requerido'),
    responsable_iva: yup.string().required('Requerido'),
    exento_impuesto_renta: yup.string().required('Requerido'),
    gran_contribuyente: yup.string().required('Requerido'),
    numero_resolucion_gran_c: yup
      .string()
      .max(128, mensajeValidacion('max', 128))
      .when('gran_contribuyente', {
        is: 'S',
        then: yup.string().required('Requerido'),
        otherwise: yup.string().nullable(),
      }),
    fecha_resolucion_gran_c: yup.date().when('gran_contribuyente', {
      is: 'S',
      then: yup.date().required('Requerido'),
      otherwise: yup.date().nullable(),
    }),
    autorretenedor: yup.string().required('Requerido'),
    resolucion_autorretenedor: yup
      .string()
      .max(128, mensajeValidacion('max', 128))
      .when('autorretenedor', {
        is: 'S',
        then: yup.string().required('Requerido'),
        otherwise: yup.string().nullable(),
      }),
    fecha_resolucion_autorretenedor: yup.date().when('autorretenedor', {
      is: 'S',
      then: yup.date().required('Requerido'),
      otherwise: yup.date().nullable(),
    }),
    origen_fondos: yup
      .string()
      .required('Requerido')
      .max(128, mensajeValidacion('max', 128)),
    certificado_oea: yup.string().required('Requerido'),
    certificado_basc: yup.string().required('Requerido'),
    certificado_iso_28001: yup.string().required('Requerido'),
    certificado_iso_9001: yup.string().required('Requerido'),
    certificado_c_tpat: yup.string().required('Requerido'),
    otro_certificado: yup
      .string()
      .nullable()
      .max(128, mensajeValidacion('max', 128)),
    tipo_documento_facturacion_id: yup
      .number()
      .typeError(mensajeValidacion('numero'))
      .nullable(),
    numero_documento_facturacion: yup
      .string()
      .nullable()
      .max(
        LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA,
        mensajeValidacion('max', LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_JURIDICA),
      ),
    dia_cierre_facturacion: yup
      .number()
      .typeError(mensajeValidacion('numero'))
      .required('Requerido')
      .max(31, 'No debe superar 31'),
    codigo_postal_facturacion: yup
      .string()
      .required('Requerido')
      .matches(VALIDACION_REGEX_NUMEROS, mensajeValidacion('numero'))
      .max(6, 'Debe ser de 6 dígitos')
      .min(6, 'Debe ser de 6 dígitos'),
    correo_envio_facturacion_electronica: yup
      .string()
      .required('Requerido')
      .email('Debe ser tipo e-mail')
      .max(128, mensajeValidacion('max', 128)),
    correo_recepcion_facturacion_electronica: yup
      .string()
      .required('Requerido')
      .email('Debe ser tipo e-mail')
      .max(128, mensajeValidacion('max', 128)),
    aceptar_condiciones_circular_070: yup.string().required('Requerido'),
    autorizacion_datos_personales: yup.string().required('Requerido'),
    autorizacion_clausula_confidencialidad: yup.string().required('Requerido'),
    firma_representante_legal: yup.string().required('Requerido'),
    informacion_verificada_asociado: yup.string().required('Requerido'),
    estado: yup.string().required('Requerido'),
    // zzzzz: yup
    // .number()
    // .typeError(mensajeValidacion('numero'))
    // .required('requerido'),
  });
  // const classes = useStyles(props);

  // const [showForm, setShowForm] = useState(false);
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
  if (accion !== 'editar' && accion !== 'ver' && accion !== 'crear') {
    history.goBack();
  }
  useEffect(() => {
    if ((accion === 'editar') | (accion === 'ver')) {
      dispatch(onShow(id));
    }
  }, [accion, dispatch, id]);

  return (
    // <Dialog
    //   open={showForm}
    //   onClose={handleOnClose}
    //   aria-labelledby='simple-modal-title'
    //   TransitionComponent={Transition}
    //   aria-describedby='simple-modal-description'
    //   className={classes.dialogBox}
    //   disableBackdropClick={true}
    //   maxWidth={'md'}>
    <Scrollbar>
      <Formik
        initialStatus={true}
        enableReinitialize={true}
        validateOnBlur={false}
        initialValues={{
          id: selectedRow ? (selectedRow.id ? selectedRow.id : '') : '',
          tipo_persona: selectedRow
            ? selectedRow.tipo_persona
              ? selectedRow.tipo_persona
              : ''
            : 'J',
          entidad_publica: selectedRow
            ? selectedRow.entidad_publica
              ? selectedRow.entidad_publica
              : 'N'
            : 'N',
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
          digito_verificacion: selectedRow
            ? selectedRow.digito_verificacion
              ? selectedRow.digito_verificacion
              : ''
            : 0,
          nombre: selectedRow
            ? selectedRow.nombre
              ? selectedRow.nombre
              : ''
            : '',
          segundo_nombre: selectedRow
            ? selectedRow.segundo_nombre
              ? selectedRow.segundo_nombre
              : ''
            : '',
          primer_apellido: selectedRow
            ? selectedRow.primer_apellido
              ? selectedRow.primer_apellido
              : ''
            : '',
          segundo_apellido: selectedRow
            ? selectedRow.segundo_apellido
              ? selectedRow.segundo_apellido
              : ''
            : '',
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
          direccion: selectedRow
            ? selectedRow.direccion
              ? selectedRow.direccion
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
          email: selectedRow
            ? selectedRow.email
              ? selectedRow.email
              : ''
            : '',
          pagina_web: selectedRow
            ? selectedRow.pagina_web
              ? selectedRow.pagina_web
              : ''
            : '',
          departamento_otro_id: selectedRow
            ? selectedRow.departamento_otro_id
              ? selectedRow.departamento_otro_id
              : ''
            : '',
          ciudad_otra_id: selectedRow
            ? selectedRow.ciudad_otra_id
              ? selectedRow.ciudad_otra_id
              : ''
            : '',
          direccion_otra_sede: selectedRow
            ? selectedRow.direccion_otra_sede
              ? selectedRow.direccion_otra_sede
              : ''
            : '',
          telefono_otra_sede: selectedRow
            ? selectedRow.telefono_otra_sede
              ? selectedRow.telefono_otra_sede
              : ''
            : '',
          celular_otra_sede: selectedRow
            ? selectedRow.celular_otra_sede
              ? selectedRow.celular_otra_sede
              : ''
            : '',
          descripcion_actividad_economica: selectedRow
            ? selectedRow.descripcion_actividad_economica
              ? selectedRow.descripcion_actividad_economica
              : ''
            : '',
          actividad_economica_id: selectedRow
            ? selectedRow.actividad_economica_id
              ? selectedRow.actividad_economica_id
              : ''
            : '',
          capital_registrado: selectedRow
            ? selectedRow.capital_registrado
              ? selectedRow.capital_registrado
              : ''
            : '',
          responsable_iva: selectedRow
            ? selectedRow.responsable_iva
              ? selectedRow.responsable_iva
              : 'N'
            : 'N',
          exento_impuesto_renta: selectedRow
            ? selectedRow.exento_impuesto_renta
              ? selectedRow.exento_impuesto_renta
              : 'N'
            : 'N',
          gran_contribuyente: selectedRow
            ? selectedRow.gran_contribuyente
              ? selectedRow.gran_contribuyente
              : 'N'
            : 'N',
          numero_resolucion_gran_c: selectedRow
            ? selectedRow.numero_resolucion_gran_c
              ? selectedRow.numero_resolucion_gran_c
              : ''
            : '',
          fecha_resolucion_gran_c: selectedRow
            ? selectedRow.fecha_resolucion_gran_c
              ? selectedRow.fecha_resolucion_gran_c
              : ''
            : '',
          autorretenedor: selectedRow
            ? selectedRow.autorretenedor
              ? selectedRow.autorretenedor
              : 'N'
            : 'N',
          resolucion_autorretenedor: selectedRow
            ? selectedRow.resolucion_autorretenedor
              ? selectedRow.resolucion_autorretenedor
              : ''
            : '',
          fecha_resolucion_autorretenedor: selectedRow
            ? selectedRow.fecha_resolucion_autorretenedor
              ? selectedRow.fecha_resolucion_autorretenedor
              : ''
            : '',
          origen_fondos: selectedRow
            ? selectedRow.origen_fondos
              ? selectedRow.origen_fondos
              : ''
            : '',
          certificado_c_tpat: selectedRow
            ? selectedRow.certificado_c_tpat
              ? selectedRow.certificado_c_tpat
              : 'N'
            : 'N',
          certificado_basc: selectedRow
            ? selectedRow.certificado_basc
              ? selectedRow.certificado_basc
              : 'N'
            : 'N',
          certificado_iso_28001: selectedRow
            ? selectedRow.certificado_iso_28001
              ? selectedRow.certificado_iso_28001
              : 'N'
            : 'N',
          certificado_iso_9001: selectedRow
            ? selectedRow.certificado_iso_9001
              ? selectedRow.certificado_iso_9001
              : 'N'
            : 'N',
          certificado_oea: selectedRow
            ? selectedRow.certificado_oea
              ? selectedRow.certificado_oea
              : 'N'
            : 'N',
          otro_certificado: selectedRow
            ? selectedRow.otro_certificado
              ? selectedRow.otro_certificado
              : ''
            : '',
          tipo_documento_facturacion_id: selectedRow
            ? selectedRow.tipo_documento_facturacion_id
              ? selectedRow.tipo_documento_facturacion_id
              : ''
            : '',
          tipo_documento_facturacion: selectedRow
            ? selectedRow.tipo_documento_facturacion_id
              ? selectedRow.tipo_documento_facturacion_id
              : ''
            : '',
          numero_documento_facturacion: selectedRow
            ? selectedRow.numero_documento_facturacion
              ? selectedRow.numero_documento_facturacion
              : ''
            : '',
          dia_cierre_facturacion: selectedRow
            ? selectedRow.dia_cierre_facturacion
              ? selectedRow.dia_cierre_facturacion
              : ''
            : '',
          codigo_postal_facturacion: selectedRow
            ? selectedRow.codigo_postal_facturacion
              ? selectedRow.codigo_postal_facturacion
              : ''
            : '',
          correo_envio_facturacion_electronica: selectedRow
            ? selectedRow.correo_envio_facturacion_electronica
              ? selectedRow.correo_envio_facturacion_electronica
              : ''
            : '',
          correo_recepcion_facturacion_electronica: selectedRow
            ? selectedRow.correo_recepcion_facturacion_electronica
              ? selectedRow.correo_recepcion_facturacion_electronica
              : ''
            : '',
          circular070: clausulas ? clausulas['TEXTO_CIRCULAR_070'] : ' ',
          aceptar_condiciones_circular_070: selectedRow
            ? selectedRow.aceptar_condiciones_circular_070
              ? selectedRow.aceptar_condiciones_circular_070
              : 'N'
            : 'N',
          datos_personales: clausulas
            ? clausulas['TEXTO_DATOS_PERSONALES']
            : ' ',
          autorizacion_datos_personales: selectedRow
            ? selectedRow.autorizacion_datos_personales
              ? selectedRow.autorizacion_datos_personales
              : 'N'
            : 'N',
          clausula_confidencialidad: clausulas
            ? clausulas['TEXTO_CLAUSULA_CONFIDENCIALIDAD']
            : ' ',
          autorizacion_clausula_confidencialidad: selectedRow
            ? selectedRow.autorizacion_clausula_confidencialidad
              ? selectedRow.autorizacion_clausula_confidencialidad
              : 'N'
            : 'N',
          firma_representante_legal: selectedRow
            ? selectedRow.firma_representante_legal
              ? selectedRow.firma_representante_legal
              : 'N'
            : 'N',
          informacion_verificada_asociado: selectedRow
            ? selectedRow.informacion_verificada_asociado
              ? selectedRow.informacion_verificada_asociado
              : 'N'
            : 'N',
          estado: selectedRow ? (selectedRow.estado === 1 ? '1' : '0') : '1',
          usuario_creacion_nombre: selectedRow
            ? selectedRow.usuario_creacion_nombre
              ? selectedRow.usuario_creacion_nombre
              : ''
            : '',
          usuario_modificacion_nombre: selectedRow
            ? selectedRow.usuario_modificacion_nombre
              ? selectedRow.usuario_modificacion_nombre
              : ''
            : '',
          fecha_creacion: selectedRow
            ? selectedRow.fecha_creacion
              ? selectedRow.fecha_creacion
              : ''
            : '',
          fecha_modificacion: selectedRow
            ? selectedRow.fecha_modificacion
              ? selectedRow.fecha_modificacion
              : ''
            : '',
          completo: true,
          // zzzzz:'102',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          if (accion === 'crear') {
            console.log(data);
            dispatch(onCreate(data, handleOnClose));
          } else if (accion === 'editar') {
            if (selectedRow) {
              dispatch(onUpdate(data, handleOnClose));
            }
          }
          // resetForm();
          setSubmitting(false);
          // handleOnClose();
          // updateColeccion();
        }}>
        {({values, initialValues, setFieldValue}) => (
          <AsociadoNegocioForm
            usuario={usuario}
            values={values}
            setFieldValue={setFieldValue}
            handleOnClose={handleOnClose}
            accion={accion}
            initialValues={initialValues}
            tiposDocumentos={tiposDocumentos}
            departamentos={departamentos}
            actividadesEconomicas={actividadesEconomicas}
            ciudades={ciudades}
            ciudadesOtra={ciudadesOtra}
            onChangeDepartamento={onChangeDepartamento}
            onChangeDepartamentoOtra={onChangeDepartamentoOtra}
            clausulas={clausulas}
          />
        )}
      </Formik>
    </Scrollbar>
    // </Dialog>
  );
};

export default AsociadoDatoBasicoCreator;
