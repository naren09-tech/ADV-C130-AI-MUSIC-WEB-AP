var song1 = "";
var song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song1_played ="";
song2_played ="";
var scoreLeftWrist = 0;
var scoreRightWrist =0;
function preload() {
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}
function draw() {
    image(video, 0, 0, 600, 500);
    song1_played=song1.isPlaying();
    fill("red");
    stroke("red");
    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(song1.isPlaying()){
            song1.play();
            document.getElementById("song_name").innerHTML="Song name : Beliver";
        }
    }
    if(scoreRightWrist>0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(song2.isPlaying()){
            song2.play();
            document.getElementById("song_name").innerHTML="Song name : Minimal Technology";
        }
    }

}
function modelLoaded() {
    console.log("Model is loaded");
}
function gotPoses(results) {
    if (results.length != 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(leftWristX);
        console.log(leftWristY);
        console.log(rightWristX);
        console.log(rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}
function play(){
    song1.play();
}
function stop(){
    song1.stop();
    song2.stop();
}
