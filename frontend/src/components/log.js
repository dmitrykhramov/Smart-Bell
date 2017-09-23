import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Log extends Component {

    componentWillMount() {
        this.props.fetchLogs();
    }

    componentDidMount() {
        this.props.ws.onmessage = msg => {
            if (typeof msg.data === "string") {
                if (msg.data == 'log') {
                    this.props.fetchLogs();
                }
            }
        };
    }

    renderLogs() {
        if (this.props.logs) {
            return this.props.logs.map((log) => {
                const imgPath = `./python/${log.photopath}`;
                const imgAlt = log.firstname + ' ' + log.lastname;
                return (
                    <div className="list-group-item" key={log._id}>
                        <a className="thumbnail col-sm-3" href={imgPath}>
                            <img alt={imgAlt} src={imgPath} />
                        </a>
                        Name: {log.firstname} {log.lastname}
                        <br />
                        Time: {log.time}
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div>
                <ul className="list-group">
                    {this.renderLogs()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { logs: state.bell.logs, ws: state.bell.socket };
}

export default connect(mapStateToProps, actions)(Log);
