import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem";
import SpotService from '../services/SpotService';
import Cron from 'node-cron';

export default class SingleSpotComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scheduleErrorText: '',
            scheduleInvalid: false,
            fieldsDisabled: !this.props.fieldsDisabled !== true,
            spot: {
                id: '',
                url: '',
                schedule: ''
            }
        };
    }

    gotSpotId() {
        return this.props.spotId && this.props.spotId.length > 0;
    }

    getSingleSpot(someReaction) {
        if (this.gotSpotId()) {
            SpotService.getSpotById(this.props.spotId)
                .then(response => {
                    someReaction(response.data.payload);
                })
                .catch(error => {
                });
        }
    }

    componentDidMount() {
        if (!this.gotSpotId()) {
            this.setState({
                scheduleInvalid: true
            });
        }
    }
    
    handleOpen() {
        let state = {
            open: true,
            fieldsDisabled: this.props.actionName === 'View'
        };
        if (this.gotSpotId()) {
            this.getSingleSpot( payload => {
                this.setState({ ...state, spot: payload});
            });
        } else {
            this.setState(state);
        }
    };

    handleCancel() {
        this.setState({open: false});
        this.closeParent();
    }

    handleSubmit() {
        this.setState({open: false});
        this.closeParent();
        if (this.props.actionName === 'Create') {
            SpotService.createSpot(this.state.spot)
                .then(response => {
                    this.props.table.reloadSpotTable();
                })
                .catch(error => {
                });
        } else if (this.props.actionName === 'Edit') {
            SpotService.updateSpot(this.state.spot)
                .then(response => {
                    this.props.table.getAllSpots();
                })
                .catch(error => {
                });
        }
    }

    handleUrl(event) {
        this.setState({ spot: { ...this.state.spot, url: event.target.value} });
    }

    handleSchedule(event) {
        if (!Cron.validate(event.target.value)) {
            this.setState({
                scheduleErrorText: 'Invalid schedule value',
                scheduleInvalid: true,
            });
        } else {
            this.setState({
                scheduleErrorText: '',
                scheduleInvalid: false,
                spot: { ...this.state.spot, schedule: event.target.value  }
            });
        }
    }

    closeParent() {
        this.props.parent.close();
    }

    render() {
        let spotView, spotActions = (
            <div>
                <Button onClick={this.handleCancel.bind(this)}
                        color="primary">Cancel</Button>
                <Button onClick={this.handleSubmit.bind(this)}
                        disabled={this.state.scheduleInvalid}
                        color="primary">Submit</Button>
            </div>
        );
        if (this.props.actionName === 'View') {
            spotView = (
                <div>
                <pre>
                    {JSON.stringify(this.state.spot.status, null, 2)}
                </pre>
                </div>
            );
            spotActions = (
                <div>
                    <Button onClick={this.handleCancel.bind(this)} color="primary">Exit</Button>
                </div>
            );
        }
        return (
            <div>
                <MenuItem onClick={this.handleOpen.bind(this)}>{this.props.actionName}</MenuItem>
                <Dialog open={this.state.open} aria-labelledby="form-dialog-title" fullScreen={true}>
                    <DialogTitle id="form-dialog-title">{this.props.actionName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            A Spot contains a URL and a valid CRON-style schedule
                        </DialogContentText>
                        <TextField
                            onChange={ this.handleUrl.bind(this) }
                            autoFocus
                            margin="dense"
                            id="url"
                            label="URL"
                            defaultValue={this.state.spot.url}
                            disabled={this.state.fieldsDisabled}
                            fullWidth
                        />
                        <TextField
                            error={ this.state.scheduleInvalid }
                            helperText={ this.state.scheduleErrorText }
                            onChange={ this.handleSchedule.bind(this) }
                            autoFocus
                            margin="dense"
                            id="schedule"
                            label="Schedule"
                            defaultValue={this.state.spot.schedule}
                            disabled={this.state.fieldsDisabled}
                            fullWidth
                        />
                        {spotView}
                    </DialogContent>
                    <DialogActions>
                        {spotActions}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}