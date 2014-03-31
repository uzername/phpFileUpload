<?php //actual processing here.
if (!empty($_FILES['file'])) {
    foreach($_FILES['file']['name'] as $key => $name) {
       if (($_FILES['file']['error'][$key] == 0)&&
               (move_uploaded_file($_FILES['file']['tmp_name'][$key],"files".DIRECTORY_SEPARATOR."{$name}"))){
                   $uploaded[] = $name; //append
               }
    }
    //print_r($uploaded); //we won't see it here. 
    if (!empty($_POST['ajax'])) { 
        //check whether the request was sent from javascript, but not from user
        die(json_encode($uploaded)); //stahp it here!
    }
}
?>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
        <script type="text/javascript" src="upload.js" ></script>
        <style type="text/css"> 
            #upload_progress {display: none}
        </style>
        <title> Jovan constructs... File upload! </title>
    </head>
    <body>
        <div id ="uploaded"> 
            <?php
                if (!empty($uploaded)) {
                    foreach ($uploaded as $name) {
                        echo '<div><a href="files', DIRECTORY_SEPARATOR, $name, '">',$name,'</a></div>';
                    }
                }
            ?>
        </div>
        <div id="upload_progress"> </div>
        <div>
            <!-- action is empty, because all processing goes in the current file! -->
            <form action="" method="post" enctype="multipart/form-data">
                <div> 
                    <input type="file" id="file" name="file[]" multiple="multiple" />
                    <input type="submit" id="submit" value="Upload" /> 
                </div>
            </form>
        </div>
    </body>
</html>
