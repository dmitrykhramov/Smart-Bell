import React from 'react';

import AddVisitor from './add-visitor';
import Log from './log';
import Visitor from './visitor';

var tabList = [
    { 'id': 1, 'name': 'Entrance log', 'url': '/log' },
    { 'id': 2, 'name': 'Visitors', 'url': '/visitors' },
    { 'id': 3, 'name': 'Add visitor', 'url': '/add' }
];

var Tab = React.createClass({
    handleClick: function(e){
        e.preventDefault();
        this.props.handleClick();
    },

    render: function(){
        return (
            <li className={this.props.isCurrent ? 'current' : null}>
                <a onClick={this.handleClick} href={this.props.url}>
                    {this.props.name}
                </a>
            </li>
        );
    }
});

var Tabs = React.createClass({
    handleClick: function(tab){
        this.props.changeTab(tab);
    },

    render: function(){
        return (
            <nav>
                <ul>
                    {this.props.tabList.map(function(tab) {
                        return (
                            <Tab
                                handleClick={this.handleClick.bind(this, tab)}
                                key={tab.id}
                                url={tab.url}
                                name={tab.name}
                                isCurrent={(this.props.currentTab === tab.id)}
                            />
                        );
                    }.bind(this))}
                </ul>
            </nav>
        );
    }
});

var Content = React.createClass({
    render: function(){
        return(
            <div className="content">
                {this.props.currentTab === 1 ?
                    <div className="log">
                        <Log />
                    </div>
                    :null}

                {this.props.currentTab === 2 ?
                    <div className="visitors">
                        <Visitor />
                    </div>
                    :null}

                {this.props.currentTab === 3 ?
                    <div className="addVisitor">
                        <AddVisitor />
                    </div>
                    :null}

            </div>
        );
    }
});

var ControlPanel = React.createClass({
    getInitialState: function () {
        return {
            tabList: tabList,
            currentTab: 1
        };
    },

    changeTab: function(tab) {
        this.setState({ currentTab: tab.id });
    },

    render: function(){
        return(
            <div>
                <Tabs
                    currentTab={this.state.currentTab}
                    tabList={this.state.tabList}
                    changeTab={this.changeTab}
                />
                <Content currentTab={this.state.currentTab} />
            </div>
        );
    }
});

export default ControlPanel;