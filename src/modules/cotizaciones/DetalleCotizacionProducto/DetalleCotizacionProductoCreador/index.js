import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Scrollbar} from '../../../../@crema';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import DetalleCotizacionForm from './DetalleCotizacionProductoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {useDispatch} from 'react-redux';
import {
  CREATE_DETALLE_COTIZACION_PRODUCTO,
  UPDATE_DETALLE_COTIZACION_PRODUCTO,
  SHOW_MESSAGE,
} from '../../../../shared/constants/ActionTypes';
import {onGetDiasViajes} from '../../../../redux/actions/TarifaAction';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  producto_id: yup.string().required('Requerido'),
  color_id: yup.string().nullable(),
  dimensiones_producto: yup
    .string()
    .nullable()
    .max(128, mensajeValidacion('max', 128)),
  cantidad: yup.number().required('Requerido'),
  valor_unitario_producto: yup
    .number()
    .typeError(mensajeValidacion('numero'))
    .required('Requerido'),
});

const DetalleCotizacionCreator = (props) => {
  const {
    detalleCotizacion,
    handleOnClose,
    accion,
    colores,
    productos,
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

  // let dias_viajes = useRef();
  // dias_viajes = useSelector(({tarifaReducer}) => tarifaReducer.dias_viajes);

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
      dispatch(onGetDiasViajes());
      setSelectedRow();
    }
  }, [dispatch, accion, detalleCotizacion, rows]);
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
              fecha: fecha,
              empresa: empresa,
              numero_cotizacion_producto: selectedRow
                ? selectedRow.numero_cotizacion_producto
                  ? selectedRow.numero_cotizacion_producto
                  : ''
                : '',
              producto_id: selectedRow
                ? selectedRow.producto_id
                  ? selectedRow.producto_id
                  : ''
                : '',
              cantidad: selectedRow ? selectedRow.cantidad : '',
              dimensiones_producto: selectedRow
                ? selectedRow.dimensiones_producto
                : '',
              color_id: selectedRow
                ? selectedRow.color_id
                  ? selectedRow.color_id
                  : ''
                : '',
              valor_unitario_producto: selectedRow
                ? selectedRow.valor_unitario_producto
                : '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting, resetForm}) => {
              setSubmitting(true);
              if (accion === 'crear') {
                let newRow = {
                  producto_id: data.producto_id,
                  cantidad: data.cantidad,
                  color_id: data.color_id,
                  dimensiones_producto: data.dimensiones_producto,
                  valor_unitario_producto: data.valor_unitario_producto,
                  numero_cotizacion_producto: id,
                  id: idAux,
                };

                setIdAux(idAux + 1);

                productos.forEach((producto) => {
                  if (producto.id === newRow.producto_id) {
                    newRow = {
                      ...newRow,
                      producto: producto.nombre,
                      codigo_producto: producto.codigo_producto,
                    };
                  }
                });

                colores.forEach((color) => {
                  if (color.id === newRow.color_id) {
                    newRow = {...newRow, color: color.nombre};
                  }
                });

                handleOnClose();
                dispatch({
                  type: CREATE_DETALLE_COTIZACION_PRODUCTO,
                  payload: newRow,
                });
                dispatch({
                  type: SHOW_MESSAGE,
                  payload: 'El detalle de cotización ha sido creado',
                });
              } else if (accion === 'editar') {
                setSubmitting(true);

                let aux = selectedRow;
                aux.producto_id = data.producto_id;
                aux.cantidad = data.cantidad;
                aux.color_id = data.color_id;
                aux.dimensiones_producto = data.dimensiones_producto;
                aux.valor_unitario_producto = data.valor_unitario_producto;

                productos.forEach((producto) => {
                  if (producto.id === aux.producto_id) {
                    aux = {
                      ...aux,
                      producto: producto.nombre,
                      codigo_producto: producto.codigo_producto,
                    };
                  }
                });

                colores.forEach((color) => {
                  if (color.id === aux.color_id) {
                    aux = {
                      ...aux,
                      color: color.nombre,
                    };
                  }
                });
                handleOnClose();
                dispatch({
                  type: UPDATE_DETALLE_COTIZACION_PRODUCTO,
                  payload: {aux, index},
                });
                dispatch({
                  type: SHOW_MESSAGE,
                  payload: 'El detalle de cotización ha sido modificado',
                });
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
                colores={colores}
                productos={productos}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default DetalleCotizacionCreator;
