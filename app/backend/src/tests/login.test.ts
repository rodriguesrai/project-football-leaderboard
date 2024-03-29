import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import UserModel from '../models/UsersModel';
import { 
   loginData,
   ResponseInvalidFields,
   userValidBody,
   emailInvalidBody ,
   passwordInvalidBody,
   emailNotInDatabaseBody,
   passwordNotInDatabaseBody
} from './mocks/login.mock';
import verifyGenerateToken from '../utils/verifyGenerateToken';

chai.use(chaiHttp);
const { expect } = chai;

const app = new App().app;

describe('Rota /login', () => {
  beforeEach(sinon.restore);

  describe('Método POST', () => { 
    it('ao receber login com usuário e senha válidos, retorna um token', async () => { 

      sinon.stub(UserModel.prototype, 'findByEmail' ).resolves(loginData)

      const response = await chai.request(app).post('/login').send(userValidBody)

      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token');
    });
    it('ao receber um dos campos faltando, retorna um erro', async () => { 
      const response = await chai.request(app).post('/login');
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal(ResponseInvalidFields);
    })
    it('ao receber um email inválido, retorna um erro', async () => { 
      const response = await chai.request(app).post('/login').send(emailInvalidBody);

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.deep.equal('Invalid email or password');
     })
    it('ao receber um email válido e password inválido, retorna um erro', async () => { 

      sinon.stub(UserModel.prototype, 'findByEmail' ).resolves(loginData)

      const response = await chai.request(app).post('/login').send(passwordInvalidBody)

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.deep.equal('Invalid email or password');
    });
    it('ao receber um email inexistente e password válido, retorna um erro', async () => { 

      sinon.stub(UserModel.prototype, 'findByEmail' ).resolves(null)

      const response = (await chai.request(app).post('/login').send(emailNotInDatabaseBody))

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.deep.equal('Invalid email or password');
    });
    it('ao receber um email existente e password inexistente, retorna um erro', async () => { 

      sinon.stub(UserModel.prototype, 'findByEmail' ).resolves(loginData)

      const response = (await chai.request(app).post('/login').send(passwordNotInDatabaseBody))

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.deep.equal('Invalid email or password');
    });
  describe('Método GET', () => { 
    it('testa retorno do enpoint /login/role', async () => { 

      sinon.stub(UserModel.prototype, 'findById' ).resolves(loginData)

      const testToken = await verifyGenerateToken.sign({ id: 1, email: 'admin@admin.com', role: 'admin' });
      const response = await chai.request(app)
        .get('/login/role')
        .set('Authorization', `Bearer ${testToken}`)
        .send(userValidBody);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('role');

     })
     it('testa retorno do enpoint /login/role com id inválido', async () => { 

      sinon.stub(UserModel.prototype, 'findById' ).resolves(null)

      const testToken = await verifyGenerateToken.sign({ id: 1, email: 'admin@admin.com', role: 'admin' });
      const response = await chai.request(app)
        .get('/login/role')
        .set('Authorization', `Bearer ${testToken}`)
        .send(userValidBody);

      expect(response.status).to.be.equal(404);
      expect(response.body).to.have.property('message');

     })
    })
  });
});
