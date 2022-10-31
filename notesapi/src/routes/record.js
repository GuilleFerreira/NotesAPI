const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the records.
recordRoutes.route('/notes').get((_req, res) => {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('notes')
    .find({})
    .toArray((err, result) => {
      if (err) {
        res.status(400).send('Error fetching notes!');
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new record.
recordRoutes.route('/notes').post((req, res) => {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    id: req.body.id,
    title: req.body.title,
    cityid: req.body.cityid,
    description: req.body.description,
    date: req.body.date,
    temperature: req.body.temperature
  };

  dbConnect
    .collection('notes')
    .insertOne(matchDocument,(err, _result) => {
      if (err) {
        res.status(400).send('Error inserting note!');
      } else {
        //console.log(`Added a new note with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

// This section will help you update a record by id.
recordRoutes.route('/notes/updateNote').post((req, res) => {
  const dbConnect = dbo.getDb();
  const query = { id: req.body.id };
  const updates = {
    $set: {
      title: req.body.title,
      cityid: req.body.cityid,
      description: req.body.description,
      date: req.body.date,
      temperature: req.body.temperature
    }
  };

  dbConnect
    .collection('')
    .updateOne(query, updates, (err, _result) => {
      if (err) {
        res
          .status(400)
          .send(`Error updating note on notes with id ${query.id}!`);
      } else {
        console.log('1 document updated');
      }
    });
});

// This section will help you delete a record.
recordRoutes.route('/notes/delete/:id').delete((req, res) => {
  const dbConnect = dbo.getDb();
  const query = { id: req.body.id };

  dbConnect
    .collection('notes')
    .deleteOne(query, (err, _result) => {
      if (err) {
        res
          .status(400)
          .send(`Error deleting note with id ${query.id}!`);
      } else {
        console.log('1 note deleted');
      }
    });
});

module.exports = recordRoutes;