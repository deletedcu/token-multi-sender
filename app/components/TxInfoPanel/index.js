import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  warning: {
    color: 'red'
  },
  block: {
    display: 'flex',
    flex:1, 
    justifyContent: 'space-around'
  },
  words: {
    display: 'flex'
  },
  title: {
    color: '#299de7',
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 3,
  },
  info: {
    color: 'blue',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 1,
  },
  field: {
    color: '#406158',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
  }
});

function PaperSheet(props) {
  const { classes, txInfo, txInfoLoadingError } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          Transaction sent
        </Typography>
        {
          txInfo && 
            (
              <div className ={classes.block}>
                <div className ={classes.words}>
                  <Typography variant="headline" component="h3" className ={classes.field}>{'STATUS:'}</Typography>
                  <Typography variant="headline" component="h3" className ={classes.info}> {`${txInfo.get('status')}`} </Typography>
                </div>
                <div className ={classes.words}>
                  <Typography variant="headline" component="h3" className ={classes.field}>{'TX HASH:'}</Typography>
                  <Typography variant="headline" component="h3" className ={classes.info}> {`${txInfo.get('hash')}`} </Typography>
                </div>
              </div>
              )
        }                
        {txInfoLoadingError && 
        (<Typography component="p">
          {txInfoLoadingError.message}
        </Typography>)
        }
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  txInfo: PropTypes.object,
  txInfoLoadingError: PropTypes.object,
};
const TxInfoPanel = withStyles(styles)(PaperSheet);
export default TxInfoPanel;
