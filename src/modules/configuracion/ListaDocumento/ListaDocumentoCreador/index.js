import React, {useEffect,useRef,useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch,useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {
  onShow,
  onUpdate,
  onCreate,
} from '../../../../redux/actions/ListaDocumentoAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import ListaDocumentoForm from './ListaDocumentoForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  nombre: yup.string().required('Requerido'),
  tipo: yup.string().required('Requerido'),
  obligatorio: yup.string().required('Requerido'),
});

const ListaDocumentoCreator = (props) => {
  const {
    listaDocumento,
    handleOnClose,
    accion,
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

  const [showForm,setShowForm] = useState(false);
  let selectedRow = useRef();
  selectedRow = useSelector(({listaDocumentoReducer}) => listaDocumentoReducer.selectedRow);

  const initializeSelectedRow = ()=> {
    selectedRow=null;
  }
  useEffect(()=>{
    initializeSelectedRow();
  },[])

  if (accion==='crear') {
    initializeSelectedRow();
  }
  
  useEffect(()=>{
    if(selectedRow){
      setShowForm(true);
    } else if(accion==='crear') {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  },[selectedRow,accion])

  useEffect(()=>{
    if (accion==='editar' | accion==='ver'){
      dispatch(
        onShow(listaDocumento),
      );
    }
  },[accion,dispatch,listaDocumento])
  
  return (
    showForm&&
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
          validateOnBlur={false}
          initialValues={{
            id: selectedRow ? selectedRow.id : '',
            nombre: selectedRow ? selectedRow.nombre : '',
            tipo: selectedRow ? selectedRow.tipo : '',
            obligatorio: selectedRow ? selectedRow.obligatorio : 'N',
            estado: selectedRow ? (selectedRow.estado===1?'1':'0'):'1',
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
            resetForm();
            setSubmitting(false);
            handleOnClose();
            updateColeccion();
          }}
        >
          {({values,initialValues, setFieldValue}) => (
            <ListaDocumentoForm
              values={values}
              setFieldValue={setFieldValue}
              handleOnClose={handleOnClose}
              accion={accion}
              asociados={asociados}
              roles={roles}
              initialValues={initialValues}
            />
          )}
        </Formik>
      </Scrollbar>
    </Dialog>
  );
};

export default ListaDocumentoCreator;
