

//Variables//
var individualLoginInf;
var individualLoggoutInf;
var currentStudentNames;
var studentIDNums = [];
var studentLASID = [];
var studentNames = [];
var loggedInTime = [];
var loggedOutTime = [];
var loggedInOrOut = [];
var registerNum = 0;
var foundInSystem;


var dayCounter = 0;

var finalStudentReport;
var t_str;
var d_str;

var today = new Date();
//get date//
var date;
//get time//
var time;

//functions//
//time function//
function updateTime(){
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var date = currentTime.getFullYear()+'-'+(currentTime.getMonth()+1)+'-'+currentTime.getDate();

    if (minutes < 10){
        minutes = "0" + minutes;
    }
    t_str = hours + ":" + minutes + " ";
    d_str = date;
    if(hours > 11){
        t_str += "PM";
    } else {
        t_str += "AM";
    }
    //console.log(t_str);
}

setInterval(updateTime, 1000);

function startup() {
    if(localStorage.studentID != undefined) {
        //split data//
    studentIDNums = localStorage.studentID.split(",");
    console.log("IDs: " + localStorage.studentID);

    studentNames = localStorage.studentName.split(",");
    console.log("Names: " + localStorage.studentName);
    } else {
        console.log(localStorage.studentIDNums + " empty");
    }

    if(localStorage.studentName != undefined) {
        //split data//
    studentNames = localStorage.studentName.split(",");
    console.log("Names: " + studentNames);
    } else {
        console.log(localStorage.studentName + " empty");
    }

    if(localStorage.lasidSave != undefined) {
        //split data//
    studentLASID = localStorage.lasidSave.split(",");
    console.log("LASIDs: " + studentLASID);
    } else {
        console.log(localStorage.lasidSave + " empty");
    }
}
const register = () => {
    var alreadyInSystem;



    var localName = document.querySelector(".name_input2").value;
    var localID = document.querySelector(".studentID_input2").value;
    var localLASID = document.querySelector(".lasid_input").value;

    for(var i = 0; i < studentIDNums.length; i++) {
        if(studentIDNums[i] === localID) {
            //if it includes inputed ID//
            alreadyInSystem = true;
            alert("You are already in the system!");
            
        } else {
            alreadyInSystem = false;
        }
    }

    if(!alreadyInSystem) {

    if(document.querySelector(".name_input2").value.length == 0 || document.querySelector(".lasid_input").value.length == 0 || document.querySelector(".studentID_input2").value.length == 0) {
        //missing input boxes//
        alert("FILL IN EVERYTHING!");
    } else {
    //all boxes are filled//
     console.log(localName, localID, localLASID);

        studentIDNums.push(localID);
        studentNames.push(localName);
        studentLASID.push(localLASID);

        if(studentIDNums.length > 1) {
            registerNum = registerNum + 1;
        }
    
        // Reading the value, which was store as "theValue"
        if (localStorage && 'studentID' in localStorage) {
            console.log("Saved IDs:" + localStorage.studentID);
        }

        if (localStorage && 'studentName' in localStorage) {
            console.log("Saved Names: " + localStorage.studentName);
        }

        if (localStorage && 'lasidSave' in localStorage) {
            console.log("Saved LASID: " + localStorage.lasidSave);
        }

        function test2() {
        
          localStorage && (localStorage.studentID = [studentIDNums]);
          localStorage && (localStorage.studentName = [studentNames]);
          localStorage && (localStorage.lasidSave = [studentLASID]);
        }
        setInterval(test2, 500);

        console.log("Current ID array: " + studentIDNums);
        console.log("Current name array: " + studentNames);
        console.log("Current LASID array: " + studentLASID);
        
        document.getElementById("reg_text").innerHTML = "Welcome " + localName + "! Thank you for using this app!";
        document.getElementById('testModel').style.display='block';

    }
  }
};



const redo = () => {
    let deletedID = delete studentIDNums[registerNum];
    let deletedName = delete studentNames[registerNum];
    let delteLASID = delete studentLASID[registerNum];
    console.log(registerNum);
    console.log(studentIDNums, studentNames);
    if(registerNum > 0) {
        registerNum = registerNum - 1;
    }
}




const login = () => {
    currentStudentNames = null;
    foundInSystem = null;
    //login to account//
    var localLoginInput = document.querySelector(".studentID_login").value;
    console.log("Local input value: " + localLoginInput);
    document.querySelector(".studentID_login").value = '';
    //check student IDs//
    for(var i = 0; i < studentIDNums.length; i++) {
        if(studentIDNums[i] === localLoginInput) {
            //if it includes inputed ID//
            foundInSystem = true;
            //alert("Welcome " + studentNames[i] + "! The current time is " + t_str + ".");
            currentStudentNames = studentNames[i]; 
            individualLoginInf = studentNames[i] + " logged in at " + t_str + " on " + d_str + ".";
            loggedInTime.push(individualLoginInf); 

            //call it//
            document.getElementById("reg_text2").innerHTML = "Welcome " + studentNames[i] + "! The current time is " + t_str + ".";
        document.getElementById('logged_in_modal').style.display='block';
        } else {
            foundInSystem = false;
        }
    }

    if(foundInSystem === false) {
        alert("You aren't found in our system!");
    }

}

const loggout = () => {
    var localLoggoutInput = document.querySelector(".studentID_loggout").value;
    //check student IDs//
    for(var i = 0; i < studentIDNums.length; i++) {
        if(studentIDNums[i] === localLoggoutInput) {
            //if it includes inputed ID//
            foundInSystem = true;
            //alert("You, " + studentNames[i] + ", have een logged out! The current time is " + t_str + ".");
            currentStudentNames = studentNames[i]; 
            individualLoggoutInf = studentNames[i] + " logged out at " + t_str + " on " + d_str + ".";
            loggedOutTime.push(individualLoggoutInf); 
            document.querySelector(".studentID_loggout").value = '';

            console.log(loggedInOrOut);
            //finalize...//
            finalStudentReport = "Loggin: " + loggedInTime[i] + " Loggout: " + loggedOutTime[i] + "." + "LASID: " + studentLASID[i];
            downloadFinishedFile();

            //call it//
            document.getElementById("reg_text3").innerHTML = "You, " + studentNames[i] + ", have een logged out! The current time is " + t_str + ".";
        document.getElementById('logged_out_modal').style.display='block';

        } else {
            foundInSystem = false;
        }
    }

    if(foundInSystem === false) {
        alert("You aren't found in our system!");
    }
}

 const downloadFinishedFile = () => {
    const link = document.createElement("a");
    const file = new Blob([finalStudentReport], { type: 'text/plain' });
    const reader = new FileReader();

    link.href = URL.createObjectURL(file);
         link.download = currentStudentNames + " " + d_str + ".txt";
         link.click();
         URL.revokeObjectURL(link.href);
 };

 const cache = () => {
    localStorage.clear();
    localStorage.clear();
 };

//submit login automatically//
function submitTest() {
    var empt = document.querySelector(".studentID_login").value;
    var empt2 = document.querySelector(".studentID_loggout").value;
     if (empt != "")
    {
        //submit//
        login();

        console.log("submitted");
    } else if(empt2 != "") {
         //submit//
         loggout();

         console.log("submitted");
    }
}

 //call the test function//
 setInterval(submitTest, 1000);

 startup();

 
