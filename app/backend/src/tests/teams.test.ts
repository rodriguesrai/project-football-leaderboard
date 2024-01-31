import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import TeamsModel from '../models/TeamsModel';
import { teamsMock, teamIdMock } from './mocks/teams.mock';
chai.use(chaiHttp);

const { expect } = chai;

const app = new App().app;

describe('Rota /teams', () => {
  beforeEach(sinon.restore);

  describe('Metodo GET', () => { 
    it('testa retorno da rota com todos os times', async () => { 
      sinon.stub(TeamsModel.prototype, 'findAll').resolves(teamsMock);

      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(teamsMock);
     })
    //  it('testa retorno de /id com os times corretos', async () => { 
    //   sinon.stub(TeamsModel.prototype, 'findById').resolves(teamIdMock);

    //   const response = await chai.request(app).get('/teams/5');

    //   expect(response.status).to.be.eq(200);
    //   expect(response.body).to.be.deep.eq(teamIdMock);
    //   })
   })

});
