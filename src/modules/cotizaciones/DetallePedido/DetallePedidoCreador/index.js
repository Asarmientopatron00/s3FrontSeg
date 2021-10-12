import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Scrollbar} from '../../../../@crema';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import DetallePedidoForm from './DetallePedidoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {useDispatch} from 'react-redux';
import {
  CREATE_DETALLE_PEDIDO,
  UPDATE_DETALLE_PEDIDO,
  SHOW_MESSAGE,
  FETCH_START,
} from '../../../../shared/constants/ActionTypes';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  producto_id: yup.string().required('Requerido'),
  cantidad: yup
    .number()
    .typeError(mensajeValidacion('numero'))
    .required('Requerido'),
  prefijo: yup.string().max(128, mensajeValidacion('max', 128)).nullable(),
  posfijo: yup.string().max(128, mensajeValidacion('max', 128)).nullable(),
  dimensiones: yup.string().max(128, mensajeValidacion('max', 128)).nullable(),
});

const DetallePedidoCreator = (props) => {
  const {
    accionDetalle,
    detallePedido,
    handleOnClose,
    accion,
    productos,
    titulo,
    fecha,
    rows,
    numero_pedido,
    idAux,
    setIdAux,
    COLORES_EQUIPOS,
    asociado,
    documento,
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
  const [selectedRow, setSelectedRow] = useState([]);
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
        if (row.id === detallePedido) {
          setSelectedRow(row);
          setIndex(index);
        }
      });
    }
    if (accion === 'crear') {
      setSelectedRow();
    }
  }, [dispatch, accion, detallePedido, rows]);
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
              id:
                accionDetalle === 'copiar'
                  ? ''
                  : selectedRow
                  ? selectedRow.id
                  : '',
              numero_pedido:
                accionDetalle === 'copiar'
                  ? ''
                  : selectedRow
                  ? selectedRow.numero_pedido
                  : numero_pedido,
              fecha: fecha,
              asociado: asociado,
              documento: documento,
              producto_id: selectedRow
                ? selectedRow.producto_id
                  ? selectedRow.producto_id
                  : ''
                : '',
              cantidad: selectedRow
                ? selectedRow.cantidad
                  ? selectedRow.cantidad
                  : ''
                : '',
              color: selectedRow
                ? selectedRow.color
                  ? String(selectedRow.color)
                  : ''
                : '',
              prefijo: selectedRow ? selectedRow.prefijo : '',
              posfijo: selectedRow ? selectedRow.posfijo : '',
              serie_inicial_articulo: selectedRow
                ? selectedRow.serie_inicial_articulo
                : '',
              serie_final_articulo: selectedRow
                ? selectedRow.serie_final_articulo
                : '',
              longitud_serial: selectedRow ? selectedRow.longitud_serial : '',
              dimensiones: selectedRow ? selectedRow.dimensiones : '',
              especificaciones: selectedRow ? selectedRow.especificaciones : '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting, resetForm}) => {
              dispatch({type: FETCH_START});
              setSubmitting(true);
              if (accion === 'crear') {
                let newRow = {
                  producto_id: data.producto_id,
                  cantidad: data.cantidad,
                  color: data.color,
                  prefijo: data.prefijo,
                  posfijo: data.posfijo,
                  serie_inicial_articulo: data.serie_inicial_articulo,
                  serie_final_articulo: data.serie_final_articulo,
                  longitud_serial: data.longitud_serial,
                  dimensiones: data.dimensiones,
                  numero_pedido: numero_pedido,
                  id: idAux,
                };

                setIdAux(idAux + 1);
                productos.forEach((producto) => {
                  if (producto.id === newRow.producto_id) {
                    newRow = {
                      ...newRow,
                      producto: producto.nombre,
                      codigo_producto: producto.codigo_producto,
                      tipo_producto: producto.tipo_producto,
                    };
                  }
                });
                dispatch({type: CREATE_DETALLE_PEDIDO, payload: newRow});
                dispatch({
                  type: SHOW_MESSAGE,
                  payload: 'El detalle ha sido creado',
                });
                handleOnClose();
              } else if (accion === 'editar') {
                dispatch({type: FETCH_START});
                setSubmitting(true);

                let aux = selectedRow;
                aux.producto_id = data.producto_id;
                aux.cantidad = data.cantidad;
                aux.color = data.color;
                aux.prefijo = data.prefijo;
                aux.posfijo = data.posfijo;
                aux.serie_inicial_articulo = data.serie_inicial_articulo;
                aux.serie_final_articulo = data.serie_final_articulo;
                aux.longitud_serial = data.longitud_serial;
                aux.dimensiones = data.dimensiones;

                productos.forEach((producto) => {
                  if (producto.id === aux.producto_id) {
                    aux = {
                      ...aux,
                      producto: producto.nombre,
                      codigo_producto: producto.codigo_producto,
                      tipo_producto: producto.tipo_producto,
                    };
                  }
                });
                dispatch({
                  type: UPDATE_DETALLE_PEDIDO,
                  payload: {aux, index},
                });
                dispatch({
                  type: SHOW_MESSAGE,
                  payload: 'El detalle ha sido modificado',
                });

                handleOnClose();
              }
              setSubmitting(false);
            }}>
            {({values, initialValues, setFieldValue}) => (
              <DetallePedidoForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                productos={productos}
                COLORES_EQUIPOS={COLORES_EQUIPOS}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default DetallePedidoCreator;
