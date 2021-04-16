

// document.getElementById("fileToUpload").addEventListener("change", function (event) {
//     ProcessImage();
//   }, false);
const video = document.getElementById('video')
var statusText = document.getElementById('statusText');
var globalImageData;
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
  }, 700)
  
  setInterval(async ()=>{

    if(!globalImageData.length){

        console.log("No image data to process");
        statusText.innerText = "No Faces Detected";
    
    }
    else{
        statusText.innerText = "Processing Image";
        ProcessImage(globalImageData );
    }

  },3000);
  // actually extractFaces is meant to extract face regions from bounding boxes
  // but you can also use it to extract any other region
//   Event.preventDefault();

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
            var image = cnv.toDataURL('image/jpeg');
            // var image = cnv.toDataURL();
            outputImage.src = image;
            globalImageData = image;
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
          Name: "Ash.png"
         }
        }
       };
    // console.log(imageData);
    rekognition.detectFaces(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
    //    var table = "<table><tr><th>Low</th><th>High</th></tr>";
    //     // show each face and build out estimated age table
    //     for (var i = 0; i < data.FaceDetails.length; i++) {
    //       table += '<tr><td>' + data.FaceDetails[i].AgeRange.Low +
    //         '</td><td>' + data.FaceDetails[i].AgeRange.High + '</td></tr>';
    //     }
    //     table += "</table>";
        // document.getElementById("opResult").innerHTML = table;
        console.log(data);
      }
    });
    //     var albumName = "djtfa";
    //   var files = imageData;
    //   if (!files.length) {
    //     return alert("Please choose a file to upload first.");
    //   }
    //   var file = imageData;
    //   var fileName = "Test1.png";
    //   var albumPhotosKey = encodeURIComponent(albumName) + "/";
    
    //   var photoKey = albumPhotosKey + fileName;
    
    //   Use S3 ManagedUpload class as it supports multipart uploads
    //   var upload = new AWS.Rekognition.detectFaces({
    //     params: {
    //         Image: {
    //         S3Object: {
    //          Bucket: "djtfa", 
    //          Name: "Test1.png"
    //         }
    //        }
    //     }
    //   });
    
    //   var promise = upload.promise();
    
    //   promise.then(
    //     function(data) {
    //     //   alert("Successfully uploaded photo.");
    //     //   viewAlbum(albumName);
    //             console.log(data);
    //     },
    //     function(err) {
    //       return alert("There was an error uploading your photo: ", err.message);
    //     }
    //   );

    // var params = {
    //     Image: {
    //      S3Object: {
    //       Bucket: "mybucket", 
    //       Name: "myphoto"
    //      }
    //     }
    //    };
    //    rekognition.detectFaces(params, function(err, data) {
    //      if (err) console.log(err, err.stack); // an error occurred
    //      else     console.log(data);


    //    });
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
            console.log("Uploaded")
            checkingFaces();
            // listObjs(); // this function will list all the files which has been uploaded
            //here you can also add your code to update your database(MySQL, firebase whatever you are using)
        }
    });
    //    AWS.S3.putObject(params, function(err, data) {
    //      if (err) console.log(err, err.stack); // an error occurred
    //      else     console.log(data);           // successful response
         
    //    });
       
    //   var albumName = "djtfa";
    // var files = imageData;
    // if (!files.length) {
    //   return alert("Please choose a file to upload first.");
    // }
    // var file = imageData;
    // var fileName = "Test1.png";
    // var albumPhotosKey = encodeURIComponent(albumName) + "/";
  
    // var photoKey = albumPhotosKey + fileName;
  
    // Use S3 ManagedUpload class as it supports multipart uploads
    // var upload = new AWS.S3.ManagedUpload({
    //   params: {
    //     Bucket: albumName,
    //     Key: photoKey,
    //     Body: file
    //   }
    // });
  
    // var promise = upload.promise();
  
    // promise.then(
    //   function(data) {
    //     console.log("Successfully uploaded photo.");
    //     // viewAlbum(albumName);
    //     checkingFaces();
    //   },
    //   function(err) {
    //     return alert("There was an error uploading your photo: ", err.message);
    //   }
    // );
  }

  function checkingFaces(){
    console.log("Checking Faces");
    statusText.innerText = "Checking in Database";
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
        FaceMatchThreshold: 95, 
        Image: {
         S3Object: {
          Bucket: "djtfa", 
          Name: "Ash1.jpg"
         }
        }, 
        MaxFaces: 5
       };
    // console.log(imageData);
    rekognition.searchFacesByImage(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
    //    var table = "<table><tr><th>Low</th><th>High</th></tr>";
    //     // show each face and build out estimated age table
    //     for (var i = 0; i < data.FaceDetails.length; i++) {
    //       table += '<tr><td>' + data.FaceDetails[i].AgeRange.Low +
    //         '</td><td>' + data.FaceDetails[i].AgeRange.High + '</td></tr>';
    //     }
    //     table += "</table>";
        // document.getElementById("opResult").innerHTML = table;
        console.log(data.FaceMatches[0].Face.ExternalImageId);
        statusText.innerText = "Match Found -- "+ data.FaceMatches[0].Face.ExternalImageId + "  with confidence score -- "+data.FaceMatches[0].Face.Confidence;


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
        AWS.region = "us-east-1";
    var rekognition = new AWS.Rekognition();
    var params = {
        CollectionId: "djtFaceData", 
        DetectionAttributes: [
        ], 
        ExternalImageId: "ashtam", 
        Image: {
         S3Object: {
          Bucket: "djtfa", 
          Name: "Ash.png"
         }
        }
       };
       rekognition.indexFaces(params, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(data);           // successful response
         
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
    var control = document.getElementById("fileToUpload");
    // var file = control.files[0];
    var file = image;
    // console.log(file);
    // checkingFaces();
    //Upload image to S3
   
    addPhoto(image);


    // DetectFaces();

    // createCollection();

// addFaces();

    // DetectFaces(image);
    // Load base64 encoded image 
    var reader = new FileReader();
    // reader.onload = (function (theFile) {
    //   return function (e) {
    //     var img = document.createElement('img');
    //     var image = null;
    //     img.src = e.target.result;
    //     var jpg = true;
    //     try {
    //       image = atob(e.target.result.split("data:image/jpeg;base64,")[1]);

    //     } catch (e) {
    //       jpg = false;
    //     }
    //     if (jpg == false) {
    //       try {
    //         image = atob(e.target.result.split("data:image/png;base64,")[1]);
    //         console.log(image);
    //       } catch (e) {
    //         alert("Not an image file Rekognition can process");
    //         return;
    //       }
    //     }
    //     //unencode image bytes for Rekognition DetectFaces API 
    //     var length = image.length;
    //     imageBytes = new ArrayBuffer(length);
    //     var ua = new Uint8Array(imageBytes);
    //     for (var i = 0; i < length; i++) {
    //       ua[i] = image.charCodeAt(i);
    //     }
    //     //Call Rekognition  
    //     // DetectFaces(imageBytes);
    //   };
    // })(file);
    // reader.readAsDataURL(file);
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