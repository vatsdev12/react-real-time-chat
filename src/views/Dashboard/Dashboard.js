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
    Table
} from 'reactstrap';
import { _callApi } from '../../services/baseService';
import { LagendryToastr } from "../Notifications/LagendryToastr";
import { log } from 'util';

const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';


class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalUser: 0,
            totalPoll: 0,
            totalSeries: 0,
            totalMatch: 0,
            totalNews: 0,
            totalTeam: 0,
            totalPlayer: 0
        };
    }



    componentDidMount() {
        if (localStorage.getItem('accessToken') == undefined || localStorage.getItem('accessToken') == null) {
           console.log("ddddddddddddd",this.props);
           
            this.props.history.push('/login')
            return;
        }
    }

   

    render() {

        return (
            <div className="animated fadeIn">


               <h1>Welcome to real time chat application</h1>
            </div>
        )
    }
}

export default Dashboard;
