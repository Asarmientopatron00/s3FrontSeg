import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {onUpdate} from '../../../../redux/actions/OrdenServicioAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import ReporteHorasTrabajadasForm from './ReporteHorasTrabajadasForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import moment from 'moment';

// import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  fecha_prestacion_servicio: yup.string().required('Requerido'),
  hora_inicio_servicio: yup.string().required('Requerido'),
  hora_final_servicio: yup
    .string()
    .required('Requerido')
    .test('is-greater', 'Debe ser mayor a la hora inicio', function (value) {
      const {hora_inicio_servicio} = this.parent;
      return moment(value, 'HH:mm').isSameOrAfter(
        moment(hora_inicio_servicio, 'HH:mm'),
      );
    }),
  observaciones_ejecucion: yup.string().nullable(),
});

const ReporteHorasTrabajadasCreator = (props) => {
  const {selectedRow, handleOnClose, accion, updateColeccion, titulo} = props;

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

  return (
    true && (
      <Dialog
        open={true}
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
              numero_orden_servicio: selectedRow
                ? selectedRow.numero_orden_servicio
                  ? selectedRow.numero_orden_servicio
                  : ''
                : '',
              fecha_creacion: selectedRow
                ? selectedRow.fecha_creacion
                  ? selectedRow.fecha_creacion
                  : ''
                : '',
              estado_orden_servicio: selectedRow
                ? selectedRow.estado_orden_servicio
                  ? selectedRow.estado_orden_servicio
                  : ''
                : '',
              asociado: selectedRow
                ? selectedRow.asociado
                  ? selectedRow.asociado
                  : ''
                : '',

              fecha_programada: selectedRow
                ? selectedRow.fecha_programada
                  ? selectedRow.fecha_programada
                  : ''
                : '',
              hora_programada: selectedRow
                ? selectedRow.hora_programada
                  ? selectedRow.hora_programada
                  : ''
                : '',
              departamento: selectedRow
                ? selectedRow.departamento
                  ? selectedRow.departamento
                  : ''
                : '',
              ciudad: selectedRow
                ? selectedRow.ciudad
                  ? selectedRow.ciudad
                  : ''
                : '',
              lugar: selectedRow
                ? selectedRow.lugar
                  ? selectedRow.lugar
                  : ''
                : '',
              direccion: selectedRow
                ? selectedRow.direccion
                  ? selectedRow.direccion
                  : ''
                : '',
              recurso_id: selectedRow
                ? selectedRow.recurso_id
                  ? selectedRow.recurso_id
                  : ''
                : '',
              recurso: selectedRow
                ? selectedRow.recurso
                  ? selectedRow.recurso
                  : ''
                : '',
              tipo_servicio: selectedRow
                ? selectedRow.tipo_servicio
                  ? selectedRow.tipo_servicio
                  : ''
                : '',
              numero_viaje: selectedRow
                ? selectedRow.numero_viaje
                  ? selectedRow.numero_viaje
                  : ''
                : '',
              equipo: selectedRow
                ? selectedRow.equipo
                  ? selectedRow.equipo
                  : ''
                : '',
              numero_serial: selectedRow
                ? selectedRow.numero_serial
                  ? selectedRow.numero_serial
                  : ''
                : '',
              indicativo_aceptacion: selectedRow
                ? selectedRow.indicativo_aceptacion
                  ? selectedRow.indicativo_aceptacion === 'A'
                    ? 'S'
                    : selectedRow.indicativo_aceptacion === 'R'
                    ? 'N'
                    : ''
                  : ''
                : '',
              observaciones_programacion: selectedRow
                ? selectedRow.observaciones_programacion
                  ? selectedRow.observaciones_programacion
                  : ''
                : '',
              observaciones_rechazo: selectedRow
                ? selectedRow.observaciones_rechazo
                  ? selectedRow.observaciones_rechazo
                  : ''
                : '',
              fecha_prestacion_servicio: selectedRow
                ? selectedRow.fecha_prestacion_servicio
                  ? selectedRow.fecha_prestacion_servicio
                  : selectedRow.fecha_programada
                : selectedRow.fecha_programada,
              hora_inicio_servicio: selectedRow
                ? selectedRow.hora_inicio_servicio
                  ? selectedRow.hora_inicio_servicio
                  : ''
                : '',
              hora_final_servicio: selectedRow
                ? selectedRow.hora_final_servicio
                  ? selectedRow.hora_final_servicio
                  : ''
                : '',
              observaciones_ejecucion: selectedRow
                ? selectedRow.observaciones_ejecucion
                  ? selectedRow.observaciones_ejecucion
                  : ''
                : '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting, resetForm}) => {
              setSubmitting(true);
              if (selectedRow) {
                if (data.tipo_servicio === 'Instalación') {
                  const data_aux = {
                    id: data.id,
                    fecha_instalacion: data.fecha_prestacion_servicio,
                    hora_inicio_instalacion: data.hora_inicio_servicio,
                    hora_final_instalacion: data.hora_final_servicio,
                    observaciones_ejecucion_instalacion:
                      data.observaciones_ejecucion,
                    tipo_proceso: 'Instalación',
                    accion: 'Reg.Horas.Trab',
                  };
                  dispatch(onUpdate(data_aux, handleOnClose, updateColeccion));
                } else {
                  const data_aux = {
                    id: data.id,
                    fecha_desinstalacion: data.fecha_prestacion_servicio,
                    hora_inicio_desinstalacion: data.hora_inicio_servicio,
                    hora_final_desinstalacion: data.hora_final_servicio,
                    observaciones_ejecucion_desinstalacion:
                      data.observaciones_ejecucion,
                    tipo_proceso: 'Desinstalación',
                    accion: 'Reg.Horas.Trab',
                  };
                  dispatch(onUpdate(data_aux, handleOnClose, updateColeccion));
                }
              }
              // resetForm();
              setSubmitting(false);
              // handleOnClose();
              // updateColeccion();
            }}>
            {({values, initialValues, setFieldValue, errors, touched}) => (
              <ReporteHorasTrabajadasForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                errors={errors}
                touched={touched}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default ReporteHorasTrabajadasCreator;
