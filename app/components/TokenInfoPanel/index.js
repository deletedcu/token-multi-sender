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
});

function PaperSheet(props) {
  const { classes, tokenInfo, tokenInfoLoadingError } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          Token Related Inforamtion
        </Typography>
        {tokenInfo && 
        (<Typography component="p">
          {
            ` 
              Token: ${tokenInfo.tokenSymbol}
              Decimals: ${tokenInfo.decimals} 
              Balance: ${tokenInfo.defAccTokenBalance} 
              ETH: ${tokenInfo.defAccEthBalance}
              Allowance: ${tokenInfo.allowance}
              CurrentFee: ${tokenInfo.currentFee}
              ArrayLimit: ${tokenInfo.arrayLimit}
          `}
        </Typography>)
        }
        {tokenInfoLoadingError && 
        (<Typography component="p">
          {tokenInfoLoadingError.message}
        </Typography>)
        }
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  tokenInfo: PropTypes.object,
  tokenInfoLoadingError: PropTypes.object,
};
const TokenInfoPanel = withStyles(styles)(PaperSheet);
export default TokenInfoPanel;
