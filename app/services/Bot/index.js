import EventEmitter from 'events';

const socket = new WebSocket('ws://localhost:8888');
socket.binaryType = 'arraybuffer';

socket.onopen = event => console.log('WebSocket open:', event);

class Bot extends EventEmitter {
  constructor() {
    super();

    this.socket = socket;
    this.socket.onmessage = event => this.handleSocketMessage(event);
  }

  handleSocketMessage(event) {
    console.log(event);
    //let response = JSON.parse(event.data);
    //console.log(response.type);

    //this.emit(response.type, response.value);
  }

  update(properties) {
    const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer);

    view.setInt8(0, properties.speed);
    view.setInt8(1, properties.direction);

    this.socket.send(buffer);
  }
}

export default new Bot;