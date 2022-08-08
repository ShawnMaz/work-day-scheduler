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

var clearTimeBlock = function(){
    $(".time-block").remove();
}

var tasks = [];

var saveTasks = function(task){
    for (var i = 0; i < tasks.length; i++){
        if(tasks[i].id === task.id){
            tasks.splice(i, 1);
        }
    }
    tasks.push(task);
    localStorage.clear();
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var readSavedTasks = function(){
    var tempTasks = JSON.parse(localStorage.getItem("tasks"));
    if(!tempTasks){
        tasks = [];
        return false;
    }
    var currentDay = moment();

    for (var i = 0; i < tempTasks.length; i++){
        if (tempTasks[i].date === currentDay.format("dddd, MMMM Do YYYY")){
            tasks.push(tempTasks[i]);
            console.log(tasks);
        }
    }
};

var generateTimeBlock = function(){
    //readSavedTasks();
    for (var i = 0; i < 13; i++){
        var timeBlockEl = $("<section>").addClass("time-block d-flex");
        var hourEl = $("<div>").addClass("hour col-1");
        var timeBlockHour = i + 9;
        if(timeBlockHour < 12){
            hourEl.text(`${timeBlockHour}AM`);
        }else{
            hourEl.text(`${((timeBlockHour - 12) === 0) ? 12 : timeBlockHour - 12}PM`);
        }
        
        var rowEl = $("<div>").addClass("row col-10");
    
        var convertedHour = moment(hourEl.text(), "hA");
        var timeDifference = Math.floor(moment().diff(convertedHour, "hours", true));

        if(timeDifference > 0){
            rowEl.addClass("past");
        }else if (timeDifference === 0){
            rowEl.addClass("present");
        }else{
            rowEl.addClass("future");
        }

        // console.log("tasks: " + tasks)
        if(tasks.length > 0){
            for (var i = 0; i < tasks.length; i++){
                if(tasks[i].id === timeBlockHour){
                    // console.log(tasks[i].task);
                    // rowEl.text(tasks[i].task);
                }
            }
        }

        var saveEl = $("<button>").addClass("saveBtn col-1");
        var saveIconEl = $("<span>").addClass("oi oi-box");
    
        saveEl.append(saveIconEl);
    
        timeBlockEl.append(hourEl, rowEl, saveEl);
        timeBlockEl.attr("id", timeBlockHour);
        containerEl.append(timeBlockEl);
    }
}

generateTimeBlock();


$(".time-block").on("click", ".row", function(){    
    var task = $(this).text().trim();
    var taskClasses = $(this).attr("class");

    var textAreaEl = $("<textarea>").addClass("row col-10");
    if(taskClasses.includes("past")){
        textAreaEl.addClass("past");
    }else if(taskClasses.includes("present")){
        textAreaEl.addClass("present");
    }else if(taskClasses.includes("future")){
        textAreaEl.addClass("future");
    }
    textAreaEl.text(task);    

    $(this).replaceWith(textAreaEl);
    textAreaEl.trigger("focus");
});

$(".time-block").on("click", "button", function(){
    var sectionId = $(this).closest("section").attr("id");
    var textAreaEl = $("#"+sectionId).find("textarea");

    var task = {
        date: moment().format("dddd, MMMM Do YYYY"),
        id: sectionId,
        task: textAreaEl.val()
    };

    saveTasks(task);
    textAreaEl.trigger("blur");
    
});





