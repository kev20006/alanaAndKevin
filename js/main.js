$(document).ready(function(){
  rsvpContent = "";
  var jumbo = "rsvp";
  var col1 = "Accomodation";
  var col2 = "Getting There";
  var col3 = "Menu";
  console.log("ready");
  $(".fadey").hide(0).fadeIn(1000)
  var part1HMTL = $("#part1").html()
  $("#submit").on("click", function(){checkCode()});
  $("#part1").css("min-height", function(){
      return $(this).height();
  })
  $("#colBut1").on("click",function(){


})

function checkCode(){
  console.log("click")
  var weddingCode = $("#code").val();
  if(weddingCode === ""){
    $("#code").val("");
    $("#feedback").text("Please Enter a Wedding Code");
  }else if (weddingCode !== "123"){
    $("#code").val("");
    $("#feedback").text("Incorrect Code");
  }else{
    $("#part1").css({"padding-top":"0px"})
    var rsvpForm = weddingForm()
    console.log($("#part1").height());
    $("#part1").html(rsvpForm);
    $("#part1").children("#rsvpd").on("click", function(){
      var reply = JSON.stringify({
        name: $("#part1").children("#names").children("input").val(),
        attending: $('input[name=attending]:checked').val(),
        staying: $('input[name=staying]:checked').val(),
        bus: $("#part1").children("#bus").children("input").val()
      })
      $.ajax("/submit", {
        data : reply,
        contentType : 'application/json',
        type : 'POST',
        dataType: 'json'
  })
      console.log(reply);
      var thanks = thankYou(true);
      $("#part1").css({"padding-top":"75px"})
      $("#part1").html(thanks);
    });
  }
}


//HTML TEMPLATES BELOW HERE - PROBABLY a Better way to do it......
function weddingForm(){
  var rsvp =
  '<h2 class="titleFont">Please enter your names</h3>'+
  '<h3 id="names"> <input class="tb  text-center" type="text-box"></input></p>'+
  '<h2 class="titleFont">Will you be attending?</h3>'+
  '<h3 class="tb" style="border: 0px;" id="attending"><input name="attending" value = "yes" type="radio" style="margin-right:10px;">Yes</input><input name="attending" value ="no" style="margin-left:50px; margin-right:10px;" type="radio">No</input></p>'+
  '<h2 class="titleFont">Where will you be staying?</h3>'+
  '<h3 class="tb" style="border: 0px;" id="staying"><input value="Ballyliffin" name ="staying" type="radio" style="margin-right:10px;">Balyliffin</input><input name="staying" value="Derry" type="radio" style="margin-left:50px; margin-right:10px;">Derry</input></p>'+
  '<h2 class="titleFont">Do You have any dietary requirements?</h3>'+
  '<h3 id="bus"><input  class="tb  text-center" type="text-box"></input></p>' +
  '<h3 id="rsvpd" type="submit" class="btn btn-md textHeadingBlack" role="button">Submit</p>'
  return rsvp
}

function thankYou(bool){
  var thanks
    if(bool){
    thanks  = '<h1 class="titleFont">Thank you for your reply</h1>'+
       '<h2 class="titleFont">We look forward to seeing you on </h2>'+
       '<h2 class="titleFont">20/07/2018 </h2>'
     }
   return thanks
}

});
