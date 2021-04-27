

// document.getElementById("fileToUpload").addEventListener("change", function (event) {
//     ProcessImage();
//   }, false);
const video = document.getElementById('video')
var statusText = document.getElementById('statusText');
var onFaceDetect = document.getElementById('fd');
var onProcessing = document.getElementById('pro');
var onSucess = document.getElementById('suc');

var submitButton = document.getElementById('submitButton');

var personDetected = document.getElementById('personDetected');
var globalImageData;
var width = 720, height = 560;  // camera image size

var e_threshhold = 75;  // eyeClosure threshhold

var faceMode = affdex.FaceDetectorMode.LARGE_FACES;  // face mode parameter

// Initialize an Affectiva CameraDetector object
var detector = new affdex.CameraDetector(video, width, height, faceMode);

// Enable detection of specific Expressions classifiers.
detector.detectExpressions.eyeClosure=true;

// Set process rate
detector.processFPS = 15

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
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    extractFaceFromBox(video,detections[0].box);

    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    // extractFaceFromBox(video,resizedDetections[0].box)

    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
  

  detector.start();  // start detector 

  // setInterval(async ()=>{

  //   if(!globalImageData.length){

  //       console.log("No image data to process");
  //       // statusText.innerText = "No Faces Detected";
  //       // onFaceDetect.setAttribute("style", "color:gray;");
    
  //   }
  //   else{
  //     // onFaceDetect.setAttribute("style", "color:green;");

  //       // statusText.innerText = "Processing Image";
  //       // ProcessImage(globalImageData);
  //   }

  // },3000);
  // actually extractFaces is meant to extract face regions from bounding boxes
  // but you can also use it to extract any other region
//   Event.preventDefault();

})

detector.addEventListener("onInitializeSuccess", function() {
  console.log("The detector reports initialized");
  //Display canvas instead of video feed because we want to draw the feature points on it
  // $("#face_video_canvas").css("display", "block");
  // $("#face_video").css("display", "none");

  // TODO(optional): Call a function to initialize the game, if needed
  // <your code here>
});
detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
  // console.log(faces[0].expressions.eyeClosure);
  // var canvas = $('#face_video_canvas')[0];
  if (!video)
    return;

  // Count results
  // cnt_result += 1;

  // Time interval
  // t_prev = t_now;
  // t_now = timestamp;
  // interval = t_prev == null ? 0 : t_now - t_prev;
  // data['interval'].push(parseInt(interval*1000));

  // Report face metrics
  // $('#results').html("");
  // $('#appearance').html("");
  // timestamp = timestamp.toFixed(1);
  // data['timestamp'].push(timestamp);
  // log('#appearance', "Timestamp: " + timestamp);
  // log('#appearance', "Total results: " + cnt_result);
  // log('#appearance', "Results/sec: " + (cnt_result/timestamp).toFixed(1));
  // log('#appearance', "Faces found: " + faces.length);
  if (faces.length > 0) {
    // Report desired metrics
    eyeClosure = parseInt(faces[0].expressions.eyeClosure);
    // log('#appearance', "eyeClosure: " + eyeClosure);
    // console.log("Eye Closure -- > ", eyeClosure);
  
    var isRegisterPageVisible = document.getElementsByClassName('formDiv')[0].style.visibility;
    
    if(eyeClosure > e_threshhold && isRegisterPageVisible == "hidden"){
      // statusText.innerText = "Real Face Confirmed"; 
      // onFaceDetect.style.backgroundColor = "green";

      onProcessing.style.backgroundColor = "green";
        ProcessImage(globalImageData)
        .then( (message)=>{
          // console.log(message);
          addPhoto(message);
        }    
        );

    }
    else{
      // onFaceDetect.setAttribute("style", "color:gray;");
      // onFaceDetect.style.backgroundColor = 'gray';

      // console.log("No Real Face Found");
      // statusText.innerText = "No Real Face Found. Try Blinking"; 
    }
    // Mark eye keypoint
    // drawEye(video, image, faces[0]);/

    // // Count blinks
    // e_prev = e_now;
    // e_now = eyeClosure<e_threshhold ? 0 : 1;
    // if (t_prev != null && e_prev==1 && e_now==0) {
    //   cnt_blink += 1;
    // }
    // $('#target').html(cnt_blink);
    // if (cnt_blink>0) {
    //   $('#score').html((timestamp/cnt_blink).toFixed(1) + ' sec/blink');
    // }

    // Add data
    // data['eyeClosure'].push(eyeClosure);   
  }
  else {
    // console.log("No Face Found");

    // append nan
    // data['eyeClosure'].push(NaN);
  }

  // update chart
  // myChart.setOption({
  //   xAxis: {
  //     data: data.timestamp
  //   },      
  //   series: [{
  //     name: 'eyeClosure',
  //     data: data.eyeClosure
  //   }]
  // });
});


