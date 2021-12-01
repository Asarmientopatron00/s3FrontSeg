import React, {useEffect, useRef, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {onUpdate} from '../../../../redux/actions/OrdenServicioAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import AceptacionOrdenServicioForm from './AceptacionOrdenServicioForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';

// import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  indicativo_aceptacion: yup.string().required('Requerido'),
  observaciones_rechazo: yup.string().when('indicativo_aceptacion', {
    is: 'N',
    then: yup.string().required('Requerido'),
    otherwise: yup.string().nullable(),
  }),
});

const AceptacionOrdenServicioCreator = (props) => {
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
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting, resetForm}) => {
              setSubmitting(true);
              if (selectedRow) {
                if (data.tipo_servicio === 'Instalación') {
                  const data_aux = {
                    id: data.id,
                    observaciones_rechazo_instalacion:
                      data.observaciones_rechazo,
                    indicativo_aceptacion_instalacion:
                      data.indicativo_aceptacion === 'S' ? 'A' : 'R',
                    tipo_proceso: 'Instalación',
                    accion: 'aceptar',
                  };
                  dispatch(onUpdate(data_aux, handleOnClose, updateColeccion));
                } else {
                  const data_aux = {
                    id: data.id,
                    observaciones_rechazo_desinstalacion:
                      data.observaciones_rechazo,
                    indicativo_aceptacion_desinstalacion:
                      data.indicativo_aceptacion === 'S' ? 'A' : 'R',
                    tipo_proceso: 'Desinstalación',
                    tipo_proceso: 'Instalación',
                    accion: 'aceptar',
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
              <AceptacionOrdenServicioForm
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

export default AceptacionOrdenServicioCreator;
