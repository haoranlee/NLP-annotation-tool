const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors({origin: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
const articleRoutes = express.Router();
const PORT = 4000;

const mongooseOptions = {
    useNewUrlParser: true,
    user: "REDACTED",
    pass: "REDACTED",
    useUnifiedTopology: true
};
const mongooseConnectionString = 'REDACTED';
mongoose.connect(mongooseConnectionString, mongooseOptions);
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

const articleSchema = require('./article.model');
const article = mongoose.model('article', articleSchema, 'articles'); // switch collection between articles_dev and articles depending on pushing to dev or prod

app.get('/article/info/:id', (req, res) => {
    let id = req.params.id;
    article.findById(id, function(err, data) {
        if (err) {
            console.log(err);
        } else if ((!data) || (data.length <= 0)) {
            console.log('No records returned');
        } else {
            res.json(data.info);
        }
    });
});

app.get('/article/content_taxonomy/:id/predictions', (req, res) => {
    let id = req.params.id;
    article.findById(id, function(err, data) {
        if (err) {
            console.log(err);
        } else if ((!data) || (data.length <= 0)) {
            console.log('No records returned');
        } else {
            res.json(data.iab_content_taxonomy_v2.predicted_top_10);
        }
    });
});

app.post('/article/content_taxonomy/:id/user_assignment', (req, res) => {
    let id = req.params.id;
    article.updateOne({'_id': id}, {$push: {'iab_content_taxonomy_v2.user_assigned': req.body.content_taxonomy}}, function(err, data) {
        if (err) {
            console.log(err);
            return res.status(400).send(`Unable to assign content taxonomy to article. Error: ${err}`);
        } else {
            return res.status(200).send('Successfully assigned content taxonomy to article.');
        }
    });
});

app.get('/article/tokens/:id', (req, res) => {
    let id = req.params.id;
    article.findById(id, function(err, data) {
        if (err) {
            console.log(err);
        } else if ((!data) || (data.length <= 0)) {
            console.log('No records returned');
        } else {
            res.json(data.tokens);
        }
    });
});

app.post('/article/tokens/:id/tagging_set', (req, res) => {
    let id = req.params.id;
    let paraidx = req.body.paraidx;
    let tokenidxarr = req.body.tokenidxarr;
    let tag = req.body.tag; // 'ner_tag' or 'sentiment' or 'formatting_issue' or 'coref_tag'
    let val = req.body.val;
    var setdict = {}
    tokenidxarr.forEach((tokenidx, index) => setdict['tokens.' + paraidx.toString() + '.' + tokenidx.toString() + '.' + tag] = val);
    article.updateOne({'_id': id}, {'$set': setdict}, function(err, data) {
        if (err) {
            console.log(err);
            return res.status(400).send(`Unable to tag tokens. Error: ${err}`);
        } else {
            return res.status(200).send('Successfully tagged tokens.');
        }
    });
});

app.post('/article/tokens/:id/tagging_pull', (req, res) => {
    let id = req.params.id;
    let paraidx = req.body.paraidx;
    let tokenidxarr = req.body.tokenidxarr;
    let tag = req.body.tag; // 'ner_tag' or 'sentiment' or 'formatting_issue' or 'coref_tag'
    let val = req.body.val;
    var setdict = {}
    tokenidxarr.forEach((tokenidx, index) => setdict['tokens.' + paraidx.toString() + '.' + tokenidx.toString() + '.' + tag] = val);
    article.updateOne({'_id': id}, {'$pull': setdict}, function(err, data) {
        if (err) {
            console.log(err);
            return res.status(400).send(`Unable to pull token tags. Error: ${err}`);
        } else {
            return res.status(200).send('Successfully pulled token tags.');
        }
    });
});

app.post('/article/tokens/:id/tagging_push', (req, res) => {
    let id = req.params.id;
    let paraidx = req.body.paraidx;
    let tokenidxarr = req.body.tokenidxarr;
    let tag = req.body.tag; // 'ner_tag' or 'sentiment' or 'formatting_issue' or 'coref_tag'
    let val = req.body.val;
    var setdict = {}
    tokenidxarr.forEach((tokenidx, index) => setdict['tokens.' + paraidx.toString() + '.' + tokenidx.toString() + '.' + tag] = val);
    article.updateOne({'_id': id}, {'$push': setdict}, function(err, data) {
        if (err) {
            console.log(err);
            return res.status(400).send(`Unable to push token tags. Error: ${err}`);
        } else {
            return res.status(200).send('Successfully push token tags.');
        }
    });
});

app.get('/user/current_article/:user/count', (req, res) => {
    let user = req.params.user;
    article.countDocuments({'users.in_progress': {$eq: user}}, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

app.get('/user/completed_articles/:user/count', (req, res) => {
    let user = req.params.user;
    article.countDocuments({'users.completed': {$eq: user}}, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

app.get('/user/current_article/:user', (req, res) => {
    let user = req.params.user;
    article.findOne({'users.in_progress': {$eq: user}}, function(err, data) {
        if (err) {
            console.log(err);
        } else if ((!data) || (data.length <= 0)) {
            console.log('No records returned');
        } else {
            res.json(data._id);
        }
    });
});

app.get('/user/assign_article/:user', (req, res) => {
    let user = req.params.user;
    article.aggregate([{$facet: {'all_untouched_articles': [{"$match": {'users.completed': {$size:0}, 'users.in_progress': {$size: 0}}}, {$sample: {size: 1}}, {"$project": {'_id': 1}}], 'all_incomplete_articles': [{"$match": {'users.completed': {$size: 0}}}, {$sample: {size: 1}}, {"$project": {'_id': 1}}], 'articles_uncompleted_by_user': [{"$match": {'users.completed': {$ne: user}}}, {$sample: {size: 1}}, {"$project": {'_id': 1}}], 'random_articles': [{$sample: {size: 1}}, {"$project": {'_id': 1}}]}}, {"$project": {'article_select': {$switch: {branches: [{case: {$eq: [{$size: "$all_untouched_articles"}, 1]}, then: '$all_untouched_articles._id'}, {case: {$eq: [{$size: "$all_incomplete_articles"}, 1]}, then: '$all_incomplete_articles._id'}, {case: {$eq: [{$size: "$articles_uncompleted_by_user"}, 1]}, then: '$articles_uncompleted_by_user._id'}], default: '$random_articles._id'}}}}, {"$project": {'article_select': {$arrayElemAt: ["$article_select", 0]}}}], function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data[0].article_select);
        }
    });
});

app.post('/user/begin_article/:user', (req, res) => {
    let user = req.params.user;
    article.updateOne({'_id': req.body.article_id}, {$push: {'users.in_progress': user}}, function(err, data) {
        if (err) {
            console.log(err);
            return res.status(400).send(`Unable to assign user as working on article. Error: ${err}`);
        } else {
            return res.status(200).send('Successfully assigned user as working on article.');
        }
    });
});

app.post('/user/finish_article/:user', (req, res) => {
    let user = req.params.user;
    article.updateOne({'_id': req.body.article_id}, {$pull: {'users.in_progress': user}, $push: {'users.completed': user}}, function(err, data) {
        if (err) {
            console.log(err);
            return res.status(400).send(`Unable to move user from in-progress pile to completed pile. Error: ${err}`);
        } else {
            return res.status(200).send('Successfully moved user from in-progress pile to completed pile.');
        }
    });
});

app.get('*', (req, res) => {
    res.status(404).send(
        'This route does not exist.'
    );
});

module.exports = {
    app
};