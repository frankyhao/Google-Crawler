// Old firease config
/**var firebaseConfig = {
  apiKey: "AIzaSyBibcQbLNsJe-6WrWdErfHKt8CMWPPC1Sg",
  authDomain: "cairo-website.firebaseapp.com",
  databaseURL: "https://cairo-website.firebaseio.com",
  projectId: "cairo-website",
  storageBucket: "cairo-website.appspot.com",
  messagingSenderId: "1060905353346",
  appId: "1:1060905353346:web:4ec6bf30f24cb5e2"
};**/

var firebaseConfig = {
  apiKey: "AIzaSyBAO8jnDYomlA4UWg6y-YP0AUD2i5aNsig",
  authDomain: "sturdy-bastion-122722.firebaseapp.com",
  databaseURL: "https://sturdy-bastion-122722.firebaseio.com",
  projectId: "sturdy-bastion-122722",
  storageBucket: "sturdy-bastion-122722.appspot.com",
  messagingSenderId: "386403629897",
  appId: "1:386403629897:web:f2bc75cf7c176ae6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var userID;
var userName;
var userEmail;

//function onSignIn(googleUser) {
//    var profile = googleUser.getBasicProfile();
//    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//    console.log('Name: ' + profile.getName());
//    console.log('Image URL: ' + profile.getImageUrl());
//    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//    //window.location = "https://www.google.com/maps/timeline/kml?authuser=0&pb=!1m8!1m3!1i2019!2i5!3i4!2m3!1i2019!2i5!3i4"
//    //window.location = 'google.com';
//    console.log('cookie: ' + document.cookie);
//    // postData(1);
//   //getData();
//}

function onSignIn(googleUser) {
  console.log('Google Auth Response', googleUser);
  userID = googleUser.getBasicProfile().getId();
  userName = googleUser.getBasicProfile().getName();
  userEmail = googleUser.getBasicProfile().getEmail();

  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
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
// firebase.auth().signInAnonymously().catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
// });
var storageRef = firebase.storage().ref();
document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);
var selectedFile;
function handleFileUploadChange(e) {
  selectedFile = e.target.files;
}

function handleFileUploadSubmit(e) {
  var uploadTask;
  auth2 = gapi.auth2.init();
  var userGoogleEmail = auth2.currentUser.get().getBasicProfile().getEmail();
  for (var i = 0; i < selectedFile.length; i++) {
      uploadTask = storageRef.child('kml_files/'+userGoogleEmail+'/'+selectedFile[i].name).put(selectedFile[i]); //create a child directory called kml_files, and place the file inside this directory
      uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      }, (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      }, () => {
         // Do something once upload is complete
         console.log('finished ' + i + '/' + selectedFile.length);
      });
  }
  alert("Uploaded!");
}

function batch_download() {
    var start_date = new Date(2019, 6, 20);
    var end_date = new Date(2019, 7, 14);
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
    if (typeof userID == "undefined") {
        alert("Please sign in first!")
    } else {
        var x = "#";
        var res = x.concat(id_val)
        //    $(document).ready(function(){
        //        $(this).click(function(){
        $(res).fadeIn();
        //        });
        //    });
    }
}

$('#gform').on('submit', function(e) {
  $('#gform *').fadeOut(2000);
  // $('#gform').prepend('Your submission has been processed...');
});

function toggle(id_val) {
    var x = document.getElementById(id_val);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        userID = undefined;
        userName = undefined;
        userEmail = undefined;
    });
}
