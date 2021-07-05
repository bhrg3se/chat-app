const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../app');

chai.should();
chai.use(chaiHttp);

describe('test authentication', () => {
    it('it should return 401', (done) => {
        chai
            .request(app)
            .get('/api/users/shums')
            .send()
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
});
