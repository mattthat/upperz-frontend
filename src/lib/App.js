import React from 'react';
import SpotsTableComponent from './components/SpotsTableComponent';
import AppBarComponent from './components/AppBarComponent';
import './App.css';

export default class App extends React.Component {

    reloadSpotTable() {
        this.refs.table.getAllSpots();
    }

    render() {
        return (
            <div className="app-wrapper">
                <div className="app">
                    <AppBarComponent parent={this}/>
                    <SpotsTableComponent ref="table" />
                </div>
            </div>
        );
    }
}
