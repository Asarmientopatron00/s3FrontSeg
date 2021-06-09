import React, {useState,useEffect} from 'react';
import {Box, Button} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
// import FilterListIcon from '@material-ui/icons/FilterList';
import DepartamentoCreador from './DepartamentoCreador'
import {
  onGetColeccion,
  onDelete,
} from '../../../redux/actions/DepartamentoAction';
import {onGetColeccionLigera as paisColeccionLigera} from '../../../redux/actions/PaisAction'; 
import {useDispatch,useSelector} from 'react-redux';
// import {useLocation} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Popover from '@material-ui/core/Popover';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';

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


const cells = [
  {id:'nombre', typeHead: 'string',label: 'Nombre',value:(value)=>value, align:'left',mostrarInicio:true},
  {id:'codigo_dane', typeHead: 'numeric',label: 'Código Externo',value:(value)=>value, align:'right',mostrarInicio:true},
  {id:'pais', typeHead: 'string',label: 'País',value:(value)=>value, align:'left',mostrarInicio:true},
  {id:'geocerca_id', typeHead: 'numeric',label: 'Código Geocerca',value:(value)=>value, align:'right',mostrarInicio:true},
  {id:'estado', typeHead: 'boolean',label: 'Estado',value:(value)=>value===1?'Activo':'Inactivo', align:'center',mostrarInicio:true,cellColor:(value)=>value===1?'green':'red'},
  {id:'usuario_modificacion_nombre', typeHead: 'string',label: 'Modificado Por',value:(value)=>value, align:'left', width: '140px',mostrarInicio:true},
  {id:'fecha_modificacion', typeHead: 'string',label: 'Fecha Última Modificación',value:(value)=>value, align:'left', width: '180px',mostrarInicio:true},
  {id:'usuario_creacion_nombre', typeHead: 'string',label: 'Creado Por',value:(value)=>value, align:'left', width: '140px',mostrarInicio:false},
  {id:'fecha_creacion', typeHead: 'string',label: 'Fecha Creación',value:(value)=>value, align:'left', width: '180px',mostrarInicio:false},
];

const MyCell = (props)=>{
  const {align,width,claseBase,value,cellColor} = props;
  const classes= useStyles({width:width,cellColor:cellColor});

  let allClassName = claseBase;

  if (width!== undefined){
    allClassName = `${allClassName} ${classes.cellWidth}`;
  }
  
  return (
    <TableCell 
      align={align} 
      className={allClassName} 
    >
      <span 
        className={cellColor?classes.cellColor:''}
      >
        {value}
      </span>
    </TableCell>
  )
}

