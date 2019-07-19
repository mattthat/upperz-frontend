import React from 'react';
import TimeAgo from 'react-timeago'

export default class SpotsTablePerformedColumnComponent extends React.Component {

    render() {
        return (
            <div>
                <p className="medium-text">{new Date(this.props.time).toLocaleString()}</p>
                <p className="small-text"><TimeAgo date={this.props.time}/></p>
            </div>
        )
    }
}