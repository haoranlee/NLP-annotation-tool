const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Article = new Schema({
    _id: {type: String},
    info: {
        article_id: {type: String},
        headline: {type: String},
        author: {type: String},
        pub_dte: {type: String},
        premium_or_free: {type: String},
        chapter_1: {type: String},
        chapter_2: {type: String},
        tags: {type: String},
        document_embedding_tsne_2d: [Number]
    },
    users: {
        in_progress: [String],
        completed: [String]
    },
    tokens: {type: Schema.Types.Mixed},
    iab_content_taxonomy_v2: {
        user_assigned: [String],
        predicted_top_10: [{
            p: {type: Number},
            className: {type: String}
        }],
    },
});

module.exports = Article;