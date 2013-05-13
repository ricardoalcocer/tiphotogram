var Cloud = require('ti.cloud');
Cloud.debug = true;

function doLogin(e){
	Cloud.Users.login({
        login: $.uid.value,
        password: $.pwd.value
    }, function (e) {
        if (e.success) {
            var user = e.users[0];
            Ti.App.Properties.setString('userguid',user.id);
            var win=Alloy.createController('feed').getView();
            win.open();
        }
        else {
            alert(e.message);
        }
    });
}

$.index.open();
