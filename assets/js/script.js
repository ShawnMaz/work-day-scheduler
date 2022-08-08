// This function writes the current date in the jumbotron
var displayCurrentDay = function(date){
    $("#currentDay").text(date);
};

// This function get the current date and passes the formatted date to displayCurrentDay() to show on screen
var showCurrentDay = function(){
    var currentDay = moment();
    displayCurrentDay(currentDay.format("dddd, MMMM Do YYYY"));
};

// The current day is shown on the screen as soon as the application starts
showCurrentDay();
// The current day will update every 5 seconds in case the user does not close the browser for days at a time
setInterval(showCurrentDay, 5000);

