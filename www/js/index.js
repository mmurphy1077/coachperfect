/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id),
            listeningElement = parentElement.querySelector('.listening'),
            receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
        $('#loading').css('display', 'none');
        $('#page1').css('display', 'block');
    }
};



$(document).ready(function () {
    /**
	 * AJAX FORM SUBMIT
	 */
    var options = { 
        //target:        '#output1',   // target element(s) to be updated with server response 
        // beforeSubmit:  validate,  // pre-submit callback 
        success:       showResponse  // post-submit callback 
    
        // other available options: 
        //url:       url         // override for form's 'action' attribute 
        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
        //clearForm: true        // clear all form fields after successful submit 
        //resetForm: true        // reset the form after successful submit 
 
        // $.ajax options can be used here too, for example: 
        //timeout:   3000 
    }; 

    /*
	// Bind to the form's submit event 
    $('form#form-customer-input').submit(function() { 
    	
		$(this).ajaxSubmit(options); 
	   
		// !!! Important !!! 
        // always return false to prevent standard browser submit and page navigation 
		return false;
    }); 
    */
    
    $('form').submit(function(){
        var postData = $(this).serialize();
        
        $.ajax({
            type: 'POST',
            data: postData,
            url: 'https://coachperfect.my360e.com/phonegap/customers/add_candidate',
            xhrFields  : {withCredentials: true},
            crossDomain: true,
            //dataType   : 'json',
            success: function(data){
                $('#page1').css('display', 'none');
               
                // Clear form 
                $('#page1 input#name_first').val('');
                $('#page1 input#name_last').val('');
                $('#page1 input#phone_number').val('');
                $('#page1 input#email').val('');
                $('#page1 textarea#notes').val('');
                $('#page1 select#flip-1').val('off');
                
                $('#page3').css('display', 'block');
                
            },
            error: function(){
                alert('There was an error adding your comment');
            }
        });

        return false;
    });
    
    $("a#new-candidate").on("tap",function(){
        $('#page1').css('display', 'block');
        $('#page3').css('display', 'none');
        return false;
    });
    
    /*
    $.ajax({
        type       : "POST",
        url        : "http://domainx/public/login",
        xhrFields  : {withCredentials: true},
        crossDomain: true,
        beforeSend : function() {$.mobile.showPageLoadingMsg();},
        complete   : function() {$.mobile.hidePageLoadingMsg();},
        data       : {username : 'subin', password : 'passwordx'},
        dataType   : 'json',
        success    : function(response) {
            console.error(JSON.stringify(response));
        },
        error      : function() {
            console.error("error");
        }
    });
    
    */

	
    function showResponse(responseText, statusText, xhr, $form)  { 
	    // for normal html responses, the first argument to the success callback 
	    // is the XMLHttpRequest object's responseText property 
	 
	    // if the ajaxForm method was passed an Options Object with the dataType 
	    // property set to 'xml' then the first argument to the success callback 
	    // is the XMLHttpRequest object's responseXML property 
	 
	    // if the ajaxForm method was passed an Options Object with the dataType 
	    // property set to 'json' then the first argument to the success callback 
	    // is the json data object returned by the server 
	    //$('#ajax-return').html(responseText);
		obj = jQuery.parseJSON(responseText);
		var success = obj.success,
            error = obj.error,
            message = obj.message,
            order_id = obj.order_id,
            schedule_id = obj.schedule_id,
            deviceDisplay = $('input#device_display').val();
		
		// What to do now.  Standard use will proceed as normal, staying on the page and refresheing.
		// Mobile devices should redirect the user back to the Order::schedules page.
        if(success == 1) {
            // On success... store the schedule_id.
            $('.schedule-container #ScheduleId').val(schedule_id);
            // Activate the delete button
            $('.schedule-container #delete_schedule').css('display', 'block');
        }

	} 
});