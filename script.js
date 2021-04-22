const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}


video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  // const regionsToExtract = [
  //   new faceapi.Rect(0, 0, 100, 100)
  // ]
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions().withFaceLandmarks()
    .withFaceExpressions()
    .withAgeAndGender());
    // extractFaceFromBox(video,detections[0].box);

    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    // extractFaceFromBox(video,resizedDetections[0].box)

    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
  
  // actually extractFaces is meant to extract face regions from bounding boxes
  // but you can also use it to extract any other region
  // Event.preventDefault();

})

let outputImage = document.getElementById('outputImage')

// This function extract a face from video frame with giving bounding box and display result into outputimage
async function extractFaceFromBox(inputImage, box){ 
    const regionsToExtract = [
        new faceapi.Rect( box.x, box.y , box.width , box.height)
    ]
                        
    let faceImages = await faceapi.extractFaces(inputImage, regionsToExtract)
    
    if(faceImages.length == 0){
        console.log('Face not found')
    }
    else
    {
        faceImages.forEach(cnv =>{      
            // outputImage.src = cnv.toDataURL();
            // target.href = cnv.toDataURL();
            // canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
            var image = cnv.toDataURL("image/png").replace("image/png", "image/octet-stream");
            outputImage.src = image;
        // window.location.href=image; // it will save locally
// localStorage.setItem("elephant.png", image);
            // console.log("Hola")    
        })
    }   
}