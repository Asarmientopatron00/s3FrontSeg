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
} from '../../../../redux/actions/RecursoTecnicoAction';
import {onGetColeccionLigera as coleccionLigeraCiudad} from '../../../../redux/actions/CiudadAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import RecursoTecnicoForm from './RecursoTecnicoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_DOCUMENTOS,
  VALIDACION_REGEX_TELEFONOS,
} from '../../../../shared/constants/Constantes';
import {
  FETCH_ERROR,
  FETCH_START,
} from '../../../../shared/constants/ActionTypes';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  tipo_documento_id: yup.string().required('Requerido'),
  numero_documento: yup
    .string()
    .required('Requerido')
    .matches(VALIDACION_REGEX_DOCUMENTOS, mensajeValidacion('documento'))
    .max(
      LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
      mensajeValidacion('max', LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL),
    )
    .min(6, mensajeValidacion('min', 6)),
  nombre_completo: yup
    .string()
    .required('Requerido')
    .max(128, mensajeValidacion('max', 128)),
  departamento_id: yup.string().required('Requerido'),
  ciudad_id: yup.string().required('Requerido'),
  tipo_contrato: yup
    .string()
    .required('Requerido')
    .max(1, mensajeValidacion('max', 1)),
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
  email: yup.string().nullable().max(128, mensajeValidacion('max', 128)),
  hora_inicio_lunes: yup
    .string()
    .nullable()
    .when('dia_laboral_lunes', {
      is: 'S',
      then: yup.string().required('Requerido'),
      otherwise: yup.string().nullable(),
    }),
  hora_fin_lunes: yup
    .string()
    .nullable()
    .when('dia_laboral_lunes', {
      is: 'S',
      then: yup.string().required('Requerido'),
      otherwise: yup.string().nullable(),
    }),
});

