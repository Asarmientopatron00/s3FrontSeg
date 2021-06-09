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
} from '../../../../redux/actions/ActividadEconomicaAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import ActividadEconomicaForm from './ActividadEconomicaForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  nombre: yup.string().required('Requerido'),
  codigo_ciiu: yup.string().required('Requerido').max(4,'Debe Tener Máximo 4 Caracteres'),
});

const ActividadEconomicaCreator = (props) => {
  const {
    actividadEconomica,
    handleOnClose,
    accion,
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
  const [showForm,setShowForm] = useState(false);
  let selectedRow = useRef();
  selectedRow = useSelector(({actividadEconomicaReducer}) => actividadEconomicaReducer.selectedRow);

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
        onShow(actividadEconomica),
      );
    }
  },[accion,dispatch,actividadEconomica])
  
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
            codigo_ciiu: selectedRow ? selectedRow.codigo_ciiu : '',
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
            <ActividadEconomicaForm
              values={values}
              setFieldValue={setFieldValue}
              handleOnClose={handleOnClose}
              accion={accion}
              initialValues={initialValues}
            />
          )}
        </Formik>
      </Scrollbar>
    </Dialog>
  );
};

export default ActividadEconomicaCreator;
