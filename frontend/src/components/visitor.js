import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

/*
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';      // refer https://www.npmjs.com/package/react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';
*/
class Visitor extends Component {

    constructor(props) {
        super(props);
        
        this.deleteVisitor = this.deleteVisitor.bind(this);
        this.handleClick = this.handleClick.bind(this);

        //pagination
        this.handlePageChanged = this.handlePageChanged.bind(this);
        
        this.state = {
            current:     1,
            perPage:     10,
            visiblePage: 5,
            delete: 0
        };
    }
    /* // for better alerting dialog
    submit = (id) => e => {
        confirmAlert({
            title: 'Confirm to delete.',                        // Title dialog 
            message: 'Are you sure to delete this visitor?',    // Message dialog 
            childrenElement: () => <div></div>,                 // Custom UI or Component 
            confirmLabel: 'Confirm',                            // Text button confirm 
            cancelLabel: 'Cancel',                              // Text button cancel 
            onConfirm: this.deleteVisitor(id),                  // Action after Confirm 
            onCancel: () => close()                               // Action after Cancel 
          });
          
    };*/
    componentWillMount() {
        this.props.fetchVisitors();
    }

    componentDidUpdate() {
        if (this.props.deleteFlag == 'success') {
            this.props.fetchVisitors();
        }
    }

    handleClick = (id, access) => e => {
		if (access == true) {
            this.props.toogleAccess(id, false);
		} else {
            this.props.toogleAccess(id, true);
        }
        
        setTimeout(() => {
            console.log('visitor reloaded');
            let doorPermission = access == false? 'Allowed' : 'Denied';
            let alertStr = 'Permission has been changed: ' + doorPermission;
            onClick: alert(alertStr);
            this.props.fetchVisitors();
        },150);
    };
    
    deleteVisitor = (id) => e => {
        onClick: if(confirm('Are you sure to delete this visitor?')){
            this.props.deleteVisitor(id);
            this.props.ws.send(id); // when it doesn't connect to websocket, it makes fetchvisitors fn disable
            this.setState({delete: 1});
        }
    };
    
    
    renderVisitors() {
        if (this.props.visitors) {
            return this.props.visitors.map((visitor) => {
				let id = visitor._id;
                return (
                    <li className="list-group-item fadeIn" key={id} style={{minHeight:"20px", lineHeight:"0"}}>
                        {visitor.firstname} {visitor.lastname}
                        <button onClick={this.deleteVisitor(id)} className="btn btn-danger pull-xs-right">Delete</button>
                        <button className="btn btn-primary pull-xs-right" onClick={this.handleClick(id, visitor.access)}>{visitor.access == true ? 'Allowed' : 'Denied'}</button>
                    </li>
                );
            });
        }
    }

    //pagination start
    handlePageChanged(newPage) {
        console.log(newPage);
        this.setState({ current : newPage });
        setTimeout(()=> {
            console.log(this.state.current);
            
        },500)
    }

