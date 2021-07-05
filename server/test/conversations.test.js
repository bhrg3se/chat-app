const {expect} = require('chai');
const {mockConvos} = require('./mockData');
const {addExtraFields} = require('../routes/api/conversations');

describe('addExtraFields', () => {
    it('should add correct lastMessage value', (done) => {
        const onlineUsers = {};
        const resultConvos = addExtraFields(mockConvos, onlineUsers);
        expect(resultConvos[0].latestMessageText).to.eql('Share photo of your city, please');
        done();
    });

    it('should add correct unread messages value', (done) => {
        const onlineUsers = {};
        const resultConvos = addExtraFields(mockConvos, onlineUsers);
        expect(resultConvos[0].unreadMsgs).to.eql(2);
        done();
    });
});
