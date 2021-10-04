import {useField} from 'formik';
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const MyAutocomplete = (props) => {
  const [field, meta, form] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  let myvalueAux = '';
  if (field.value !== '') {
    props.options.forEach((option) => {
      if (option.id === field.value) {
        myvalueAux = option.nombre;
      }
    });
  }
  let myvalue = '';
  if (myvalueAux === '') {
    myvalue = field.value;
  } else {
    myvalue = myvalueAux;
  }
  return (
    <Autocomplete
      selectOnFocus={false}
      openOnFocus
      onKeyDown={(e) => {
        if (e.key === 'Backspace') {
          props.options.forEach((option) => {
            if (option.id === field.value) {
              form.setValue('');
            }
          });
        }
      }}
      {...props}
      onChange={(event, newValue, reasons, details, trial) =>
        newValue ? form.setValue(newValue.id) : form.setValue('')
      }
      inputValue={myvalue}
      renderOption={(option) => {
        if (option.estado) {
          return <React.Fragment>{option.nombre}</React.Fragment>;
        } else {
          return '';
        }
      }}
      getOptionLabel={(option) => (option.estado ? option.nombre : '')}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            {...field}
            name={props.name}
            className={props.className}
            label={props.label}
            required={props.required}
            helperText={errorText}
            error={!!errorText}
          />
        );
      }}
    />
  );
};

export default MyAutocomplete;

// import {useField} from 'formik';
// import React,{useState,useEffect,useRef} from 'react';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';

// const MyAutocomplete = (props) => {
//   const [field, meta, form] = useField(props);
//   const errorText = meta.error && meta.touched ? meta.error : '';
//   const [filtro,setFiltro] = useState('');
//   const [optionSelected,setOptionSelected] = useState(undefined);
//   const [value,setvalue] = useState('');

//   useEffect(()=>{
//     if (optionSelected!==undefined){
//       setvalue(optionSelected.id);
//     } else {
//       setvalue(undefined);
//     }

//   },[optionSelected])
//   // console.log(optionSelected,456)
//   console.log(field.value)

//   return (
//     <Autocomplete
//       selectOnFocus={false}
//       openOnFocus
//       onKeyDown={(e) => {
//         if (e.key === 'Backspace') {
//           if (optionSelected!==undefined){
//             form.setValue('');
//             setFiltro('')
//             setOptionSelected(undefined);
//           } else {
//             setFiltro(field.value)
//             form.setValue('');
//             setOptionSelected(undefined);
//           }
//         } else {
//           if (optionSelected!==undefined){
//             setFiltro(optionSelected.nombre)
//             form.setValue(optionSelected.id);
//           } else {
//             setFiltro(field.value)
//             form.setValue('');
//             setOptionSelected(undefined);
//           }
//         }
//       }}
//       {...props}
//       onChange={(event, newValue, reasons, details, trial) =>{
//         newValue ? form.setValue(newValue.id) : form.setValue('');
//         newValue ? setOptionSelected(newValue):setOptionSelected(undefined);
//         newValue ? setFiltro(newValue.nombre):setFiltro('');
//       }
//       }
//       inputValue={filtro}
//       value={value}
//       renderOption={(option) => {
//         if (option.estado) {
//           return <React.Fragment>{option.nombre}</React.Fragment>;
//         } else {
//           return '';
//         }
//       }}
//       getOptionLabel={(option) => (option.estado ? option.nombre : '')}
//       renderInput={(params) => {
//         return (
//           <TextField
//             {...params}
//             {...field}
//             name={props.name}
//             className={props.className}
//             label={props.label}
//             required={props.required}
//             helperText={errorText}
//             error={!!errorText}
//           />
//         );
//       }}
//     />
//   );
// };

// export default MyAutocomplete;

// import {useField} from 'formik';
// import React,{useState,useEffect,useRef} from 'react';
// import TextField from '@material-ui/core/TextField';
// import {Box} from '@material-ui/core';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import IconButton from '@material-ui/core/IconButton';
// import MenuItem from '@material-ui/core/MenuItem';
// import Popper from '@material-ui/core/Popper';

// const MyAutocomplete = (props) => {
//   const [field, meta, form] = useField(props);
//   const errorText = meta.error && meta.touched ? meta.error : '';
//   const options = props.options;
//   const [select,setSelect]= useState(false);

//   const handleClose = ()=>{
//     setSelect(false);
//   }

//   const handleOpen = (e)=>{
//     setSelect(true);
//   }

//   return (
//     <>
//       <Box display='grid' gridTemplateColumns='95% 5%' alignItems='center'>
//         <TextField
//           onFocus = {handleOpen}
//           {...props}
//           {...field}
//           helperText={errorText}
//           error={!!errorText}
//         />

//         <IconButton
//           onClick={handleOpen}
//           style = {{height:'30px'}}
//           aria-label='filter list'>
//           <ArrowDropDownIcon />
//         </IconButton>
//       </Box>
//       <Box id = {props.name}></Box>
//       {/* select && */}
//       <Popper
//         id='popoverColumns'
//         open={select}
//         anchorEl={document.getElementById(props.name)}
//         onClose={handleClose}
//         placement="bottom"
//         // anchorOrigin={{
//         //   vertical: 'top',
//         //   horizontal: 'left',
//         // }}
//       >
//         {options.map((option) => {
//           return (
//               <MenuItem
//                 onClick = {()=>setSelect(false)}
//                 value={option.id}
//                 key={option.id}
//                 id={option.id}
//               >
//                 {option.nombre}
//               </MenuItem>
//           );
//         })}
//       </Popper>

//     </>
//   )
// }

// export default MyAutocomplete;
