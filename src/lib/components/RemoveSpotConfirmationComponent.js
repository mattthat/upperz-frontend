import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem";
import SpotService from "../services/SpotService";

export default class RemoveSpotConfirmationComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleYes() {
        this.setState({open: false});
        this.props.parent.close();
        SpotService.removeSpot(this.props.spotId)
            .then(response => {
                this.props.table.getAllSpots();
            })
            .catch(error => {
            });
    }

    handleNo() {
        this.setState({open: false});
        this.props.parent.close();
    }

    render() {
        return (
            <div>
                <MenuItem onClick={this.handleOpen.bind(this)}>Remove</MenuItem>
                <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Remove Spot</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to remove this Spot?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <div>
                            <Button onClick={this.handleYes.bind(this)} color="primary">Yes</Button>
                            <Button onClick={this.handleNo.bind(this)} color="primary">No</Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}