// Draw eye feature points
function drawEye(canvas, img, face) {
  // Obtain a 2D context object to draw on the canvas
  var ctx = canvas.getContext('2d');

  // TODO: Set the stroke and/or fill style you want for each feature point marker
  // See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Fill_and_stroke_styles
  ctx.strokeStyle="#FFF";
  
  // Loop over each feature point in the face  
  // 16 Outer Right Eye
  // 17 Inner Right Eye
  // 18 Inner Left Eye
  // 19 Outer Left Eye
  // 30 Upper Corner Right Eye
  // 31 Lower Corner Right Eye
  // 32 Upper Corner Left Eye
  // 33 Lower Corner Left Eye
  eyepoints = [16, 17, 18, 19, 30, 31, 32, 33]
  for (var id in eyepoints) {
    var featurePoint = face.featurePoints[eyepoints[id]];

    // TODO: Draw feature point, e.g. as a circle using ctx.arc()
    // See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
    ctx.beginPath();
    ctx.arc(featurePoint['x'],featurePoint['y'],2,0,2*Math.PI);
    ctx.stroke();
  }
}


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
            var image = cnv.toDataURL('image/jpeg');
            // var image = cnv.toDataURL();
            outputImage.src = image;
            globalImageData = image;
            onFaceDetect.style.backgroundColor = "green";

            // checkFaces();
            // DetectFaces();

        // window.location.href=cnv.toDataURL("image/jpg"); // it will save locally
// localStorage.setItem("elephant.png", image);
            // console.log("Hola")    
        })

    }   
}

