var Cloud = require('ti.cloud');
Cloud.debug = false; // set it to true and you'll see all activity in the console
var tempPhoto=null;

// set the Android ActionBar
function setActionBar(evt){
    if (OS_ANDROID){
        try{
            var actionBar = $.feed.activity.actionBar;      // get a handle to the action bar
            actionBar.backgroundImage='/actionbarbg.png';
            actionBar.title='Ti.PhotoGram';                 // change the App Title
            actionBar.displayHomeAsUp=true;                 // Show the "angle" pointing back
            actionBar.onHomeIconItemSelected = function() { // what to do when the "home" icon is pressed
                dologoff();
            };
            $.feed.activity.invalidateOptionsMenu();        // makes sure the menu is visible   
        }catch(e){
            //
        }
    }
}

// logoff
function dologoff(evt){
    // insert here code for logoff
    $.feed.close();
}

// load the feed
function loadFeed(){
    Cloud.Photos.query({
        order: "-created_at"
    },function (e) {
        if (e.success) {
            $.sv.removeAllChildren();
            if (e.photos.length == 0) {
                // no photos
                alert('There are no photos');
            }
            else {
                e.photos.forEach(function(item){
                    var payload={
                        // give the url if this item is already processed, otherwise give the temp photo
                        // this hack is to use a local version of the photo because it takes a couple seconds
                        // to ACS to get all the different photo versions
                        image:item.processed?item.urls.medium_500:tempPhoto,
                        owner:item.user.username,
                        date:item.created_at
                    }
                    var photoView=Alloy.createController('photo.row',payload).getView();
                    $.sv.add(photoView);
                })
            }
        }
        else {
            alert(e.message);
        }
    })  
}

// the refresh button
function dorefresh(evt){
    loadFeed();
}

// the camera button
function takePhoto(evt){
    Titanium.Media.showCamera({
        success:function(event) {
            $.messageView.show();
            Cloud.onsendstream = function (e) {
                $.messageLabel.text= 'Please Wait. Uploading photo '+(Math.floor(e.progress * 0.5*100)*2)+'% complete';
            };
            Cloud.ondatastream = function (evt) {
                $.messageLabel.text = 'Please Wait. Uploading photo '+(Math.floor(e.progress * 0.5*100) + 0.5)*2+'% complete';
            };
            
            if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                // save the image in case we refresh too soon
                tempPhoto=event.media;
                Cloud.Photos.create({
                    photo : event.media
                }, function(e) {
                    Cloud.onsendstream = Cloud.ondatastream = null;
                    if(e.success) {
                        $.messageView.hide();
                        loadFeed();
                    } else {
                        alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
                    }
                });
            } else {
                alert("got the wrong type back =" + event.mediaType);
            }
        },
        cancel:function() {
            // called when user cancels taking a picture
        },
        error:function(error) {
                // called when there's an error
                var a = Titanium.UI.createAlertDialog({title:'Camera'});
                if (error.code == Titanium.Media.NO_CAMERA) {
                    a.setMessage('Please run this test on device');
                } else {
                    a.setMessage('Unexpected error: ' + error.code);
                }
                a.show();
            },
            saveToPhotoGallery:true,
            allowEditing:true,
            mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
    }); 
}

// let's get the party started!
loadFeed();