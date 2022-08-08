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

var containerEl = $(".container");
var schedule = [{
    time:"9AM",
    task:""
},
{
    time:"10AM",
    task:""
},
{
    time:"11AM",
    task:""
},
{
    time:"12PM",
    task:""
},
{
    time:"1PM",
    task:""
},
{
    time:"2PM",
    task:""
},
{
    time:"3PM",
    task:""
},
{
    time:"4PM",
    task:""
},
{
    time:"5PM",
    task:""
}];

// Checks if the hour is in the past, present or future and returns the correct name of the CSS class accordingly
var checkHour = function(timeHour){
    var convertedHour = moment(timeHour, "hA");
    var timeDifference = Math.floor(moment().diff(convertedHour, "hours", true));

        if(timeDifference > 0){
            return "past";
        }else if (timeDifference === 0){
            return "present";
        }else{
            return "future";
        }
};

// Creates the html that is displayed on the page.
var updateHtml = function(){
    for (var i = 0; i < schedule.length; i++){
        var backgroundColour = checkHour(schedule[i].time)
        var taskRow = `<div class="time-block d-flex row">
                            <div class="hour col-1">${schedule[i].time}</div>
                            <textarea data-index=${i} id=${i} class="col-10 ${backgroundColour}">${schedule[i].task}</textarea>
                            <button class="saveBtn col-1"><span class="oi oi-box"><span></button>
                        </div>
                        `;
        containerEl.append(taskRow);
    }
};

updateHtml();

// Saves the user generated tasks to the local storage
var saveTask = function(){
    var task = $(this).siblings("textarea").val();
    var arrayIndex = $(this).siblings("textarea").attr("data-index");
    
    schedule[arrayIndex].task = task;
    localStorage.setItem("dailyTasks", JSON.stringify(schedule));
};

$(".saveBtn").on("click", saveTask);

// Reads saved tasks from the local storage
var getLocalStorageData = function(){
    var data = JSON.parse(localStorage.getItem("dailyTasks")) || [];
    for(var i = 0; i < data.length; i++){
        $(`#${i}`).val(data[i].task);
        schedule[i].task = data[i].task;
    }
};

getLocalStorageData();