
song = "";
object = [];
status = "";

function preload()
{
	song = loadSound("Alarm.mp3");

}

function setup() {
 canvas= createCanvas(380,380);
 canvas.center();
 video = createCapture(VIDEO);
 video.size(380,380);
 video.hide();
 objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
 document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error)
{
  console.log(error);
}else
{
  console.log(results);
  object = results;
}
}



function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
 
          fill(r,g,b);
          percent = floor(object[i].confidence * 100);
          text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(object[i].x, object[i].y, object[i].width, object[i].height);
         
          if(object[i].label == "elephant")
          {
            document.getElementById("elephant").innerHTML = "elephant found";
            console.log("play");
            song.play();
          }
          else
          {
           document.getElementById("elephant").innerHTML = "elephant not found";
           console.log("stop");
           song.stop();
          }
         }

        if(object.length == 0)
        {
          document.getElementById("elephant").innerHTML = "elephant not found";
          console.log("stop");
          song.stop();
        }
      }
}
