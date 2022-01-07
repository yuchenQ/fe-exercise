const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.fillRect(0, 0, 100, 100);
context.strokeRect(120, 0, 100, 100);

context.fillStyle = "pink";
context.strokeStyle = "darkred";
context.fillRect(0, 120, 100, 100);
context.strokeRect(120, 120, 100, 100);

context.clearRect(50, 50, 120, 120);
