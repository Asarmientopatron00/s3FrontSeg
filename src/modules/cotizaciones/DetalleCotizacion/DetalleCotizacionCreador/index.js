import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import DetalleCotizacionForm from './DetalleCotizacionForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {
  CREATE_DETALLE_COTIZACION,
  UPDATE_DETALLE_COTIZACION,
} from '../../../../shared/constants/ActionTypes';
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
    )
    .when(['cantidad_rutas', 'ciudad_origen_id'], {
      is: (cantidad_rutas, ciudad_origen_id, ciudad_destino_id) =>
        cantidad_rutas === 0 && ciudad_origen_id !== ciudad_destino_id,
      then: yup.string().oneOf([-1], 'La ruta seleccionada no existe'),
    }),
  servicio_id: yup.string().required('Requerido'),
  valor_servicio: yup.string().required('Requerido'),
});

const DetalleCotizacionCreator = (props) => {
  const {
    detalleCotizacion,
    handleOnClose,
    accion,
    ciudades,
    servicios,
    titulo,
    empresa,
    fecha,
    rows,
    id,
    idAux,
    setIdAux,
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
  const [selectedRow, setSelectedRow] = useState();
  const [index, setIndex] = useState();
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
      rows.forEach((row, index) => {
        if (row.id === detalleCotizacion) {
          setSelectedRow(row);
          setIndex(index);
        }
      });
    }
    if (accion === 'crear') {
      setSelectedRow();
    }
  }, [accion, detalleCotizacion, rows]);
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
              fecha: fecha,
              empresa: empresa,
              ciudad_origen_id: selectedRow
                ? selectedRow.ciudad_origen_id
                  ? selectedRow.ciudad_origen_id
                  : ''
                : '',
              ciudad_destino_id: selectedRow
                ? selectedRow.ciudad_destino_id
                  ? selectedRow.ciudad_destino_id
                  : ''
                : '',
              servicio_id: selectedRow
                ? selectedRow.servicio_id
                  ? selectedRow.servicio_id
                  : ''
                : '',
              valor_servicio: selectedRow ? selectedRow.valor_servicio : '',
              cantidad_rutas: 0,
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting, resetForm}) => {
              setSubmitting(true);
              if (accion === 'crear') {
                let newRow = {
                  ciudad_origen_id: data.ciudad_origen_id,
                  ciudad_destino_id: data.ciudad_destino_id,
                  servicio_id: data.servicio_id,
                  valor_servicio: data.valor_servicio,
                  numero_cotizacion_servicio: id,
                  id: idAux,
                };

                setIdAux(idAux + 1);

                ciudades.forEach((ciudad) => {
                  if (ciudad.id === newRow.ciudad_origen_id) {
                    newRow = {
                      ...newRow,
                      ciudad_origen: ciudad.nombre + '-' + ciudad.departamento,
                    };
                  }
                  if (ciudad.id === newRow.ciudad_destino_id) {
                    newRow = {
                      ...newRow,
                      ciudad_destino: ciudad.nombre + '-' + ciudad.departamento,
                    };
                  }
                });

                servicios.forEach((servicio) => {
                  if (servicio.id === newRow.servicio_id) {
                    newRow = {...newRow, servicio: servicio.nombre};
                  }
                });

                dispatch({type: CREATE_DETALLE_COTIZACION, payload: newRow});
                handleOnClose();
              } else if (accion === 'editar') {
                setSubmitting(true);

                let aux = selectedRow;
                aux.ciudad_origen_id = data.ciudad_origen_id;
                aux.ciudad_destino_id = data.ciudad_destino_id;
                aux.servicio_id = data.servicio_id;
                aux.valor_servicio = data.valor_servicio;

                ciudades.forEach((ciudad) => {
                  if (ciudad.id === aux.ciudad_origen_id) {
                    aux = {
                      ...aux,
                      ciudad_origen: ciudad.nombre + '-' + ciudad.departamento,
                    };
                  }
                  if (ciudad.id === aux.ciudad_destino_id) {
                    aux = {
                      ...aux,
                      ciudad_destino: ciudad.nombre + '-' + ciudad.departamento,
                    };
                  }
                });

                dispatch({
                  type: UPDATE_DETALLE_COTIZACION,
                  payload: {aux, index},
                });
                handleOnClose();
              }
              setSubmitting(false);
            }}>
            {({values, initialValues, setFieldValue}) => (
              <DetalleCotizacionForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                ciudades={ciudades}
                servicios={servicios}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default DetalleCotizacionCreator;
