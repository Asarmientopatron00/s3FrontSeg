import React, {useEffect, useState} from 'react';
import {Box, Button, RadioGroup, Radio} from '@material-ui/core';
import {Field, Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import {Fonts} from '../../../../shared/constants/AppEnums';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import {
  LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
} from '../../../../shared/constants/Constantes';

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

// const MyRadioField = (props) => {
//   const [field, meta] = useField(props);
//   const errorText = meta.error && meta.touched ? meta.error : '';
//   return (
//     <FormControl error={!!errorText} component='fieldset'>
//       <FormLabel {...props} {...field}>
//         {props.label}
//       </FormLabel>
//       <Field {...props} {...field} type='radio' as={RadioGroup} row>
//         {props.options.map((option, index) => {
//           return (
//             <FormControlLabel
//               key={index}
//               value={option.value}
//               control={<Radio color='primary' />}
//               label={option.label}
//               labelPlacement='end'
//               disabled={props.disabled}
//             />
//           );
//         })}
//       </Field>
//       <FormHelperText>{errorText}</FormHelperText>
//     </FormControl>
//   );
// };
const AsociadoComercial = (props) => {
  const {handleOnClose, accion, values, initialValues, tiposDocumentos} = props;

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (accion === 'ver' || initialValues.estado === '0') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]);

  const useStyles = makeStyles((theme) => ({
    bottomsGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: '20px',
      gap: '10px',
      backgroundColor: 'white',
      paddingRight: '20px',
      position: 'sticky',
      left: 0,
      bottom: 0,
    },
    myTextField: {
      width: '100%',
      marginBottom: 5,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 5,
      },
      height: '70px',
    },
    MyRadioField: {
      width: '100%',
      marginBottom: 0,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 0,
      },
    },
    MySelectField: {
      width: 'auto',
      marginBottom: 16,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 24,
      },
      color: theme.palette.primary.main,
      '&:target': {
        color: theme.palette.primary.main,
      },
    },
    btnRoot: {
      paddingLeft: 15,
      paddingRight: 15,
      color: 'white',
      '&:hover': {
        backgroundColor: theme.palette.colorHover,
        cursor: 'pointer',
      },
    },
    btnPrymary: {
      backgroundColor: theme.palette.primary.main,
    },
    btnSecundary: {
      backgroundColor: theme.palette.grayBottoms,
    },
    widthFull: {
      width: '100%',
    },
    pointer: {
      cursor: 'pointer',
    },
    inputs_2: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      columnGap: '20px',
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
            fontSize={20}
            fontWeight={Fonts.MEDIUM}>
            <IntlMessages id='asociados' /> <span> - </span>
            <IntlMessages id='asociados.comerciales' />
          </Box>

          <Box className={classes.inputs_2}>
            <MyAutocomplete
              options={tiposDocumentos}
              name='tipo_documento_id'
              inputValue={initialValues.tipo_documento_id}
              label='Tipo de Documento'
              autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />

            {/* <MyTextField
              className={classes.myTextField}
              label='Tipo de Documento'
              name='tipo_documento_id'
              disabled={disabled}
              select={true}
              required>
              {tiposDocumentos.map((tipoDocumento) => {
                return (
                  <MenuItem
                    value={tipoDocumento.id}
                    key={tipoDocumento.id}
                    className={classes.pointer}
                    style={tipoDocumento.estado === 0 ? {display: 'none'} : {}}>
                    {tipoDocumento.nombre}
                  </MenuItem>
                );
              })}
            </MyTextField> */}

            <MyTextField
              className={classes.myTextField}
              label='Número Documento'
              name='numero_documento'
              disabled={disabled}
              required
              inputProps={{
                maxLength: LONGITUD_MAXIMA_DOCUMENTOS_PERSONA_NATURAL,
              }}
            />
          </Box>

          <MyTextField
            className={classes.myTextField}
            label='Nombre Completo'
            name='nombre'
            disabled={disabled}
            required
          />

          <MyTextField
            className={classes.myTextField}
            label='Contacto'
            name='contacto'
            disabled={disabled}
            required
          />

          <Box className={classes.inputs_2}>
            <MyTextField
              className={classes.myTextField}
              label='Telefono'
              name='telefono'
              disabled={disabled}
              inputProps={{
                maxLength: LONGITUD_MAXIMA_TELEFONOS,
                minLength: LONGITUD_MINIMA_TELEFONOS,
              }}
              required
            />

            <FormControl className={classes.widthFull} component='fieldset'>
              <FormLabel>Estado*</FormLabel>
              <Field
                name='estado'
                type='radio'
                as={RadioGroup}
                className={classes.myTextField}
                disabled={accion === 'ver'}
                row
                value={values.estado}>
                <FormControlLabel
                  value='1'
                  control={<Radio color='primary' />}
                  label='Activo'
                  labelPlacement='end'
                  disabled={accion === 'ver'}
                />
                <FormControlLabel
                  value='0'
                  control={<Radio color='primary' />}
                  label='Inactivo'
                  labelPlacement='end'
                  disabled={accion === 'ver'}
                />
              </Field>
            </FormControl>
          </Box>
        </Box>
      </Scrollbar>
      <Box className={classes.bottomsGroup}>
        {accion !== 'ver' ? (
          <Button
            className={`${classes.btnRoot} ${classes.btnPrymary}`}
            variant='contained'
            type='submit'>
            <IntlMessages id='boton.submit' />
          </Button>
        ) : (
          ''
        )}
        <Button
          className={`${classes.btnRoot} ${classes.btnSecundary}`}
          onClick={handleOnClose}>
          <IntlMessages id='boton.cancel' />
        </Button>
      </Box>
    </Form>
  );
};

export default AsociadoComercial;
