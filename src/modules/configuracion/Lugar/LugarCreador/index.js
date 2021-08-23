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
} from '../../../../redux/actions/LugarAction';

import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import LugarForm from './LugarForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  nombre: yup.string().required('Requerido'),
  departamento_id: yup.string().required('Requerido'),
  ciudad_id: yup.string().required('Requerido'),
  direccion: yup.string().required('Requerido'),
  lugar_asociado_negocios: yup.string().required('Requerido'),
  lugar_aduana_general: yup.string().required('Requerido'),
  asociado_id: yup.string().when('lugar_asociado_negocios', {
    is: 'S',
    then: yup.string().required('Requerido'),
  }),
});

const LugarCreator = (props) => {
  const {
    lugar,
    handleOnClose,
    accion,
    updateColeccion,
    departamentos,
    ciudades,
    asociados,
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
  selectedRow = useSelector(({lugarReducer}) => lugarReducer.selectedRow);

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
      dispatch(onShow(lugar));
    }
  }, [accion, dispatch, lugar]);

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
              nombre: selectedRow ? selectedRow.nombre : '',
              departamento_id: selectedRow
                ? selectedRow.departamento_id
                  ? selectedRow.departamento_id
                  : ''
                : '',
              ciudad_id: selectedRow
                ? selectedRow.ciudad_id
                  ? selectedRow.ciudad_id
                  : ''
                : '',
              direccion: selectedRow
                ? selectedRow.direccion
                  ? selectedRow.direccion
                  : ''
                : '',
              lugar_aduana_general: selectedRow
                ? selectedRow.lugar_aduana_general
                  ? selectedRow.lugar_aduana_general
                  : ''
                : '',
              lugar_asociado_negocios: selectedRow
                ? selectedRow.lugar_asociado_negocios
                  ? selectedRow.lugar_asociado_negocios
                  : ''
                : '',
              asociado_id: selectedRow
                ? selectedRow.asociado_id
                  ? selectedRow.asociado_id
                  : ''
                : '',
              geocerca_id: selectedRow
                ? selectedRow.geocerca_id
                  ? selectedRow.geocerca_id
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
            {({values, initialValues, setFieldValue, touched}) => (
              <LugarForm
                values={values}
                setFieldValue={setFieldValue}
                touched={touched}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                departamentos={departamentos}
                ciudades={ciudades}
                asociados={asociados}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default LugarCreator;
