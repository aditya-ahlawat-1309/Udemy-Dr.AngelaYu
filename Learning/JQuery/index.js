$("h1").css("color","red");
$("h1").addClass("big-title");
$("button").text("Don't Click Me");
$("a").attr("href","https://www.yahoo.com");

$(document).keypress(function(event){
    $("h1").text(event.key);
})