function EnhancedTableHead(props) {
  const {classes, order, orderBy, onRequestSort,columnasMostradas} = props;
  // const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };

  return (
    <TableHead>
      <TableRow className={classes.head}> 
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell> */}
        <TableCell align='center' className={classes.headCell}>
          {'Acciones'}
        </TableCell>
        {columnasMostradas.map((cell) => {
          if (cell.mostrar) {
            return(
              <TableCell
                key={cell.id}
                align={cell.typeHead === 'string' ? 'left' : (cell.typeHead === 'numeric' ? 'right': 'center')}
                className={classes.cell}
                sortDirection={orderBy === cell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === cell.id}
                  direction={orderBy === cell.id ? order : 'asc'}
                  // onClick={createSortHandler(cell.id)}
                  onClick={()=>{onRequestSort(cell.id)}}
                >
                  {cell.label}
                  {orderBy === cell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
          } else {
            return(<th key={cell.id}></th>);
          }
          
        }
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columnasMostradas: PropTypes.array.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    alignItems:'flex-start',
    justifyContent:'space-between'
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
    color:'white',
    "&:hover": {
      backgroundColor: theme.palette.colorHover,
      cursor:'pointer',
    }
  },
  clearButton: {
    backgroundColor: theme.palette.grayBottoms,
    color:'white',
    "&:hover": {
      backgroundColor: theme.palette.colorHover,
      cursor:'pointer',
    }
  },
  verticalBottoms: {
    width: 'min-content',
    display: 'grid',
    gap: '5px',
  },
  horizontalBottoms: {
    width: 'min-content',
    display: 'flex',
    gap: '5px',
  },
  rootBottoms: {
    display: 'flex',
    gap: '5px',
    alignItems:'flex-start'
  },
  columnFilterButton: {
    backgroundColor: theme.palette.secondary.main,
    color:'white',
    "&:hover": {
      backgroundColor: theme.palette.colorHover,
      cursor:'pointer',
    }
  },
  contenedorFiltros:{
    width:'100%',
    display:'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gap:'20px',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { 
    numSelected,
    onOpenAddDepartamento,
    handleOpenPopoverColumns,
    queryFilter,
    nombreFiltro,
    paisFiltro,
    limpiarFiltros,
  } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Box width={'100%'}>
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            <IntlMessages id='configuracion.departamentos'/>
          </Typography>

          <Box className={classes.contenedorFiltros}>
            <TextField
              label= 'Nombre'
              name='nombreFiltro'
              id='nombreFiltro'
              onChange = {queryFilter}
              value={nombreFiltro}
            />

             <TextField
              label= 'País'
              name='paisfiltro'
              id='paisFiltro'
              onChange = {queryFilter}
              value={paisFiltro}
            />
          </Box>
        </Box>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Box className={classes.rootBottoms}>
          <Box className={classes.horizontalBottoms}>
            {/* <Tooltip title="Filtros Avanzados">
              <IconButton aria-label="filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Mostrar/Ocultar Columnas" onClick={handleOpenPopoverColumns}>
              <IconButton className={classes.columnFilterButton} aria-label="filter list">
                <ViewColumnIcon />
              </IconButton>
            </Tooltip> 
          </Box>
          <Box className={classes.verticalBottoms}>
            <Tooltip title="Crear Departamento" onClick={onOpenAddDepartamento}>
              <IconButton className={classes.createButton} aria-label="filter list">
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Limpiar Filtros" onClick={limpiarFiltros}>
              <IconButton className={classes.clearButton} aria-label="filter list">
                <ClearAllIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onOpenAddDepartamento: PropTypes.func.isRequired,
  handleOpenPopoverColumns: PropTypes.func.isRequired,
  queryFilter: PropTypes.func.isRequired,
  limpiarFiltros:PropTypes.func.isRequired,
  nombreFiltro:PropTypes.string.isRequired,
  paisFiltro:PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%%',
      padding:'15px'
  },
  head: {
    borderTop:'2px solid #dee2e6',
    borderBottom:'2px solid #dee2e6',
    // display:'grid',
    // gridTemplateColumns:gridTemplate,
  },
  headCell: {
    padding:'0px 0px 0px 15px',
  },
  row: {
    // display:'grid',
    // gridTemplateColumns:gridTemplate,
    padding:'none',
  },
  cell: props=>({
    padding: props.vp + ' 0px ' + props.vp + ' 15px',
    whiteSpace:'nowrap',
  }),
  cellWidth: props=>({
    minWidth:props.width,
  }),
  cellColor: props=>({
    backgroundColor:props.cellColor,
    color:'white',
  }),
  acciones: props=>({
    padding: props.vp + ' 0px ' + props.vp + ' 15px',
    minWidth:'100px',
  }),
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow:'none',
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
  generalIcons:{
    "&:hover": {
      color: theme.palette.colorHover,
      cursor:'pointer',
    }
  },
  editIcon:{
    color: theme.palette.primary.main,
  },
  visivilityIcon:{
    color: theme.palette.grayBottoms,
  },
  deleteIcon:{
    color: theme.palette.redBottoms,
  },
  popoverColumns:{
    display: 'grid',
    padding: '10px',
    color: theme.palette.grayBottoms,
  },
  paginacion:{
    display: 'flex',
    justifyContent:'space-between',
    alignItems:'center',
    margin:'10px',
  },
  rowsPerPageOptions:{
    marginRight:'10px',
  },
}));

const Departamento =  () => {
  const [showForm,setShowForm]=useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [orderByToSend, setOrderByToSend] = React.useState('fecha_modificacion:desc');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  // const [dense, setDense] = React.useState(false);
  const dense = true; //Borrar cuando se use el change
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rowsPerPageOptions = [5, 10, 15, 25, 50];

  const [accion,setAccion] = useState('ver');
  const [DepartamentoSeleccionado,setDepartamentoSeleccionado]= useState(0);
  const {rows,
          desde,
          hasta,
          ultima_pagina,
          total,
        } = useSelector(({departamentoReducer}) => departamentoReducer);
  const textoPaginacion = `Mostrando de ${desde} a ${hasta} de ${total} resultados - Página ${page} de ${ultima_pagina}`
  const [nombreFiltro,setNombreFiltro]=useState('');
  const [paisFiltro,setPaisFiltro]=useState('');
  // const {pathname} = useLocation();
  const [openPopOver,setOpenPopOver] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState(null);


  let columnasMostradasInicial = [];

  cells.forEach((cell)=>{
    columnasMostradasInicial.push({
      id:cell.id,
      mostrar:cell.mostrarInicio,
      typeHead:cell.typeHead,
      label:cell.label,
      value:cell.value,
      align:cell.align,
      width:cell.width,
      cellColor:cell.cellColor,
    });
  })

  const [columnasMostradas,setColumnasMostradas]=useState(columnasMostradasInicial);

  let vp = '15px';
  if (dense === true){
    vp = '0px';
  }
  const classes = useStyles({vp:vp});
  const  dispatch = useDispatch();

  useEffect(() => {
      dispatch(
        onGetColeccion(page,rowsPerPage,nombreFiltro,orderByToSend,paisFiltro),
      );
  }, [dispatch,page,rowsPerPage,nombreFiltro,orderByToSend,paisFiltro]);

  const updateColeccion = ()=>{
    setPage(1);
    dispatch(
      onGetColeccion(page,rowsPerPage,nombreFiltro,orderByToSend,paisFiltro),
    );
  }
  useEffect(() => {
      setPage(1);
  }, [nombreFiltro,orderByToSend,paisFiltro]);

  const queryFilter = (e)=> {
    switch(e.target.name){
      case('nombreFiltro'):
        setNombreFiltro(e.target.value);
        break;
      case('paisfiltro'):
        setPaisFiltro(e.target.value);
        break;
      default:
        break;
    }
  }

  const paises = useSelector(({paisReducer}) => paisReducer.ligera);

  useEffect(() => {
    dispatch(
      paisColeccionLigera(),
    );
  }, [dispatch]);

  const limpiarFiltros = ()=>{
    setNombreFiltro('');
    setPaisFiltro('');
  }

  const changeOrderBy = (id)=>{
    if (orderBy===id){
      if (order==='asc'){
        setOrder('desc');
        setOrderByToSend(id + ':desc');
      } else{
        setOrder('asc');
        setOrderByToSend(id + ':asc');
      }
    } else {
      setOrder('asc');
      setOrderBy(id);
      setOrderByToSend(id + ':asc');
    }
   
  }

  const onOpenEditDepartamento = (id) => {
    setDepartamentoSeleccionado(id);
    setAccion('editar');
    setShowForm(true);
  };

  const handleClosePopover = ()=>{
    setOpenPopOver(false);
    setPopoverTarget(null);
  }

  const handleOpenPopoverColumns = (e)=>{
    setPopoverTarget(e.currentTarget);
    setOpenPopOver(true);
  }

  const handleOnchangeMostrarColumna = (e)=>{
    let aux = columnasMostradas;
    setColumnasMostradas(aux.map((column)=>{
      if(column.id===e.target.id){
        return {...column,mostrar:!column.mostrar};
      } else {
        return column;
      }
    }));
  }

  const showAllColumns = ()=>{
    let aux = columnasMostradas;
    setColumnasMostradas(aux.map((column)=>{
      return {...column,mostrar:true};
    }));
  }

  const reiniciarColumns = ()=>{
    setColumnasMostradas(columnasMostradasInicial)
  } 

  const onOpenViewDepartamento = (id) => {
    setDepartamentoSeleccionado(id);
    setAccion('ver');
    setShowForm(true);
  };

  const onDeleteDepartamento = (id) => {
    Swal.fire({
      title: 'Confirmar',
      text: "¿Seguro Que Desea Eliminar El Departamento?",
      allowEscapeKey: false,
      allowEnterKey: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(onDelete(id));
        Swal.fire(
          'Eliminado',
          'El Departamento Fue Eliminado Correctamente',
          'success'
        )
        setTimeout(()=>{
          updateColeccion();
        },1000)
      }
    })

    
  };

  const onOpenAddDepartamento = () => {
    setDepartamentoSeleccionado(0);
    setAccion('crear');
    setShowForm(true);
  };

  const handleOnClose = () => {
    setShowForm(false);
    setDepartamentoSeleccionado(0);
    setAccion('ver');
  }
  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          onOpenAddDepartamento={onOpenAddDepartamento}
          handleOpenPopoverColumns={handleOpenPopoverColumns}
          queryFilter={queryFilter}
          limpiarFiltros={limpiarFiltros}
          nombreFiltro={nombreFiltro}
          paisFiltro={paisFiltro}
        />

        <Box className={classes.paginacion}>
          <Box>
            <p>{textoPaginacion}</p>
          </Box>
          <Box className={classes.paginacion}>
            <select className={classes.rowsPerPageOptions} value={rowsPerPage} onChange={handleChangeRowsPerPage}>
              {
                rowsPerPageOptions.map((option)=>{
                  return(<option key = {option} value={option}>{option}</option>)
                })
              }
            </select>
            <Pagination
            showFirstButton
            showLastButton
            onChange={handleChangePage}
            count={ultima_pagina}
            page={page}
          />
          </Box>
        </Box>
        
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={changeOrderBy}
              rowCount={rows.length}
              columnasMostradas={columnasMostradas}
            />
            <TableBody>
              {
              // stableSort(rows, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                rows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  
                  return (
                    <TableRow
                      hover
                      // role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      className={classes.row}
                    > 
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell> */}

                      <TableCell align="center" className={classes.acciones}> 
                        <Tooltip title={<IntlMessages id='boton.editar'/>}>
                          <EditIcon onClick={()=>onOpenEditDepartamento(row.id)} className={`${classes.generalIcons} ${classes.editIcon}`}></EditIcon>
                        </Tooltip>
                        <Tooltip title={<IntlMessages id='boton.ver'/>}>
                          <VisibilityIcon onClick={()=>onOpenViewDepartamento(row.id)} className={`${classes.generalIcons} ${classes.visivilityIcon}`}></VisibilityIcon> 
                        </Tooltip>
                        <Tooltip title={<IntlMessages id='boton.eliminar'/>}>
                          <DeleteIcon  onClick={()=>onDeleteDepartamento(row.id)} className={`${classes.generalIcons} ${classes.deleteIcon}`}></DeleteIcon> 
                        </Tooltip>
                      </TableCell>

                      {columnasMostradas.map((columna)=>{
                        if(columna.mostrar){
                          return(
                            <MyCell 
                              key={row.id + columna.id} 
                              align={columna.align} 
                              width={columna.width} 
                              claseBase={classes.cell} 
                              value={columna.value(row[columna.id])}
                              cellColor={columna.cellColor?columna.cellColor(row[columna.id]):''}
                            />                       
                          )        
                        } else {
                          return(
                            <th key={row.id + columna.id}></th>
                          )
                        }
                                        
                      })}
                    </TableRow>
                  );
                })
              }
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}

        <Box className={classes.paginacion}>
          <Box>
            <p>{textoPaginacion}</p>
          </Box>
          <Box className={classes.paginacion}>
            <select className={classes.rowsPerPageOptions} value={rowsPerPage} onChange={handleChangeRowsPerPage}>
              {
                rowsPerPageOptions.map((option)=>{
                  return(<option key={option} value={option}>{option}</option>)
                })
              }
            </select>
            <Pagination
            showFirstButton
            showLastButton
            onChange={handleChangePage}
            count={ultima_pagina}
            page={page}
          />
          </Box>
        </Box>
      </Paper>

      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Cambiar Densidad"
      /> */}
      {showForm ?
        <DepartamentoCreador 
          showForm={showForm}
          departamento={DepartamentoSeleccionado}
          accion={accion}
          handleOnClose={handleOnClose}
          updateColeccion={updateColeccion}
          paises={paises}
        />
        :""
      }

      <Popover
        id='popoverColumns'
        open={openPopOver}
        anchorEl={popoverTarget}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box className={classes.popoverColumns}>
          {columnasMostradas.map((column)=>{
            return(
              <FormControlLabel
              key={column.id}
              control={<Switch id={column.id} checked={column.mostrar} onChange={handleOnchangeMostrarColumna} />}
              label={column.label}
              />
            )
          })
          }
          <Box>
            <Button onClick={showAllColumns}>Mostrar Todos</Button>
            <Button onClick={reiniciarColumns}>Reiniciar Vista</Button>
          </Box>
        </Box>
      </Popover>
      {/* <MessageView variant='error' message='sss' /> */}
    </div>
    
  );
}

export default Departamento;