import React, {useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {onUpdate} from '../../../../redux/actions/OrdenServicioAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import ProgramacionOrdenServicioForm from './ProgramacionOrdenServicioForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {onGetColeccionLigeraOS} from '../../../../redux/actions/RecursoTecnicoAction';
import {onGetColeccionLigeraOS as onGetColeccionLigeraOSEquipo} from '../../../../redux/actions/InformacionEquipoAction';

// import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  recurso_id: yup.string().required('Requerido'),
  equipo_id: yup.string().when('tipo_servicio', {
    is: 'Instalación',
    then: yup.string().required('Requerido'),
    otherwise: yup.string().nullable(),
  }),
  // .min(
  //   yup.ref('hora_inicio_horario'),
  //   'Esta hora debe ser mayor a la hora de inicio',
  // ),
});

const ProgramacionOrdenServicioCreator = (props) => {
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

  useEffect(() => {
    dispatch(
      onGetColeccionLigeraOS(
        selectedRow.fecha_programada,
        selectedRow.departamento_id,
      ),
    );
  }, [selectedRow.fecha_programada, selectedRow.departamento_id, dispatch]);

  useEffect(() => {
    dispatch(onGetColeccionLigeraOSEquipo(selectedRow.departamento_id));
  }, [selectedRow.departamento_id, dispatch]);

  const recursosTecnicos = useSelector(
    ({recursoTecnicoReducer}) => recursoTecnicoReducer.ligera,
  );

  const equipos = useSelector(
    ({informacionEquipoReducer}) => informacionEquipoReducer.ligera,
  );

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
              equipo_id: selectedRow
                ? selectedRow.equipo_id
                  ? selectedRow.equipo_id
                  : ''
                : '',
              indicativo_aceptacion: selectedRow
                ? selectedRow.indicativo_aceptacion
                  ? selectedRow.indicativo_aceptacion
                  : ''
                : '',
              observaciones_programacion: selectedRow
                ? selectedRow.observaciones_programacion
                  ? selectedRow.observaciones_programacion
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
                    recurso_id_instalacion: data.recurso_id,
                    observaciones_programacion_instalacion:
                      data.observaciones_programacion,
                    equipo_id: data.equipo_id,
                    estado_orden_servicio: 'PRG',
                    indicativo_aceptacion_instalacion:
                      data.indicativo_aceptacion !== 'P' &&
                      (selectedRow.recurso_id !== data.recurso_id ||
                        selectedRow.equipo_id !== data.equipo_id)
                        ? 'P'
                        : data.indicativo_aceptacion,
                    tipo_proceso: 'Instalación',
                  };
                  dispatch(onUpdate(data_aux, handleOnClose, updateColeccion));
                } else {
                  const data_aux = {
                    id: data.id,
                    recurso_id_desinstalacion: data.recurso_id,
                    observaciones_programacion_desinstalacion:
                      data.observaciones_programacion,
                    indicativo_aceptacion_desinstalacion:
                      data.indicativo_aceptacion !== 'P' &&
                      (selectedRow.recurso_id !== data.recurso_id ||
                        selectedRow.equipo_id !== data.equipo_id)
                        ? 'P'
                        : data.indicativo_aceptacion,
                    tipo_proceso: 'Desinstalación',
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
              <ProgramacionOrdenServicioForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                errors={errors}
                touched={touched}
                recursosTecnicos={recursosTecnicos}
                equipos={equipos}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default ProgramacionOrdenServicioCreator;
