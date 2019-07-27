import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem";
import AboutService from '../services/AboutService';

export default class AboutComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            frontend: require('../../../package.json').version +
                '.' + require('../..//buildtime.js').time
        };
    }

    handleOpen() {
        AboutService.getAbout()
            .then(response => {
                this.setState({
                    backend: response.data.version,
                    open: true
                });
            })
            .catch(error => {
            });
    };

    handleExit() {
        this.setState({open: false});
        this.props.parent.close();
    }

    render() {
        return (
            <div>
                <MenuItem onClick={this.handleOpen.bind(this)}>About</MenuItem>
                <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">About Upperz</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div>Frontend: {this.state.frontend}</div>
                            <div>Backend: {this.state.backend}</div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <div>
                            <Button onClick={this.handleExit.bind(this)} color="primary">Exit</Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}