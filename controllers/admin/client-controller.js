'use strict'

const ClientService = require('../../services/client-service');
const clientService = new ClientService();

class ClientController {

  async index(req, res, next) {
    const clients = await clientService.getClients();
    res.render('admin/client/index', { clients: clients });
  }

  async view(req, res, next) {
    const clientObjectId = req.params.clientObjectId;
    const client = await clientService.getClient(clientObjectId);
    res.json(client);
  }

  async create(req, res, next) {
    const data = {
      clientName: req.body.client_name,
      redirectUris: req.body.redirect_uris.split(','),
      grants: req.body.grants.split(','),
    }
    await clientService.create(data);
    res.redirect('/admin/client');
  }

  async update(req, res, next) {
    const client = {
      name: req.body.client_name,
      redirectUris: req.body.redirect_uris.split(','),
      grants: req.body.grants.split(','),
      clientId: req.body.client_id,
      clientSecret: req.body.client_secret,
    }
    const result = await clientService.update(req.params.clientObjectId, client);
    res.redirect('/admin/client');
  }
  
  async delete(req, res, next) {
    clientService.delete(req.params.clientObjectId);
    res.send(200);
  }

}

module.exports = ClientController;
