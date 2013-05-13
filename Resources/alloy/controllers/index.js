function Controller() {
    function doLogin() {
        Cloud.Users.login({
            login: $.uid.value,
            password: $.pwd.value
        }, function(e) {
            if (e.success) {
                var user = e.users[0];
                Ti.App.Properties.setString("userguid", user.id);
                var win = Alloy.createController("feed").getView();
                win.open();
            } else alert(e.message);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#A50000",
        layout: "vertical",
        orientationModes: [ Ti.UI.PORTRAIT ],
        navBarHidden: "true",
        exitOnClose: "true",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId8 = Ti.UI.createImageView({
        image: "/tiphotogramlogo.png",
        top: "25dp",
        id: "__alloyId8"
    });
    $.__views.index.add($.__views.__alloyId8);
    $.__views.loginbox = Ti.UI.createView({
        height: "160dp",
        width: "90%",
        backgroundColor: "#fff",
        layout: "vertical",
        top: "10dp",
        borderWidth: 1,
        borderColor: "#cacaca",
        borderRadius: 5,
        id: "loginbox"
    });
    $.__views.index.add($.__views.loginbox);
    $.__views.__alloyId9 = Ti.UI.createView({
        top: "5dp",
        height: "50dp",
        width: Ti.UI.FILL,
        id: "__alloyId9"
    });
    $.__views.loginbox.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        font: {
            fontWeight: "bold",
            fontSize: "15dp"
        },
        left: "5dp",
        color: "#000",
        text: "User name:",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.uid = Ti.UI.createTextField({
        right: "5dp",
        height: "50dp",
        width: "60%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
        font: {
            fontSize: "15dp"
        },
        id: "uid",
        value: "ralcocer"
    });
    $.__views.__alloyId9.add($.__views.uid);
    $.__views.__alloyId11 = Ti.UI.createView({
        top: "5dp",
        height: "50dp",
        width: Ti.UI.FILL,
        id: "__alloyId11"
    });
    $.__views.loginbox.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        font: {
            fontWeight: "bold",
            fontSize: "15dp"
        },
        left: "5dp",
        color: "#000",
        text: "Password:",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.pwd = Ti.UI.createTextField({
        right: "5dp",
        height: "50dp",
        width: "60%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
        passwordMask: "true",
        font: {
            fontSize: "15dp"
        },
        id: "pwd",
        value: "mymagic"
    });
    $.__views.__alloyId11.add($.__views.pwd);
    $.__views.login = Ti.UI.createButton({
        title: "Login",
        id: "login"
    });
    $.__views.loginbox.add($.__views.login);
    doLogin ? $.__views.login.addEventListener("click", doLogin) : __defers["$.__views.login!click!doLogin"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    Cloud.debug = true;
    $.index.open();
    __defers["$.__views.login!click!doLogin"] && $.__views.login.addEventListener("click", doLogin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;