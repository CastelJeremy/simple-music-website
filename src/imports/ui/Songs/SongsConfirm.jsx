import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import SongDAO from '../../api/SongDAO.js';

class SongsConfirm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.setState({
            loading: true,
        });

        const songDao = new SongDAO();

        songDao
            .delete(this.props.user.getToken(), this.props.song.getId())
            .then((song) => {
                this.props.refreshSongs();
                this.props.onClose();
            })
            .catch((err) => {
                if (err.statusCode) {
                    if (err.statusCode === 401) {
                        this.props.onLogout();
                    }
                }

                console.log(err);

                this.setState({
                    loading: false,
                });
            });
    }

    render() {
        return (
            <React.Fragment>
                <DialogTitle>Delete</DialogTitle>

                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete ?
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.onClose}>Cancel</Button>
                    <Button
                        onClick={this.handleSubmit}
                        disabled={this.state.loading}
                    >
                        {this.state.loading ? (
                            <CircularProgress size="24.5px" />
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}

export default SongsConfirm;
