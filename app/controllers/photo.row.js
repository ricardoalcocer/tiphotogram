var args=arguments[0] || {};

$.photo.image=args.image;	

// it could have been a URL or a binary object
if(typeof args.image === "object"){
	var t = Ti.UI.create2DMatrix(); 
    t = t.rotate(90);
    $.photo.transform=t;
    // the temp photo is flipped on its side be default.
    // I'm rotating it 90 deg clockwise.
    // This still needs work
}

$.owner.text="By " + args.owner;
$.date.text=args.date;