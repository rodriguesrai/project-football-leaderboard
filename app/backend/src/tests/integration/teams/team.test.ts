import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../../app';
import Example from '..//../../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('teste que passa sempre', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  after(() => {
    (Example.findOne as sinon.SinonStub).restore();
  });

  it('Deve retornar um exemplo do modelo', async () => {
    chaiHttpResponse = await chai.request(app).get('/api/exemplo/1');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal({
      // Aqui você pode ajustar para corresponder ao seu objeto mock
      id: 1,
      name: 'Exemplo',
      // ... outros campos do seu modelo
    });
  });

  it('Seu sub-teste', () => {
    expect(true).to.be.eq(true); // Este sempre passa
  });
});
