// onlineUsers is a map of user id to array of online socket ids
// So if a user opens two sessions in different browsers message can be sent to both clients.
const onlineUsers = {};
module.exports = onlineUsers;
