import React, {useState, useMemo} from 'react';
import {Box, Button} from '@material-ui/core';
import {styled} from '@material-ui/styles';

import clsx from 'clsx';
import {lighten, makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import {onImport} from '../../../redux/actions/OrdenServicioAction';
import {useDispatch} from 'react-redux';
// import {useLocation} from 'react-router-dom';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import TextField from '@material-ui/core/TextField';
import {Formik, Form, useField} from 'formik';
import {useDropzone} from 'react-dropzone';
import Dropzone from 'react-dropzone';
import {Fonts} from '../../../shared/constants/AppEnums';
import * as yup from 'yup';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CheckIcon from '@material-ui/icons/Check';
import parse from 'html-react-parser';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    padding: '15px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
    borderRadius: '4px',
    display: 'grid',
  },
  linkDocumento: {
    textDecoration: 'underline',
    color: 'blue',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  createButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  clearButton: {
    backgroundColor: theme.palette.grayBottoms,
    color: 'white',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  horizontalBottoms: {
    width: 'min-content',
    display: 'flex',
    gap: '5px',
  },
  titleTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  columnFilterButton: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  contenedorFiltros: {
    width: '90%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  pairFilters: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    minWidth: '100px',
  },
}));

const ColorlibStepIconRoot = styled('div')(({theme, ownerState}) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

const ColorlibStepIcon = (props) => {
  const {active, completed, className} = props;

  const icons = {
    1: <AttachFileIcon />,
    2: <CheckIcon />,
  };
  const messages = {
    1: 'Cargar Archivo',
    2: 'Verificación de Datos',
  };

  return (
    <Tooltip title={messages[String(props.icon)]}>
      <ColorlibStepIconRoot
        ownerState={{completed, active}}
        className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    </Tooltip>
  );
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient( 95deg, #26426C 0%,#be1e2d 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient( 95deg, #26426C 0%,#be1e2d 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const EnhancedTableToolbar = ({activeStep}) => {
  const classes = useToolbarStyles();
  const steps = ['Cargar Archivo', 'Verificación de datos'];

  return (
    <Toolbar className={clsx(classes.root)}>
      <Box className={classes.titleTop}>
        <Typography
          className={classes.title}
          variant='h6'
          id='tableTitle'
          component='div'>
          Carga Masiva Ordenes de Servicio
        </Typography>
        <Box className={classes.horizontalBottoms}></Box>
      </Box>
      <Box>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  chargedFile: {
    padding: '0px',
  },
  dialogBox: {
    minHeight: '600px',
    position: 'relative',
    '& .MuiDialog-paperWidthSm': {
      width: '100%',
      minHeight: '800px',
      // maxHeight:'fit-content'
    },
    '& .MuiTypography-h6': {
      fontWeight: Fonts.LIGHT,
    },
  },
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
  exportButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    boxShadow:
      '0px 3px 5px -1px rgb(0 0 0 / 30%), 0px 6px 10px 0px rgb(0 0 0 / 20%), 0px 1px 18px 0px rgb(0 0 0 / 16%)',
    '&:hover': {
      backgroundColor: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  x: {
    position: 'absolute',
    color: '#4caf50',
    fontSize: '14px',
    top: '19px',
    fontWeight: 'bold',
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
  marcoTabla: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
    borderRadius: '4px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '15px',
    paddingBottom: '15px',
    marginTop: '5px',
  },
  root: {
    width: '100%%',
    padding: '20px',
  },
  head: {
    borderTop: '2px solid #dee2e6',
    borderBottom: '2px solid #dee2e6',
    marginTop: '20px',
    // display:'grid',
    // gridTemplateColumns:gridTemplate,
  },
  headCell: {
    padding: '0px 0px 0px 15px',
  },
  row: {
    // display:'grid',
    // gridTemplateColumns:gridTemplate,
    padding: 'none',
  },
  cell: (props) => ({
    padding: props.vp + ' 0px ' + props.vp + ' 15px',
    whiteSpace: 'nowrap',
  }),
  cellWidth: (props) => ({
    minWidth: props.width,
  }),
  cellColor: (props) => ({
    backgroundColor: props.cellColor,
    color: 'white',
  }),
  acciones: (props) => ({
    padding: props.vp + ' 0px ' + props.vp + ' 15px',
    minWidth: '100px',
  }),
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  table: {
    minWidth: '100%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  generalIcons: {
    '&:hover': {
      color: theme.palette.colorHover,
      cursor: 'pointer',
    },
  },
  editIcon: {
    color: theme.palette.primary.main,
  },
  visivilityIcon: {
    color: theme.palette.grayBottoms,
  },
  deleteIcon: {
    color: theme.palette.redBottoms,
  },
  popoverColumns: {
    display: 'grid',
    padding: '10px',
    color: theme.palette.grayBottoms,
  },
  paginacion: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
    paddingBottom: '5px',
  },
  rowsPerPageOptions: {
    marginRight: '10px',
  },
}));

function EnhancedTableHead(props) {
  const {classes, titulos} = props;
  // const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };

  return (
    <TableHead>
      <TableRow className={classes.head}>
        {titulos.map((cell, index) => {
          return (
            <TableCell key={index} align={'left'} className={classes.cell}>
              <TableSortLabel>{cell}</TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

const OrdenServicioDocumento = () => {
  // const [order, setOrder] = React.useState('asc');
  // const [orderBy, setOrderBy] = React.useState('');
  // const [orderByToSend, setOrderByToSend] = React.useState(
  //   'fecha_modificacion:desc',
  // );
  // const [dense, setDense] = React.useState(false);
  const dense = true; //Borrar cuando se use el change

  let vp = '15px';
  if (dense === true) {
    vp = '0px';
  }
  const classes = useStyles({vp: vp});
  const dispatch = useDispatch();

  const handleOnClose = () => {
    setActiveStep(0);
    setRows([]);
  };

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#ffffff',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: '100px',
  };
  const activeStyle = {
    borderColor: '#2196f3',
  };
  const acceptStyle = {
    borderColor: '#00e676',
  };
  const rejectStyle = {
    borderColor: '#ff1744',
  };

  const {isDragActive, isDragAccept, isDragReject} = useDropzone();

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [
      isDragActive,
      isDragAccept,
      isDragReject,
      acceptStyle,
      activeStyle,
      rejectStyle,
      baseStyle,
    ],
  );

  const validationSchema = yup.object({
    nombre_archivo: yup.string().required('Requerido'),
  });

  const [activeStep, setActiveStep] = useState(0);
  const [rows, setRows] = useState([]);
  // const columnasMostradas = ['asociado','referencia_factura','cliente_factura','agente_aduana','tipo_servicio','fecha_programada_instalacion',
  //                           'hora_programada_instalacion','departamento_instalacion','ciudad_instalacion','lugar_instalacion','fecha_programada_desinstalacion',
  //                           'hora_programada_desinstalacion','departamento_desinstalacion','ciudad_desinstalacion','lugar_desinstalacion','transportador',
  //                           'placa_vehiculo','placa_trailer','numero_contenedor','nombre_conductor','cedula_conductor','celular_conductor','observaciones'
  //                           ];
  const columnasMostradas = [
    'asociado',
    'tipo_servicio',
    'fecha_programada_instalacion',
    'ciudad_instalacion',
    'lugar_instalacion',
    'observaciones',
  ];

  const titulos = [
    'Asociado Negocios',
    'Tipo Servicio',
    'Fecha Instalación',
    'Ciudad Instalación',
    'Lugar Instalación',
    'Observaciones',
  ];
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar activeStep={activeStep} />
        {activeStep === 0 ? (
          <Box className={classes.marcoTabla}>
            <Box component='h4'>1. Carga Datos</Box>
            <Formik
              initialStatus={true}
              enableReinitialize={true}
              validateOnBlur={false}
              initialValues={{
                nombre_archivo: '',
                archivo: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(data, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                dispatch(onImport(data, setActiveStep, setRows));

                // resetForm();
                setSubmitting(false);
              }}>
              {({values, initialValues, setFieldValue}) => {
                return (
                  <Form encType='multipart/form-data'>
                    <Box py={5} px={{xs: 5, lg: 8, xl: 10}} height='200px'>
                      <Dropzone
                        onDrop={(event) => {
                          setFieldValue('archivo', event[0]);
                          setFieldValue('nombre_archivo', event[0].name);
                        }}>
                        {({getRootProps, getInputProps}) => (
                          <div {...getRootProps({style})}>
                            <input
                              {...getInputProps()}
                              name='archivo'
                              type='file'
                              id='archivo'
                              onChange={(event) => {
                                setFieldValue(
                                  'archivo',
                                  event.currentTarget.files[0],
                                );
                                setFieldValue(
                                  'nombre_archivo',
                                  event.currentTarget.files[0].name,
                                );
                              }}
                            />
                            <p>Arrastra un archivo o haz click para cargarlo</p>
                          </div>
                        )}
                      </Dropzone>
                      <MyTextField
                        name='nombre_archivo'
                        id='nombre_archivo'
                        type='hidden'
                        width='100%'
                      />
                      {values.nombre_archivo ? (
                        <Box
                          component='p'
                          display='flex'
                          justifyContent='center'>
                          {values.nombre_archivo}
                          <Tooltip title={<IntlMessages id='boton.eliminar' />}>
                            <DeleteIcon
                              onClick={() => {
                                setFieldValue('archivo', {});
                                setFieldValue('nombre_archivo', '');
                              }}
                              className={`${classes.generalIcons} ${classes.deleteIcon}`}></DeleteIcon>
                          </Tooltip>
                        </Box>
                      ) : (
                        ''
                      )}
                    </Box>
                    <Box className={classes.bottomsGroup}>
                      {/* {accion !== 'ver' ? ( */}
                      <Button
                        className={`${classes.btnRoot} ${classes.btnPrymary}`}
                        variant='contained'
                        type='submit'>
                        Cargar y Continuar
                      </Button>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        ) : (
          <Box className={classes.marcoTabla}>
            <Box display='flex' justifyContent='space-between'>
              <Box>
                <Box component='h4'>2. Verificación de Datos</Box>
                <Box component='h6'>
                  {'Registros Procesados: ' + rows.registros_procesados}
                </Box>
                <Box component='h6'>
                  {'Registros Cargados: ' + rows.registros_cargados}
                </Box>
                <Box component='h6' mb={3}>
                  {'Registros Fallidos: ' + rows.registros_fallidos}
                </Box>
              </Box>
              <Box>
                <ExcelFile
                  element={
                    <Tooltip
                      title='Exportar Resultados'
                      component='a'
                      className={classes.linkDocumento}>
                      <IconButton
                        className={classes.exportButton}
                        aria-label='filter list'>
                        <Box component='span' className={classes.x}>
                          X
                        </Box>
                        <InsertDriveFileIcon />
                      </IconButton>
                    </Tooltip>
                  }
                  filename={
                    'Resultados Carga Masiva-' + new Date(Date.now()).getTime()
                  }>
                  <ExcelSheet data={rows.errores} name='Hoja 1'>
                    <ExcelColumn
                      label='Asociado de negocio'
                      value='asociado'
                      widthPx={160}
                    />
                    <ExcelColumn
                      label='Referencia Factura'
                      value='referencia_factura'
                    />
                    <ExcelColumn label='Factura a' value='cliente_factura' />
                    <ExcelColumn
                      label='Agente de aduanas'
                      value='agente_aduana'
                    />
                    <ExcelColumn
                      label='Tipo de servicio'
                      value='tipo_servicio'
                    />
                    <ExcelColumn
                      label='Fecha instalación'
                      value='fecha_programada_instalacion'
                    />
                    <ExcelColumn
                      label='Hora instalación'
                      value='hora_programada_instalacion'
                    />
                    <ExcelColumn
                      label='Departamento instalación'
                      value='departamento_instalacion'
                    />
                    <ExcelColumn
                      label='Ciudad instalación'
                      value='ciudad_instalacion'
                    />
                    <ExcelColumn
                      label='Lugar instalación'
                      value='lugar_instalacion'
                    />
                    <ExcelColumn
                      label='Fecha desinstalación'
                      value='fecha_programada_desinstalacion'
                    />
                    <ExcelColumn
                      label='Hora desinstalación'
                      value='hora_programada_desinstalacion'
                    />
                    <ExcelColumn
                      label='Deparetamento desinstalación'
                      value='departamento_desinstalacion'
                    />
                    <ExcelColumn
                      label='Ciudad desinstalación'
                      value='ciudad_desinstalacion'
                    />
                    <ExcelColumn
                      label='Lugar desinstalación'
                      value='lugar_desinstalacion'
                    />
                    <ExcelColumn
                      label='Nit transportador'
                      value='transportador'
                    />
                    <ExcelColumn
                      label='Placa vehículo'
                      value='placa_vehiculo'
                    />
                    <ExcelColumn label='Placa trailer' value='placa_trailer' />
                    <ExcelColumn
                      label='Número contenedor'
                      value='numero_contenedor'
                    />
                    <ExcelColumn
                      label='Nombre conductor'
                      value='nombre_conductor'
                    />
                    <ExcelColumn
                      label='Cédula conductor'
                      value='cedula_conductor'
                    />
                    <ExcelColumn
                      label='Celular conductor'
                      value='celular_conductor'
                    />
                    <ExcelColumn label='Observaciones' value='observaciones' />
                  </ExcelSheet>
                </ExcelFile>
              </Box>
            </Box>
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby='tableTitle'
                size={dense ? 'small' : 'medium'}
                aria-label='enhanced table'>
                <EnhancedTableHead classes={classes} titulos={titulos} />
                <TableBody>
                  {rows.errores.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={index}
                        className={classes.row}>
                        {columnasMostradas.map((columna) => {
                          return (
                            <TableCell
                              align='left'
                              className={classes.acciones}>
                              {columna === 'observaciones'
                                ? parse(row[columna])
                                : row[columna]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box className={classes.bottomsGroup}>
              <Button
                className={`${classes.btnRoot} ${classes.btnSecundary}`}
                onClick={handleOnClose}>
                <IntlMessages id='boton.cancel' />
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default OrdenServicioDocumento;
