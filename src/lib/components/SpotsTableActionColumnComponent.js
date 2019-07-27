import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SingleSpotComponent from "./SingleSpotComponent";
import RemoveSpotConfirmationComponent from "./RemoveSpotConfirmationComponent";

export default class SpotsTableActionColumnComponent extends React.Component {
    
    render() {
        return (
            <PopupState variant="popover" popupId="demo-popup-menu">
                {popupState => (
                    <React.Fragment>
                        <Button variant="contained" {...bindTrigger(popupState)}>
                            <span className="small-text">Actions</span>
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                            <SingleSpotComponent table={this.props.table} parent={popupState} actionName="Edit" spotId={this.props.spotId}/>
                            <SingleSpotComponent parent={popupState} actionName="View" spotId={this.props.spotId}/>
                            <RemoveSpotConfirmationComponent table={this.props.table} parent={popupState} spotId={this.props.spotId} />
                        </Menu>
                    </React.Fragment>
                )}
            </PopupState>
        );
    }
}