var handleUpload = function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    var fileInput = document.getElementById('file');
    //JavaScript/Html5 circus with horses! Usin' this for splittin files
    var data = new FormData(); 
    data.append('ajax', true);
    for (var i=0; i<fileInput.files.length; ++i) {
        data.append('file[]', fileInput.files[i]);
    }
    var request = new XMLHttpRequest();
    request.upload.addEventListener('progress', function(event) {
        if (event.lengthComputable) {
            var percent = event.loaded / event.total;
            var progress = document.getElementById('upload_progress');
            while (progress.hasChildNodes()) {
                progress.removeChild(progress.firstChild);
            }
            progress.appendChild(document.createTextNode((percent * 100)+'%'));
        }
    });
    request.upload.addEventListener('load', function(event) {
        document.getElementById('upload_progress').style.display='none';
    });
    request.upload.addEventListener('error', function(event) {
       alert('Upload failed');
    });
    
    request.addEventListener('readystatechange', function(event){ //processing response from server
        if (this.readyState == 4) { //if request was complete
            if (this.status == 200) { //...and if everything went fine...
                var links = document.getElementById('uploaded');
                console.log(this.response);
                var uploaded = eval(this.response);
                var div, a;
                for (var i=0; i<uploaded.length; ++i) {
                    div = document.createElement('div');
                    a = document.createElement('a');
                    a.setAttribute('href', 'files/'+uploaded[i]);
                    a.appendChild(document.createTextNode(uploaded[i]));
                    
                    div.appendChild(a);
                    links.appendChild(div);
                }
            } else {
                console.log('Server responded with status: '+this.status);
            }
        }
    });
    
    request.open('POST', 'upload.php');
    request.setRequestHeader('Cache-Control', 'no-cache'); //metadata note
    document.getElementById('uploaded').style.display='block';
    request.send(data); //send request here.
    //console.log(data);
}
window.addEventListener('load', function(event){
    var submit = document.getElementById('submit');
    submit.addEventListener('click', handleUpload);
});