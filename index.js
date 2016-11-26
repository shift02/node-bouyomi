/**
 * index.js
 */

var net = require('net');
var socket = new net.Socket();

module.exports = bouyomi;

function bouyomi(){
}

/**
 * Bouyomi Client class
 *
 * @param   {string} url - bouyomi url
 * @param   {number}   port  bouyomi port
 * @param   {Object}   opts  Bouyomi options
 */
bouyomi.Client = function(url, port, opts) {
  this.url = url;
  this.port = port;

  //this.

};

bouyomi.Client.prototype.send = function(message, opts){

socket.connect(this.port, this.url, function(){

    var command = Buffer.alloc(2);
    command.writeInt16LE(1, 0);//コマンド (0x0001:読み上げ)
    socket.write(command);

    var speed = Buffer.alloc(2);
    speed.writeInt16LE(-1, 0);//速度 (-1：デフォルト, 50～300)
    socket.write(speed);

    var pitch = Buffer.alloc(2);
    pitch.writeInt16LE(-1, 0);//音程 (-1：デフォルト, 50～200)
    socket.write(pitch);

    var volume = Buffer.alloc(2);
    volume.writeInt16LE(-1, 0);//音量(-1：デフォルト,  0～100)
    socket.write(volume);

    var voice = Buffer.alloc(2);
    voice.writeInt16LE(1, 0);//声質( 0：デフォルト,  1～8:AquesTalk, 10001～:SAPI5)
    socket.write(voice);

    var code = Buffer.alloc(2);
    code.writeInt8(0, 0);//文字列の文字コード(0:UTF-8, 1:Unicode, 2:Shift-JIS)
    socket.write(code);

    var _message = Buffer.from(message);//文字列データ
    var messageLength = Buffer.alloc(4);
    messageLength.writeInt32LE(_message.length, 0);//文字列の長さ
    socket.write(messageLength);
    socket.write(_message);

    socket.end();//送信
});

socket.on('close', function(){

});

}
