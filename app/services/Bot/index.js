import EventEmitter from 'events';

const socket = new WebSocket('ws://localhost:8888');
socket.binaryType = 'arraybuffer';

socket.onopen = event => console.log('WebSocket open:', event);

export default new class Bot extends EventEmitter {
  constructor() {
    super();

    this.socket = socket;
    this.socket.onmessage = event => this.handleSocketMessage(event);
  }

  // Can we just call new Bot().on()?
  handleSocketMessage(event) {
    console.log(event);
    //let response = JSON.parse(event.data);
    //console.log(response.type);

    //this.emit(response.type, response.value);
  }

  update(properties) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);

    view.setUint16(0, properties.speed);
    view.setInt16(2, properties.direction);

    this.socket.send(buffer);
  }
}