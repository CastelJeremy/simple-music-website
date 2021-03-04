import React from 'react';
import HomeItemSong from './HomeItemSong.jsx';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(1),
        width: '100%',
    },
    title: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1),
        display: 'inline-block',
    },
});

class HomeListSong extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <Paper className={this.props.classes.title}>
                    <Typography variant="h5">
                        {this.props.album.getName()}
                    </Typography>
                </Paper>

                {this.props.songs.map((song) => (
                    <HomeItemSong
                        onClick={this.props.onClick}
                        song={song}
                        key={song.getId()}
                    />
                ))}
            </div>
        );
    }
}

export default withStyles(styles)(HomeListSong);
