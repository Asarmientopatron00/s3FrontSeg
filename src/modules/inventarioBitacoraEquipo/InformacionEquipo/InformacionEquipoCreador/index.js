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
} from '../../../../redux/actions/InformacionEquipoAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import InformacionEquipoForm from './InformacionEquipoForm';
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

const InformacionEquipoCreator = (props) => {
  const {
    informacionEquipo,
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
      dispatch(onShow(informacionEquipo));
    }
  }, [accion, dispatch, informacionEquipo]);

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
              numero_serial: selectedRow ? selectedRow.numero_serial : '',
              nombre_equipo: selectedRow ? selectedRow.nombre_equipo : '',
              tipo_equipo: selectedRow ? selectedRow.tipo_equipo : '',
              fecha_compra_equipo: selectedRow
                ? selectedRow.fecha_compra_equipo
                : '',
              fecha_activacion_equipo: selectedRow
                ? selectedRow.fecha_activacion_equipo
                : '',
              valor_costo_equipo_USD: selectedRow
                ? selectedRow.valor_costo_equipo_USD
                : '',
              nombre_proveedor: selectedRow ? selectedRow.nombre_proveedor : '',
              equipo_desechable: selectedRow
                ? selectedRow.equipo_desechable
                : '',
              observaciones: selectedRow ? selectedRow.observaciones : '',
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
              <InformacionEquipoForm
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

export default InformacionEquipoCreator;
