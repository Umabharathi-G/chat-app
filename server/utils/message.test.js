var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('Should generate to correct message object', () => {
		var from = 'Uma';
		var text = 'Stefanos';
		var message = generateMessage(from ,text);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, text});
	});
});