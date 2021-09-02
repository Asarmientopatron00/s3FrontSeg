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
  onGetDiasViajes,
} from '../../../../redux/actions/TarifaAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import TarifaForm from './TarifaForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  ciudad_origen_id: yup.string().required('Requerido'),
  ciudad_destino_id: yup
    .string()
    .required('Requerido')
    .notOneOf(
      [yup.ref('ciudad_origen_id')],
      'Ciudad de destino debe ser diferente a ciudad de origen',
    ),
  servicio_id: yup.string().required('Requerido'),
  tipo_servicio: yup.string().required('Requerido'),
  tipo_servicio_otro: yup
    .string()
    .nullable()
    .when('tipo_servicio', {
      is: 'OTR',
      then: yup.string().required('Requerido'),
    }),
  numero_dias_viaje: yup.number().required('Requerido'),
  asociado_id: yup.string().required('Requerido'),
  valor_tarifa: yup
    .number()
    .typeError(mensajeValidacion('numero'))
    .required('Requerido'),
  valor_tarifa_dia_adicional: yup
    .number()
    .typeError(mensajeValidacion('numero'))
    .nullable(),
});

const TarifaCreator = (props) => {
  const {
    tarifa,
    handleOnClose,
    accion,
    updateColeccion,
    ciudades,
    servicios,
    asociados,
    titulo,
    TIPOS_SERVICIOS,
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
  let dias_viajes = useRef();
  selectedRow = useSelector(({tarifaReducer}) => tarifaReducer.selectedRow);
  dias_viajes = useSelector(({tarifaReducer}) => tarifaReducer.dias_viajes);

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
      dispatch(onShow(tarifa));
    } else {
      dispatch(onGetDiasViajes());
    }
  }, [accion, dispatch, tarifa]);

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
        maxWidth={'sm'}>
        <Scrollbar>
          <Formik
            initialStatus={true}
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={{
              id: selectedRow ? selectedRow.id : '',
              ciudad_origen_id: selectedRow ? selectedRow.ciudad_origen_id : '',
              ciudad_destino_id: selectedRow
                ? selectedRow.ciudad_destino_id
                : '',
              servicio_id: selectedRow ? selectedRow.servicio_id : '',
              tipo_servicio: selectedRow ? selectedRow.tipo_servicio : '',
              tipo_servicio_otro: selectedRow
                ? selectedRow.tipo_servicio_otro
                : '',
              numero_dias_viaje: selectedRow
                ? selectedRow.numero_dias_viaje
                : dias_viajes,
              asociado_id: selectedRow ? selectedRow.asociado_id : '',
              valor_tarifa: selectedRow ? selectedRow.valor_tarifa : '',
              valor_tarifa_dia_adicional: selectedRow
                ? selectedRow.valor_tarifa_dia_adicional
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
            {({values, initialValues, setFieldValue}) => (
              <TarifaForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                ciudades={ciudades}
                servicios={servicios}
                asociados={asociados}
                TIPOS_SERVICIOS={TIPOS_SERVICIOS}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default TarifaCreator;
