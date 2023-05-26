const SendStocket = (room, data) => {
  const server = require("./index");
  server.io.emit(room, data);
};

module.exports = {
  SendStocket,
};
