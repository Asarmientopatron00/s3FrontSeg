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
import FormLabel from '@material-ui/core/FormLabel';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';

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

const CiudadForm = (props) => {
  const {handleOnClose, accion, values, initialValues, departamentos, titulo} =
    props;

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
            {titulo}
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <MyTextField
              className={classes.myTextField}
              label='Nombre'
              name='nombre'
              disabled={disabled}
              required
            />
            <MyAutocomplete
              options={departamentos}
              name='departamento_id'
              inputValue={initialValues.departamento_id}
              label='Departamento'
              //autoHighlight
              className={classes.myTextField}
              required
              disabled={disabled}
            />

            {/* <MyTextField
              className={classes.myTextField}
              label='Departamento'
              name='departamento_id'
              select={true}
              disabled={disabled}
              required>
              {departamentos.map((departamento) => {
                return (
                  <MenuItem
                    value={departamento.id}
                    key={departamento.id}
                    id={departamento.id}
                    className={classes.pointer}
                    style={departamento.estado === 0 ? {display: 'none'} : {}}>
                    {departamento.nombre}
                  </MenuItem>
                );
              })}
              <MenuItem value='5' id={5} disabled style={{display: 'none'}}>
                {'Trial'}
              </MenuItem>
            </MyTextField> */}

            <MyTextField
              className={classes.myTextField}
              label='Código Externo'
              name='codigo_dane'
              disabled={disabled}
              required
              inputProps={{maxLength: 5}}
            />

            <MyTextField
              className={classes.myTextField}
              label='Código Geocerca'
              name='geocerca_id'
              disabled={disabled}
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

export default CiudadForm;
