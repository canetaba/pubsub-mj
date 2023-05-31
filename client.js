const {PubSub} = require('@google-cloud/pubsub');
const grpc = require('grpc');
const pubsub = new PubSub({grpc});

'use strict';

/**
 * This sample demonstrates how to create subscriptions with the
 * Google Cloud Pub/Sub API.
 *
 * For more information, see the README.md under /pubsub and the documentation
 * at https://cloud.google.com/pubsub/docs.
 */

// sample-metadata:
//   title: Create Subscription
//   description: Creates a new subscription.
//   usage: node createSubscription.js <topic-name-or-id> <subscription-name-or-id>

// [START pubsub_create_pull_subscription]
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const topicNameOrId = 'projects/smart-arc-333317/topics/mjtest';
const subscriptionNameOrId = 'projects/smart-arc-333317/subscriptions/mjtest-sub';

async function createSubscription(topicNameOrId, subscriptionNameOrId) {
  // Creates a new subscription
  await pubSubClient
    .topic(topicNameOrId)
    .createSubscription(subscriptionNameOrId);
  console.log(`Subscription ${subscriptionNameOrId} created.`);
}
// [END pubsub_create_pull_subscription]

function main(
  topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID',
  subscriptionNameOrId = 'YOUR_SUBSCRIPTION_NAME_OR_ID'
) {
  createSubscription(topicNameOrId, subscriptionNameOrId).catch(err => {
    console.error(err.message);
    process.exitCode = 1;
  });
}
