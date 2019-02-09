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

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=msg]').val()
	}, function () {
		
	});
});

var locBtn = jQuery('#location');
locBtn.on('click', function () {
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser.');
	}

	navigator.geolocation.getCurrentPosition(function (position) {
		socket.emit('createLocMsg', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});
	}, function () {
		alert('Unable to fetch location.');
	});
});