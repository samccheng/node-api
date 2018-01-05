const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if(err) {
    return console.log("unable to connect")
  }

  const col = client.db('todoApp')

  col.collection('Todos').insertOne({
    text: 'sleep',
    completed: false
  }, (err, result) => {
    if(err) {
      return console.log('unable to insert', err)
    }

    console.log(JSON.stringify(result, undefined, 2))
  })

  col.collection('Todos').find({}).toArray().then((docs) => {
    console.log(docs)
  }, err => {
    console.log(err)
  })

  console.log('connected to MongoDb')

  client.close()
})
