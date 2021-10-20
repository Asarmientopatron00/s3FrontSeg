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
} from '../../../../redux/actions/HorarioRecursoTecnicoAction';
import Slide from '@material-ui/core/Slide';
import format from 'date-fns/format';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import HorarioRecursoTecnicoForm from './HorarioRecursoTecnicoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
// import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  recurso_tecnico_id: yup.string().required('Requerido'),
  fecha_horario: yup
    .date()
    .nullable()
    .required('Requerido')
    .min(
      format(new Date(Date.now()), 'yyyy-MM-dd'),
      'Debe ser una fecha mayor o igual a la actual',
    ),
  hora_inicio_horario: yup.string().nullable().required('Requerido'),
  hora_final_horario: yup.string().nullable().required('Requerido'),
  // .min(
  //   yup.ref('hora_inicio_horario'),
  //   'Esta hora debe ser mayor a la hora de inicio',
  // ),
});

const HorarioRecursoTecnicoCreator = (props) => {
  const {
    horarioRecursoTecnico,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
    recursosTecnicos,
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
      dispatch(onShow(horarioRecursoTecnico));
    }
  }, [accion, dispatch, horarioRecursoTecnico]);
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
              recurso_tecnico_id: selectedRow
                ? selectedRow.recurso_tecnico_id
                  ? selectedRow.recurso_tecnico_id
                  : ''
                : '',
              tipo_documento: selectedRow
                ? selectedRow.recursoTecnico.tipo_documento
                  ? selectedRow.recursoTecnico.tipo_documento
                  : ''
                : '',
              numero_documento: selectedRow
                ? selectedRow.recursoTecnico.numero_documento
                  ? selectedRow.recursoTecnico.numero_documento
                  : ''
                : '',
              nombre_completo: selectedRow
                ? selectedRow.recursoTecnico.nombre_completo
                  ? selectedRow.recursoTecnico.nombre_completo
                  : ''
                : '',
              tipo_contrato: selectedRow
                ? selectedRow.recursoTecnico.tipo_contrato
                  ? selectedRow.recursoTecnico.tipo_contrato
                  : ''
                : '',
              departamento: selectedRow
                ? selectedRow.recursoTecnico.departamento
                  ? selectedRow.recursoTecnico.departamento
                  : ''
                : '',
              ciudad: selectedRow
                ? selectedRow.recursoTecnico.ciudad
                  ? selectedRow.recursoTecnico.ciudad
                  : ''
                : '',
              celular: selectedRow
                ? selectedRow.recursoTecnico.celular
                  ? selectedRow.recursoTecnico.celular
                  : ''
                : '',
              email: selectedRow
                ? selectedRow.recursoTecnico.email
                  ? selectedRow.recursoTecnico.email
                  : ''
                : '',
              fecha_horario: selectedRow
                ? selectedRow.fecha_horario
                  ? selectedRow.fecha_horario
                  : ''
                : '',
              hora_inicio_horario: selectedRow
                ? selectedRow.hora_inicio_horario
                  ? selectedRow.hora_inicio_horario.replace(':00', '')
                  : ''
                : '',
              hora_final_horario: selectedRow
                ? selectedRow.hora_final_horario
                  ? selectedRow.hora_final_horario.replace(':00', '')
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
            {({values, initialValues, setFieldValue, errors, touched}) => (
              <HorarioRecursoTecnicoForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                errors={errors}
                touched={touched}
                recursosTecnicos={recursosTecnicos}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default HorarioRecursoTecnicoCreator;
