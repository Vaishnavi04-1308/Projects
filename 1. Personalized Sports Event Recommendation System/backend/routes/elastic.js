const { Client } = require("@elastic/elasticsearch");
const { all } = require("./geocode");
const elastic = new Client({
  node: "https://my-elasticsearch-project-e7a4d6.es.us-east-1.aws.elastic.cloud:443",
  auth: {
    apiKey: "TklBVjdKUUJ4TmoxOHdNTDBjRjc6V09VQTlRNm1USGlyV0M1YzNRc0VLZw==",
  },
});
elastic
  .info()
  .then((data) => {
    console.log(data);
  })



// Sample data books

module.exports = elastic;
