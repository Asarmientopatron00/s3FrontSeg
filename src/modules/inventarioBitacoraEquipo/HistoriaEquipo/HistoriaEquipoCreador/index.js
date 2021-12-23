import React, {useEffect, useRef, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShowHistoria,
  onUpdate,
  onCreate,
} from '../../../../redux/actions/InformacionEquipoAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import HistoriaEquipoForm from './HistoriaEquipoForm';
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

const HistoriaEquipoCreator = (props) => {
  const {
    historiaEquipo,
    handleOnClose,
    accion,
    updateColeccion,
    TIPOS_EQUIPOS,
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
    ({informacionEquipoReducer}) => informacionEquipoReducer.selectedRow,
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
      dispatch(onShowHistoria(historiaEquipo));
    }
  }, [accion, dispatch, historiaEquipo]);

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
              numero_serial: selectedRow ? selectedRow.numero_serial : '',
              nombre_equipo: selectedRow ? selectedRow.nombre_equipo : '',
              tipo_equipo: selectedRow ? selectedRow.tipo_equipo : '',
              fecha_compra_equipo: selectedRow
                ? selectedRow.fecha_compra_equipo
                : '',
              fecha_activacion_equipo: selectedRow
                ? selectedRow.fecha_activacion_equipo
                : '',
              ciudad: selectedRow ? selectedRow.ciudad : '',
              lugar: selectedRow ? selectedRow.lugar : '',
              responsable: selectedRow ? selectedRow.responsable : '',
              estado: selectedRow ? selectedRow.estado : '',
              ultimo_mantenimiento_equipo: selectedRow
                ? selectedRow.ultimo_mantenimiento_equipo
                : '',
              dias_equipo: selectedRow ? selectedRow.dias_equipo : '',
              horas_equipo: selectedRow ? selectedRow.horas_equipo : '',
              horasTrabajo: selectedRow ? selectedRow.horasTrabajo : '',
              trabajo: selectedRow ? selectedRow.trabajo : '',
              horasMantenimiento: selectedRow
                ? selectedRow.horasMantenimiento
                : '',
              mantenimiento: selectedRow ? selectedRow.mantenimiento : '',
              horasOtro: selectedRow ? selectedRow.horasOtro : '',
              otros: selectedRow ? selectedRow.otros : '',
              horas_disponibles: selectedRow
                ? selectedRow.horas_disponibles
                : '',
              detalles: selectedRow ? selectedRow.detalles : '',
              estado_servicio: selectedRow ? selectedRow.estado_servicio : '',

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
              <HistoriaEquipoForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                TIPOS_EQUIPOS={TIPOS_EQUIPOS}
                errors={errors}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default HistoriaEquipoCreator;
