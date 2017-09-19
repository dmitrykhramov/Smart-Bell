import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Log extends Component {

    componentWillMount() {
        this.props.fetchLogs();
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
                        {log.firstname} {log.lastname} 
                        <br />
                        {log.time}
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
    return { logs: state.bell.logs };
}

export default connect(mapStateToProps, actions)(Log);
