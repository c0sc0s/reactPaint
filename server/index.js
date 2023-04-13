const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);


const aWss = WSServer.getWss()
const PORT = process.env.PORT || 8080;

app.ws('/', (ws, req) => {
  ws.on('message', (msg) => { 
    msg = JSON.parse(msg);
    switch (msg.type) { 
      case 'connection':
        connectionHandler(ws, msg);
        break;
      case 'draw':
        broadcastConnection(ws, msg);
        break; 
    }
  })
})

const connectionHandler = (ws, msg) => {
  ws.id = msg.id
  broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach(client => {
      if (client.id === msg.id) {
          client.send(JSON.stringify(msg))
      }
  })
}


app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));