const RecursoTecnicoCreator = (props) => {
  const {
    recursoTecnico,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
    ESTADOS_RECURSOS_TECNICOS,
    departamentos,
    tiposDocumentos,
    asociados,
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

  const classes = useStyles(props);

  const [showForm, setShowForm] = useState(false);
  let selectedRow = useRef();
  selectedRow = useSelector(
    ({recursoTecnicoReducer}) => recursoTecnicoReducer.selectedRow,
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

  const onChangeDepartamento = (id) => {
    dispatch(coleccionLigeraCiudad(id));
  };

  const ciudades = useSelector(({ciudadReducer}) => ciudadReducer.ligera);

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
      dispatch(onShow(recursoTecnico));
    }
  }, [accion, dispatch, recursoTecnico]);
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
                  ? selectedRow.tipo_documento_id
                  : ''
                : '',
              numero_documento: selectedRow
                ? selectedRow.numero_documento
                  ? selectedRow.numero_documento
                  : ''
                : '',
              nombre_completo: selectedRow
                ? selectedRow.nombre_completo
                  ? selectedRow.nombre_completo
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
              tipo_contrato: selectedRow
                ? selectedRow.tipo_contrato
                  ? selectedRow.tipo_contrato
                  : ''
                : '',
              asociado_id: selectedRow
                ? selectedRow.asociado_id
                  ? selectedRow.asociado_id
                  : ''
                : '',
              dia_laboral_lunes: selectedRow
                ? selectedRow.dia_laboral_lunes
                  ? selectedRow.dia_laboral_lunes
                  : 'N'
                : 'N',
              hora_inicio_lunes: selectedRow
                ? selectedRow.hora_inicio_lunes
                  ? selectedRow.hora_inicio_lunes.replace(':00', '')
                  : ''
                : '',
              hora_fin_lunes: selectedRow
                ? selectedRow.hora_fin_lunes
                  ? selectedRow.hora_fin_lunes.replace(':00', '')
                  : ''
                : '',
              dia_laboral_martes: selectedRow
                ? selectedRow.dia_laboral_martes
                  ? selectedRow.dia_laboral_martes
                  : 'N'
                : 'N',
              hora_inicio_martes: selectedRow
                ? selectedRow.hora_inicio_martes
                  ? selectedRow.hora_inicio_martes
                  : ''
                : '',
              hora_fin_martes: selectedRow
                ? selectedRow.hora_fin_martes
                  ? selectedRow.hora_fin_martes
                  : ''
                : '',
              dia_laboral_miercoles: selectedRow
                ? selectedRow.dia_laboral_miercoles
                  ? selectedRow.dia_laboral_miercoles
                  : 'N'
                : 'N',
              hora_inicio_miercoles: selectedRow
                ? selectedRow.hora_inicio_miercoles
                  ? selectedRow.hora_inicio_miercoles
                  : ''
                : '',
              hora_fin_miercoles: selectedRow
                ? selectedRow.hora_fin_miercoles
                  ? selectedRow.hora_fin_miercoles
                  : ''
                : '',
              dia_laboral_jueves: selectedRow
                ? selectedRow.dia_laboral_jueves
                  ? selectedRow.dia_laboral_jueves
                  : 'N'
                : 'N',
              hora_inicio_jueves: selectedRow
                ? selectedRow.hora_inicio_jueves
                  ? selectedRow.hora_inicio_jueves
                  : ''
                : '',
              hora_fin_jueves: selectedRow
                ? selectedRow.hora_fin_jueves
                  ? selectedRow.hora_fin_jueves
                  : ''
                : '',
              dia_laboral_viernes: selectedRow
                ? selectedRow.dia_laboral_viernes
                  ? selectedRow.dia_laboral_viernes
                  : 'N'
                : 'N',
              hora_inicio_viernes: selectedRow
                ? selectedRow.hora_inicio_viernes
                  ? selectedRow.hora_inicio_viernes
                  : ''
                : '',
              hora_fin_viernes: selectedRow
                ? selectedRow.hora_fin_viernes
                  ? selectedRow.hora_fin_viernes
                  : ''
                : '',
              dia_laboral_sabado: selectedRow
                ? selectedRow.dia_laboral_sabado
                  ? selectedRow.dia_laboral_sabado
                  : 'N'
                : 'N',
              hora_inicio_sabado: selectedRow
                ? selectedRow.hora_inicio_sabado
                  ? selectedRow.hora_inicio_sabado
                  : ''
                : '',
              hora_fin_sabado: selectedRow
                ? selectedRow.hora_fin_sabado
                  ? selectedRow.hora_fin_sabado
                  : ''
                : '',
              dia_laboral_domingo: selectedRow
                ? selectedRow.dia_laboral_domingo
                  ? selectedRow.dia_laboral_domingo
                  : 'N'
                : 'N',
              hora_inicio_domingo: selectedRow
                ? selectedRow.hora_inicio_domingo
                  ? selectedRow.hora_inicio_domingo
                  : ''
                : '',
              hora_fin_domingo: selectedRow
                ? selectedRow.hora_fin_domingo
                  ? selectedRow.hora_fin_domingo
                  : ''
                : '',
              numero_horas_semana: selectedRow
                ? selectedRow.numero_horas_semana
                  ? selectedRow.numero_horas_semana
                  : ''
                : '',
              observaciones: selectedRow
                ? selectedRow.observaciones
                  ? selectedRow.observaciones
                  : ''
                : '',
              estado_recurso: selectedRow
                ? selectedRow.estado_recurso
                  ? selectedRow.estado_recurso
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
              dispatch({
                type: FETCH_START,
              });
              setSubmitting(true);
              if (
                data.dia_laboral_lunes === 'N' &&
                data.dia_laboral_martes === 'N' &&
                data.dia_laboral_miercoles === 'N' &&
                data.dia_laboral_jueves === 'N' &&
                data.dia_laboral_viernes === 'N' &&
                data.dia_laboral_sabado === 'N' &&
                data.dia_laboral_domingo === 'N'
              ) {
                dispatch({
                  type: FETCH_ERROR,
                  payload: 'Debe seleccionar por lo menos 1',
                });
                return;
              }
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
            {({values, initialValues, setFieldValue, errors, touched}) => (
              <RecursoTecnicoForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                errors={errors}
                touched={touched}
                ESTADOS_RECURSOS_TECNICOS={ESTADOS_RECURSOS_TECNICOS}
                departamentos={departamentos}
                tiposDocumentos={tiposDocumentos}
                asociados={asociados}
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

export default RecursoTecnicoCreator;
