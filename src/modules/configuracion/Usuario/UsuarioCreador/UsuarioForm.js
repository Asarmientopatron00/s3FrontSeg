import React, {useEffect, useState} from 'react';
import {Box, Button, Select,RadioGroup,Radio} from '@material-ui/core';
import {Field, Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {useDispatch,useSelector} from 'react-redux';
// import {useIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
// import PropTypes from 'prop-types';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {onGetColeccionLigera as asociadoColeccionLigera} from '../../../../redux/actions/Asociado'; 
import {onGetColeccionLigera as rolColeccionLigera} from '../../../../redux/actions/Rol'; 
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};



const UsuarioForm = (props) => {
  const {
    handleOnClose,
    accion,
    values,
  } = props;
  const dispatch = useDispatch();
  const asociados = useSelector(({asociado}) => asociado.ligera);
  useEffect(() => {
    dispatch(
      asociadoColeccionLigera(),
    );
  }, [dispatch]);

  const roles = useSelector(({rol}) => rol.ligera);
  useEffect(() => {
    dispatch(
      rolColeccionLigera(),
    );
  }, [dispatch]);

  const [estado,setEstado] = useState(0);
  useEffect(()=>{
    setEstado(values.estado);
  },[values.estado])
  const inputLabel = React.useRef(null);

  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(90);
  }, []);

  // const {messages} = useIntl();

  const useStyles = makeStyles((theme) => ({
    bottomsGroup: {
      display: 'flex',
      justifyContent:'flex-end',
      paddingBottom:'20px',
      gap:'10px',
      backgroundColor:'white',
      paddingRight:'20px',
      position:'sticky',
      left:0,
      bottom:0,
    },
    myTextField: {
      width: '100%',
      marginBottom: 16,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 24,
      },
    },
    btnRoot: {
      paddingLeft: 15,
      paddingRight: 15,
      color:'white',
      "&:hover": {
        backgroundColor: theme.palette.colorHover,
        cursor:'pointer',
      }
    },
    btnPrymary:{
      backgroundColor:theme.palette.primary.main,
    },
    btnSecundary:{
      backgroundColor:theme.palette.grayBottoms,
    },
    widthFull: {
      width: '100%',
    },
    pointer: {
      cursor: 'pointer',
    },
  }));

  const classes = useStyles(props);

  return (
    <Form className='' noValidate autoComplete='off'>
      <Scrollbar style={{maxHeight: 600}}>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Box
            component='h6'
            mb={{xs: 4, xl: 6}}
            fontSize={16}
            fontWeight={Fonts.MEDIUM}>
            <IntlMessages id='configuracion.usuarios'/>
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <MyTextField
              className={classes.myTextField}
              label= 'Nombre'
              name='nombre'
              disabled={accion==='ver'}
              
            />

            <MyTextField
              className={classes.myTextField}
              label= 'Identificación'
              name='identificacion_usuario'
              disabled={accion==='ver'}
            />
            

            <FormControl className={classes.widthFull}>
              <InputLabel
                ref={inputLabel}
                id='demo-simple-select-outlined-label'
                >
                Asociado
              </InputLabel>
              <Field
                name='asociado_id'
                type='select'
                as={Select}
                labelWidth={labelWidth}
                className={classes.myTextField}
                disabled={accion==='ver'}
                defaultValue=''
                >
                {asociados.map((asociado) => {
                  return (
                    <MenuItem
                      value={asociado.id}
                      key={asociado.id}
                      className={classes.pointer}>
                      {asociado.nombre}
                    </MenuItem>
                  );
                })}
              </Field>
            </FormControl>

            <FormControl className={classes.widthFull}>
              <InputLabel
                ref={inputLabel}
                id='demo-simple-select-outlined'>
                Rol
              </InputLabel>
              <Field
                name='rol_id'
                type='select'
                as={Select}
                labelWidth={labelWidth}
                className={classes.myTextField}
                disabled={accion==='ver'}
                defaultValue=''
                >
                {roles.map((rol) => {
                  return (
                    <MenuItem
                      value={rol.id}
                      key={rol.id}
                      className={classes.pointer}>
                      {rol.nombre}
                    </MenuItem>
                  );
                })}
              </Field>
            </FormControl>

            <MyTextField
              className={classes.myTextField}
              label= 'E-mail'
              name='email'
              disabled={accion==='ver'}
              
            />
            
            <MyTextField
              className={classes.myTextField}
              label= 'Cargo'
              name='cargo'
              disabled={accion==='ver'}
              
            />

            <MyTextField
              className={classes.myTextField}
              label= 'Número Celular'
              name='numero_celular'
              disabled={accion==='ver'}
            />

            {accion==='crear'?
              <MyTextField
              className={classes.myTextField}
              label= 'Clave'
              name='clave'
              />
            :
            ''
            }

          <FormControl className={classes.widthFull} component='fieldset'>
            <FormLabel component="legend">Estado</FormLabel>
            <Field
              name='estado'
              type='radio'
              as={RadioGroup}
              className={classes.myTextField}
              disabled={accion==='ver'}
              row
              value={estado===1?'1':'0'}
            >
              <FormControlLabel
                value="1"
                control={<Radio color="primary" />}
                label="Activo"
                labelPlacement="end"
                disabled={accion==='ver'}
              />
              <FormControlLabel
                value="0"
                control={<Radio color="primary" />}
                label="Inactivo"
                labelPlacement="end"
                disabled={accion==='ver'}
              />
            </Field>
          </FormControl>


          </Box>
        </Box>
      </Scrollbar>
      <Box className={classes.bottomsGroup}>
        {accion!=='ver'?
          <Button
            className={`${classes.btnRoot} ${classes.btnPrymary}`}
            variant='contained'
            type='submit'
          >
            <IntlMessages id='boton.submit'/>
          </Button>
        :
        ''
        }
        <Button
          className={`${classes.btnRoot} ${classes.btnSecundary}`}
          onClick={handleOnClose}
        >
          <IntlMessages id='boton.cancel'/>
        </Button>
      </Box>
    </Form>
  );
};

export default UsuarioForm;

// UsuarioForm.prototype = {
//   values: PropTypes.object.isRequired,
//   userImage: PropTypes.object.isRequired,
//   setUserImage: PropTypes.func,
//   setFieldValue: PropTypes.func,
//   handleOnClose: PropTypes.func,
// };
