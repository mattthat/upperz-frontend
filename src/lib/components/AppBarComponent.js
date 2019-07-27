import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MenuItem from '@material-ui/core/MenuItem';
import SingleSpotComponent from './SingleSpotComponent';
import AboutComponent from './AboutComponent';
import Arrow from '../../media/arrow.png';

export default class AppBarComponent extends React.Component {

    closeAndReloadSpotTable(menuPopup) {
        this.props.parent.reloadSpotTable();
        menuPopup.close();
    }

    render() {
        const classes = makeStyles(theme => ({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }));
        return (
            <div className={classes.root}>
                <AppBar position="static" className="custom-app-bar">
                    <Toolbar>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {popupState => (
                                <React.Fragment>
                                    <IconButton edge="start" className={classes.menuButton} color="inherit"
                                                aria-label="Menu" {...bindTrigger(popupState)}>
                                        <MenuIcon/>
                                    </IconButton>
                                    <Menu {...bindMenu(popupState)}>
                                        <AboutComponent parent={popupState} />
                                        <SingleSpotComponent table={this.props.parent} parent={popupState} actionName="Create" />
                                        <MenuItem onClick={this.closeAndReloadSpotTable.bind(this, popupState)}>Reload</MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                        <Typography variant="h6" className={classes.title}>
                            <img className="arrow" src={Arrow} alt="arrow" /> <div className="app-name">pperz</div>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}