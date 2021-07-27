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
} from '../../../../redux/actions/UsuarioAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import UsuarioForm from './UsuarioForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
} from './../../../../shared/constants/Constantes';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const UsuarioCreador = (props) => {
  const {
    usuario,
    handleOnClose,
    accion,
    updateColeccion,
    asociados,
    roles,
    titulo,
  } = props;

  let validationSchema = yup.object({
    nombre: yup.string().required('Requerido'),
    identificacion_usuario: yup.string().required('Requerido'),
    asociado_id: yup.string().required('Requerido'),
    rol_id: yup.number().required('Requerido'),
    email: yup
      .string()
      .email('Formato de Email No Válido')
      .required('Requerido'),
    numero_celular: yup
      .string()
      .required('Requerido')
      .max(
        LONGITUD_MAXIMA_TELEFONOS,
        'Debe Tener Máximo ' + LONGITUD_MAXIMA_TELEFONOS + ' Números',
      )
      .min(
        LONGITUD_MINIMA_TELEFONOS,
        'Debe Tener Mínimo ' + LONGITUD_MINIMA_TELEFONOS + ' Números',
      ),
  });

  if (accion === 'crear') {
    validationSchema = yup.object({
      nombre: yup.string().required('Requerido'),
      identificacion_usuario: yup.string().required('Requerido'),
      asociado_id: yup.string().required('Requerido'),
      rol_id: yup.number().required('Requerido'),
      email: yup
        .string()
        .email('Formato de Email No Válido')
        .required('Requerido'),
      numero_celular: yup
        .string()
        .required('Requerido')
        .max(
          LONGITUD_MAXIMA_TELEFONOS,
          'Debe Tener Máximo ' + LONGITUD_MAXIMA_TELEFONOS + ' Números',
        )
        .min(
          LONGITUD_MINIMA_TELEFONOS,
          'Debe Tener Mínimo ' + LONGITUD_MINIMA_TELEFONOS + ' Números',
        ),
      clave: yup.string().required('Requerido'),
    });
  }

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
  selectedRow = useSelector(({usuarioReducer}) => usuarioReducer.selectedRow);

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
      dispatch(onShow(usuario));
    }
  }, [accion, dispatch, usuario]);

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
            initialStatus={false}
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={{
              id: selectedRow ? selectedRow.id : '',
              identificacion_usuario: selectedRow
                ? selectedRow.identificacion_usuario
                : '',
              nombre: selectedRow ? selectedRow.nombre : '',
              asociado_id: selectedRow ? selectedRow.asociado_id : '',
              rol_id: selectedRow ? selectedRow.rol_id : '',
              email: selectedRow ? selectedRow.email : '',
              cargo: selectedRow ? selectedRow.cargo : '',
              numero_celular: selectedRow ? selectedRow.numero_celular : '',
              estado: selectedRow
                ? selectedRow.estado === 1
                  ? '1'
                  : '0'
                : '1',
              clave: '',
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
              <UsuarioForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                asociados={asociados}
                roles={roles}
                initialValues={initialValues}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default UsuarioCreador;

// UsuarioCreador.prototype = {
//   isAddContact: PropTypes.bool.isRequired,
//   handleAddContactClose: PropTypes.func.isRequired,
//   selectedRow: PropTypes.object,
//   onUpdateContact: PropTypes.func,
// };
