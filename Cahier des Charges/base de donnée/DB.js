db = client.db("CyberVeilleProject");

db.createCollection("users", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "users",
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "user_id": {
                    "bsonType": "objectId",
                    "title": "_id"
                },
                "user_email": {
                    "bsonType": "string",
                    "title": "email",
                    "minLength": 5
                },
                "user_password": {
                    "bsonType": "string",
                    "title": "password"
                },
                "user_role": {
                    "bsonType": "string",
                    "title": "role",
                    "enum": [
                        "admin",
                        "user"
                    ]
                },
                "user_preferences": {
                    "bsonType": "object",
                    "title": "preferences",
                    "properties": {
                        "user_preferences_notifications": {
                            "bsonType": "object",
                            "title": "notifications",
                            "properties": {
                                "email": {
                                    "bsonType": "bool"
                                },
                                "webhook": {
                                    "bsonType": "string"
                                },
                                "apiKey": {
                                    "bsonType": "string"
                                }
                            },
                            "additionalProperties": false
                        },
                        "user_preferences_categories": {
                            "bsonType": "array",
                            "title": "categories",
                            "additionalItems": true,
                            "items": {
                                "bsonType": "string"
                            }
                        }
                    },
                    "additionalProperties": false
                },
                "createdAt": {
                    "bsonType": "date"
                },
                "updatedAt": {
                    "bsonType": "date"
                }
            },
            "additionalProperties": false,
            "required": [
                "user_id",
                "user_email",
                "user_password",
                "user_role",
                "user_preferences",
                "createdAt"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});

db.collection("users").createIndex({
    "user_email": 1
},
{
    "name": "email",
    "unique": true
});

db.collection("users").createIndex({
    "user_role": 1
},
{
    "name": "role"
});




db.createCollection("articles", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "articles",
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "title": {
                    "bsonType": "string"
                },
                "source": {
                    "bsonType": "string"
                },
                "content": {
                    "bsonType": "string"
                },
                "category": {
                    "bsonType": "array",
                    "additionalItems": true,
                    "items": {
                        "bsonType": "string"
                    }
                },
                "tags": {
                    "bsonType": "array",
                    "additionalItems": true,
                    "items": {
                        "bsonType": "string"
                    }
                },
                "publishedAt": {
                    "bsonType": "date"
                },
                "createdAt": {
                    "bsonType": "date"
                },
                "moderate": {
                    "bsonType": "bool"
                }
            },
            "additionalProperties": false,
            "required": [
                "title",
                "source"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});

db.collection("articles").createIndex({
    "category": 1
},
{
    "name": "category"
});

db.collection("articles").createIndex({
    "category": 1,
    "publishedAt": 1
},
{
    "name": "publishedAtcategory"
});

db.collection("articles").createIndex({
    "title": 1,
    "content": 1
},
{
    "name": "titlecontent"
});




db.createCollection("subscriptions", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "subscriptions",
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "userId": {
                    "bsonType": "objectId"
                },
                "category": {
                    "bsonType": "string"
                },
                "New Field": {
                    "bsonType": "string",
                    "enum": [
                        "email",
                        "webhook",
                        "api"
                    ]
                },
                "createdAt": {
                    "bsonType": "date"
                }
            },
            "additionalProperties": false
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});

db.collection("subscriptions").createIndex({
    "userId": 1,
    "category": 1
},
{
    "name": "userIdcategory"
});

db.collection("subscriptions").createIndex({
    "userId": 1
},
{
    "name": "userId"
});




db.createCollection("scraping_logs", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "scraping_logs",
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "source": {
                    "bsonType": "string"
                },
                "status": {
                    "bsonType": "string",
                    "enum": [
                        "success",
                        "failed"
                    ]
                },
                "errorMessage": {
                    "bsonType": "string"
                },
                "scrapedAt": {
                    "bsonType": "date"
                }
            },
            "additionalProperties": false
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});

db.collection("scraping_logs").createIndex({
    "source": 1,
    "scrapedAt": 1
},
{
    "name": "sourcescrapedat"
});




db.createCollection("likes", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "likes",
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "articleId": {
                    "bsonType": "objectId"
                },
                "likes": {
                    "bsonType": "number"
                }
            },
            "additionalProperties": false
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});

db.collection("likes").createIndex({
    "articleId": 1
},
{
    "name": "articleid"
});




// db.createCollection("likes_logs", {
//     "capped": false,
//     "validator": {
//         "$jsonSchema": {
//             "bsonType": "object",
//             "title": "likes_logs",
//             "properties": {
//                 "_id": {
//                     "bsonType": "objectId"
//                 },
//                 "articleId": {
//                     "bsonType": "objectId"
//                 },
//                 "userId": {
//                     "bsonType": "objectId"
//                 },
//                 "likedAt": {
//                     "bsonType": "date"
//                 }
//             },
//             "additionalProperties": false,
//         }
//     },
//     "validationLevel": "off",
//     "validationAction": "warn"
// });
// 
// 
//