import React from 'react';
import List from '@material-ui/core/List';

// import routesConfig from '../../../../modules/routesConfig';
import VerticalCollapse from './VerticalCollapse';
import VerticalItem from './VerticalItem';
import VerticalNavGroup from './VerticalNavGroup';

import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import defaultConfig from '@crema/utility/ContextProvider/defaultConfig';

const Navigation = () => {
  const user = useAuthUser();
  return (
    <List>
      {user.permisos.map((item) => (
        <React.Fragment key={item.id}>
          {item.type === 'group' && <VerticalNavGroup item={item} level={0} />}

          {item.type === 'collapse' &&
            item.id != defaultConfig.ID_APP_MOVIL && (
              <VerticalCollapse item={item} level={0} />
            )}

          {item.type === 'item' && <VerticalItem item={item} level={0} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default Navigation;
