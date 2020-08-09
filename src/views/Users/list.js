import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Badge,
    Row,
    Col,
    Progress,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Button,
    ButtonToolbar,
    ButtonGroup,
    ButtonDropdown,
    Label,
    Input,
    Table, PaginationItem, PaginationLink
} from 'reactstrap';
import { Loader } from "../Pages/loader";

import Pagination from "react-js-pagination";
import { LagendryToastr } from "../Notifications/LagendryToastr";

import { _callApi } from '../../services/baseService';
var dateFormat = require('dateformat');

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            radioSelected: 2,

            search: '',
            activePageNo: 1,
            count: 50,
            list: [],
            totalCount: 0,
            searchKey: '',
            loader: true
        };

        this.getList = this.getList.bind(this);
        this.search = this.search.bind(this);
    }

    search(event) {
        let changedValue = {};
        let { id, value } = event.target;
        changedValue[id] = value;
        this.setState({
            searchKey: changedValue.searchKey,
            activePageNo: 1,
        }, (() => this.getList()))

    }

    getDate(date) {
        var date = new Date(date)
        return dateFormat(date, "d mmm yyyy hh:MM TT").toLocaleString();
    }

    componentDidMount() {
        if (localStorage.getItem('accessToken') == undefined || localStorage.getItem('accessToken') == null) {
            this.props.history.push('/login')
            return;
        }
        this.getList();
    }

    getList(pageNumber) {
        var data = {
            'searchKey': this.state.searchKey,
            'pageNo': '' + (pageNumber ? pageNumber : this.state.activePageNo),
            'limit': '' + (this.state.count),
        }

        this.setState({ activePageNo: (pageNumber ? pageNumber : this.state.activePageNo) })

        //hit API
        _callApi(data, 'user/getAllUsers', '', 2)
            .then((result) => {
                this.setState({ loader: false })
                if (result.data.statusCode === 1) {

                    if (result.data.responseData === '') {
                        this.setState({
                            norecord: true,
                        })
                    }
                    // if success
                    this.setState({
                        list: result.data.responseData,
                    })

                    //    count for pagination
                    this.setState({
                        totalCount: result.data.responseData.length,
                    })
                } else {
                    console.log("result.data.error.errorCode", result.data.error.errorCode)
                    if (result.data.error.errorCode === 30) {
                        localStorage.removeItem('accessToken')
                        this.props.history.push('/login')
                    }
                    else {
                        LagendryToastr.error(result.data.error.errorMessage);

                    }
                }

            });
    }

 
    render() {
        var i = ((this.state.activePageNo - 1) * this.state.count) + 1;
        return (
            <div className="animated fadeIn">

                {
                    this.state.loader ? <Loader /> : null
                }
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <strong>User List</strong>
                                <div className="search-box">
                                    <Input type="text" id="searchKey" placeholder="Search" value={this.state.searchKey} onChange={this.search.bind(this)} />
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="text-center">S.N</th>
                                            <th className="text-center">Email</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.list.map(info =>
                                                <tr key={info._id}>
                                                    <td className="text-center">{i++}</td>
                                                    <td className="text-center"><a href={'/#/user/' + info._id}>{info.email}</a></td>


                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </Table>
                                <br />
                            
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UserList;
