import React, {useEffect, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MyAutocompleteAsociado from 'shared/components/MyAutoCompleteAsociado';
import {
  LONGITUD_MAXIMA_TELEFONOS,
  LONGITUD_MINIMA_TELEFONOS,
} from 'shared/constants/Constantes';
import MyRadioField from 'shared/components/MyRadioField';

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
  inputs_2: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    columnGap: '20px',
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
  tableHead: {
    fontWeight: 'bold',
    padding: '2px',
    color: '#909098',
  },
  tableCell: {
    padding: '2px',
    color: '#909098',
  },
}));

const columns = [
  {header: 'Ciudad Origen', name: 'ciudad_origen'},
  {header: 'Ciudad Destino', name: 'ciudad_destino'},
  {header: 'Servicio', name: 'servicio'},
  {header: 'Tipo Servicio', name: 'tipo_servicio'},
];

const ConsultaCotizacionForm = (props) => {
  const {handleOnClose, accion, initialValues, titulo, rows, asociados, user} =
    props;
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (accion === 'ver' || initialValues.estado === '0') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]);
  const classes = useStyles(props);

  return (
    <Form style={{width: '900px'}} noValidate autoComplete='off'>
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
            <Box className={classes.inputs_2}>
              <MyTextField
                className={classes.myTextField}
                label='Fecha Solicitud Cotización'
                name='fecha_solicitud_cotizacion'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='N. Solicitud Cotización'
                name='numero_solicitud'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MyAutocompleteAsociado
                options={asociados}
                name='asociado_id'
                label='Asociado de negocio'
                className={classes.myTextField}
                required
                disabled={user?.rol?.tipo !== 'IN' || disabled}
              />
              <MyTextField
                className={classes.myTextField}
                label='N. Servicios por Mes'
                name='numero_servicios_mes'
                disabled={disabled}
                required
              />
            </Box>
            <Box component='h3'>Datos Persona Contacto:</Box>
            <Box className={classes.inputs_2} minWidth='800px'>
              <MyTextField
                className={classes.myTextField}
                label='Nombre Contacto'
                name='nombre_contacto'
                disabled={disabled}
                required
              />
              <MyTextField
                className={classes.myTextField}
                label='Correo Electrónico'
                name='email'
                disabled={disabled}
                required
              />
              <MyTextField
                className={classes.myTextField}
                label='Teléfono Contacto'
                name='telefono_contacto'
                disabled={disabled}
                required
                inputProps={{
                  maxLength: LONGITUD_MAXIMA_TELEFONOS,
                  minLength: LONGITUD_MINIMA_TELEFONOS,
                }}
              />
              <MyTextField
                className={classes.myTextField}
                label='Empresa'
                name='empresa'
                disabled={true}
                required
              />
            </Box>
            <MyTextField
              className={classes.myTextField}
              label='Observaciones'
              name='observaciones'
              disabled={disabled}
              multiline
            />
            <MyRadioField
              label='Estado'
              name='estado'
              options={[
                {value: '1', label: 'Activo'},
                {value: '0', label: 'Inactivo'},
              ]}
              disabled={accion === 'ver'}
            />
            {rows.length ? (
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((col, index) => (
                      <TableCell key={index} className={classes.tableHead}>
                        {col.header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow>
                        {columns.map((col, index) => (
                          <TableCell key={index} className={classes.tableCell}>
                            {col.name === 'tipo_servicio' &&
                            row[col.name] === 'OTR'
                              ? row['tipo_servicio_otro']
                              : row[col.name]}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              ''
            )}
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

export default ConsultaCotizacionForm;
