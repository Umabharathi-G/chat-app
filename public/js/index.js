var socket = io();

socket.on('connect', function() {    // listen to 'connect' event
	console.log('Connected to server');

	
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});
	

socket.on('newMessage', function(msg) {
	console.log('New message', msg);
	var li = jQuery('<li></li>');
	li.text(`${msg.from} : ${msg.text}`);

	jQuery('#msgs').append(li);
});

socket.on('newLocMsg', function (msg) {
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current location</a>');

	li.text(`${msg.from}: `);
	a.attr('href', msg.url);
	li.append(a);

	jQuery('#msgs').append(li);
});

jQuery('#msg-form').on('submit', function (e) {
	e.preventDefault();

	var msgTextBox = jQuery('[name=msg]');

	socket.emit('createMessage', {
		from: 'User',
		text: msgTextBox.val()
	}, function () {
		msgTextBox.val('');
	});
});

var locBtn = jQuery('#location');
locBtn.on('click', function () {
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser.');
	}

	locBtn.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function (position) {
		locBtn.removeAttr('disabled').text('Send location');
		socket.emit('createLocMsg', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});
	}, function () {
		alert('Unable to fetch location.').text('Send location');
		locBtn.removeAttr('disabled');
	});

});