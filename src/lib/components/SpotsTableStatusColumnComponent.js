import React from 'react';

export default class SpotsTableStatusColumnComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                color: 'spots-table-status-none',
                text: 'NONE',
                code: ''
            }
        };
    }

    evaluate() {
        if (this.props.code === 200) {
            this.setState({
                style: {
                    color: 'spots-table-status-success',
                    text: 'SUCCESS',
                    code: this.props.code
                }
            });
        } else if (this.props.code === -1) {
            this.setState({
                style: {
                    color: 'spots-table-status-fail',
                    text: 'FAIL',
                    code: this.props.code
                }
            });
        } else {
            this.setState({
                style: {
                    color: 'spots-table-status-none',
                    text: 'NONE',
                    code: 0
                }
            })
        }
    }

    componentDidMount() {
        this.evaluate();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.code !== this.props.code) {
            this.evaluate()
        }
    }

    render() {
        if (this.state.style.text !== 'NONE') {
            return (
                <p className={this.state.style.color}>
                    <span>{this.state.style.text}</span> <span>({this.state.style.code})</span>
                </p>
            )
        } else {
            return (
                <p className={this.state.style.color}>
                    <span>{this.state.style.text}</span>
                </p>
            )
        }
    }
}