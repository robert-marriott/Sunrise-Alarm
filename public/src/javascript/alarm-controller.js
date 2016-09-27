/**
 * Created by robertmarriot on 9/26/16.
 */
/* This will control HTTP requests to the database to control the alarms */

//This will start with on document ready. button handlers and everything will be inside that so it can be
//used on the page. other methods for number crunching and whatnot will be declared outside of it.


$( document ).ready(function() {
    console.log( "document is ready!" );


});




function createAlarmFromHTML() {
    console.log("Button clicked");
    var output = $('#makeAlarm').serialize();
    console.log(output);

    $.post("http://localhost:8080/api/alarms",
        output,
        function (data, textStatus) {
            alert("Response from server: " + data);
        });
}
    // var name = $("#al_name").value;
    // var time = document.getElementById("al_time").value;
    // var duration = document.getElementById("al_duration").value;
    // var creator = document.getElementById("al_creator").value;
    // var mon = document.getElementById("weekday-mon").checked;
    // var tue = document.getElementById("weekday-tue").checked;
    // var wed = document.getElementById("weekday-wed").checked;
    // var thu = document.getElementById("weekday-thu").checked;
    // var fri = document.getElementById("weekday-fri").checked;
    // var sat = document.getElementById("weekday-sat").checked;
    // var sun = document.getElementById("weekday-sun").checked;
    //
    // console.log("submitter name: "+name);
    // console.log("submitter time: "+time);
    // console.log("duration: "+duration);
    // console.log("creator: "+creator);
    // console.log("monday?: "+mon);
    // console.log("tuesday?: "+tue);
    // console.log("wednesday?: "+wed);
    // console.log("thursday?: "+thu);
    // console.log("friday?: "+fri);
    // console.log("saturday?: "+sat);
    // console.log("sunday?: "+sun)
