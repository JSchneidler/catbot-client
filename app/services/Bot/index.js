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
    const buffer = new ArrayBuffer(3);
    const view = new DataView(buffer);

    view.setInt8(0, properties.speed);
    if (properties.direction) {
      view.setInt8(1, properties.direction[0]);
      view.setInt8(2, properties.direction[1]);
    }

    console.log(buffer);

    //this.socket.send(buffer);
  }
}