'use strict'

const {S3Client, PutObjectCommand, CreateBucketCommand} = require("@aws-sdk/client-s3");
const AWS = require('aws-sdk');

const Problems = require('../../models/problems')


async function create(req, res){
    try{
        const newProblem = {
            typeId: req.body.typeId,
            userId: req.params.userId,
            description: req.body.description,
            lat: req.body.lat,
            long: req.body.long
        }

        // Set the region we will be using
        AWS.config.update({region: 'us-east-2'});
        const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
        
        const params = {
            MessageBody: JSON.stringify(newProblem),
            QueueUrl: `https://sqs.us-east-2.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.QUEUE_NAME}`
          };
        
          sqs.sendMessage(params, (err, data) => {
            if (err) {
                console.log("Error", err);
                res.status(500).send(err)
            } else {
                console.log("Successfully added message", data.MessageId);
                return res.status(200).send('Problem added successfully!')
            }
        });
        //await Problems.query().insertGraph(newProblem)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {create}