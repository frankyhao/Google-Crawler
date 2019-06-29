function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //window.location = "https://www.google.com/maps/timeline/kml?authuser=0&pb=!1m8!1m3!1i2019!2i5!3i4!2m3!1i2019!2i5!3i4"
    //window.location = 'google.com';
    console.log('cookie: ' + document.cookie);
    // postData(1);
    //getData();
}

function postData(input) {
    $.ajax({
       type: "GET",
       headers: {'Access-Control-Allow-Origin': 'https://www.google.com/maps/timeline/kml?authuser=0&pb=!1m8!1m3!1i2019!2i5!3i4!2m3!1i2019!2i5!3i4'},
       url: "https://www.google.com/maps/timeline/kml?authuser=0&pb=!1m8!1m3!1i2019!2i5!3i4!2m3!1i2019!2i5!3i4",
       success: callbackFunc,
       xhrFields: { withCredentials: true },
       crossDomain: true,
       datatype: 'xml'
   });
}

function getData() {
    $.get("https://www.google.com/maps/timeline/kml?authuser=0&pb=!1m8!1m3!1i2019!2i5!3i4!2m3!1i2019!2i5!3i4", callbackFunc);
}

function callbackFunc(response) {
    // do something with the response
    console.log("SUCCESS");
    console.log(response);
}

function download_kml(user, date) {
    // This function assumes that the user has already been authorized.
    // Get URL
    var date_split = date.split('-'),
        year = date_split[0],
        month = date_split[1],
        day = data_split[2];
    if (parseInt(day) < 10){
        day = parseInt(day);
    }
    month = parseInt(month) - 1;
    var url = "https://www.google.com/maps/timeline/kml?authuser=0&pb=!1m8!1m3!1i"+year+"!2i"+month+"!3i"+day+"!2m3!1i"+year+"!2i"+month+"!3i"+day;
    console.log(url);
    // Download KML
    window.open(url);
}
const storageService = firebase.storage();
const storageRef = storageService.ref();
document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);
let selectedFile;
function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
}

function handleFileUploadSubmit(e) {
  const uploadTask = storageRef.child('kml_files/${selectedFile.name}').put(selectedFile); //create a child directory called images, and place the file inside this directory
  uploadTask.on('state_changed', (snapshot) => {
  // Observe state change events such as progress, pause, and resume
  }, (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, () => {
     // Do something once upload is complete
     console.log('success');
  });
}

function batch_download() {
    var start_date = new Date(2019, 6, 20);
    var end_date = new Date(2019, 6, 22);
    end_date.setDate(end_date.getDate() + 1);
    while (start_date.getTime() !== end_date.getTime()) {
        var month = start_date.getMonth() - 1;
        var day = start_date.getDate();
        var year = start_date.getFullYear();
        window.open('https://www.google.com/maps/timeline/kml?authuser=0&pb=!1m8!1m3!1i'+year+'!2i'+month+'!3i'+day+'!2m3!1i'+year+'!2i'+month+'!3i'+day);
        start_date.setDate(start_date.getDate() + 1);
    }
}


//test
function reveal_hidden(id_val) {
    var x = "#";
    var res = x.concat(id_val)
    //    $(document).ready(function(){
    //        $(this).click(function(){
    $(res).fadeIn();
    //        });
    //    });
}
$('#gform').on('submit', function(e) {
  $('#gform *').fadeOut(2000);
  $('#gform').prepend('Your submission has been processed...');
});

function toggle(id_val) {
    var x = document.getElementById(id_val);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
