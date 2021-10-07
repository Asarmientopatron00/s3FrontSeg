import React, {useEffect, useRef, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShow,
  onUpdate,
  onCreate,
} from '../../../../redux/actions/PedidoAction';
import {onGetColeccionLigera} from '../../../../redux/actions/AsociadoAction';
import {onGetColeccionLigera as coleccionLigeraDepartamento} from '../../../../redux/actions/DepartamentoAction';
import PedidoForm from './PedidoForm';
// import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import {useParams} from 'react-router-dom';
import {history} from 'redux/store';
import format from 'date-fns/format';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {ESTADO_PEDIDOS} from '../../../../shared/constants/ListasValores';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
  VALIDACION_REGEX_TELEFONOS,
} from '../../../../shared/constants/Constantes';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';
import {
  FETCH_ERROR,
  FETCH_START,
} from '../../../../shared/constants/ActionTypes';
const PedidoCreator = (props) => {
  const {accion, id} = useParams();
  const handleOnClose = () => {
    window.location.href = '/pedidos';
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetColeccionLigera(true));
    dispatch(coleccionLigeraDepartamento(true));
  }, [dispatch]);

  let selectedRow = useRef();
  selectedRow = useSelector(({pedidoReducer}) => pedidoReducer.selectedRow);

  const asociados = useSelector(({asociadoReducer}) => asociadoReducer.ligera);
  const ciudades = useSelector(({ciudadReducer}) => ciudadReducer.ligera);
  const departamentos = useSelector(
    ({departamentoReducer}) => departamentoReducer.ligera,
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

  if (
    accion !== 'editar' &&
    accion !== 'ver' &&
    accion !== 'crear' &&
    accion !== 'copiar'
  ) {
    history.goBack();
  }

  useEffect(() => {
    if ((accion === 'editar') | (accion === 'ver') | (accion === 'copiar')) {
      dispatch(onShow(id));
    }
  }, [accion, dispatch, id]);
  const validationSchema = yup.object({
    asociado_id: yup.string().required('Requerido'),
    fecha_pedido: yup.date().required('Requerido'),
    fecha_entrega_pedido: yup
      .date()
      .required('Requerido')
      .min(
        yup.ref('fecha_pedido'),
        'La fecha de entrega debe ser mayor a la del pedido',
      ),
    departamento_entrega_id: yup.string().required('Requerido'),
    ciudad_entrega_id: yup.string().required('Requerido'),
    direccion_entrega: yup.string().required('Requerido'),
    telefono_entrega: yup
      .string()
      .matches(VALIDACION_REGEX_TELEFONOS, mensajeValidacion('telefono'))
      .max(
        LONGITUD_MAXIMA_TELEFONOS,
        mensajeValidacion('max', LONGITUD_MAXIMA_TELEFONOS),
      )
      .min(
        LONGITUD_MINIMA_TELEFONOS,
        mensajeValidacion('min', LONGITUD_MINIMA_TELEFONOS),
      ),
  });

  const user = useAuthUser();
  const [detalles, setDetalles] = useState();
  return (
    <Scrollbar>
      <Formik
        initialStatus={true}
        enableReinitialize={true}
        validateOnBlur={false}
        initialValues={{
          id: accion === 'copiar' ? '' : selectedRow ? selectedRow.id : '',
          numero_pedido:
            accion === 'copiar'
              ? ''
              : selectedRow
              ? selectedRow.numero_pedido
                ? selectedRow.numero_pedido
                : ''
              : '',
          asociado_id:
            (accion === 'crear') | (accion === 'copiar') &&
            user.rol.tipo !== 'IN'
              ? user.asociado.id
              : selectedRow
              ? selectedRow.asociado_id
                ? selectedRow.asociado_id
                : ''
              : '',
          fecha_pedido: selectedRow
            ? selectedRow.fecha_pedido
            : format(new Date(Date.now()), 'yyyy-MM-dd'),
          fecha_entrega_pedido: selectedRow
            ? selectedRow.fecha_entrega_pedido
            : '',
          departamento_entrega_id: selectedRow
            ? selectedRow.departamento_entrega_id
              ? selectedRow.departamento_entrega_id
              : ''
            : '',
          ciudad_entrega_id: selectedRow
            ? selectedRow.ciudad_entrega_id
              ? selectedRow.ciudad_entrega_id
              : ''
            : '',
          direccion_entrega: selectedRow
            ? selectedRow.direccion_entrega
              ? selectedRow.direccion_entrega
              : ''
            : '',
          telefono_entrega: selectedRow
            ? selectedRow.telefono_entrega
              ? selectedRow.telefono_entrega
              : ''
            : '',
          responsable_entrega: selectedRow
            ? selectedRow.responsable_entrega
              ? selectedRow.responsable_entrega
              : ''
            : '',
          observaciones: selectedRow
            ? selectedRow.observaciones
              ? selectedRow.observaciones
              : ''
            : '',
          estado_pedido: selectedRow ? selectedRow.estado_pedido : 'REG',
          estado: selectedRow ? (selectedRow.estado === 1 ? '1' : '0') : '1',
          documento: selectedRow
            ? selectedRow.asociado
              ? selectedRow.asociado.numero_documento
              : ''
            : '',
          asociado: selectedRow
            ? selectedRow.asociado
              ? selectedRow.asociado.nombre
              : ''
            : '',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm, setFieldError}) => {
          dispatch({
            type: FETCH_START,
          });
          setSubmitting(true);

          if (detalles.length === 0) {
            dispatch({
              type: FETCH_ERROR,
              payload: 'Se debe agregar mínimo 1 detalle de pedido.',
            });

            return;
          }

          if ((accion === 'crear') | (accion === 'copiar')) {
            dispatch(onCreate(data, handleOnClose, detalles));
          } else if (accion === 'editar') {
            if (selectedRow) {
              dispatch(onUpdate(data, handleOnClose, detalles));
            }
          }
          setSubmitting(false);
        }}>
        {({values, initialValues, setFieldValue, setFieldError}) => (
          <PedidoForm
            values={values}
            setFieldValue={setFieldValue}
            accion={accion}
            initialValues={initialValues}
            setDetalles={setDetalles}
            asociados={asociados}
            departamentos={departamentos}
            ciudades={ciudades}
            user={user}
            ESTADO_PEDIDOS={ESTADO_PEDIDOS}
          />
        )}
      </Formik>
    </Scrollbar>
  );
};

export default PedidoCreator;
