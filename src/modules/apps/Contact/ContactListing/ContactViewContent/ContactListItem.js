import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import {withRouter} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {blue, grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const ContactListItem = ({
  contact,
  labelList,
  onChangeCheckedContacts,
  checkedContacts,
  onChangeStarred,
  onSelectContactsForDelete,
  onViewContactDetail,
  onOpenEditContact,
}) => {
  // const onGetLabelColor = (labelId) => {
  //   if (labelId) {
  //     return (
  //       labelList.length > 0 &&
  //       labelList.find((label) => label.id === labelId).color
  //     );
  //   }
  // };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottom: `1px solid ${grey[300]}`,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 20,
      paddingRight: 20,
      cursor: 'pointer',
      '&.rootCheck': {
        fontWeight: Fonts.LIGHT,
        backgroundColor: grey[200],
      },
    },
    truncate: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    avatar: {
      backgroundColor: blue[500],
    },
    labelIconRoot: {
      marginLeft: 12,
      marginRight: 8,
      display: 'none',
      color: 'blue',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    deleteIcon: {
      marginLeft: 12,
      marginRight: 8,
      display: 'none',
      color: 'red',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    visibilityIcon: {
      marginLeft: 12,
      marginRight: 8,
      display: 'none',
      color: 'gray',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <ListItem
        key={contact.id}
        className={clsx(classes.root, 'item-hover', {
          rootCheck: checkedContacts.includes(contact.id),
        })}>
        <Box
          component='span'
          ml='auto'
          mr={{xl: 2}}
          display='flex'
          alignItems='center'
          flex={1}>
          <EditIcon className={classes.labelIconRoot} />
          <VisibilityIcon
            onClick={() => onViewContactDetail(contact)}
            className={classes.visibilityIcon}
          />
          <DeleteIcon className={classes.deleteIcon} />
        </Box>
        <Box mr={4} fontWeight={Fonts.MEDIUM} component='span' flex={1}>
          {contact.id}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', sm: 'block'}}>
          {contact.nombre}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', md: 'block'}}>
          {contact.nombre_departamento ? contact.nombre_departamento : ''}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', md: 'block'}}>
          {contact.nombre_ciudad ? contact.nombre_ciudad : ''}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', md: 'block'}}>
          {contact.nombre_asociado ? contact.nombre_asociado : ''}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', md: 'block'}}
          className={classes.truncate}>
          {contact.codigo_dian ? contact.codigo_dian : ''}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', md: 'block'}}
          className={classes.truncate}>
          {contact.geocerca_id ? contact.geocerca_id : ''}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', md: 'block'}}
          className={classes.truncate}>
          {contact.geocerca_superior_id ? contact.geocerca_superior_id : ''}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', md: 'block'}}
          className={classes.truncate}>
          {contact.lugar_unico_asociado ? contact.lugar_unico_asociado : ''}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', md: 'block'}}
          className={classes.truncate}>
          {contact.observaciones ? contact.observaciones : ''}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', md: 'block'}}
          className={classes.truncate}>
          {contact.estado ? contact.estado : ''}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', md: 'block'}}
          className={classes.truncate}>
          {contact.usuario_modificacion_nombre
            ? contact.usuario_modificacion_nombre
            : ''}
        </Box>

        <Box
          component='span'
          mr={4}
          flex={1}
          display={{xs: 'none', md: 'block'}}
          className={classes.truncate}>
          {contact.fecha_modificacion ? contact.fecha_modificacion : ''}
        </Box>
      </ListItem>
    </>
  );
};

export default withRouter(ContactListItem);

ContactListItem.defaultProps = {
  labelList: [],
  checkedContacts: [],
};

ContactListItem.prototype = {
  contact: PropTypes.object.isRequired,
  labelList: PropTypes.array,
  onChangeCheckedContacts: PropTypes.func,
  checkedContacts: PropTypes.array,
  onChangeStarred: PropTypes.func,
  onSelectContactsForDelete: PropTypes.func,
  onViewContactDetail: PropTypes.func,
  onOpenEditContact: PropTypes.func,
};
