import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import UserModel from '../models/UsersModel';
import { loginData, ResponseInvalidFields, userValidBody } from './mocks/login.mock';

chai.use(chaiHttp);
const { expect } = chai;

const app = new App().app;

describe('Rota /login', () => {
  beforeEach(sinon.restore);

  describe('Método POST', () => { 
    it('ao receber login com usuário e senha válidos, retorna um token', async () => { 
    //arrange
      sinon.stub(UserModel.prototype, 'findByEmail' ).resolves(loginData)
    //act
      const response = await chai.request(app).post('/login').send(userValidBody)
    //assert
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
    });
    it('ao receber um dos campos inválidos, retorna um erro', async () => { 
      //arrange
      sinon.stub(UserModel.prototype, 'findByEmail' ).resolves(null)
      //act
      const response = await chai.request(app).post('/login');
      //assert
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal(ResponseInvalidFields);
     })
  });
});
