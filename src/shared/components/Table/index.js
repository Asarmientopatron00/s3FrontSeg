import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  head: {
    borderTop: '2px solid #dee2e6',
    borderBottom: '2px solid #dee2e6',
  },
  headCell: {
    padding: '0px 0px 0px 15px',
    fontWeight: 'bold',
  },
  row: {
    padding: 'none',
  },
  cell: (props) => ({
    padding: props.vp + ' 0px ' + props.vp + ' 15px',
    whiteSpace: 'nowrap',
  }),
  lastCell: (props) => ({
    padding: props.vp + ' 0px ' + props.vp + ' 15px',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
    borderTopWidth: 2,
    borderBottomWidth: 2,
  }),
}));

const MyCell = (props) => {
  const {align, width, claseBase, value, cellColor} = props;
  const classes = useStyles({width: width, cellColor: cellColor});
  let allClassName = claseBase;

  if (width !== undefined) {
    allClassName = `${allClassName} ${classes.cellWidth}`;
  }

  return (
    <TableCell align={align} className={allClassName}>
      <span className={cellColor ? classes.cellColor : ''}>{value}</span>
    </TableCell>
  );
};

const MyTable = (props) => {
  const {headers, data, columns} = props;
  const [selected, setSelected] = React.useState([]);
  let vp = '0px';
  const classes = useStyles({vp: vp});
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const total = () => {
    let values = [];
    data.map((item, index) => {
      values[index] = item.value;
    });
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
    if (values.length) {
      return values.reduce(reducer);
    }
    return 0;
  };

  return (
    data.length > 0 && (
      <TableContainer
        style={{maxWidth: 400, margin: '0 auto', paddingBottom: 20}}>
        <Table>
          <TableHead>
            <TableRow className={classes.head}>
              {headers.map((head) => {
                return (
                  <TableCell
                    key={head}
                    align='center'
                    className={classes.headCell}>
                    {head}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              const isItemSelected = isSelected(row.name);
              return (
                <TableRow
                  hover
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.name + row.value}
                  selected={isItemSelected}
                  className={classes.row}>
                  {columns.map((columna) => {
                    if (columna.mostrar) {
                      return (
                        <MyCell
                          key={row.id + columna.id}
                          align={columna.align}
                          width={columna.width}
                          claseBase={classes.cell}
                          value={columna.value(row[columna.id])}
                          cellColor={
                            columna.cellColor
                              ? columna.cellColor(row[columna.id])
                              : ''
                          }
                        />
                      );
                    } else {
                      return <th key={row.id + columna.id}></th>;
                    }
                  })}
                </TableRow>
              );
            })}
            <TableRow
              hover
              tabIndex={-1}
              key={987438973459}
              className={classes.row}>
              <MyCell
                value={'Total'}
                align={'left'}
                claseBase={classes.lastCell}
              />
              <MyCell
                value={total()}
                align={'right'}
                claseBase={classes.lastCell}
              />
              <MyCell
                value={'100.00%'}
                align={'right'}
                claseBase={classes.lastCell}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default MyTable;
