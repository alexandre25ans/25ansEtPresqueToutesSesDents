/*!
* Start Bootstrap - Landing Page v5.1.0 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function someFunction(link){
    window.open(link);
}

window.onload = function () {

    // Definitions
    var canvas = document.getElementById("paint-canvas");
    if(canvas == null)
        return;
    var context = canvas.getContext("2d");
    var boundings = canvas.getBoundingClientRect();

    context.fillStyle = "pink";
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    // Specifications
    var mouseX = 0;
    var mouseY = 0;
    context.strokeStyle = 'white'; // initial brush color
    context.lineWidth = 10; // initial brush width
    var isDrawing = false;
  
    // Mouse Down Event
    canvas.addEventListener('mousedown', function(event) {
      setMouseCoordinates(event);
      isDrawing = true;
  
      // Start Drawing
      context.beginPath();
      context.moveTo(mouseX, mouseY);
    });
  
    // Mouse Move Event
    canvas.addEventListener('mousemove', function(event) {
      setMouseCoordinates(event);
  
      if(isDrawing){
        context.lineTo(mouseX, mouseY);
        context.stroke();
      }
    });
  
    // Mouse Up Event
    canvas.addEventListener('mouseup', function(event) {
      setMouseCoordinates(event);
      isDrawing = false;
    });
  
    // Handle Mouse Coordinates
    function setMouseCoordinates(event) {
      mouseX = event.clientX - boundings.left;
      mouseY = event.clientY - boundings.top;
    }
  };