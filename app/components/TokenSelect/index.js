import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  menuItem: {
    fontSize: 24
  },
  select: {
    fontSize: 24,
  },
  inputLabel: {
    fontSize: 26,
    marginBottom: theme.spacing.unit * 2,
    position: 'unset'
  }
});

class SimpleSelect extends React.Component {
  state = {
    token: this.props.userTokens[0].value
  };
//   componentDidMount() {
//     this.props.handleChangeToken(this.state.token);
//   }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.handleChangeToken(event.target.value);
  };

  render() {
    const { classes, userTokens } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.inputLabel} htmlFor="token-simple">Token</InputLabel>
          <Select
            className={classes.select}
            value={this.state.token}
            onChange={this.handleChange}
            inputProps={{
              name: 'token',
              id: 'token-simple',
            }}
          >
            {userTokens.map(n => {
            return (
                <MenuItem className={classes.menuItem} key={n.value} value={n.value}>{`${n.label}`}</MenuItem>
            )})}
          </Select>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  userTokens: PropTypes.array.isRequired,
  handleChangeToken: PropTypes.func.isRequired,
};

const TokenSelect =  withStyles(styles)(SimpleSelect);
export default TokenSelect;