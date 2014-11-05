'use strict';

// initial setup
var connected = false; // binary
var username = 'anonymous';
var socket = io();
socket.io.reconnectionAttempts(10);
setStatus(false, 'Connecting', 'label-warning');

// listeners
$('#chatBox').keyup(function(eventObject) {
	if (eventObject.keyCode === 13) sendMsg();
});

$('#sendButton').click(function() {
	sendMsg();
});

socket.on('message', function(message) {
	addMsg(message);
});

socket.on('connect', function() {
	setStatus(true, 'Connected', 'label-success');
});

socket.on('error', function(error) {
	setStatus(false, 'Error', 'label-warning');
	console.log(error);
});

socket.on('disconnect', function() {
	setStatus(false, 'Disconnected', 'label-danger');
});

socket.on('reconnect', function() {
	setStatus(true, 'Reconnected', 'label-success');
});

socket.on('reconnecting', function(number) {
	setStatus(false, 'Reconnecting: ' + number, 'label-warning');
});

socket.on('reconnect_error', function(error) {
	setStatus(false, 'Reconnect Error', 'label-warning');
	console.log(error);
});

socket.on('reconnect_failed', function() {
	setStatus(false, 'Reconnection Failed', 'label-danger');
});

// custom funcs
// setStatus(new value for connected var [t/f], description to show to user, bootstrap label type)
// updates the label #statusLabel in the UI to reflect the current status, and updates var connected behind the scenes
function setStatus(newConnected, description, labelType) {
	connected = newConnected
	$('#statusLabel').text(description);
	$('#statusLabel').removeClass();
	$('#statusLabel').addClass('label ' + labelType);
}

// sendMsg() 
// checks to see if the box is empty and if we're connected. sends if both are true
// note: checking to see if a message is empty should probably be server-side
function sendMsg() {
	var content = $('#chatBox').val();
	if (connected && content) {
		socket.emit('message', {
			username: username,
			content: content
		});
		$('#chatBox').val('');
		return true;
	}
	return false;
}

// addMsg(message object)
// updates #chat in the UI with a new message
function addMsg(message) {
	var new_message = $('<div class="message">');
	new_message.append('<span class="username">' + message.username + '</span>');
	new_message.append('<span class="content">' + message.content + '</span>');
	$('#chat').append(new_message);
	$('#chat').scrollTop($('#chat')[0].scrollHeight);
	return true;
}
