---
layout: default
title: Travel Logs
---
<script type="text/javascript" src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>
<script type="text/javascript">var submitted=false;</script>
<script type="text/javascript">
document.getElementById("hidden_iframe").addEventListener("load", function() {
  $('#gform *').fadeOut(2000);
  $('#gform').prepend('Your submission has been processed...');
});
$('#gform').on('submit', function() {
  $('#gform *').fadeOut(2000);
  $('#gform').prepend('Your submission has been processed...');
});
</script>
<script src="./helper.js"></script>

<meta name="google-signin-client_id" content="1060905353346-b38npddv13apf43pfdoin6cbht953j20.apps.googleusercontent.com">
<div class="g-signin2" data-onsuccess="onSignIn"></div>
<style>
    .button {
        background-color: #4CAF50;  <!-- #1c87c9; -->
        border: none;
        color: white;
        padding: 10px 22px;
        text-align: center;
        font-size: 16px;
        margin: 4px 2px;
        opacity: 0.8;
        transition: 0.3s;
        cursor: pointer;
        border-radius: 5px;
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    }
    a.button{
        background-color: #1c87c9;
    }
    .img {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .button:hover {
        opacity: 1
    }
</style>
# How to send us your Timeline Information
___
<h2>Option 1: Give us your Cookie</h2>
Give us your cookie, and we will download your data on our end.
<br><button value="b_1_0" class="button" onclick="reveal_hidden(this.value)">Start</button>
<div id="b_1_0" style="display:none">
    <br>
    <h3>Step 1:</h3>
    <p>
     Open a Browser (Google Chrome Recommended) and open the developer console windowby pressing Ctrl-Shift-i on windows or Command-Option-i on Mac. You should see something like this on the right side of your screen. Navigate to the Network tab.
    </p>
    <img src="index_images/cookie_step1.png" class="img">
    <button value="b_1_1" class="button" onclick="reveal_hidden(this.value)">Next</button>
</div>
<div id="b_1_1" style="display:none">
    <br>
    <h3>Step 2:</h3>
    <p>
    Click the following button which will download a KML file of your Timeline data for today. Confirm that the following document appears in your Network tab.
    </p>
    <br><a href="https://www.google.com/maps/timeline/kml" class="button" target="_blank">Click to Download</a>
    <br><br><img src="index_images/cookie_step2.png" class="img">
    <button value="b_1_2" class="button" onclick="reveal_hidden(this.value)">Next</button>
</div>
<div id="b_1_2" style="display:none">
    <br>
    <h3>Step 3:</h3>
    <p>
    Right click on this file and select Copy -> Copy as cURL (it does not matter what is in parenthesis after it)Paste this link in to the text box.
    </p>
    <img src="index_images/cookie_step3.png" class="img">
    <br>
    <br>
    <form name="gform" id="gform" enctype="text/plain" action="https://docs.google.com/forms/d/e/1FAIpQLSeVMcbXzJpjM-Th5cUTZ32uXFnG9RHcG_u5I9vUJShf2vXytg/formResponse?" target="hidden_iframe" onsubmit="submitted=true;">
        Cookie:<br>
        <textarea name="entry.1566566165" id="entry.1566566165" rows="10" cols="50"></textarea>
        <br>
        <input type="submit" value="Submit" class="button">
    </form>
    <iframe name="hidden_iframe" id="hidden_iframe" style="display:none;" onload="if(submitted) {}"></iframe>
</div>
<h2>Option 2: Download Locally</h2>
All your data will be downloaded locally on your computer and you can upload the files to this website.

# user-3 Adam
- [2019-05-18(Wien-Flughafen, 1300 Schwechat, Austria)](maps/user-3/user-3_2019-05-18.html)
- [2019-05-19(Faiyum Desert Rd, Giza Governorate, Egypt)](maps/user-3/user-3_2019-05-19.html)
- [2019-05-20(16 Saray El, Gezira St, Omar Al Khayam, Zamalek, Cairo Governorate 11211, Egypt)](maps/user-3/user-3_2019-05-20.html)
- [2019-05-21(15 شارع سراي الجزيرة، Giza Governorate, Egypt)](maps/user-3/user-3_2019-05-21.html)
- [2019-05-22(16 Saray El, Gezira St, Omar Al Khayam, Zamalek, Cairo Governorate 11211, Egypt)](maps/user-3/user-3_2019-05-22.html)
- [2019-05-23(16 Saray El, Gezira St, Omar Al Khayam, Zamalek, Cairo Governorate 11211, Egypt)](maps/user-3/user-3_2019-05-23.html)
- [2019-05-24(Oruba، Road، Qism El-Nozha, Cairo Governorate, Egypt)](maps/user-3/user-3_2019-05-24.html)
- [2019-05-25(Oak Lawn, IL 60453)](maps/user-3/user-3_2019-05-25.html)

# user-2 Andrew
![bar_chart](R_Graphs/user-2/user-2_bar_chart.png)
![table](R_Graphs/user-2/user-2_table.png)

- [2019-06-17 (1205 W Clark St, Urbana, IL 61801)](maps/user-2/user-2_2019-06-17.html)
<button value="div_2_0" onclick="toggle(this.value)">2019-06-17 (1205 W Clark St, Urbana, IL 61801)</button>
<div id="div_2_0" style="display:none">
<iframe src="maps/user-2/user-2_2019-06-17.html" height="400" width="49%"></iframe>
<img src="actual_maps/user-2/actual_6:17:19.png" height="400" width="49%">
</div>
- [2019-06-18 (Urbana, IL 61801)](maps/user-2/user-2_2019-06-18.html)
<button value="div_2_1" onclick="toggle(this.value)">2019-06-18 (Urbana, IL 61801)</button>
<div id="div_2_1" style="display:none">
<iframe src="maps/user-2/user-2_2019-06-18.html" height="400" width="49%"></iframe>
<img src="actual_maps/user-2/actual_6:18:19.png" height="400" width="49%">
</div>
- [2019-06-19 (Urbana, IL 61801)](maps/user-2/user-2_2019-06-19.html)
<button value="div_2_2" onclick="toggle(this.value)">2019-06-19 (Urbana, IL 61801)</button>
<div id="div_2_2" style="display:none">
<iframe src="maps/user-2/user-2_2019-06-19.html" height="400" width="49%"></iframe>
<img src="actual_maps/user-2/actual_6:19:19.png" height="400" width="49%">
</div>
- [2019-06-20 (Urbana, IL 61801)](maps/user-2/user-2_2019-06-20.html)
<button value="div_2_3" onclick="toggle(this.value)">2019-06-20 (Urbana, IL 61801)</button>
<div id="div_2_3" style="display:none">
<iframe src="maps/user-2/user-2_2019-06-20.html" height="400" width="49%"></iframe>
<img src="actual_maps/user-2/actual_6:20:19.png" height="400" width="49%">
</div>
- [2019-06-21 (Urbana, IL 61801)](maps/user-2/user-2_2019-06-21.html)
<button value="div_2_4" onclick="toggle(this.value)">2019-06-21 (Urbana, IL 61801)</button>
<div id="div_2_4" style="display:none">
<iframe src="maps/user-2/user-2_2019-06-21.html" height="400" width="49%"></iframe>
<img src="actual_maps/user-2/actual_6:21:19.png" height="400" width="49%">
</div>


# user-1
![bar_chart](R_Graphs/user-1/user-1_bar_chart.png)
![table](R_Graphs/user-1/user-1_table.png)

- [2019-06-10](maps/user-1/user-1_2019-06-10.html)
<button value="div_1_0" onclick="toggle(this.value)">2019-06-10</button>
<div id="div_1_0" style="display:none">
<iframe src="maps/user-1/user-1_2019-06-10.html" height="400" width="49%"></iframe>
<img src="actual_maps/user-1/actual_6:10:19.png" height="400" width="49%">
</div>
