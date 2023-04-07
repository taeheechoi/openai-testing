- Added socket.onopen in React to send a message to websocket server
```
socket.onopen = () => {
      console.log('Connected to WebSocket server');
      socket.send('Hello, server!');
    };
```
- Used ws-client.py for testing