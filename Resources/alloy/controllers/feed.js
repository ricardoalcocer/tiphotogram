function Controller() {
    function setActionBar() {
    }
    function dologoff() {
        $.feed.close();
    }
    function loadFeed() {
        Cloud.Photos.query({
            order: "-created_at"
        }, function(e) {
            if (e.success) {
                $.sv.removeAllChildren();
                0 == e.photos.length ? alert("There are no photos") : e.photos.forEach(function(item) {
                    var payload = {
                        image: item.processed ? item.urls.medium_500 : tempPhoto,
                        owner: item.user.username,
                        date: item.created_at
                    };
                    var photoView = Alloy.createController("photo.row", payload).getView();
                    $.sv.add(photoView);
                });
            } else alert(e.message);
        });
    }
    function dorefresh() {
        loadFeed();
    }
    function takePhoto() {
        Titanium.Media.showCamera({
            success: function(event) {
                $.messageView.show();
                Cloud.onsendstream = function(e) {
                    $.messageLabel.text = "Please Wait. Uploading photo " + 2 * Math.floor(100 * .5 * e.progress) + "% complete";
                };
                Cloud.ondatastream = function() {
                    $.messageLabel.text = "Please Wait. Uploading photo " + 2 * (Math.floor(100 * .5 * e.progress) + .5) + "% complete";
                };
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    tempPhoto = event.media;
                    Cloud.Photos.create({
                        photo: event.media
                    }, function(e) {
                        Cloud.onsendstream = Cloud.ondatastream = null;
                        if (e.success) {
                            $.messageView.hide();
                            loadFeed();
                        } else alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
                    });
                } else alert("got the wrong type back =" + event.mediaType);
            },
            cancel: function() {},
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Camera"
                });
                error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Please run this test on device") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            saveToPhotoGallery: true,
            allowEditing: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.feed = Ti.UI.createWindow({
        backgroundColor: "#cacaca",
        fullscreen: false,
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "feed"
    });
    $.__views.feed && $.addTopLevelView($.__views.feed);
    setActionBar ? $.__views.feed.addEventListener("open", setActionBar) : __defers["$.__views.feed!open!setActionBar"] = true;
    var __alloyId1 = [];
    $.__views.backbtn = Ti.UI.createButton({
        id: "backbtn",
        systemButton: Ti.UI.iPhone.SystemButton.DONE
    });
    __alloyId1.push($.__views.backbtn);
    dologoff ? $.__views.backbtn.addEventListener("click", dologoff) : __defers["$.__views.backbtn!click!dologoff"] = true;
    $.__views.__alloyId2 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId1.push($.__views.__alloyId2);
    $.__views.wintitle = Ti.UI.createButton({
        title: "Ti.PhotoGram",
        id: "wintitle"
    });
    __alloyId1.push($.__views.wintitle);
    $.__views.__alloyId3 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId1.push($.__views.__alloyId3);
    $.__views.test2 = Ti.UI.createButton({
        id: "test2",
        systemButton: Ti.UI.iPhone.SystemButton.REFRESH
    });
    __alloyId1.push($.__views.test2);
    dorefresh ? $.__views.test2.addEventListener("click", dorefresh) : __defers["$.__views.test2!click!dorefresh"] = true;
    $.__views.test2 = Ti.UI.createButton({
        id: "test2",
        systemButton: Ti.UI.iPhone.SystemButton.CAMERA
    });
    __alloyId1.push($.__views.test2);
    takePhoto ? $.__views.test2.addEventListener("click", takePhoto) : __defers["$.__views.test2!click!takePhoto"] = true;
    $.__views.toolbar = Ti.UI.iOS.createToolbar({
        top: 0,
        barColor: "#AD2B2B",
        items: __alloyId1,
        id: "toolbar"
    });
    $.__views.feed.add($.__views.toolbar);
    $.__views.sv = Ti.UI.createScrollView({
        top: "50dp",
        bottom: "0",
        layout: "vertical",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "true",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "sv"
    });
    $.__views.feed.add($.__views.sv);
    $.__views.messageView = Ti.UI.createView({
        height: "100dp",
        width: "300dp",
        borderRadius: 10,
        backgroundColor: "#000",
        opacity: .7,
        touchEnabled: false,
        visible: false,
        id: "messageView"
    });
    $.__views.feed.add($.__views.messageView);
    $.__views.messageLabel = Ti.UI.createLabel({
        text: "",
        color: "#fff",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "14dp"
        },
        textAlign: "center",
        id: "messageLabel"
    });
    $.__views.messageView.add($.__views.messageLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    Cloud.debug = false;
    var tempPhoto = null;
    loadFeed();
    __defers["$.__views.feed!open!setActionBar"] && $.__views.feed.addEventListener("open", setActionBar);
    __defers["$.__views.backbtn!click!dologoff"] && $.__views.backbtn.addEventListener("click", dologoff);
    __defers["$.__views.test2!click!dorefresh"] && $.__views.test2.addEventListener("click", dorefresh);
    __defers["$.__views.test2!click!takePhoto"] && $.__views.test2.addEventListener("click", takePhoto);
    __defers["$.__views.menu1!click!dorefresh"] && $.__views.menu1.addEventListener("click", dorefresh);
    __defers["$.__views.menu2!click!takePhoto"] && $.__views.menu2.addEventListener("click", takePhoto);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;