function checkLoop(){

    

}

  //Calls DetectFaces API and shows estimated ages of detected faces
  function DetectFaces() {
      console.log("Detected Faces");
    AWS.region = "us-east-1";
    var rekognition = new AWS.Rekognition();
    // var params = {
    //   Image: {
    //     Bytes: imageData

    //   },
    //   Attributes: [
    //     'ALL',
    //   ]
    // };
    // var albumPhotosKey = encodeURIComponent("djfta") + "/";

    // var photoKey = albumPhotosKey + "Test1.png";
    var params = {
        Image: {
         S3Object: {
          Bucket: "djtfa", 
          Name: "Ash1.jpg"
         }
        }
       };
    // console.log(imageData);
    rekognition.detectFaces(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        console.log(data);
      }
    });
   
  }
  function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

  function addPhoto(imageData) {
    console.log("Real Face Confirmed. Sending data to S3 now");        // ProcessImage(globalImageData);

    // onProcessing.style.backgroundColor = "green";

    // var params = {
    //     Body: "test1", 
    //     Bucket: "djtfa", 
    //     Key: imageData, 
    //     Metadata: {
    //      "metadata1": "value1", 
    //      "metadata2": "value2"
    //     }
    //    };
    // var dataUrl = canvas.toDataURL("image/jpeg");
    var blobData = dataURItoBlob(imageData);
    // var params = {Key: "file_name", ContentType: "image/jpeg", Body: blobData};
    // bucket.upload(params, function (err, data) {});

       var bucketName = 'djtfa'; // Enter your bucket name
    var bucket = new AWS.S3({
        params: {
            Bucket: bucketName
        }
    });
       var params = {
        ContentType:blobData.type,
        Key: "Ash1.jpg",
        Body: blobData,
        ACL: 'public-read'
    };

       bucket.putObject(params, function(err, data) {
        if (err) {
            // results.innerHTML = 'ERROR: ' + err;
            console.log(err);
        } else {
            console.log("S3 Uploaded Success");
            // return Promise.resolve("S3 Uploaded Success");
            
            
              setTimeout(checkingFaces(), 1000);
    
    
            
            // DetectFaces();
            // listObjs(); // this function will list all the files which has been uploaded
            //here you can also add your code to update your database(MySQL, firebase whatever you are using)
        }
    });
    
  }

  function addPhotoForIndexing(imageData) {
    // var params = {
    //     Body: "test1", 
    //     Bucket: "djtfa", 
    //     Key: imageData, 
    //     Metadata: {
    //      "metadata1": "value1", 
    //      "metadata2": "value2"
    //     }
    //    };
    // var dataUrl = canvas.toDataURL("image/jpeg");
    var blobData = dataURItoBlob(imageData);
    // var params = {Key: "file_name", ContentType: "image/jpeg", Body: blobData};
    // bucket.upload(params, function (err, data) {});

       var bucketName = 'djtfa'; // Enter your bucket name
    var bucket = new AWS.S3({
        params: {
            Bucket: bucketName
        }
    });
       var params = {
        ContentType:blobData.type,
        Key: "indexed.jpg",
        Body: blobData,
        ACL: 'public-read'
    };

       bucket.putObject(params, function(err, data) {
        if (err) {
            // results.innerHTML = 'ERROR: ' + err;
            console.log(err);
        } else {
            console.log("Successfully Uploaded for Indexing");
            // checkingFaces();

            checkFaceBeforeIndexing();
            // addFaces();
            // listObjs(); // this function will list all the files which has been uploaded
            //here you can also add your code to update your database(MySQL, firebase whatever you are using)
        }
    });
    
  }

  function checkFaceBeforeIndexing(){
    console.log("Checking Faces Before Uploading");
    // statusText.innerText = "Checking in Database";
    AWS.region = "us-east-1";
    var rekognition = new AWS.Rekognition();
    
       var params = {
        CollectionId: "djtFaceData", 
        FaceMatchThreshold: 95, 
        Image: {
         S3Object: {
          Bucket: "djtfa", 
          Name: "indexed.jpg"
         }
        }, 
        MaxFaces: 1
       };
    // console.log(imageData);
    rekognition.searchFacesByImage(params, function (err, data) {
      if (err){
        console.log("Face Not Exists, Not Adding");

        // console.log(err, err.stack);
        // statusText.innerText = "Match Not Found ";
      } // an error occurred
      else {
        if(data.FaceMatches[0]){
          console.log("Face Already Exists");
          alert("Face already Exists");
          // document.getElementById('suc').style.backgroundColor = "green";
          // console.log(data.FaceMatches[0].Face.ExternalImageId);
          // console.log(data);
          // personDetected.innerText = data.FaceMatches[0].Face.ExternalImageId + "  with confidence score -- "+data.FaceMatches[0].Face.Confidence;
          // myCreateFunction(data.FaceMatches[0].Face.ExternalImageId,data.FaceMatches[0].Face.Confidence);

        }
        else{
          console.log("Face Not Exists, Adding");
          addFaces();
          // statusText.innerText = "Match Not Found ";
          // personDetected.innerText = "Match Not Found";

        }


      }
    });
  }


  function checkingFaces(){
    console.log("Checking Faces");
    // statusText.innerText = "Checking in Database";
    AWS.region = "us-east-1";
    var rekognition = new AWS.Rekognition();
    // var params = {
    //   Image: {
    //     Bytes: imageData

    //   },
    //   Attributes: [
    //     'ALL',
    //   ]
    // };
    // var albumPhotosKey = encodeURIComponent("djfta") + "/";

    // var photoKey = albumPhotosKey + "Test1.png";
    // var params = {
    //     Image: {
    //      S3Object: {
    //       Bucket: "djtfa", 
    //       Name: "Test1.png"
    //      }
    //     }
    //    };
       var params = {
        CollectionId: "djtFaceData", 
        FaceMatchThreshold: 99, 
        Image: {
         S3Object: {
          Bucket: "djtfa", 
          Name: "Ash1.jpg"
         }
        }, 
        MaxFaces: 1
       };
    // console.log(imageData);
    rekognition.searchFacesByImage(params, function (err, data) {
      if (err){
        // console.log(err, err.stack);
        // statusText.innerText = "Match Not Found ";
      } // an error occurred
      else {
    //    var table = "<table><tr><th>Low</th><th>High</th></tr>";
    //     // show each face and build out estimated age table
    //     for (var i = 0; i < data.FaceDetails.length; i++) {
    //       table += '<tr><td>' + data.FaceDetails[i].AgeRange.Low +
    //         '</td><td>' + data.FaceDetails[i].AgeRange.High + '</td></tr>';
    //     }
    //     table += "</table>";
        // document.getElementById("opResult").innerHTML = table;
        if(data.FaceMatches[0]){
          // document.getElementById('suc').style.backgroundColor = "green";
          // console.log(data.FaceMatches[0].Face.ExternalImageId);
          // console.log(data);
          // personDetected.innerText = data.FaceMatches[0].Face.ExternalImageId + "  with confidence score -- "+data.FaceMatches[0].Face.Confidence;
          onSucess.style.backgroundColor = "green";
          myCreateFunction(data.FaceMatches[0].Face.ExternalImageId,data.FaceMatches[0].Face.Confidence);
          onProcessing.style.backgroundColor = "gray";
          onFaceDetect.style.backgroundColor = "gray";
          onSucess.style.backgroundColor = "gray";
          
          setTimeout(deleteFile(), 3000);

          
          // return Promise.resolve("Success Deleting File");
        }
        else{
          alert("Face not found - Go to Register page");
          // statusText.innerText = "Match Not Found ";
          // personDetected.innerText = "Match Not Found";

        }


      }
    });
  }

