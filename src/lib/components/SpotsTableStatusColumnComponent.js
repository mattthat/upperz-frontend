import React from 'react';

export default class SpotsTableStatusColumnComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.provideStyle();
    }

    provideStyle(color = 'spots-table-status-none', text = 'NONE', code = 0) {
        return {
            style: {
                color: color,
                    text: text,
                    code: code
            }
        };
    }

    propsToState() {
        if (this.props.code === 0 || this.props.code === '') {
            this.setState(this.provideStyle());
        } else if (this.props.code >= 100 && this.props.code < 400) {
            this.setState(
                this.provideStyle('spots-table-status-success', 'SUCCESS', this.props.code))
        } else if (this.props.code === -1 || this.props.code >= 400) {
            this.setState(
                this.provideStyle('spots-table-status-fail', 'FAIL', this.props.code))
        }
    }

    componentDidMount() {
        this.propsToState();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.code !== this.props.code) {
            this.propsToState()
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