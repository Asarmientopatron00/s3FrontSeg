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
} from '../../../../redux/actions/CiudadAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import CiudadForm from './CiudadForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  nombre: yup.string().required('Requerido'),
  codigo_dane: yup.string().required('Requerido').min(5,'Debe Tener Mínimo 5 Caracteres').max(5,'Debe Tener Máximo 5 Caracteres'),
  departamento_id: yup.string().required('Requerido'),
});

const CiudadCreator = (props) => {
  const {
    ciudad,
    handleOnClose,
    accion,
    updateColeccion,
    departamentos,
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
  selectedRow = useSelector(({ciudadReducer}) => ciudadReducer.selectedRow);

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
        onShow(ciudad),
      );
    }
  },[accion,dispatch,ciudad])
  
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
            codigo_dane: selectedRow ? selectedRow.codigo_dane : '',
            departamento_id: selectedRow ? selectedRow.departamento_id : '',
            geocerca_id: selectedRow ? selectedRow.geocerca_id : '',
            estado: selectedRow ? (selectedRow.estado===1?'1':'0'):'1',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            if (accion==='crear'){
              dispatch(onCreate(data,handleOnClose,updateColeccion));
            } else if(accion==='editar') {
              if (selectedRow) {
                dispatch(onUpdate(data,handleOnClose,updateColeccion));
              } 
            }
            // resetForm();
            setSubmitting(false);
            // handleOnClose();
            // updateColeccion();
          }}
        >
          {({values,initialValues, setFieldValue}) => (
            <CiudadForm
              values={values}
              setFieldValue={setFieldValue}
              handleOnClose={handleOnClose}
              accion={accion}
              initialValues={initialValues}
              departamentos={departamentos}
            />
          )}
        </Formik>
      </Scrollbar>
    </Dialog>
  );
};

export default CiudadCreator;
