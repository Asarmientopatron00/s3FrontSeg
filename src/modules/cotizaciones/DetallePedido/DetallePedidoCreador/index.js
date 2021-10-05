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
} from '../../../../shared/constants/ActionTypes';
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
    )
    .when(['cantidad_rutas', 'ciudad_origen_id'], {
      is: (cantidad_rutas, ciudad_origen_id, ciudad_destino_id) =>
        cantidad_rutas === 0 && ciudad_origen_id !== ciudad_destino_id,
      then: yup.string().oneOf([-1], 'La ruta seleccionada no existe'),
    }),
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
  valor_servicio: yup.string().required('Requerido'),
  valor_tarifa_dia_adicional: yup
    .number()
    .typeError(mensajeValidacion('numero'))
    .nullable(),
});

const DetallePedidoCreator = (props) => {
  const {
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
              id: selectedRow ? selectedRow.id : '',
              numero_pedido: selectedRow
                ? selectedRow.numero_pedido
                : numero_pedido,
              fecha: fecha,
              asociado: asociado,
              documento: documento,
              codigo_producto: selectedRow
                ? selectedRow.codigo_producto
                  ? selectedRow.codigo_producto
                  : ''
                : '',
              cantidad: selectedRow
                ? selectedRow.cantidad
                  ? selectedRow.cantidad
                  : ''
                : '',
              color: selectedRow
                ? selectedRow.color
                  ? selectedRow.color
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
            // validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting, resetForm}) => {
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

                // ciudades.forEach((ciudad) => {
                //   if (ciudad.id === newRow.codigo_producto) {
                //     newRow = {
                //       ...newRow,
                //       ciudad_origen: ciudad.nombre + '-' + ciudad.departamento,
                //     };
                //   }
                //   if (ciudad.id === newRow.ciudad_destino_id) {
                //     newRow = {
                //       ...newRow,
                //       ciudad_destino: ciudad.nombre + '-' + ciudad.departamento,
                //     };
                //   }
                // });

                // servicios.forEach((servicio) => {
                //   if (servicio.id === newRow.servicio_id) {
                //     newRow = {...newRow, servicio: servicio.nombre};
                //   }
                // });

                dispatch({type: CREATE_DETALLE_PEDIDO, payload: newRow});
                console.log(newRow);
                //handleOnClose();
              } else if (accion === 'editar') {
                setSubmitting(true);

                let aux = selectedRow;
                aux.ciudad_origen_id = data.ciudad_origen_id;
                aux.ciudad_destino_id = data.ciudad_destino_id;
                aux.servicio_id = data.servicio_id;
                aux.tipo_servicio = data.tipo_servicio;
                aux.tipo_servicio_otro = data.tipo_servicio_otro;
                aux.numero_dias_viaje = data.numero_dias_viaje;
                aux.valor_servicio = data.valor_servicio;
                aux.valor_servicio_dia_adicional =
                  data.valor_servicio_dia_adicional;

                // ciudades.forEach((ciudad) => {
                //   if (ciudad.id === aux.ciudad_origen_id) {
                //     aux = {
                //       ...aux,
                //       ciudad_origen: ciudad.nombre + '-' + ciudad.departamento,
                //     };
                //   }
                //   if (ciudad.id === aux.ciudad_destino_id) {
                //     aux = {
                //       ...aux,
                //       ciudad_destino: ciudad.nombre + '-' + ciudad.departamento,
                //     };
                //   }
                // });
                dispatch({
                  type: UPDATE_DETALLE_PEDIDO,
                  payload: {aux, index},
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
