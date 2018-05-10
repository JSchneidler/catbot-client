import EventEmitter from 'events';

const ws = new WebSocket('ws://localhost');

ws.onopen = event => console.log('WebSocket open:', event);

class API extends EventEmitter {
  constructor() {
    super();

    this.ws = ws;
    this.ws.onmessage = event => this.handleSocketMessage(event);
  }

  handleSocketMessage(event) {
    let response = JSON.parse(event.data);
    console.log(response.type);

    this.emit(response.type, response.value);
  }
}

export default new API;