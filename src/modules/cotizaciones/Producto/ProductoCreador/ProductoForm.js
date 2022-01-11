import React, {useEffect, useState, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Box, Button, RadioGroup, Radio} from '@material-ui/core';
import {Field, Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import {Fonts} from '../../../../shared/constants/AppEnums';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import MyAutocomplete from '../../../../shared/components/MyAutoComplete';
import {useDropzone} from 'react-dropzone';
import Dropzone from 'react-dropzone';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import {FETCH_ERROR} from '../../../../shared/constants/ActionTypes';
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

const ProductoForm = (props) => {
  const dispatch = useDispatch();
  const {
    handleOnClose,
    accion,
    values,
    initialValues,
    titulo,
    tiposProductos,
    colores,
    setFieldValue,
    errors,
    touched,
  } = props;
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
      marginBottom: 0,
      [theme.breakpoints.up('xl')]: {
        marginBottom: 0,
      },
      height: '65px',
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
  }));

  const classes = useStyles(props);

  useEffect(() => {
    if (values.tipo_servicio !== 'OTR') {
      setFieldValue('tipo_servicio_otro', '');
    }
  }, [values.tipo_servicio, setFieldValue]);

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
    height: '30px',
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
  const [imagen, setImagen] = useState('');
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
            mb={{xs: 4, xl: 6}}
            fontSize={20}
            fontWeight={Fonts.MEDIUM}>
            {titulo}
          </Box>

          <Box px={{md: 5, lg: 8, xl: 10}}>
            <Box className={classes.inputs_2} minWidth='800px'>
              <Box>
                <MyTextField
                  className={classes.myTextField}
                  label='Código Articulo'
                  name='codigo_producto'
                  disabled={disabled}
                  required
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Nombre'
                  name='nombre'
                  disabled={disabled}
                  required
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Nombre Comercial'
                  name='alias_producto'
                  disabled={disabled}
                  required
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Descripción Técnica'
                  name='descripcion_tecnica_producto'
                  disabled={disabled}
                  required
                  multiline
                />
                <MyAutocomplete
                  options={tiposProductos}
                  name='tipo_producto_id'
                  inputValue={initialValues.tipo_producto_id}
                  label='Tipo Producto'
                  //autoHighlight
                  className={classes.myTextField}
                  required
                  disabled={disabled}
                />
                <MyAutocomplete
                  options={colores}
                  name='color_id'
                  inputValue={initialValues.color_id}
                  label='Color'
                  //autoHighlight
                  className={classes.myTextField}
                  disabled={disabled}
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Dimensiones'
                  name='dimensiones_producto'
                  disabled={disabled}
                  multiline
                />
                <MyTextField
                  className={classes.myTextField}
                  label='Características'
                  name='caracteristicas_producto'
                  disabled={disabled}
                  multiline
                />
              </Box>
              <Box>
                <Box
                  style={{
                    height: '230px',
                    border: '1px solid black',
                    marginBottom: '5px',
                    textAlign: 'center',
                  }}>
                  {values.archivo_foto ? (
                    <img
                      src={imagen}
                      alt='Imagen Articulo'
                      style={{height: '100%'}}
                    />
                  ) : (
                    ''
                  )}
                </Box>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    console.log(acceptedFiles[0]);

                    if (acceptedFiles.length === 0) {
                      dispatch({
                        type: FETCH_ERROR,
                        payload: 'Solo se aceptan imágenes',
                      });
                    } else {
                      setFieldValue('archivo', acceptedFiles[0]);
                      setFieldValue('archivo_foto', acceptedFiles[0].name);
                      setImagen(URL.createObjectURL(acceptedFiles[0]));
                    }
                  }}
                  accept='.APNG,.AVIF,.GIF,.JPEG,.JPG,.PNG,.SVG,.WebP,.BMP,.ICO,.TIFF'>
                  {({getRootProps, getInputProps}) => (
                    <div {...getRootProps({style})}>
                      <input
                        {...getInputProps()}
                        name='archivo'
                        type='file'
                        id='archivo'
                        onChange={(event) => {
                          console.log(event.target.files[0]);
                          if (event.target.files[0].type.includes('image')) {
                            setFieldValue('archivo', event.target.files[0]);
                            setImagen(
                              URL.createObjectURL(event.target.files[0]),
                            );
                            setFieldValue(
                              'archivo_foto',
                              event.target.files[0].name,
                            );
                          } else {
                            dispatch({
                              type: FETCH_ERROR,
                              payload: 'Solo se aceptan imágenes',
                            });
                          }
                        }}
                      />
                      <p>Arrastra una imagen o haz click para cargarla</p>
                    </div>
                  )}
                </Dropzone>
                <MyTextField
                  name='archivo_foto'
                  id='archivo_foto'
                  type='hidden'
                  width='100%'
                />
                {values.archivo_foto ? (
                  <Box
                    margin={'0px'}
                    component='p'
                    display='flex'
                    justifyContent='center'>
                    {values.archivo_foto}
                    <Tooltip title={<IntlMessages id='boton.eliminar' />}>
                      <DeleteIcon
                        onClick={() => {
                          setFieldValue('archivo', {});
                          setFieldValue('archivo_foto', '');
                          setImagen('');
                        }}
                        className={`${classes.generalIcons} ${classes.deleteIcon}`}></DeleteIcon>
                    </Tooltip>
                  </Box>
                ) : (
                  ''
                )}
              </Box>
            </Box>

            <Box className={classes.inputs_2}>
              <FormControl
                className={classes.widthFull}
                component='fieldset'
                error={
                  errors.producto_empaque && touched.producto_empaque
                    ? true
                    : false
                }>
                <FormLabel>Empaque*</FormLabel>
                <Field
                  name='producto_empaque'
                  type='radio'
                  as={RadioGroup}
                  className={classes.myTextField}
                  disabled={disabled}
                  row
                  value={values.producto_empaque}>
                  <FormControlLabel
                    value='S'
                    control={<Radio color='primary' />}
                    label='Si'
                    labelPlacement='end'
                    disabled={disabled}
                  />
                  <FormControlLabel
                    value='N'
                    control={<Radio color='primary' />}
                    label='No'
                    labelPlacement='end'
                    disabled={disabled}
                  />
                </Field>
                {errors.producto_empaque && touched.producto_empaque && (
                  <FormHelperText className={classes.helperText}>
                    Requerido
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                className={classes.widthFull}
                component='fieldset'
                error={
                  errors.producto_cliente_especifico &&
                  touched.producto_cliente_especifico
                    ? true
                    : false
                }>
                <FormLabel>Cliente Específico*</FormLabel>
                <Field
                  name='producto_cliente_especifico'
                  type='radio'
                  as={RadioGroup}
                  className={classes.myTextField}
                  disabled={disabled}
                  row
                  value={values.producto_cliente_especifico}>
                  <FormControlLabel
                    value='S'
                    control={<Radio color='primary' />}
                    label='Si'
                    labelPlacement='end'
                    disabled={disabled}
                  />
                  <FormControlLabel
                    value='N'
                    control={<Radio color='primary' />}
                    label='No'
                    labelPlacement='end'
                    disabled={disabled}
                  />
                </Field>
                {errors.producto_cliente_especifico &&
                  touched.producto_cliente_especifico && (
                    <FormHelperText className={classes.helperText}>
                      Requerido
                    </FormHelperText>
                  )}
              </FormControl>
            </Box>

            <MyTextField
              className={classes.myTextField}
              label='Producto Producción'
              name='producto_produccion_id'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Producto Facturación'
              name='producto_facturacion_id'
              disabled={disabled}
            />
            <MyTextField
              className={classes.myTextField}
              label='Link Archivo Especificaciones Técnicas'
              name='link_especificaciones_tecnicas'
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

export default ProductoForm;
