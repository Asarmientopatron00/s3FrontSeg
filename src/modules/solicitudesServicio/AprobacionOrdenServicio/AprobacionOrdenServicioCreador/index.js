import React, {useEffect, useRef, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import * as yup from 'yup';
import {onShow, onApprove} from '../../../../redux/actions/OrdenServicioAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import AprobacionOrdenServicioForm from './AprobacionOrdenServicioForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import format from 'date-fns/format';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const AprobacionOrdenServicioCreator = (props) => {
  const {
    aprobacionOrdenServicio,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
    TIPOS_SERVICIOS,
  } = props;

  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    dialogBox: {
      position: 'relative',
      '& .MuiDialog-paperWidthSm': {
        maxWidth: 800,
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
    ({ordenServicioReducer}) => ordenServicioReducer.selectedRow,
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
    if ((accion === 'editar') | (accion === 'ver') | (accion === 'aprobar')) {
      dispatch(onShow(aprobacionOrdenServicio));
    }
  }, [accion, dispatch, aprobacionOrdenServicio]);

  const validationSchema = yup.object({
    tipo_servicio: yup.string().required('Requerido'),
    tipo_servicio_otro: yup
      .string()
      .nullable()
      .when('tipo_servicio', {
        is: 'OTR',
        then: yup.string().required('Requerido'),
      }),
    fecha_programada_instalacion: yup.date().required('Requerido'),
    lugar_instalacion: yup.string().required('Requerido'),
    fecha_programada_desinstalacion: yup.date().required('Requerido'),
    lugar_desinstalacion: yup.string().required('Requerido'),
  });

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
            validationSchema={validationSchema}
            validateOnBlur={false}
            initialValues={{
              id: selectedRow ? selectedRow.id : '',
              numero_orden_servicio: selectedRow
                ? selectedRow.numero_orden_servicio
                  ? selectedRow.numero_orden_servicio
                  : ''
                : '',
              fecha_orden_servicio: selectedRow
                ? selectedRow.fecha_orden_servicio
                : format(new Date(Date.now()), 'yyyy-MM-dd'),
              asociado_documento: selectedRow
                ? selectedRow.asociado.numero_documento
                  ? selectedRow.asociado.numero_documento
                  : ''
                : '',
              asociado: selectedRow
                ? selectedRow.asociado.nombre
                  ? selectedRow.asociado.nombre
                  : ''
                : '',
              servicio: selectedRow
                ? selectedRow.servicio
                  ? selectedRow.servicio.nombre
                  : ''
                : '',
              tipo_servicio: selectedRow
                ? selectedRow.tipo_servicio
                  ? TIPOS_SERVICIOS.filter(
                      (tipo) => tipo.id === selectedRow.tipo_servicio,
                    )[0].nombre
                  : ''
                : '',
              tipo_servicio_otro: selectedRow
                ? selectedRow.tipo_servicio_otro
                  ? selectedRow.tipo_servicio_otro
                  : ''
                : '',
              agente_aduana_id: selectedRow
                ? selectedRow.agente_aduana_id
                  ? selectedRow.agente_aduana_id
                  : ''
                : '',
              fecha_programada_instalacion: selectedRow
                ? selectedRow.fecha_programada_instalacion
                  ? selectedRow.fecha_programada_instalacion
                  : ''
                : '',
              hora_programada_instalacion: selectedRow
                ? selectedRow.hora_programada_instalacion
                  ? selectedRow.hora_programada_instalacion
                  : ''
                : '',
              departamento_instalacion: selectedRow
                ? selectedRow.departamentoInstalacion
                  ? selectedRow.departamentoInstalacion.nombre
                  : ''
                : '',
              ciudad_instalacion: selectedRow
                ? selectedRow.ciudadInstalacion
                  ? selectedRow.ciudadInstalacion.nombre
                  : ''
                : '',
              lugar_instalacion: selectedRow
                ? selectedRow.lugarInstalacion
                  ? selectedRow.lugarInstalacion.nombre
                  : ''
                : '',
              direccion_instalacion: selectedRow
                ? selectedRow.lugarInstalacion
                  ? selectedRow.lugarInstalacion.direccion
                  : ''
                : '',
              fecha_programada_desinstalacion: selectedRow
                ? selectedRow.fecha_programada_desinstalacion
                  ? selectedRow.fecha_programada_desinstalacion
                  : ''
                : '',
              hora_programada_desinstalacion: selectedRow
                ? selectedRow.hora_programada_desinstalacion
                  ? selectedRow.hora_programada_desinstalacion
                  : ''
                : '',
              departamento_desinstalacion: selectedRow
                ? selectedRow.departamentoDesinstalacion
                  ? selectedRow.departamentoDesinstalacion.nombre
                  : ''
                : '',
              ciudad_desinstalacion: selectedRow
                ? selectedRow.ciudadDesinstalacion
                  ? selectedRow.ciudadDesinstalacion.nombre
                  : ''
                : '',
              lugar_desinstalacion: selectedRow
                ? selectedRow.lugarDesinstalacion
                  ? selectedRow.lugarDesinstalacion.nombre
                  : ''
                : '',
              direccion_desinstalacion: selectedRow
                ? selectedRow.lugarDesinstalacion
                  ? selectedRow.lugarDesinstalacion.direccion
                  : ''
                : '',
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
              if (accion === 'aprobar') {
                dispatch(
                  onApprove({id: data.id}, handleOnClose, updateColeccion),
                );
              }
              // resetForm();
              setSubmitting(false);
              // handleOnClose();
              // updateColeccion();
            }}>
            {({values, initialValues, setFieldValue, errors}) => (
              <AprobacionOrdenServicioForm
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

export default AprobacionOrdenServicioCreator;
