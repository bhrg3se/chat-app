const onlineUsers = require("../onlineUsers");
const initSocket = (server) => {
    const io = require("socket.io")(server);

    io.on("connection", (socket) => {
        socket.on("go-online", (id) => {
            //keep socket id of online users
            if (!onlineUsers[id]?.includes(socket.id)) {
                if (onlineUsers[id]) {
                    onlineUsers[id].push(socket.id)
                } else {
                    onlineUsers[id] = [socket.id]
                }
            }
            // send the user who just went online to everyone else who is already online
            socket.broadcast.emit("add-online-user", id);
        });

        socket.on("new-message", (data) => {

            //send message to all online sockets of recipient user
            if (onlineUsers[data.recipientId]) {
                onlineUsers[data.recipientId].forEach(socketId => {
                    socket.to(socketId).emit("new-message", {
                        message: data.message,
                        sender: data.sender,
                    });
                })
            }

        });

        socket.on("logout", (id) => {
            //remove socket id from map of online users
            if (onlineUsers[id].includes(socket.id)) {
                let userIndex = onlineUsers[id].indexOf(id);
                onlineUsers[id].splice(userIndex, 1);

                //if all sockets are closed, then only send "remove-offline-user" event
                if (!onlineUsers[id]) {
                    socket.broadcast.emit("remove-offline-user", id);
                }
            }
        });

    });

    return io
}

module.exports = {initSocket}
