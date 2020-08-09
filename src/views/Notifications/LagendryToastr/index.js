import React, {Component} from 'react';
import {Button, Card, CardHeader, CardBody, CardFooter} from 'reactstrap';
import {ToastContainer, toast} from 'react-toastify';

export const LagendryToastr = {
	 initCallback: function(callback){
	 	return {
	    	onClose : ((typeof callback == 'undefined') ? function() { console.log("testing"); } : callback)
	    }
	 },
	 notify : function(notify,callback) {
	    // default type
	    
	    return toast(notify, this.initCallback(callback));
	  },
	error : function(error, callback) {
	    // default type
	    // add type: 'error' to options
	    //this.initCallback(callback);
	    return toast.error(error, this.initCallback(callback));
	  },
	success : function(success, callback) {
		this.initCallback(callback);
	    // default type
	    // add type: 'success' to options
	    return toast.success(success, this.initCallback(callback));
	  },
	info : function(callback) {
	    // default type
	    // add type: 'info' to options
	    return toast.info('Info', this.initCallback(callback));
	  },
	warn : function(callback) {
	    // default type
	    // add type: 'warning' to options
	    return toast.warn('Warning...', this.initCallback(callback));
	  },
	  clear : function(callback) {
	    // default type
	    // Remove all toasts !
	    this.initCallback(callback);
	    return toast.dismiss(this.initCallback(callback));
	  }
}