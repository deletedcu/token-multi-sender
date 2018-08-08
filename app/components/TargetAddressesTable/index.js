
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import targetAddressList from '../../../target_addresses.json';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell> {'USER ID'}  </TableCell>
            <TableCell> {'USER NAME'}  </TableCell>
            <TableCell> {'EMAIL'}      </TableCell>
            <TableCell> {'ADDRESS'} </TableCell>
            <TableCell> {'AMOUNT'}     </TableCell>
            <TableCell> {'TX HASH'}</TableCell>            
            <TableCell> {'STATUS'}     </TableCell>
            <TableCell>{ 'DATE'} </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {targetAddressList.map(n => {
            return (
              <TableRow key={n.key}>
                <TableCell>{n.memberId}</TableCell>
                <TableCell>{n.username}</TableCell>
                <TableCell>{n.email}</TableCell>
                <TableCell>{n.wallet}</TableCell>
                <TableCell>{n.revenue}</TableCell>
                <TableCell>{n.txHash}</TableCell>
                <TableCell>{n.status}</TableCell>
                <TableCell>{n.date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
const TargetAddressesTable = withStyles(styles)(SimpleTable)
export default TargetAddressesTable;