//   function uploadToS3(imageData){
//     AWS.region = "us-east-1";
//     var rekognition = new AWS.Rekognition();
//     // var params = {
//     //   Image: {
//     //     Bytes: imageData

//     //   },
//     //   Attributes: [
//     //     'ALL',
//     //   ]
//     // };
//     rekognition.upload({
//         Key: filePath,
//         Body: file,
//         ACL: 'public-read'
//     }, function(err, data) {
//         if(err) {
//             reject('error');
//         }
        
//         alert('Successfully Uploaded!');
//     }).on('httpUploadProgress', function (progress) {
//         var uploaded = parseInt((progress.loaded * 100) / progress.total);
//         // $("progress").attr('value', uploaded);
//         console.log("Progress --> ",uploaded);
//     });
//   }
function addFaces(){
  var username = document.getElementById('fname').value;
  console.log('Adding User -->  ',username);
        AWS.region = "us-east-1";
    var rekognition = new AWS.Rekognition();
    var params = {
        CollectionId: "djtFaceData", 
        DetectionAttributes: [
        ], 
        ExternalImageId: username, 
        Image: {
         S3Object: {
          Bucket: "djtfa", 
          Name: "indexed.jpg"
         }
        }
       };
       rekognition.indexFaces(params, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(data);   alert("Face Added Successfully");        // successful response
         
       });
}

function deleteFile() {
  // var bucketInstance = new AWS.S3();
  // var params = {
  //     Bucket: 'djtfa',
  //     Key: 'Ash1.jpg'
  // };
  // bucketInstance.deleteObject(params, function (err, data) {
  //     if (data) {
  //         console.log("File deleted successfully");
  //     }
  //     else {
  //         console.log("Check if you have sufficient permissions : "+err);
  //     }
  // });
  // AnonLog();


//  var params = {
//   Bucket: "examplebucket", 
//   Key: "objectkey.jpg"
//  };
//  s3.deleteObject(params, function(err, data) {
//    if (err) console.log(err, err.stack); // an error occurred
//    else     console.log(data);           // successful response
//    /*
//    data = {
//    }
//    */
//  });
AnonLog();
  var bucketName = 'djtfa'; // Enter your bucket name
  var bucket = new AWS.S3({
      params: {
          Bucket: bucketName
      }
  });
     var params = {
      Key: "Ash1.jpg",
  };

     bucket.deleteObject(params, function(err, data) {
      if (err) {
          // results.innerHTML = 'ERROR: ' + err;
          console.log(err);
      } else {
          console.log("Successfully Deleted file");
          // checkingFaces();

          // checkFaceBeforeIndexing();
          // addFaces();
          // listObjs(); // this function will list all the files which has been uploaded
          //here you can also add your code to update your database(MySQL, firebase whatever you are using)
      }
  });
}

