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
  const { classes, tokenInfo, tokenInfoLoadingError } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={10}>
        <Typography variant="headline" component="h2" className ={classes.title}>
          Token Related Inforamtion
        </Typography>
        {
          tokenInfo &&              
              (
                <div className ={classes.block}>
                  <div className ={classes.words}>
                    <Typography variant="headline" component="h3" className ={classes.field}>{'Token:'}</Typography>
                    <Typography variant="headline" component="h3" className ={classes.info}> {`${tokenInfo.tokenSymbol}`} </Typography>
                  </div>
                  <div className ={classes.words}>
                    <Typography variant="headline" component="h3" className ={classes.field}>{'Decimals:'}</Typography>
                    <Typography variant="headline" component="h3" className ={classes.info}> {`${tokenInfo.decimals}`} </Typography>
                  </div>
                  <div className ={classes.words}>
                    <Typography variant="headline" component="h3" className ={classes.field}>{'Balance:'}</Typography>
                    <Typography variant="headline" component="h3" className ={classes.info}> {`${tokenInfo.defAccTokenBalance || tokenInfo.defAccEthBalance}`} </Typography>   
                  </div>
                  <div className ={classes.words}>
                    <Typography variant="headline" component="h3" className ={classes.field}>{'Allowance:'}</Typography>
                    <Typography variant="headline" component="h3" className ={classes.info}> {`${tokenInfo.allowance}`} </Typography>   
                  </div>
                  <div className ={classes.words}>
                    <Typography variant="headline" component="h3" className ={classes.field}>{'Current Fee:'}</Typography>
                    <Typography variant="headline" component="h3" className ={classes.info}> {`${tokenInfo.currentFee}`} </Typography>   
                  </div>
                  <div className ={classes.words}>
                    <Typography variant="headline" component="h3" className ={classes.field}>{'Addresses/Tx:'}</Typography>
                    <Typography variant="headline" component="h3" className ={classes.info}> {`${tokenInfo.arrayLimit}`} </Typography>   
                  </div>
              </div>
              )
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
