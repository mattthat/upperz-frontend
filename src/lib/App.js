import React from 'react';
import ReloadingSpotsSnackbarComponent from './components/ReloadingSpotsSnackbarComponent';
import SpotsTableComponent from './components/SpotsTableComponent';
import AppBarComponent from './components/AppBarComponent';
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
