import React, {useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch,useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShow,
  onUpdate,
  onCreate,
} from '../../../../redux/actions/Usuario';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import UsuarioForm from './UsuarioForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  nombre: yup.string().required('Requerido'),
  identificacion_usuario: yup.string().required('Requerido'),
  asociado_id: yup.string().equals(['1'],'ssss').required('Requerido'),
  rol_id: yup.number().required('Requerido'),
  email: yup
    .string()
    .email('Formato de Email No Válido')
    .required('Requerido'),
  cargo: yup.string().required('Requerido'),
  numero_celular: yup
    .string()
    .required('Requerido')
    .max(12,'Debe Tener Máximo 12 Números')
    .min(7,'Debe Tener Mínimo 7 Números'),
  
});

const UsuarioCreador = (props) => {
  const {
    usuario,
    handleOnClose,
    accion,
    showForm,
    updateColeccion,
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

  let {selectedRow} = useSelector(({usuario}) => usuario);
  
  if (accion==='crear'){
    selectedRow = {estado:1};
  }

  useEffect(()=>{
    if (accion==='editar' | accion==='ver'){
      dispatch(
        onShow(usuario),
      );
    }
  },[accion,dispatch,usuario])
  
  return (
    <Dialog
      open= {showForm}
      onClose={handleOnClose}
      aria-labelledby='simple-modal-title'
      TransitionComponent={Transition}
      aria-describedby='simple-modal-description'
      className={classes.dialogBox}>
       <Scrollbar>
        <Formik
          initialStatus={true}
          enableReinitialize={true}
          initialValues={{
            id: selectedRow ? selectedRow.id : '',
            identificacion_usuario: selectedRow ? selectedRow.identificacion_usuario : '',
            nombre: selectedRow ? selectedRow.nombre : '',
            asociado_id: selectedRow ? selectedRow.asociado_id : '',
            rol_id: selectedRow ? selectedRow.rol_id : '',
            email: selectedRow ? selectedRow.email : '',
            cargo: selectedRow ? selectedRow.cargo : '',
            numero_celular: selectedRow ? selectedRow.numero_celular : '',
            estado: selectedRow ? selectedRow.estado : '1',
          }}
           validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            if (accion==='crear'){
              dispatch(onCreate(data));
            } else if(accion==='editar') {
              if (selectedRow) {
                dispatch(onUpdate(data));
              } 
            }
            setTimeout(()=>{
              handleOnClose();
              resetForm();
              setSubmitting(false);
              updateColeccion();
            },3000)
          }}
          >
          {({values, setFieldValue}) => (
            <UsuarioForm
              values={values}
              setFieldValue={setFieldValue}
              handleOnClose={handleOnClose}
              accion={accion}
            />
          )}
        </Formik>
      </Scrollbar>
    </Dialog>
  );
};

export default UsuarioCreador;

UsuarioCreador.defaultProps = {
  selectedRow: {estado:1},
};

// UsuarioCreador.prototype = {
//   isAddContact: PropTypes.bool.isRequired,
//   handleAddContactClose: PropTypes.func.isRequired,
//   selectedRow: PropTypes.object,
//   onUpdateContact: PropTypes.func,
// };
