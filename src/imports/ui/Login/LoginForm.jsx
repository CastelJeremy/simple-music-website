import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import UserDAO from '../../api/UserDAO.js';
import User from '../../api/User.js';

const styles = (theme) => ({
    formContainer: {
        margin: 'auto',
        maxWidth: '350px',
    },
    form: {
        padding: '10px',
        maxWidth: '330px',
    },
    input: {
        marginBottom: '10px',
    },
});

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            usernameError: '',
            passwordError: '',
            showPassword: false,
            loading: false,
        };

        this.handleInputUsername = this.handleInputUsername.bind(this);
        this.handleInputPassword = this.handleInputPassword.bind(this);
        this.handleTogglePassword = this.handleTogglePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputUsername(event) {
        this.setState({
            username: event.target.value,
            usernameError:
                event.target.value.length == 0 ? 'Invalid username.' : '',
        });
    }

    handleInputPassword(event) {
        this.setState({
            password: event.target.value,
            passwordError:
                event.target.value.length == 0 ? 'Invalid password.' : '',
        });
    }

    handleTogglePassword() {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            usernameError: this.state.username ? '' : 'Invalid username.',
            passwordError: this.state.password ? '' : 'Invalid password.',
        });

        if (this.state.username && this.state.password) {
            this.setState({ loading: true });

            const userDao = new UserDAO();
            userDao
                .login(this.state.username, this.state.password)
                .then((token) => {
                    this.setState({
                        loading: false,
                    });

                    this.props.onLogin(new User(this.state.username, token));
                })
                .catch((err) => {
                    if (err.statusCode && err.statusCode === 400) {
                        this.setState({
                            usernameError: 'Incorrect username.',
                            passwordError: 'Incorrect password.',
                        });
                    }

                    this.setState({ loading: false });
                });
        }
    }

    render() {
        return (
            <Paper className={this.props.classes.formContainer}>
                <form
                    className={this.props.classes.form}
                    onSubmit={this.handleSubmit}
                >
                    <Grid container direction="column">
                        <FormControl
                            className={this.props.classes.input}
                            error={this.state.usernameError ? true : false}
                            size="small"
                            variant="outlined"
                        >
                            <InputLabel>Username</InputLabel>
                            <OutlinedInput
                                labelWidth={72}
                                onChange={this.handleInputUsername}
                                value={this.state.username}
                            />
                            <FormHelperText>
                                {this.state.usernameError}
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            className={this.props.classes.input}
                            error={this.state.passwordError ? true : false}
                            size="small"
                            variant="outlined"
                        >
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                labelWidth={72}
                                onChange={this.handleInputPassword}
                                type={
                                    this.state.showPassword
                                        ? 'text'
                                        : 'password'
                                }
                                value={this.state.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={this.handleTogglePassword}
                                            size="small"
                                        >
                                            {this.state.showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText>
                                {this.state.passwordError}
                            </FormHelperText>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={this.state.loading}
                        >
                            {this.state.loading ? (
                                <CircularProgress size={24.5} />
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </Grid>
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(LoginForm);
