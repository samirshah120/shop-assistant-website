var elasticsearch=require('elasticsearch');
var client = new elasticsearch.Client( {  
    hosts:['http://localhost:9200'],
    log:'trace'
  });
  module.exports = {
  ping: function(res){
    client.ping({
          requestTimeout: 30000,
    }, function (error) {
        if (error) {
            console.log('Elasticsearch cluster is down!');
            res.status(500)
            return res.json({status: false, msg: 'Elasticsearch cluster is down!'})
        } else {
            console.log('Success! Elasticsearch cluster is up!');
        }
    });
},
deleteAll: async function(){
    await client.indices.delete({
        index: '_all',
      }).then(function(resp) {
        console.log("Successful query!");
        console.log(JSON.stringify(resp, null, 4));
      }, function(err) {
        console.trace(err.message);
      });
},
initIndex: function(indexName){

    elasticClient.indices.create({
        index: indexName
    }).then(function (resp) {
        console.log(resp);

    }, function (err) {
         console.log(err.message);
    });
},

// 2. Check if index exists
indexExists: function(indexName){
    elasticClient.indices.exists({
        index: indexName
    }).then(function (resp) {
        console.log(resp);
    }, function (err) {
        console.log(err.message);
    });
},
async addProducts(products, index){

var bulk = [];
products.map((product) =>{
   bulk.push({index:{
                 _index:index
             }
         })
  bulk.push( product )
})

//perform bulk indexing of the data passed
await client.bulk({body:bulk}, function( err, response  ){
         if( err ){
             console.log("Failed Bulk operation".red, err)
         } else {
             console.log("Successfully imported %s".green, products.length);
         }
});
},
async searchClothes(body, res, index){
    await client.search({index:index,  body:body
})
    .then(results => {
        const list = results.hits.hits;
        var p = new Set();
        list.map((pr) => {
           p.add(pr)
        });
        for (const item of p) {
            console.log(item);
        }
        res.json(results.hits.hits);
    })
    .catch(err=>{
      console.log(err)
      throw err;
    });
}
 }