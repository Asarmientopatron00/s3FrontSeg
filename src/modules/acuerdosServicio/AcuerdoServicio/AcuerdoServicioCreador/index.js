import React, {useEffect, useRef, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShow,
  onUpdate,
  onCreate,
} from '../../../../redux/actions/AcuerdoServicioAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import AcuerdoServicioForm from './AcuerdoServicioForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import format from 'date-fns/format';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const AcuerdoServicioCreator = (props) => {
  const {
    acuerdoServicio,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
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
    ({acuerdoServicioReducer}) => acuerdoServicioReducer.selectedRow,
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
      dispatch(onShow(acuerdoServicio));
    }
  }, [accion, dispatch, acuerdoServicio]);

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
        maxWidth={'lg'}>
        <Scrollbar>
          <Formik
            initialStatus={true}
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={{
              id: selectedRow ? selectedRow.id : '',
              numero_acuerdo_servicio: selectedRow
                ? selectedRow.numero_acuerdo_servicio
                : '',
              asociado_id: selectedRow ? selectedRow.asociado_id : '',
              fecha_acuerdo_servicio: selectedRow
                ? selectedRow.fecha_acuerdo_servicio
                : format(new Date(Date.now()), 'yyyy-MM-dd'),
              tipo_servicio_dta: selectedRow
                ? selectedRow.tipo_servicio_dta
                : 'N',
              tipo_servicio_otm: selectedRow
                ? selectedRow.tipo_servicio_otm
                : 'N',
              tipo_servicio_nacionalizado: selectedRow
                ? selectedRow.tipo_servicio_nacionalizado
                : 'N',
              tipo_servicio_pernocta: selectedRow
                ? selectedRow.tipo_servicio_pernocta
                : 'N',
              tipo_servicio_exportacion: selectedRow
                ? selectedRow.tipo_servicio_exportacion
                : 'N',
              tipo_servicio_otro: selectedRow
                ? selectedRow.tipo_servicio_otro
                : '',
              horario_transito_24h: selectedRow
                ? selectedRow.horario_transito_24h
                : 'N',
              horario_transito_diurno: selectedRow
                ? selectedRow.horario_transito_diurno
                : 'N',
              horario_transito_diurno_desde: selectedRow
                ? selectedRow.horario_transito_diurno_desde
                : '',
              horario_transito_diurno_hasta: selectedRow
                ? selectedRow.horario_transito_diurno_hasta
                : '',
              horario_transito_nocturno: selectedRow
                ? selectedRow.horario_transito_nocturno
                : 'N',
              horario_transito_nocturno_desde: selectedRow
                ? selectedRow.horario_transito_nocturno_desde
                : '',
              horario_transito_nocturno_hasta: selectedRow
                ? selectedRow.horario_transito_nocturno_hasta
                : '',
              dia_transito_lunes: selectedRow
                ? selectedRow.dia_transito_lunes
                : 'N',
              dia_transito_martes: selectedRow
                ? selectedRow.dia_transito_martes
                : 'N',
              dia_transito_miercoles: selectedRow
                ? selectedRow.dia_transito_miercoles
                : 'N',
              dia_transito_jueves: selectedRow
                ? selectedRow.dia_transito_jueves
                : 'N',
              dia_transito_viernes: selectedRow
                ? selectedRow.dia_transito_viernes
                : 'N',
              dia_transito_sabado: selectedRow
                ? selectedRow.dia_transito_sabado
                : 'N',
              dia_transito_domingo: selectedRow
                ? selectedRow.dia_transito_domingo
                : 'N',
              facturacion_servicio: selectedRow
                ? selectedRow.facturacion_servicio
                : 'N',
              observaciones: selectedRow ? selectedRow.observaciones : '',
              estado_acuerdo: selectedRow ? selectedRow.estado_acuerdo : 'PDT',
              estado: selectedRow
                ? selectedRow.estado === 1
                  ? '1'
                  : '0'
                : '1',
            }}
            onSubmit={(
              data,
              {setSubmitting, resetForm, setFieldError, errors},
            ) => {
              setSubmitting(true);
              let error = false;
              if (
                data.tipo_servicio_dta === 'N' &&
                data.tipo_servicio_otm === 'N' &&
                data.tipo_servicio_nacionalizado === 'N' &&
                data.tipo_servicio_pernocta === 'N' &&
                data.tipo_servicio_exportacion === 'N' &&
                data.tipo_servicio_otro === ''
              ) {
                setFieldError('tipo_servicio_otro', ' ');
                setFieldError(
                  'tipo_servicio_dta',
                  'Debe seleccionar almenos un tipo de servicio',
                );
                error = true;
              }
              if (
                data.dia_transito_lunes === 'N' &&
                data.dia_transito_martes === 'N' &&
                data.dia_transito_miercoles === 'N' &&
                data.dia_transito_jueves === 'N' &&
                data.dia_transito_viernes === 'N' &&
                data.dia_transito_sabado === 'N' &&
                data.dia_transito_domingo === 'N'
              ) {
                setFieldError(
                  'dia_transito_lunes',
                  'Debe seleccionar almenos un día',
                );
                error = true;
              }
              if (data.asociado_id === '') {
                setFieldError('asociado_id', 'Requerido');
                error = true;
              }
              if (data.tipo_servicio_otro.length > 60) {
                setFieldError(
                  'tipo_servicio_otro',
                  mensajeValidacion('max', 60),
                );
                error = true;
              }
              if (error) {
                setSubmitting(false);
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
            {({values, initialValues, setFieldValue, errors}) => (
              <AcuerdoServicioForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                asociados={asociados}
                errors={errors}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default AcuerdoServicioCreator;
