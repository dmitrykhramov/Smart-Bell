import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Log extends Component {
    constructor(props) {
        super(props);

        this.handlePageChanged = this.handlePageChanged.bind(this);

        this.state = {
			current:     1,
            perPage:     3,
            visiblePage: 3
		};
    }

    componentWillMount() {
        this.props.fetchLogs();
    }

    handlePageChanged(newPage) {
        console.log(newPage);
        this.setState({ current : newPage });
        setTimeout(()=> {
            console.log(this.state.current);
            
        },500)
    }

    renderPage() {
        if(this.props.logs){
            let i = 0;
            let itemsTotal = this.props.logs.length;
            let pagesTotal = Math.round( itemsTotal/this.state.perPage);
            let currPage = this.state.current;
            let visiblePage = this.state.visiblePage;

            let leftPages, rightPages;
            // console.log('total page is: ' + pagesTotal);
            return this.props.logs.map((log) => {
                i++;
                // if the number of visible pages is bigger than total number of pages, show all
                if (visiblePage < pagesTotal){
                    // if currunt page is leftside than half page of the visible pages.
                    if(currPage - 1 < Math.floor(visiblePage / 2)) {
                        // console.log('smaller than half');
                        if(i <= visiblePage)
                        {
                            if(i==currPage){
                                return(<li className='active'><a>{i}</a></li>)
                            }
                            else{
                                return(<li onClick={(e) => this.handlePageChanged(e.currentTarget.value)} value={i}><a>{i}</a></li>)
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
                                return(<li className='active'><a>{i}</a></li>)
                            }
                            else{
                                return(<li onClick={(e) => this.handlePageChanged(e.currentTarget.value)} value={i}><a>{i}</a></li>)
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
                                return(<li className='active'><a>{i}</a></li>)
                            }
                            else{
                                return(<li onClick={(e) => this.handlePageChanged(e.currentTarget.value)} value={i}><a>{i}</a></li>)
                            }
                        }
                    }
                }
                else {
                    if(i <= pagesTotal && i > 0)
                    {
                        if(i==currPage){
                            return(<li className='active'><a>{i}</a></li>)
                        }
                        else{
                            return(<li onClick={(e) => this.handlePageChanged(e.currentTarget.value)} value={i}><a>{i}</a></li>)
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
        if(this.props.logs){
            let itemsTotal = this.props.logs.length;
            let pagesTotal = Math.round( itemsTotal/this.state.perPage);
            if(currPage != pagesTotal){
                this.setState({
                    current: currPage+1
                });
            }
        }
    }
    handleLast = (currPage) => {
        if(this.props.logs){
            let itemsTotal = this.props.logs.length;
            let pagesTotal = Math.round( itemsTotal/this.state.perPage);
            if(currPage != pagesTotal){
                this.setState({
                    current: pagesTotal
                });
            }
        }
    }
    renderPaginate() {
        if(this.props.logs){
            let itemsTotal= this.props.logs.length;
            let pagesTotal = Math.round( itemsTotal/this.state.perPage);
            return(
                <ul className='pagination'>
                    <li onClick={(e) =>this.handleFirst(e.currentTarget.value)} value={this.state.current}><a>1</a></li>
                    <li onClick={(e) =>this.handlePrev(e.currentTarget.value)} value={this.state.current}><a>Prev</a></li>
                    {this.renderPage()}
                    <li onClick={(e) =>this.handleNext(e.currentTarget.value)} value={this.state.current}><a>Next</a></li>
                    <li onClick={(e) =>this.handleLast(e.currentTarget.value)} value={this.state.current}><a>{pagesTotal}</a></li>
                </ul>
            )
        }
    }
    renderLogs() {
        if (this.props.logs) {
            let i = 0;
            return this.props.logs.map((log) => {
                i++;
                if(i-1 >= (this.state.current-1)*this.state.perPage && i-1 <this.state.current*this.state.perPage){
                        return (
                        <div className="list-group-item fadeIn" key={log._id}>
                            Name: {log.firstname} {log.lastname}
                            <br />
                            Time: {log.time}
                            <img src={"data:image/jpg;base64," + log.photo} />
                            <br />
                            {log.access}
                        </div>
                    );
                }
            });
        }
    }

    render() {
        return (
            <div>
                <ul className="list-group">
                    {this.renderLogs()}
                </ul>
                <div className='text-center'>
                    {this.renderPaginate()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { logs: state.bell.logs };
}

export default connect(mapStateToProps, actions)(Log);
