import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default class ReloadingSpotsSnackbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    handleOpen() {
        this.setState({open: true});
        setTimeout(() => {
            this.handleClose();
        }, 4000);
    }
    
    handleClose() {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Reloading Spots!</span>}
                />
            </div>
        );
    }
}