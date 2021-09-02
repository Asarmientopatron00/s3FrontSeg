import React, {useEffect, useRef, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {onShow, onApprove} from '../../../../redux/actions/CotizacionAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import AprobacionCotizacionForm from './AprobacionCotizacionForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';

import {onGetColeccion} from '../../../../redux/actions/DetalleCotizacionAction';
import {onGetColeccionLigera} from '../../../../redux/actions/AsociadoAction';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  asociado_id: yup.string().required('Requerido'),
});

const AprobacionCotizacionCreator = (props) => {
  const {aprobacionCotizacion, handleOnClose, accion, updateColeccion, titulo} =
    props;

  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    dialogBox: {
      position: 'relative',
      '& .MuiDialog-paperWidthSm': {
        maxWidth: 900,
        width: '900px',
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
    ({cotizacionReducer}) => cotizacionReducer.selectedRow,
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
      dispatch(onShow(aprobacionCotizacion));
    }
  }, [accion, dispatch, aprobacionCotizacion]);

  useEffect(() => {
    dispatch(onGetColeccion(1, 20, 'id:desc', aprobacionCotizacion));
  }, [dispatch, aprobacionCotizacion]);

  useEffect(() => {
    dispatch(onGetColeccionLigera());
  }, [dispatch]);

  const {rows} = useSelector(
    ({detalleCotizacionReducer}) => detalleCotizacionReducer,
  );

  const asociados = useSelector(({asociadoReducer}) => asociadoReducer.ligera);

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
              numero_cotizacion_servicio: selectedRow
                ? selectedRow.numero_cotizacion_servicio
                  ? selectedRow.numero_cotizacion_servicio
                  : ''
                : '',
              solicitud_cotizacion_id: selectedRow
                ? selectedRow.solicitud_cotizacion_id
                  ? selectedRow.solicitud_cotizacion_id
                  : ''
                : '',
              numero_solicitud_cotizacion: selectedRow
                ? selectedRow.numero_solicitud_cotizacion
                  ? selectedRow.numero_solicitud_cotizacion
                  : ''
                : '',
              asociado_id: selectedRow
                ? selectedRow.asociado_id
                  ? selectedRow.asociado_id
                  : ''
                : '',
              fecha_cotizacion: selectedRow ? selectedRow.fecha_cotizacion : '',
              fecha_vigencia_cotizacion: selectedRow
                ? selectedRow.fecha_vigencia_cotizacion
                : '',
              plazo_pago_cotizacion: selectedRow
                ? selectedRow.plazo_pago_cotizacion
                  ? selectedRow.plazo_pago_cotizacion
                  : ''
                : '',
              numero_viajes_mes: selectedRow
                ? selectedRow.numero_viajes_mes
                  ? selectedRow.numero_viajes_mes
                  : ''
                : '',
              observaciones: selectedRow
                ? selectedRow.observaciones
                  ? selectedRow.observaciones
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
              if (accion === 'aprobar') {
                dispatch(
                  onApprove(
                    {id: data.id, asociado_id: data.asociado_id},
                    handleOnClose,
                    updateColeccion,
                  ),
                );
              }
              setSubmitting(false);
            }}>
            {({values, initialValues, setFieldValue}) => (
              <AprobacionCotizacionForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                rows={rows}
                asociados={asociados}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default AprobacionCotizacionCreator;