    renderPage() {
        if(this.props.visitors){
            let i = 0;
            let itemsTotal = this.props.visitors.length;
            let pagesTotal = Math.ceil( itemsTotal/this.state.perPage);
            let currPage = this.state.current;
            let visiblePage = this.state.visiblePage;

            let leftPages, rightPages;
            // console.log('total page is: ' + pagesTotal);
            return this.props.visitors.map((visitor) => {
                let id = visitor._id;
                i++;
                // if the number of visible pages is bigger than total number of pages, show all
                if (visiblePage < pagesTotal){
                    // if currunt page is leftside than half page of the visible pages.
                    if(currPage - 1 < Math.floor(visiblePage / 2)) {
                        // console.log('smaller than half');
                        if(i <= visiblePage)
                        {
                            if(i==currPage){
                                return(<li className='active' key={id}><a>{i}</a></li>)
                            }
                            else{
                                return(<li onClick={(e) => this.handlePageChanged(e.currentTarget.value)} value={i} key={id}><a>{i}</a></li>)
                            }
                        }
                    }
                    // if active page is closer to end of pages
                    else if(currPage + (visiblePage/2) > pagesTotal) {
                        leftPages = pagesTotal - visiblePage;
                        rightPages = pagesTotal;
                        // console.log('left is: ' + leftPages);
                        // console.log('right is: ' + rightPages);
                        if(i <= rightPages && i > leftPages)
                        {
                            if(i==currPage){
                                return(<li className='active' key={id}><a>{i}</a></li>)
                            }
                            else{
                                return(<li onClick={(e) => this.handlePageChanged(e.currentTarget.value)} value={i} key={id}><a>{i}</a></li>)
                            }
                        }
                    }
                    // normal cases
                    else{
                        leftPages = currPage - (visiblePage/2);
                        rightPages = currPage + (visiblePage/2);
                        // console.log('normal');
                        if(i > leftPages && i < rightPages )
                        {
                            if(i==currPage){
                                return(<li className='active' key={id}><a>{i}</a></li>)
                            }
                            else{
                                return(<li onClick={(e) => this.handlePageChanged(e.currentTarget.value)} value={i} key={id}><a>{i}</a></li>)
                            }
                        }
                    }
                }
                else {
                    // console.log('here');
                    // console.log(pagesTotal);
                    if(i <= pagesTotal && i > 0)
                    {
                        if(i==currPage){
                            return(<li className='active' key={id}><a>{i}</a></li>)
                        }
                        else{
                            return(<li onClick={(e) => this.handlePageChanged(e.currentTarget.value)} value={i} key={id}><a>{i}</a></li>)
                        }
                    }
                }
            })
        }
    }
    handleFirst = (currPage) => {
        if(currPage!=1){
            this.setState({
                current: 1
            });
        }
    }
    handlePrev = (currPage) => {
        if(currPage!=1){
            this.setState({
                current: currPage-1
            });
        }
    }
    handleNext = (currPage) => {
        if(this.props.visitors){
            let itemsTotal = this.props.visitors.length;
            let pagesTotal = Math.ceil( itemsTotal/this.state.perPage);
            if(currPage != pagesTotal){
                this.setState({
                    current: currPage+1
                });
            }
        }
    }
    handleLast = (currPage) => {
        if(this.props.visitors){
            let itemsTotal = this.props.visitors.length;
            let pagesTotal = Math.ceil( itemsTotal/this.state.perPage);
            if(currPage != pagesTotal){
                this.setState({
                    current: pagesTotal
                });
            }
        }
    }
    renderPaginate() {
        if(this.props.visitors){
            let itemsTotal= this.props.visitors.length;
            let pagesTotal = Math.ceil( itemsTotal/this.state.perPage);
            if (itemsTotal == 0){
                return 'No visitors registered'
            }
            else if (itemsTotal <= this.state.perPage){
                return
            }
            return(
                <div>
                    <ul className='pagination'>
                        <li onClick={(e) =>this.handleFirst(e.currentTarget.value)} value={this.state.current}><a>1</a></li>
                        <li onClick={(e) =>this.handlePrev(e.currentTarget.value)} value={this.state.current}><a>Prev</a></li>
                        {this.renderPage()}
                        <li onClick={(e) =>this.handleNext(e.currentTarget.value)} value={this.state.current}><a>Next</a></li>
                        <li onClick={(e) =>this.handleLast(e.currentTarget.value)} value={this.state.current}><a>{pagesTotal}</a></li>
                    </ul>
                </div>
            )
        }
    }
    renderVisitorsPagination() {
        if (this.props.visitors) {
            let i = 0;
            return this.props.visitors.map((visitor) => {
                let id = visitor._id;
                i++;
                if(i-1 >= (this.state.current-1)*this.state.perPage && i-1 <this.state.current*this.state.perPage) {
                    return (
                        <li className="list-group-item visitor-line fadeIn" key={id} style={{backgroundColor:"black", color:"white"}}>
                            {visitor.firstname} {visitor.lastname}
                            <button onClick={this.deleteVisitor(id)} className="btn btn-danger pull-xs-right">Delete</button>
                            <button className="btn btn-default pull-xs-right" onClick={this.handleClick(id, visitor.access)}>{visitor.access == true ? 'Allowed' : 'Denied'}</button>
                        </li>
                    );
                }
            });
        }
    }
    handlePerPage(perPage){
        this.setState({perPage});
    }
    perPageRender(){
        return(
            <div className="dropdown">
                <label>Visitors Per Page: </label>
                <button className="btn btn-custom dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">{this.state.perPage}
                </button>
                <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                    <li onClick={(e) => this.handlePerPage(e.currentTarget.value)} value="3" role="presentation"><a role="menuitem" tabindex="-1" href="#">3</a></li>
                    <li onClick={(e) => this.handlePerPage(e.currentTarget.value)} value="5" role="presentation"><a role="menuitem" tabindex="-1" href="#">5</a></li>
                    <li onClick={(e) => this.handlePerPage(e.currentTarget.value)} value="10" role="presentation"><a role="menuitem" tabindex="-1" href="#">10</a></li>
                    {/* <li role="presentation" className="divider"></li> */}
                    <li onClick={(e) => this.handlePerPage(e.currentTarget.value)} value="15" role="presentation"><a role="menuitem" tabindex="-1" href="#">15</a></li>
                    <li onClick={(e) => this.handlePerPage(e.currentTarget.value)} value="20" role="presentation"><a role="menuitem" tabindex="-1" href="#">20</a></li>
                </ul>
            </div>
        );
    }
    handleVisiblePage(visiblePage){
        this.setState({visiblePage});
    }
    visiblePageRender(){
        return(
            <div className="dropdown">
                <label>Pages: </label>
                <button className="btn btn-custom dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">{this.state.visiblePage}
                </button>
                <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                    <li onClick={(e) => this.handleVisiblePage(e.currentTarget.value)} value="3" role="presentation"><a role="menuitem" tabindex="-1" href="#">3</a></li>
                    <li onClick={(e) => this.handleVisiblePage(e.currentTarget.value)} value="5" role="presentation"><a role="menuitem" tabindex="-1" href="#">5</a></li>
                    <li onClick={(e) => this.handleVisiblePage(e.currentTarget.value)} value="10" role="presentation"><a role="menuitem" tabindex="-1" href="#">10</a></li>
                    {/* <li role="presentation" className="divider"></li> */}
                    <li onClick={(e) => this.handleVisiblePage(e.currentTarget.value)} value="15" role="presentation"><a role="menuitem" tabindex="-1" href="#">15</a></li>
                    <li onClick={(e) => this.handleVisiblePage(e.currentTarget.value)} value="20" role="presentation"><a role="menuitem" tabindex="-1" href="#">20</a></li>
                </ul>
            </div>
        );
    }
    //pagination end

    render() {
        return (
            <div>
                <div className="fadeIn pull-left">
                    {this.visiblePageRender()}
                </div>
                <div className="fadeIn pull-right">
                    {this.perPageRender()}
                </div>
                <div className="divisionLine"></div>
                <ul className="list-group" onChange={this.fetchVisitors}>
                    {this.renderVisitorsPagination()}
                </ul>
                <div className='text-center fadeIn' style={{color:"white"}}>
                    {this.renderPaginate()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { visitors: state.bell.visitors, ws: state.bell.socket, deleteFlag: state.bell.visitor_delete };
}

export default connect(mapStateToProps, actions)(Visitor);
