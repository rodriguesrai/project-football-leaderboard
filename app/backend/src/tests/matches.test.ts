import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import MatchesModel from '../models/MatchesModel';
import { 
matchesData,
matchesInProgressData,
matchesnotInProgressData,
matchCreatedDbResponse
} from './mocks/matches.mock';
import verifyGenerateToken from '../utils/verifyGenerateToken';


chai.use(chaiHttp);
const { expect } = chai;

const app = new App().app;

describe('Rota /matches', () => {
  beforeEach(sinon.restore);
  describe('Método GET', () => { 
    it('testa retorno da rota com todas as partidas', async () => { 
      sinon.stub(MatchesModel.prototype, 'findAll').resolves(matchesData);
      
      const response = await chai.request(app).get('/matches');
      
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(matchesData);
  })

  it('testa retorno da rota com todas as partidas em andamento', async () => { 
    sinon.stub(MatchesModel.prototype, 'getAllMatchesInProgressOrNot').resolves(matchesInProgressData);
    
    const response = await chai.request(app).get('/matches?inProgress=true');
    
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(matchesInProgressData);
  })

  it('testa retorno da rota com todas as partidas finalizadas', async () => { 
    sinon.stub(MatchesModel.prototype, 'getAllMatchesInProgressOrNot').resolves(matchesnotInProgressData);
    
    const response = await chai.request(app).get('/matches?inProgress=false');
    
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(matchesnotInProgressData);
  })
  })
  describe('Método PATCH', () => { 
    it('testa retorno da rota de finalização de partida', async () => { 
      sinon.stub(MatchesModel.prototype, 'finishMatch').resolves(0);
      const testToken = await verifyGenerateToken.sign({ id: 1, email: 'admin@admin.com', role: 'admin' });
      
      const response = await chai.request(app).patch('/matches/41/finish').set('Authorization', `Bearer ${testToken}`);
      
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq({ message: 'Finished' });
    })
    it('testa rota de atualizar partidas em andamento', async () => { 
      sinon.stub(MatchesModel.prototype, 'finishMatch').resolves(0);
      const testToken = await verifyGenerateToken.sign({ id: 1, email: 'admin@admin.com', role: 'admin' });
      
      const response = await chai
      .request(app)
      .patch('/matches/41')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ homeTeamGoals: 1, awayTeamGoals: 1 });
      
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq({ message: 'Updated' });
    })
   })
  describe('Método POST', () => { 
    it('testa o retorno da rota ao cadastrar uma nova partida em andamento', async () => { 
      sinon.stub(MatchesModel.prototype, 'createMatch').resolves(matchCreatedDbResponse);
      const testToken = await verifyGenerateToken.sign({ id: 1, email: 'admin@admin.com', role: 'admin' });

      const response = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ homeTeamId: 16, awayTeamId: 8, homeTeamGoals: 2, awayTeamGoals: 2 });

      expect(response.status).to.be.eq(201);
      expect(response.body).to.be.deep.eq(matchCreatedDbResponse);
    })
    it('testa o retorno da rota ao cadastrar uma nova partida em andamento com times iguais', async () => { 

      const testToken = await verifyGenerateToken.sign({ id: 1, email: 'admin@admin.com', role: 'admin' });

      const response = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ homeTeamId: 16, awayTeamId: 16, homeTeamGoals: 2, awayTeamGoals: 2 });

      expect(response.status).to.be.eq(422);
      expect(response.body).to.be.deep.eq({ message: 'It is not possible to create a match with two equal teams' });
    })
    it('testa o retorno da rota ao cadastrar uma nova partida em andamento com times inexistentes', async () => { 

      const testToken = await verifyGenerateToken.sign({ id: 1, email: 'admin@admin.com', role: 'admin' });

      const response = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ homeTeamId: 999, awayTeamId: 998, homeTeamGoals: 2, awayTeamGoals: 2 });

      expect(response.status).to.be.eq(404);
      expect(response.body).to.be.deep.eq({ message: 'There is no team with such id!' });
    })
   })
});
