import React, {useEffect, useRef} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Scrollbar} from '../../../../@crema';
import {onShowAgendaByDate} from '../../../../redux/actions/OrdenServicioAction';
import Slide from '@material-ui/core/Slide';
// import IntlMessages from '../../../../@crema/utility/IntlMessages';
// import PropTypes from 'prop-types';
import AceptacionOrdenServicioForm from './ConsultaAgendaServicioForm';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';

// import mensajeValidacion from '../../../../shared/functions/MensajeValidacion';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  indicativo_aceptacion: yup.string().required('Requerido'),
  observaciones_rechazo: yup.string().when('indicativo_aceptacion', {
    is: 'N',
    then: yup.string().required('Requerido'),
    otherwise: yup.string().nullable(),
  }),
});

const ConsultaAgendaServicioCreador = (props) => {
  const {consultaAgendaServicio, handleOnClose, accion, titulo, filtros} =
    props;

  const dispatch = useDispatch();

  useEffect(() => {
    if ((accion === 'editar') | (accion === 'ver')) {
      dispatch(onShowAgendaByDate(consultaAgendaServicio, filtros));
    }
  }, [accion, dispatch, consultaAgendaServicio]);

  const updateColection = () => {
    dispatch(onShowAgendaByDate(consultaAgendaServicio, filtros));
  };

  let selectedRow = useRef();
  selectedRow = useSelector(
    ({ordenServicioReducer}) => ordenServicioReducer.selectedRow,
  );

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

  return (
    true && (
      <Dialog
        open={true}
        onClose={handleOnClose}
        aria-labelledby='simple-modal-title'
        TransitionComponent={Transition}
        aria-describedby='simple-modal-description'
        className={classes.dialogBox}
        disableBackdropClick={true}
        maxWidth={'xl'}>
        <Scrollbar>
          <Formik
            initialStatus={true}
            enableReinitialize={true}
            validateOnBlur={false}
            initialValues={{
              date: consultaAgendaServicio ? consultaAgendaServicio : '',
              ordenes: selectedRow ? selectedRow : [],
            }}
            validationSchema={validationSchema}>
            {({values, initialValues, setFieldValue, errors, touched}) => (
              <AceptacionOrdenServicioForm
                values={values}
                setFieldValue={setFieldValue}
                handleOnClose={handleOnClose}
                titulo={titulo}
                accion={accion}
                initialValues={initialValues}
                errors={errors}
                touched={touched}
                updateColection={updateColection}
              />
            )}
          </Formik>
        </Scrollbar>
      </Dialog>
    )
  );
};

export default ConsultaAgendaServicioCreador;
