'use strict';
var productionDbURL = 'mongodb://proappuser:propassword1@ds143953.mlab.com:43953/procrastinate-app'

exports.DATABASE_URL =  process.env.DATABASE_URL || productionDbURL
// || 'mongodb://localhost/procrastinate-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL 
// || 'mongodb://localhost/procrastinate-app';
exports.PORT = process.env.PORT || 8080;