import React, {useEffect, useRef, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShowConsulta,
  onUpdate,
  onCreate,
} from '../../../../redux/actions/HorarioRecursoTecnicoAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import ConsultaHorarioTrabajoForm from './ConsultaHorarioTrabajoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  nombre_equipo: yup
    .string()
    .required('Requerido')
    .max(128, mensajeValidacion('max', 128)),
  numero_serial: yup
    .string()
    .required('Requerido')
    .max(128, mensajeValidacion('max', 128)),
  tipo_equipo: yup.string().required('Requerido'),
  fecha_compra_equipo: yup.date().required('Requerido'),
  fecha_activacion_equipo: yup
    .date()
    .required('Requerido')
    .min(
      yup.ref('fecha_compra_equipo'),
      'La fecha de activación debe ser mayor a la de compra',
    ),
  valor_costo_equipo_USD: yup
    .number()
    .typeError(mensajeValidacion('numero'))
    .nullable(),
  nombre_proveedor: yup.string().nullable(),
  equipo_desechable: yup.string().required('Requerido'),
});

const ConsultaHorarioTrabajoCreator = (props) => {
  const {
    consultaHorarioTrabajo,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
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
    ({horarioRecursoTecnicoReducer}) =>
      horarioRecursoTecnicoReducer.selectedRow,
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
      dispatch(onShowConsulta(consultaHorarioTrabajo));
    }
  }, [accion, dispatch, consultaHorarioTrabajo]);

  return (
    showForm && (
      <Dialog
        fullWidth={true}
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
              recurso_tecnico_id: selectedRow
                ? selectedRow.recurso_tecnico_id
                : '',
              numero_documento: selectedRow ? selectedRow.numero_documento : '',
              nombre_completo: selectedRow ? selectedRow.nombre_completo : '',
              ciudad: selectedRow ? selectedRow.ciudad : '',
              tipo_contrato: selectedRow
                ? selectedRow.tipo_contrato === 'F'
                  ? 'Fijo'
                  : selectedRow.tipo_contrato === 'S'
                  ? 'Servicios'
                  : 'Tercero'
                : '',
              fecha_horario: selectedRow ? selectedRow.fecha_horario : '',
              hora_inicio_horario: selectedRow
                ? selectedRow.hora_inicio_horario
                : '',
              hora_final_horario: selectedRow
                ? selectedRow.hora_final_horario
                : '',
              total_horas_turno: selectedRow
                ? selectedRow.total_horas_turno
                : '',
              horas_trabajadas: selectedRow ? selectedRow.horas_trabajadas : '',
              horas_disponibles: selectedRow
                ? selectedRow.horas_disponibles
                : '',
              horas_extras: selectedRow ? selectedRow.horas_extras : '',
              horasTrabajo: selectedRow ? selectedRow.horasTrabajo : '',
              ordenes: selectedRow ? selectedRow.ordenes : [],
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
            {({values, initialValues, setFieldValue, errors}) => (
              <ConsultaHorarioTrabajoForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                errors={errors}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default ConsultaHorarioTrabajoCreator;
