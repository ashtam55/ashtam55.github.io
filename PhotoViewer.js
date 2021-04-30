// **DO THIS**:
//   Replace BUCKET_NAME with the bucket name.
//
var albumBucketName = 'djtfa';

//firebase
var firebaseConfig = {
    apiKey: "AIzaSyCA6msTfgzWSbon09Il_018LfU03OZrm1c",
    authDomain: "djtface-9600f.firebaseapp.com",
    databaseURL: "https://djtface-9600f-default-rtdb.firebaseio.com",
    projectId: "djtface-9600f",
    storageBucket: "djtface-9600f.appspot.com",
    messagingSenderId: "859023815625",
    appId: "1:859023815625:web:3382b70128ae1f0401ee18",
    measurementId: "G-BC8GX63KBE"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.database();


// **DO THIS**:
//   Replace this block of code with the sample code located at:
//   Cognito -- Manage Identity Pools -- [identity_pool_name] -- Sample Code -- JavaScript
//
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1';  // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:12a9d50a-d9d5-4c3b-99e0-3199e830fea2',
});

// Create a new service object
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});

// A utility function to create HTML.
function getHtml(template) {
  return template.join('\n');
}

// List the photo albums that exist in the bucket.
function listAlbums(address) {


 var params = {
    Bucket: albumBucketName,
    Delimiter:'/',
    Prefix: address
   };
    s3.listObjects(params, function(err, data) {
      if (err) {
        // return alert('There was an error listing your albums: ' + err.message);
        console.log(err);
      } else {

        

        // console.log(data);
        // date.CommonPrefixes.forEach(element => {
        //     console.log(element);
        // });

 

        var albums = data.CommonPrefixes.map(function(commonPrefix) {
          var prefix = commonPrefix.Prefix;
          var albumName = decodeURIComponent(prefix.replace('/', ''));
            // console.log(prefix);
            var userKey = prefix.split('/');
            // console.log(userKey[2]);
            var name = userKey[2];
            myCreateFunction(name);
        //   if(address == albumName){

            // albumName = "FaceAttendace/" + albumName;
            // return getHtml([
            //     '<li>',
            //       '<button style="margin:5px;" onclick="viewAlbum(\'' + userKey[2] + '\')">',
            //       userKey[2],
            //       '</button>',
            //     '</li>'
            //   ]);
        //   }
        //   console.log(albumName);

          
   
        });
        // var message = albums.length ?
        //   getHtml([
        //     '<p>Click on an album name to view it.</p>',
        //   ]) :
        //   '<p>You do not have any albums. Please Create album.';
        // var htmlTemplate = [
        //   '<h2>Albums</h2>',
        //   message,
        //   '<ul>',
        //     getHtml(albums),
        //   '</ul>',
        // ]
        // document.getElementById('viewer').innerHTML = getHtml(htmlTemplate);
      }
    });
  }
  var i = 0;
  var array = new Array();

  // Show the photos that exist in an album.
