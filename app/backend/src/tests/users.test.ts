import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import UsersModel from '../models/UsersModel';

chai.use(chaiHttp);
import { IUser } from '../Interfaces/Users/IUsers';
import UserModel from '../models/UsersModel';
const { expect } = chai;

const app = new App().app;

describe('Rota /login', () => {
  beforeEach(sinon.restore);

  describe('Método PUT', () => { 
    // it('testa login com usuário válido', async () => { 
    // //arrange
    // sinon.stub(UserModel.prototype, 'findAll' ).resolves()

    // //act
    // const response = await chai.request(app).get('/users');
    // //assert
    // expect(response.status).to.be.equal(200);
    // expect(response.body).to.be.deep.equal([]);
    //  })
  })

});
