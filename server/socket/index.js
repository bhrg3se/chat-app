const onlineUsers = require("../onlineUsers");
const {socketCookieParser, socketUserContext} = require("../middlewares");

let io;
const initSocket = (server) => {
    io = require("socket.io")(server);
    io.use(socketCookieParser);
    io.use(socketUserContext);

    io.on("connection", (socket) => {
        //If not authenticated, close socket
        if (!socket.user) {
            socket.disconnect();
            return;
        }
        socket.on("go-online", () => {
            const id = socket.user.id
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

        const handleDisconnect = () => {
            const id = socket.user.id
            //remove socket id from map of online users
            if (onlineUsers[id]?.includes(socket.id)) {
                let userIndex = onlineUsers[id].indexOf(id);
                onlineUsers[id].splice(userIndex, 1);

                //if all sockets are closed, then only send "remove-offline-user" event
                if (!onlineUsers[id]) {
                    socket.broadcast.emit("remove-offline-user", id);
                }
            }
        }

        socket.on("logout", handleDisconnect);
        socket.on("disconnect", handleDisconnect);

    });

}
const getSocket = () => io

module.exports = {initSocket, getSocket}
