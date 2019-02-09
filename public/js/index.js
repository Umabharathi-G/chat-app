var socket = io();

socket.on('connect', function() {    // listen to 'connect' event
	console.log('Connected to server');

	
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});
	

socket.on('newMessage', function(msg) {
	var time = moment(msg.createdAt).format('h:mm a');

	var temp = jQuery('#message-template').html();
	var html = Mustache.render(temp, {
		text: msg.text,
		from: msg.from,
		createdAt: time
	});

	jQuery('#msgs').append(html);

	//console.log('New message', msg);
	//var li = jQuery('<li></li>');
	//li.text(`${msg.from} ${time}: ${msg.text}`);
//
	//jQuery('#msgs').append(li);
});

socket.on('newLocMsg', function (msg) {
	var time = moment(msg.createdAt).format('h:mm a');
	var temp = jQuery('#location-message-template').html();
	var html = Mustache.render(temp, {
		from: msg.from,
		url: msg.url,
		createdAt: time
	});

	jQuery('#msgs').append(html);

	//var li = jQuery('<li></li>');
	//var a = jQuery('<a target="_blank">My current location</a>');
	//li.text(`${msg.from}: ${time}`);
	//a.attr('href', msg.url);
	//li.append(a);
	//jQuery('#msgs').append(li);
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
		alert('Unable to fetch location.');
		locBtn.removeAttr('disabled').text('Send location');
	});

});