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
} from '../../../../redux/actions/TipoDocumentoAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import TipoDocumentoForm from './TipoDocumentoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  nombre: yup.string().required('Requerido'),
  codigo: yup.string().required('Requerido').max(2,'Debe Tener Máximo 2 Carácteres'),
});

const TipoDocumentoCreator = (props) => {
  const {
    tipoDocumento,
    handleOnClose,
    accion,
    showForm,
    updateColeccion,
    asociados,
    roles,
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

  let {selectedRow} = useSelector(({tipoDocumentoReducer}) => tipoDocumentoReducer);
  
  if (accion==='crear'){
    selectedRow = {estado:'1'};
  }

  useEffect(()=>{
    if (accion==='editar' | accion==='ver'){
      dispatch(
        onShow(tipoDocumento),
      );
    }
  },[accion,dispatch,tipoDocumento])
  
  return (
    <Dialog
      open= {showForm}
      onClose={handleOnClose}
      aria-labelledby='simple-modal-title'
      TransitionComponent={Transition}
      aria-describedby='simple-modal-description'
      className={classes.dialogBox}
      disableBackdropClick = {true}
      maxWidth={'sm'}
    >
      <Scrollbar>
        <Formik
          initialStatus={true}
          enableReinitialize={true}
          initialValues={{
            id: selectedRow ? selectedRow.id : '',
            nombre: selectedRow ? selectedRow.nombre : '',
            codigo: selectedRow ? selectedRow.codigo : '',
            estado: selectedRow ? selectedRow.estado:'0',
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
              resetForm();
              setSubmitting(false);
              handleOnClose();
              updateColeccion();
            },3000)
          }}
        >
          {({values, setFieldValue}) => (
            <TipoDocumentoForm
              values={values}
              setFieldValue={setFieldValue}
              handleOnClose={handleOnClose}
              accion={accion}
              asociados={asociados}
              roles={roles}
            />
          )}
        </Formik>
      </Scrollbar>
    </Dialog>
  );
};

export default TipoDocumentoCreator;
