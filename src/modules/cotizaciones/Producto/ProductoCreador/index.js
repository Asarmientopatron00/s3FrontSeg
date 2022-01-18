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
} from '../../../../redux/actions/ProductoAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import ProductoForm from './ProductoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  codigo_producto: yup
    .string()
    .required('Requerido')
    .max(128, mensajeValidacion('max', 128)),
  nombre: yup
    .string()
    .required('Requerido')
    .max(128, mensajeValidacion('max', 128)),
  alias_producto: yup
    .string()
    .required('Requerido')
    .max(128, mensajeValidacion('max', 128)),
  descripcion_tecnica_producto: yup
    .string()
    .required('Requerido')
    .max(128, mensajeValidacion('max', 128)),
  tipo_producto_id: yup.string().required('Requerido'),
  producto_empaque: yup
    .string()
    .required('Requerido')
    .max(1, mensajeValidacion('max', 1)),
  producto_cliente_especifico: yup
    .string()
    .required('Requerido')
    .max(1, mensajeValidacion('max', 1)),
  producto_produccion_id: yup
    .string()
    .nullable()
    .max(64, mensajeValidacion('max', 64)),
  producto_facturacion_id: yup
    .string()
    .nullable()
    .max(64, mensajeValidacion('max', 64)),
});

const ProductoCreator = (props) => {
  const {
    producto,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
    tiposProductos,
    colores,
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
  selectedRow = useSelector(({productoReducer}) => productoReducer.selectedRow);

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
      dispatch(onShow(producto));
    }
  }, [accion, dispatch, producto]);
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
              codigo_producto: selectedRow
                ? selectedRow.codigo_producto
                  ? selectedRow.codigo_producto
                  : ''
                : '',
              nombre: selectedRow
                ? selectedRow.nombre
                  ? selectedRow.nombre
                  : ''
                : '',
              alias_producto: selectedRow
                ? selectedRow.alias_producto
                  ? selectedRow.alias_producto
                  : ''
                : '',
              descripcion_tecnica_producto: selectedRow
                ? selectedRow.descripcion_tecnica_producto
                  ? selectedRow.descripcion_tecnica_producto
                  : ''
                : '',
              tipo_producto_id: selectedRow
                ? selectedRow.tipo_producto_id
                  ? selectedRow.tipo_producto_id
                  : ''
                : '',
              color_id: selectedRow
                ? selectedRow.color_id
                  ? selectedRow.color_id
                  : ''
                : '',
              dimensiones_producto: selectedRow
                ? selectedRow.dimensiones_producto
                  ? selectedRow.dimensiones_producto
                  : ''
                : '',
              caracteristicas_producto: selectedRow
                ? selectedRow.caracteristicas_producto
                  ? selectedRow.caracteristicas_producto
                  : ''
                : '',
              producto_empaque: selectedRow
                ? selectedRow.producto_empaque
                  ? selectedRow.producto_empaque
                  : ''
                : '',
              producto_cliente_especifico: selectedRow
                ? selectedRow.producto_cliente_especifico
                  ? selectedRow.producto_cliente_especifico
                  : ''
                : '',
              producto_produccion_id: selectedRow
                ? selectedRow.producto_produccion_id
                  ? selectedRow.producto_produccion_id
                  : ''
                : '',
              producto_facturacion_id: selectedRow
                ? selectedRow.producto_facturacion_id
                  ? selectedRow.producto_facturacion_id
                  : ''
                : '',
              archivo_foto: selectedRow
                ? selectedRow.archivo_foto
                  ? selectedRow.archivo_foto
                  : ''
                : '',
              archivo: '',
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
            {({values, initialValues, setFieldValue, errors, touched}) => (
              <ProductoForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                tiposProductos={tiposProductos}
                colores={colores}
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

export default ProductoCreator;
