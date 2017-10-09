import React, { Component } from 'react';

import Tab from './tab';


let tabList = [
    { 'id': 1, 'name': 'Entrance log', 'url': '/log' },
    { 'id': 2, 'name': 'Visitors', 'url': '/visitors' },
    { 'id': 3, 'name': 'Add visitor', 'url': '/add' }
];

class Tabs extends Component{
    handleClick = (tab) => {
        this.props.changeTab(tab);
    }

    render(){
        return (
            <nav style={{paddingLeft:"3rem", backgroundColor:"rgba(0, 0, 0, 0.4)"}}>
                <ul style={{marginLeft:"0", paddingLeft:"0"}}>
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
}
export default Tabs;
