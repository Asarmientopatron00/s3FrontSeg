import React, {useEffect, useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

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

const AceptacionOrdenServicioForm = (props) => {
  const {handleOnClose, accion, values, initialValues, titulo} = props;
  const [disabled, setDisabled] = useState(false);
  console.log();
  useEffect(
    (accion) => {
      if (accion === 'ver') {
        setDisabled(true);
      }
    },
    [initialValues.estado, accion],
  );
  const useStyles = makeStyles((theme) => ({
    bottomsGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: '20px',
      gap: '10px',
      backgroundColor: 'white',
      paddingRight: '20px',
      //position: 'sticky',
      left: 0,
      bottom: 0,
    },
    myTextField: {
      width: '100%',
      marginBottom: 0,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 0,
      },
      height: '65px',
    },
    myTextFieldSmall: {
      width: '100%',
      marginBottom: 0,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 0,
      },
      height: '55px',
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
    deleteIcon: {
      color: theme.palette.redBottoms,
    },
    cellHoras: {
      padding: '3px',
    },
  }));

  const classes = useStyles(props);

  return (
    <Form
      className=''
      noValidate
      autoComplete='off'
      encType='multipart/form-data'>
      <Scrollbar style={{maxHeight: 600}}>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Box
            component='h6'
            mb={{xs: 1, xl: 1}}
            fontSize={20}
            fontWeight={Fonts.MEDIUM}>
            {titulo}
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <Box className={classes.inputs_2} minWidth='800px'>
              <MyTextField
                className={classes.myTextFieldSmall}
                label='Fecha'
                name='date'
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            {values.ordenes.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Número Orden</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Fecha Solicitud</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Fecha Programada Instalación</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>
                        Fecha Programada Desinstalación
                      </Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Ciudad Origen</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Ciudad Destino</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Asociado de negocios</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Nombre Transportadora</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Recurso Tecnico Instalación</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Recurso Tecnico Desinstalación</Box>
                    </TableCell>
                    <TableCell className={classes.cellHoras}>
                      <Box component={'h6'}>Equipo</Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.ordenes.map((elemento) => {
                    return (
                      <TableRow>
                        <TableCell className={classes.cellHoras}>
                          {elemento.numero_orden_servicio}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.fecha_orden_servicio}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.fecha_programada_instalacion}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.fecha_programada_desinstalacion}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.ciudad_instalacion}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.ciudad_desinstalacion}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.asociado}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.transportador}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.recurso_instalacion}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.recurso_desinstalacion}
                        </TableCell>
                        <TableCell className={classes.cellHoras}>
                          {elemento.equipo}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </Box>
        </Box>
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
      </Scrollbar>
    </Form>
  );
};

export default AceptacionOrdenServicioForm;
