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
} from '../../../../redux/actions/BitacoraEquipoAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import BitacoraEquipoForm from './BitacoraEquipoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import {onGetColeccionLigera as onGetColeccionLigeraLugar} from '../../../../redux/actions/LugarAction';
import format from 'date-fns/format';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  numero_serial_equipo: yup
    .string()
    .required('Requerido')
    .max(128, mensajeValidacion('max', 128)),
  equipo_id: yup.number().required('Requerido'),
  fecha_evento: yup.date().required('Requerido'),
  // .max(yup.ref('todays_date'), 'Debe ser menor o igual a la fecha actual'),
  evento_equipo_id: yup.number().required('Requerido'),
  estado_equipo_id: yup.number().required('Requerido'),
  recurso_id_responsable: yup.number().required('Requerido'),
  ciudad_id_evento: yup.number().required('Requerido'),
  numero_horas_novedad: yup.number().nullable('Requerido'),
  lugar_evento: yup
    .string()
    .required('Requerido')
    .max(128, mensajeValidacion('max', 128)),
});

const BitacoraEquipoCreator = (props) => {
  const {
    bitacoraEquipo,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
    equipos,
    eventos,
    estados,
    responsables,
    ordenesServicio,
    ciudades,
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
    ({bitacoraEquipoReducer}) => bitacoraEquipoReducer.selectedRow,
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
      dispatch(onShow(bitacoraEquipo));
    }
  }, [accion, dispatch, bitacoraEquipo]);

  const onChangeCiudad = (id) => {
    dispatch(onGetColeccionLigeraLugar(id));
  };
  const lugares = useSelector(({lugarReducer}) => lugarReducer.ligera);
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
              equipo_id: selectedRow ? selectedRow.equipo_id : '',
              numero_serial_equipo: selectedRow
                ? selectedRow.numero_serial_equipo
                : '',
              fecha_evento: selectedRow ? selectedRow.fecha_evento : '',
              hora_evento: selectedRow ? selectedRow.hora_evento : '',
              evento_equipo_id: selectedRow
                ? selectedRow.evento_equipo_id
                  ? selectedRow.evento_equipo_id
                  : ''
                : '',
              estado_equipo_id: selectedRow
                ? selectedRow.estado_equipo_id
                  ? selectedRow.estado_equipo_id
                  : ''
                : '',
              recurso_id_responsable: selectedRow
                ? selectedRow.recurso_id_responsable
                  ? selectedRow.recurso_id_responsable
                  : ''
                : '',
              orden_servicio_id: selectedRow
                ? selectedRow.orden_servicio_id
                  ? selectedRow.orden_servicio_id
                  : ''
                : '',
              numero_orden_servicio: selectedRow
                ? selectedRow.numero_orden_servicio
                  ? selectedRow.numero_orden_servicio
                  : ''
                : '',
              ciudad_id_evento: selectedRow
                ? selectedRow.ciudad_id_evento
                  ? selectedRow.ciudad_id_evento
                  : ''
                : '',
              numero_horas_novedad: selectedRow
                ? selectedRow.numero_horas_novedad
                : '',
              lugar_evento: selectedRow ? selectedRow.lugar_evento : '',
              lugar_id: selectedRow ? selectedRow.lugar_id : '',
              todays_date: format(new Date(Date.now()), 'yyyy-MM-dd'),
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
              <BitacoraEquipoForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                errors={errors}
                equipos={equipos}
                eventos={eventos}
                estados={estados}
                responsables={responsables}
                ordenesServicio={ordenesServicio}
                ciudades={ciudades}
                lugares={lugares}
                onChangeCiudad={onChangeCiudad}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default BitacoraEquipoCreator;
