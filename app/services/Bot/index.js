import EventEmitter from 'events';

const socket = new WebSocket(`ws://${location.host}`);
socket.binaryType = 'arraybuffer';

socket.onerror = event => console.error('WebSocket error:', event);

export default new class Bot extends EventEmitter {
  constructor() {
    super();

    socket.onopen = event => { console.log(socket.readyState); this.emit('status', socket.readyState); };
    socket.onerror = event => this.emit('status', socket.readyState);
    socket.onclose = event => this.emit('status', socket.readyState);
    socket.onmessage = event => this.handleSocketMessage(event);
  }

  isConnecting() {
    return socket.readyState === 0;
  }

  isConnected() {
    return socket.readyState === 1;
  }

  // Can we just call new Bot().on()?
  handleSocketMessage(event) {
    console.log(event);
    //let response = JSON.parse(event.data);
    //console.log(response.type);

    //this.emit(response.type, response.value);
  }

  update(properties) {
    if (!this.isConnected()) return false;

    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);

    view.setUint16(0, properties.speed);
    view.setInt16(2, properties.direction);

    socket.send(buffer);
    return true;
  }
}