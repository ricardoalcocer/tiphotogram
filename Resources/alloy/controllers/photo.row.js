function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.photorow = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "photorow"
    });
    $.__views.photorow && $.addTopLevelView($.__views.photorow);
    $.__views.photocontainer = Ti.UI.createView({
        height: "300dp",
        top: "10dp",
        bottom: "10dp",
        left: "10dp",
        right: "10dp",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#b2b2b2",
        borderRadius: 5,
        id: "photocontainer"
    });
    $.__views.photorow.add($.__views.photocontainer);
    $.__views.photo = Ti.UI.createImageView({
        width: "90%",
        height: "80%",
        bottom: "45dp",
        id: "photo"
    });
    $.__views.photocontainer.add($.__views.photo);
    $.__views.photometa = Ti.UI.createView({
        height: "35dp",
        bottom: 0,
        id: "photometa"
    });
    $.__views.photocontainer.add($.__views.photometa);
    $.__views.owner = Ti.UI.createLabel({
        left: "5dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "12dp"
        },
        id: "owner"
    });
    $.__views.photometa.add($.__views.owner);
    $.__views.date = Ti.UI.createLabel({
        right: "5dp",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "12dp"
        },
        id: "date"
    });
    $.__views.photometa.add($.__views.date);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.photo.image = args.image;
    if ("object" == typeof args.image) {
        var t = Ti.UI.create2DMatrix();
        t = t.rotate(90);
        $.photo.transform = t;
    }
    $.owner.text = "By " + args.owner;
    $.date.text = args.date;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;