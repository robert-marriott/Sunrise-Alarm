/**
 * Created by robertmarriot on 9/26/16.
 */
/* This will control HTTP requests to the database to control the alarms */

//This will start with on document ready. button handlers and everything will be inside that so it can be
//used on the page. other methods for number crunching and whatnot will be declared outside of it.


$( document ).ready(function() {
    console.log( "document is ready!" );

}); //end of document.ready function

/***** Function to gather data from add alarm form and post to database in JS **********/
function createAlarmFromHTML() {
    console.log("New Alarm Data Entered");
    var output = $('#makeAlarm').serialize(); //uses id="" info to harvest from form
    console.log(output);
    //Post to localhost
    $.post("http://localhost:8080/api/alarms",
        output,
        function (data, textStatus) {
            alert("Response from server: " + data);
        });
$("#set_alarm").collapse("toggle");
} //end of createAlarmFromHTML function