function viewAlbum(empName) {
    console.log("lol", empName);
    var albumPhotosKey =empName;
    s3.listObjects({Prefix: albumPhotosKey}, function(err, data) {
      if (err) {
        return alert('There was an error viewing your album: ' + err.message);
      }
      // 'this' references the AWS.Response instance that represents the response
      var href = this.request.httpRequest.endpoint.href;
      var bucketUrl = href + albumBucketName + '/';
  
      var photos = data.Contents.map(function(photo) {
        var photoKey = photo.Key;
        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
        var name = photoKey.replace(albumPhotosKey, '');

        name = name.split('.').slice(0, -1).join('.');
        console.log(name);

        array[i] = name;
        i++;
        console.log(array);
        // background="https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" height="300" border="1" width="500"
        return getHtml([
          '<span>',
            // '<div>',
            //   '<br/>',
              '<ul>',
              '<li>',
              '<img id="image" style="width:128px;height:128px;"  src="' + photoUrl + '"/>',
            //   ''+name+'',
              '</li>',
              '</ul>',
            //   '</div>',
            // '<div>',
            //   '<span>',
            //   '</span>',
            // '</div>',
          '</span>',
        ]);
      });
      var message = photos.length ?
        '<p>The following Faces are present.</p>' :
        '<p>There are no faces in this album.</p>';
        '<p id="startPre"></p>';
        '<p id="endPre"></p>';
      var htmlTemplate = [
        // '<div>',
        //   '<button onclick="listAlbums()">',
        //     'Back To Albums',
        //   '</button>',
        // '</div>',
        // '<h2>',
        //   'Album: ' + albumName,
        // '</h2>',
        message,
        '<div>',
          getHtml(photos),
        '</div>',
        // '<h2>',
        //   'End of Album: ' + albumName,
        // '</h2>',
        // '<div>',
        //   '<button onclick="listAlbums()">',
        //     'Back To Albums',
        //   '</button>',
        // '</div>',
      ]
      document.getElementById('results').innerHTML = getHtml(htmlTemplate);
      i = 0;
  console.log("hurray");
  showTime(array);
    //   document.getElementsByTagName('img')[0].setAttribute('style', 'display:block;');

    });
  }


  function showTime(array){
    var newArray = array.filter(function(element) {
        if(element != '') return element;
    });
    newArray.sort(function(a, b){return a - b});
    console.log(newArray[0]);
    console.log(newArray[newArray.length - 1]);
    var firstPre = newArray[0];
    var lastPre = newArray[newArray.length - 1];
    document.getElementById('stime').innerHTML = "First seen --> "+firstPre;
    document.getElementById('etime').innerHTML = "Last seen --> "+lastPre;
  }

  function myCreateFunction(name) {
    var table = document.getElementById("employeeTable");

    var i = table.rows.length;
    var row = table.insertRow(i);
  
    var cell = row.insertCell(row.cells.length);
    cell.innerHTML = name;
  
        addListnersToTable();
  }

  function addListnersToTable(){

    var table = document.getElementById('employeeTable');
    for(var i = 0; i < table.rows.length; i++) {
      table.rows[i].addEventListener('click', function() {
        var msg;
        for(var j = 0; j < this.cells.length; j++) {
          msg = this.cells[j].innerHTML;
        }
        console.log("clicked", msg);
        var date = document.getElementById('ad').value;
        var address = 'FaceAttendance/'+date+'/'+msg+'/';
        console.log(address);
        viewAlbum(address);
    });
    }
  }

  function removeTags(str) {
    if ((str===null) || (str==='')){

    console.log("Not A string");
    return false;
    }
    else{
        str = str.toString();
    }
        
          
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
}

// listAlbums("FaceAttendace");

  function getFullDate(){
    var d = new Date();
    var day = d.getDate();
    var mon = d.getMonth();
    var year = d.getFullYear()
    if(mon == 12){
        mon = 1;
      }
      else{
        mon = mon+1
      }
    
      if( mon == 1 ||mon == 2 ||mon == 3 ||mon == 4 ||mon == 5 ||mon == 6 ||mon == 7 ||mon == 8 ||mon == 9 ){
        mon = "0"+mon;
      }
    var todayDate = day+"-"+mon+"-"+year;
    return todayDate.toString();
  }

  const dbRef = database.ref();
  
  var date = getFullDate();
  dbRef.child(date).get().then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No date found, Creating in collection");
      createDateCollection(date);
    }
  }).catch((error) => {
    console.error(error);
  });

  function createDateCollection(todayDate){
    console.log(todayDate);
    writeUserData(todayDate);
  }




//   dbRef.child("users").child(userId).get().then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   }).catch((error) => {
//     console.error(error);
//   });

  function writeUserData(userId) {
    firebase.database().ref(userId).set({
        username: "name",
        email: "email",
        profile_picture : "imageUrl"
    }).catch((error) => {
        console.error(error);
      });
      console.log("Collection Created by name - ", userId);

  }




  function getUserSubmittedDate(){
    // console.log();\
    var date = document.getElementById('ad').value;
    var getDataForDate = "FaceAttendance/" + date + "/" 
    // viewAlbum("FaceAttendace");
    clearTable();
    listAlbums(getDataForDate);


  }

  function clearTable(){
    var elmtTable = document.getElementById('employeeTable');
    var tableRows = elmtTable.getElementsByTagName('tr');
    var rowCount = tableRows.length;
    
    for (var x=rowCount-1; x>0; x--) {
       elmtTable.deleteRow(x);
    }


    var divToClear = document.getElementById('results');
    divToClear.innerHTML = "";
    
  }

//   function DeleteRows() {
//     var rowCount = tblCustomers.rows.length;
//     for (var i = rowCount - 1; i > 0; i--) {
//         tblCustomers.deleteRow(i);
//     }
// }