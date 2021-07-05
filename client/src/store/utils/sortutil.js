const conversationCompareFunc = (c1, c2) => {

    const c1LastMessage = c1.messages[c1.messages.length - 1],
        c2LastMessage = c2.messages[c2.messages.length - 1],

        c1LastMessageDate = new Date(c1LastMessage?.createdAt),
        c2LastMessageDate = new Date(c2LastMessage?.createdAt);
    return c2LastMessageDate - c1LastMessageDate;

};

module.exports = {conversationCompareFunc};
