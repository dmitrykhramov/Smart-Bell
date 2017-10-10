import React, { Component } from 'react';

import Tab from './tab';
import Tabs from './tabs';
import Content from './content';

let tabList = [
    { 'id': 1, 'name': 'Entrance log', 'url': '/log' },
    { 'id': 2, 'name': 'Visitors', 'url': '/visitors' },
    { 'id': 3, 'name': 'Add visitor', 'url': '/add' }
];

class ControlPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabList: tabList,
            currentTab: 1
        }
    }

    changeTab = (tab) => {
        this.setState({ currentTab: tab.id });
    }

    render(){
        return(
            <div style={{backgroundColor:"rgba(0, 0, 0, 0.7)"}}>
                <Tabs
                    currentTab={this.state.currentTab}
                    tabList={this.state.tabList}
                    changeTab={this.changeTab}
                />
                <div style={{padding: "3rem"}}>
                    <Content currentTab={this.state.currentTab} />
                </div>
            </div>
        );
    }
}

export default ControlPanel;