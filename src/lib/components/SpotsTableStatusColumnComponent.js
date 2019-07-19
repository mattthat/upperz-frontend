import React from 'react';

export default class SpotsTableStatusColumnComponent extends React.Component {
    constructor(props) {
        super(props);
        this.style = { color: 'spots-table-status-none', text: 'NONE', code: '' };
    }

    evaluate() {
        if (this.props.code === 200) {
            this.style = {
                color: 'spots-table-status-success',
                text: 'SUCCESS',
                code: this.props.code
            };
        }
        else if (this.props.code === -1) {
            this.style = {
                color: 'spots-table-status-fail',
                text: 'FAIL',
                code: this.props.code
            };
        }
    }
    componentDidMount() {
        this.evaluate();
    }


    render() {
        this.evaluate();
        if (this.style.text !== 'NONE') {
            return (
                <p className={this.style.color}>
                    <span>{this.style.text}</span> <span>({this.style.code})</span>
                </p>
            )
        } else {
            return (
                <p className={this.style.color}>
                    <span>{this.style.text}</span>
                </p>
            )
        }
    }
}