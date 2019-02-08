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

jQuery('#msg-form').on('submit', function (e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=msg]').val()
	}, function () {
		
	});
});