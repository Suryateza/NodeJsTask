const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const sequelize = require('../db');

require('dotenv').config({ path: '.env.test' });

chai.use(chaiHttp);
const expect = chai.expect;


before(async () => {
    // Run migrations before running tests
    await sequelize.sync({ force: false });
});

describe('Admin API', () => {
    it('should create a user (admin)', async () => {
        const res = await chai
            .request(app)
            .post('/admin/createUser')
            .send({ username: 'testadmin', password: 'testpassword' });

        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').to.equal('User created successfully');
        expect(res.body).to.have.property('user');
    });

    it('should edit a user (admin)', async () => {
        const createUserRes = await chai
            .request(app)
            .post('/admin/createUser')
            .send({ username: 'testuser', password: 'testpassword' });

        const userId = createUserRes.body.user.id;

        const res = await chai
            .request(app)
            .put(`/admin/editUser/${userId}`)
            .send({ username: 'editeduser', isAdmin: true });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equal('User edited successfully');
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.have.property('username').to.equal('editeduser');
    });
});
