import React from 'react';
import {Box} from '@material-ui/core';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import jwtAxios from '../../../@crema/services/auth/jwt-auth/jwt-api';

// import {useLocation} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
// import {RadioGroup, Radio} from '@material-ui/core';
// import {useField} from 'formik';
// import Dropzone from 'react-dropzone';
import {Fonts} from '../../../shared/constants/AppEnums';
// import Swal from 'sweetalert2';
// import {history} from 'redux/store';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import {Form, Formik, useField} from 'formik';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import defaultConfig from '@crema/utility/ContextProvider/defaultConfig';
// import { history } from 'redux/store';
const MyTextField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
      size='small'
    />
  );
};

// const MyRadioField = (props) => {
//   const [field, meta] = useField(props);
//   const errorText = meta.error && meta.touched ? meta.error : '';
//   return (
//     <FormControl error={!!errorText} component='fieldset'>
//       <Box display='flex'>
//         <Field {...props} {...field} type='radio' as={RadioGroup} row>
//           {props.options.map((option, index) => {
//             return (
//               <FormControlLabel
//                 key={index}
//                 value={option.value}
//                 control={<Radio color='primary' />}
//                 label={option.label}
//                 labelPlacement='end'
//                 disabled={props.disabled}
//               />
//             );
//           })}
//         </Field>
//         <Box display='flex' alignItems='center'>
//           <FormHelperText>{errorText}</FormHelperText>
//         </Box>
//       </Box>
//     </FormControl>
//   );
// };

// import {MessageView} from '../../../@crema';

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const MyCell = (props) => {
//   const {align, width, claseBase, value, cellColor} = props;
//   const classes = useStyles({width: width, cellColor: cellColor});

//   let allClassName = claseBase;

//   if (width !== undefined) {
//     allClassName = `${allClassName} ${classes.cellWidth}`;
//   }

//   return (
//     <TableCell align={align} className={allClassName}>
//       <span className={cellColor ? classes.cellColor : ''}>{value}</span>
//     </TableCell>
//   );
// };

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    padding: '15px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 5px 5px rgb(0 0 0 / 10%)',
    borderRadius: '4px',
    display: 'grid',
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
    gridTemplateColumns: '4fr 4fr 1fr',
    gap: '20px',
  },
  pairFilters: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    minWidth: '100px',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {numSelected} = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <Box className={classes.titleTop}>
            <Typography
              className={classes.title}
              variant='h6'
              id='tableTitle'
              component='div'>
              {'Informe Actualización Asociados'}
            </Typography>
            <Box className={classes.horizontalBottoms}></Box>
          </Box>
          <Formik
            validateOnChange={false}
            initialValues={{
              nombre: '',
              numero_documento: '',
              fecha_desde: '',
              fecha_hasta: '',
            }}
            onSubmit={(data, {setSubmitting}) => {
              console.log(data);
            }}>
            {({values, initialValues, setFieldValue, resetForm}) => (
              <Form>
                <Box className={classes.contenedorFiltros}>
                  <MyTextField label='Nombre' name='nombre' />

                  <MyTextField
                    label='Número Documento'
                    name='numero_documento'
                  />
                  <Box display='grid'>
                    <Box display='flex' mb={2}>
                      <Tooltip
                        title='Limpiar Filtros'
                        onClick={() => resetForm(initialValues)}>
                        <IconButton
                          className={classes.clearButton}
                          aria-label='filter list'>
                          <ClearAllIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <MyTextField
                    label='Fecha última actualización desde'
                    name='fecha_desde'
                    type='date'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <MyTextField
                    label='Fecha última actualización hasta'
                    name='fecha_hasta'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type='date'
                  />
                  <Box display='grid'>
                    <Box display='flex' mb={2}>
                      <Tooltip
                        title='Exportar'
                        component='a'
                        className={classes.linkDocumento}
                        href={
                          defaultConfig.API_URL +
                          '/asociados-negocio/consulta-actualizacion' +
                          '?nombre=' +
                          values.nombre +
                          '&numero_documento=' +
                          values.numero_documento +
                          '&fecha_desde=' +
                          values.fecha_desde +
                          '&fecha_hasta=' +
                          values.fecha_hasta
                        }>
                        <IconButton
                          className={classes.exportButton}
                          aria-label='filter list'>
                          <Box component='span' className={classes.x}>
                            X
                          </Box>
                          <InsertDriveFileIcon />
                        </IconButton>
                      </Tooltip>

                      {/* <Tooltip title='Trial' */}
                      {/* onClick={()=>{
                          jwtAxios
                          .post('/asociados-negocio/consulta-actualizacion', 
                            values,
                          )
                          .then((data) => {
                            if (data.status === 200) {
                              var wbout = XLSX.write(data.data, {type:"array", bookType:'xlsx'});
                              var url = URL.createObjectURL(new Blob([wbout], {type: 'application/octet-stream'}));
                              const link = document.createElement('a');
                              link.href = url;
                              link.setAttribute('download', 'file.xlsx'); //or any other extension
                              document.body.appendChild(link);
                              link.click();
                            } else {
                             
                            }
                          })
                          .catch((error) => {

                          });

                        }}
                      >
                        <IconButton
                          className={classes.exportButton}
                          aria-label='filter list'
                        >
                          <Box component='span'
                            className={classes.x}
                          >X</Box>
                          <InsertDriveFileIcon/>
                        </IconButton>
                      </Tooltip> */}
                    </Box>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </>
      )}

      {
        numSelected > 0 ? (
          <Tooltip title='Delete'>
            <IconButton aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ''
        )
        // <Tooltip title="Filtros Avanzados">
        //         <IconButton aria-label="filter list">
        //           <FilterListIcon />
        //         </IconButton>
        //       </Tooltip>
      }
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  chargedFile: {
    padding: '0px',
  },
  linkDocumento: {
    textDecoration: 'underline',
    color: 'blue',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
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

const InformeActualizacion = () => {
  // const [order, setOrder] = React.useState('asc');
  // const [orderBy, setOrderBy] = React.useState('');
  // const [orderByToSend, setOrderByToSend] = React.useState(
  //   'fecha_modificacion:desc',
  // );
  // const [dense, setDense] = React.useState(false);
  const dense = true; //Borrar cuando se use el change

  // const {pathname} = useLocation();

  let vp = '15px';
  if (dense === true) {
    vp = '0px';
  }

  const classes = useStyles({vp: vp});

  // const changeOrderBy = (id) => {
  //   if (orderBy === id) {
  //     if (order === 'asc') {
  //       setOrder('desc');
  //       setOrderByToSend(id + ':desc');
  //     } else {
  //       setOrder('asc');
  //       setOrderByToSend(id + ':asc');
  //     }
  //   } else {
  //     setOrder('asc');
  //     setOrderBy(id);
  //     setOrderByToSend(id + ':asc');
  //   }
  // };

  // const handleOnClose = () => {
  //   history.goBack();
  // };
  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // const handleOnClose = () => {
  //   history.goBack();
  // };

  // const showDocumento = (id) => {
  //   dispatch(
  //     onShow(
  //       id,
  //     ),
  //   );
  // };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={0} />
      </Paper>
    </div>
  );
};

export default InformeActualizacion;
