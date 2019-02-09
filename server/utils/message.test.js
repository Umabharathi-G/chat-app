var expect = require('expect');

var {generateMessage, generateLocMsg} = require('./message');

describe('generateMessage', () => {
	it('Should generate to correct message object', () => {
		var from = 'Uma';
		var text = 'Stefanos';
		var message = generateMessage(from ,text);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, text});
	});
});

describe('generateLocMsg', () => {
	it('Should generate correct location object', () =>{
		var from = 'Uma';
		var lat = 19;
		var lng = 56;
		var url = 'https://www.google.com/maps?q=19,56';
		var msg = generateLocMsg(from, lat, lng);

		expect(typeof msg.createdAt).toBe('number');
		expect(msg).toMatchObject({from, url});
	});
});