function createCollection(){
    AWS.region = "us-east-1";
    var rekognition = new AWS.Rekognition();
console.log("Creating Collection");
    var params = {
        CollectionId: "djtFaceData"
       };
       rekognition.createCollection(params, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(data);           // successful response
         /*
         data = {
          CollectionArn: "aws:rekognition:us-west-2:123456789012:collection/myphotos", 
          StatusCode: 200
         }
         */
       });
      
}
  //Loads selected image and unencodes image bytes for Rekognition DetectFaces API
  function ProcessImage(image) {
    AnonLog();
    return Promise.resolve(image);


  }
  //Provides anonymous log on to AWS services
  function AnonLog() {
    
    // Configure the credentials provider to use your identity pool
    AWS.config.region = 'us-east-1'; // Region
    // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //   IdentityPoolId: 'IdentityPoolIdToUse',
    // });
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:12a9d50a-d9d5-4c3b-99e0-3199e830fea2',
});
    
    // Make the call to obtain credentials
    AWS.config.credentials.get(function () {
      // Credentials will be available when this function is called.
      var accessKeyId = AWS.config.credentials.accessKeyId;
      var secretAccessKey = AWS.config.credentials.secretAccessKey;
      var sessionToken = AWS.config.credentials.sessionToken;
    });
  }


  function goToRegister(){
    AnonLog();
    console.log("Registering New Faces");
    // addPhoto(globalImageData);
    addPhotoForIndexing(globalImageData);

  
  }


  //Tables

  var table = document.getElementById("myTable");

  function myCreateFunction(name,accuracy) {

    var i = table.rows.length;
    var row = table.insertRow(i);
  
    for (var j = 0; j < table.rows[0].cells.length - 1; j++) {
      var cell = row.insertCell(j);

      if(j == 0){
        cell.innerHTML = name;
      }
      else if(j == 1){
        cell.innerHTML = accuracy;

      }
      
      // table.rows[i].cells[j].addEventListener("click", function() {
      //   editText(this);
      // }, false);
    }
    var d = new Date();
var epoch = d.getTime();
    var cell = row.insertCell(row.cells.length);
    cell.innerHTML = epoch;
    // cell.classList.add("delete_row");
    // // cell.addEventListener("click", function() {
    // //   deleteRow(this);
    // // }, false);
  }
  

  // myCreateFunction("ashtam","12");


  document.getElementById("showRegister").addEventListener("click", function() {
    // document.getElementById("demo").innerHTML = "Hello World";
    console.log("sad");

    // document.querySelectorAll('.formDiv')[0].
    // style.display = 'hidden';

    // document.querySelectorAll('.currentFaceDetail')[0].
    // style.display = 'inline-block';
    document.getElementsByClassName('formDiv')[0].style.visibility = 'visible';
    document.getElementsByClassName('currentFaceDetail')[0].style.visibility = 'hidden';
  });


  document.getElementById("showDetection").addEventListener("click", function() {
    // document.getElementById("demo").innerHTML = "Hello World";
    console.log("happuy");

    // document.querySelectorAll('.formDiv')[0].
    // style.visibility = 'inline-block';

    // document.querySelectorAll('.currentFaceDetail')[0].
    // style.visibility = 'hidden';
    document.getElementsByClassName('formDiv')[0].style.visibility = 'hidden';
    document.getElementsByClassName('currentFaceDetail')[0].style.visibility = 'visible';
  });

  // document.getElementById("showDetection").addEventListener("click", function() {
  //   // document.getElementById("demo").innerHTML = "Hello World";
  //   console.log("happy");

  //   document.getElementsByClassName('currentFaceDetail')[0].style.visibility = 'block';
  //   document.getElementsByClassName('formDiv')[0].style.visibility = 'hidden';
  // });

submitButton.addEventListener("click",function(){
var userName = document.getElementById("fname").value;
console.log("Submit clicked",userName);
goToRegister();
});