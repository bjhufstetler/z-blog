const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, type: '*/x-www-form-urlencoded'}));

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)
/*
app.use((req, res, next) => {
    res.header({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
    res.header({
        'Access-Control-Allow-Headers':
        'Origin, X-Requested-Wigh, Content-Type, Accept',
    });
    res.header({
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    });
    next();
});
*/
app.get('/', (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.status(200).send('App root route running');
})

app.get('/authors', (request, response) => {
    knex('app_authors')
        .select('*')
        .then(authorRecords => {
            let responseData = authorRecords.map(author => ({ firstName: author.first_name, lastName: author.last_name}));
            response.status(200).send(responseData)
        })

})

app.get('/api', (req, res) => {
    res.status(200).send('It works!')
})

app.get('/api/:table', (req, res) => {
    let base = knex(req.params.table)
    if(req.query.id) base = base.where('id', req.query.id)
    if(req.query.user_id) base = base.where('user_id', req.query.user_id)
    base
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)});
})

app.post('/api/:table', (req, res) => {
    knex(req.params.table)
        .insert(req.body)
        .then(() => {
            knex(req.params.table)
                .then(data => res.status(201).json(data))
        })
        .catch(err => {
            console.log(err);
            return res.json({
                success: false,
                message: 'An error occured, please contact your network administrator.',
                error: err
            });
        });
});

app.patch('/api/:table/:id', (req, res) => {
    console.log('req.body: ', req.body)
    knex(req.params.table)
    .where('id', req.params.id)
    .update(req.body)
    .then(() => {
        knex(req.params.table)
        .then(data => res.status(200).json(data));
    })
    .catch(err => {
        console.log(err);
        return res.json({
            success: false,
            message: 'An error occurred, please contact your network administrator.',
            error: err
        });
    });
});

app.delete('/api/:table/:id',(req, res) => {
    knex(req.params.table)
    .where('id', req.params.id)
    .del()
    .then(() => {
        knex(req.params.table)
        .then(data => res.status(200).json(data));
    })
    .catch(err => {
        console.log(err);
        return res.json({
            success: false,
            message: 'An error occurred, please contact your network administrator.',
            error: err
        });
    });
});

module.exports = app;

