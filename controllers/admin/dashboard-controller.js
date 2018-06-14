'use strict'

const DashboardService = require('../../services/dashboard-service');
const dashboardService = new DashboardService();

class DashboardController {
  async index(req, res, next) {
    const data = {
      user: await dashboardService.countUsers(),
      client: await dashboardService.countClients(),
    }
    console.log('data', data);
    return res.render('admin/index', { data: data });
  }
}

module.exports = DashboardController;
