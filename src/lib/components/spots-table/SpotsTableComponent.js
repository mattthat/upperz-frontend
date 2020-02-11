import React from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core";
import SpotService from '../../services/SpotService'
import SpotsTableStatusColumnComponent from "./SpotsTableStatusColumnComponent";
import SpotsTablePerformedColumnComponent from "./SpotsTablePerformedColumnComponent";
import SpotsTableActionColumnComponent from "./SpotsTableActionColumnComponent";

export default class SpotsTableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.service = new SpotService();
        this.state = { rows: [] };
    }

    remapPayload(payload) {
        let rows = [];
        for (let spotId of Object.keys(payload)) {
            rows.push(payload[spotId]);
        }
        return rows;
    }

    getAllSpots() {
        this.service.getAllSpots()
            .then(response => {
                this.setState({rows: this.remapPayload(response.data.payload)})
            })
            .catch(error => {
            });
    }

    componentDidMount() {
        this.getAllSpots();
        setInterval( () => {
            this.getAllSpots();
            this.props.parent.openSnackbar();
        }, 60*1000);
    }

    render() {
        const classes = makeStyles(theme => ({
            root: {
                width: '100%',
                marginTop: theme.spacing(6),
                overflowX: 'auto',
            },
            table: {
                minWidth: 650,
            },
        }));
        return (
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Actions</TableCell>
                                <TableCell align="right">URL</TableCell>
                                <TableCell align="right">Performed</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Schedule</TableCell>
                                <TableCell align="right">Id</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        <SpotsTableActionColumnComponent table={this} spotId={row.id} />
                                    </TableCell>
                                    <TableCell align="right">{row.url}</TableCell>
                                    <TableCell align="right">
                                        <SpotsTablePerformedColumnComponent time={row.status.performed} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <SpotsTableStatusColumnComponent code={row.status.code}/>
                                    </TableCell>
                                    <TableCell align="right">{row.schedule}</TableCell>
                                    <TableCell align="right">{row.id}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
        );
    }
}