import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import setSocket from "../../index";
import moment from "moment";
import {
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Input,
    FormGroup,
    Label,
} from 'reactstrap';

//import 'quill/dist/quill.snow.css';
import { Loader } from "../Pages/loader";
var dateFormat = require('dateformat');

import { LagendryToastr } from "../Notifications/LagendryToastr";
import { _callApi } from "../../services/baseService";
import LaddaButton, {
    ZOOM_IN,
} from 'react-ladda';
import 'ladda/dist/ladda-themeless.min.css';

class UserView extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
  
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.setTyping = this.setTyping.bind(this);

        this.state = {
            message: "",
            typing:false,
            allMessage: [{message:"hello",senderName:"you"}]


        };

   
    }

 
    componentDidMount() {
        if (localStorage.getItem('accessToken') == undefined || localStorage.getItem('accessToken') == null) {
            this.props.history.push('/login')
            return;
        }
        //this.view();
        var self = this;
        setSocket.on("receiveMessage", function (data) {
            self.setMessage(data);

        })

        setSocket.on("typing", function (data) {
            self.setTyping(data);

        })


    }

    setTyping(data){
        this.setState({typing:true})
    }
    setMessage(data) {
        let { allMessage } = this.state
        console.log("receiveMessagereceiveMessage", data);

        allMessage.push(data.msgInfo)
        this.setState({ allMessage: allMessage })
    }


    handleSendMessage() {
        let { message ,allMessage} = this.state;
        let senderId = localStorage.getItem('user_info');
        let localMessage={
            message:message,
            senderName:"you"
        }
        allMessage.push(localMessage)
        this.setState({allMessage:allMessage,typing:false})
        senderId = JSON.parse(senderId)
        let recieverId = this.props.match.params.id;
        let obj = {
            senderId: senderId,
            recieverId: recieverId,
            message: message
        }
        setSocket.emit("sendMessage", obj)
    }

   

    onChange(event) {
        let senderId = localStorage.getItem('user_info');
        senderId = JSON.parse(senderId)
        let recieverId = this.props.match.params.id;
        let obj = {
            senderId: senderId,
            recieverId: recieverId,
        }
        setSocket.emit("typing", obj)

        let changedValue = {};
        let { name, value } = event.target;
        if (name === 'gender') {
            if (value === "0" || value === "1") {
                this.setState({ customeGender: false, userCustomGender: "" });
            }
            if (value === "2") {
                this.setState({ customeGender: true });

            }
        }
        changedValue[name] = value;
        this.setState(changedValue);

    }

   
    render() {
        let { allMessage } = this.state
        return (
            <div className="animated fadeIn">
                {allMessage.length ? allMessage.map(item => {
                    return (
                        <p>{item.senderName}" "{item.message}</p>

                    )
                }) : "No Chat Found"}
<p>{this.state.typing?"typing ...":""}</p>
                <input type="text" value={this.state.message} name="message" id="message" onChange={this.onChange}></input>
                <button onClick={this.handleSendMessage}>submit</button>
            </div>
        )
    }
}

export default withRouter(UserView);
