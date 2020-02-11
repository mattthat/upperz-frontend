import React from 'react';
import ReloadingSpotsSnackbarComponent from './lib/components/snackbars/ReloadingSpotsSnackbarComponent';
import SpotsTableComponent from './lib/components/spots-table/SpotsTableComponent';
import AppBarComponent from './lib/components/orchestration/AppBarComponent';
import './App.css';

export default class App extends React.Component {

    reloadSpotTable() {
        this.refs.table.getAllSpots();
    }

    openSnackbar() {
        this.refs.snackbar.handleOpen();
    }

    render() {
        return (
            <div className="app-wrapper">
                <ReloadingSpotsSnackbarComponent ref="snackbar" />
                <div className="app">
                    <AppBarComponent parent={this}/>
                    <SpotsTableComponent parent={this} ref="table" />
                </div>
            </div>
        );
    }
}
