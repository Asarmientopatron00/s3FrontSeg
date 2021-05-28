import React from 'react';
// import {useSelector} from 'react-redux';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
// import {useIntl} from 'react-intl';
// import ContactCheckedActions from './ContactCheckedActions';
// import AppsPagination from '../../../../../@crema/core/AppsPagination';
// import ListItem from '@material-ui/core/ListItem';
import {Fonts} from '../../../../../shared/constants/AppEnums';
const ContactHeader = (props) => {
  // const {
  //   // checkedContacts,
  //   // setCheckedContacts,
  //   // filterText,
  //   // onSetFilterText,
  //   // onChangePageView,
  //   // onSelectContactsForDelete,
  //   // page,
  //   // onPageChange,
  //   // pageView,
  // } = props;

  const useStyles = makeStyles((theme) => ({
    appsPaginationRoot: {
      paddingLeft: 8,
      paddingRight: 8,
    },
  }));

  const classes = useStyles(props);

  // const {messages} = useIntl();

  return (
    <>
      <Box
        component='span'
        ml='auto'
        mr={{xl: 2}}
        display='flex'
        alignItems='center'
        flex={1}
      >
        Acciones
      </Box>
      <Box
        mr={4}
        fontWeight={Fonts.MEDIUM}
        component='span'
        flex={1}
      >
        Id
      </Box>

      <Box
        component='span'
        mr={4}
        flex={1}
        display={{xs: 'none', sm: 'block'}}
      >
        Nombre
      </Box>

      <Box
        component='span'
        mr={4}
        flex={1}
        display={{xs: 'none', md: 'block'}}
      >
        Departamento
      </Box>

      <Box
        component='span'
        mr={4}
        flex={1}
        display={{xs: 'none', md: 'block'}}
      >
        Ciudad
      </Box>

      <Box
        component='span'
        mr={4}
        flex={1}
        display={{xs: 'none', md: 'block'}}
      >
        Asociado
      </Box>

      <Box
        component='span'
        mr={4}
        flex={1}
        display={{xs: 'none', md: 'block'}}
        className={classes.truncate}
      >
        Código DIAN
      </Box>

      <Box
        component='span'
        mr={4}
        flex={1}
        display={{xs: 'none', md: 'block'}}
        className={classes.truncate}
      >
        Geocerca Id
      </Box>

      <Box
        component='span'
        mr={4}
        flex={1}
        display={{xs: 'none', md: 'block'}}
        className={classes.truncate}
      >
        Geocerca Superior Id
      </Box>

      <Box
        component='span'
        mr={4}
        flex={1}
        display={{xs: 'none', md: 'block'}}
        className={classes.truncate}
      >
        Lugar Único
      </Box>

      <Box
        component='span'
        mr={4}
        flex={1}
        display={{xs: 'none', md: 'block'}}
        className={classes.truncate}
      >
        Observaciones
      </Box>

      <Box
        component='span'
        mr={4}
        flex={1}
        display={{xs: 'none', md: 'block'}}
        className={classes.truncate}
      >
        Estado
      </Box>

      <Box
        component='span'
        mr={4}
        flex={1}
        display={{xs: 'none', md: 'block'}}
        className={classes.truncate}
      >
        Fecha Última Modificación
      </Box>

      <Box
        component='span'
        mr={4}
        flex={1}
        display={{xs: 'none', md: 'block'}}
        className={classes.truncate}
      >
        Modificado Por
      </Box>
    </>
  );
};

export default ContactHeader;

ContactHeader.defaultProps = {
  checkedContacts: [],
  filterText: '',
  page: 0,
};

ContactHeader.prototype = {
  checkedContacts: PropTypes.array,
  setCheckedContacts: PropTypes.func,
  filterText: PropTypes.string,
  onSetFilterText: PropTypes.func,
  onSelectContactsForDelete: PropTypes.func,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
  pageView: PropTypes.string.isRequired,
  onChangePageView: PropTypes.func,
};
