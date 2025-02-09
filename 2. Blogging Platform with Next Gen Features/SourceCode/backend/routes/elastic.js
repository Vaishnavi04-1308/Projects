const { Client } = require('@elastic/elasticsearch')
const elastic = new Client({
    node: 'https://localhost:9200',
    auth: {
      username: 'elastic',
      password: 'fkI_CQ7VSMP6hAj*Mqm1'
    },
    tls: {
      // might be required if it's a self-signed certificate
      rejectUnauthorized: false
    }
  })


  
  module.exports = elastic;