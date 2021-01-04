'use strict'

const AWS = require('aws-sdk');
const sqsAccountID = process.env.ACCOUNT_ID;
const sqsQueueName = process.env.QUEUE_NAME;

async function create(req, res){
    try{
        const newProblem = {
            typeId: req.body.typeId,
            userId: req.params.userId,
            description: req.body.description,
            lat: req.body.lat,
            long: req.body.long
        }

        AWS.config.update({region: 'us-east-2'});
        const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
        
        console.log(sqsAccountID);
        console.log(sqsQueueName);
        
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
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {create}