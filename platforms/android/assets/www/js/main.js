var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var a = []; 
document.addEventListener("deviceready", onDeviceReady, false);

$(document).ready(function(){
	$('.progress-button').each(function(i, el){
		a.push( new UIProgressButton( el, {
			callback : function( instance ) {
				var progress = 0,
					interval = setInterval( function() {
						progress = Math.min( progress + Math.random() * 0.1, 1 );
						instance.setProgress( progress );

						if( progress === 1 ) {
							instance.stop( pos === 1 || pos === 3 ? -1 : 1 );
							clearInterval( interval );
						}
					}, 150 );
			}
		} ) );
	});
});
 
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

function clearCache() {
    navigator.camera.cleanup();
}
 
function onSuccess(imageData) {
    var image = document.getElementById('photo');
    image.src = "data:image/jpeg;base64," + imageData;
}
 
function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: navigator.camera.DestinationType.DATA_URL,
        sourceType: source });
}

function page_default()
{
var html = '<p> \
		Take a photo from your camera<br/> \
		<img id="photo" onclick="capturePhoto()" src="img/camera.png"/> \
		</p> \
		<p> \
		or from your galley<br/> \
		<img id="photo" onclick="getPhoto(pictureSource.SAVEDPHOTOALBUM);" src="img/gallery.png"/> \
		<br/> \
		</p>';

	$('#w').data('page', 'default').html( html );
}

function onPhotoURISuccess(imageURI) {
    	var data = "data:image/jpeg;base64," + imageURI;
    	var html = '<p><h3>WoW! Che bella foto!</h3></p>';
    	    html += '<p><img style="width:200px;" src="'+data+'" /></p>';
    	    html += '	<div class="progress-button elastic"> \
				<button><span>Submit</span></button> \
				<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg> \
				<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg> \
				<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg> \
			</div><!-- /progress-button --> ';


	$('#w').html( html );
	[].slice.call( document.querySelectorAll( '.progress-button' ) ).forEach( function( bttn, pos ) {
				new UIProgressButton( bttn, {
					callback : function( instance ) {
						var progress = 0,
							interval = setInterval( function() {
								progress = Math.min( progress + Math.random() * 0.1, 1 );
								instance.setProgress( progress );

								if( progress === 1 ) {
									instance.stop( pos === 1 || pos === 3 ? -1 : 1 );
									clearInterval( interval );
									alert(1);
									bttn.remove();
								}
							}, 150 );
					}
				} );
			} );

}

function photoPage(data)
{
}

function capturePhoto() {
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 10,
	destinationType: Camera.DestinationType.DATA_URL
    });
}
 
function onFail(message) {
    alert('Failed because: ' + message);
}
