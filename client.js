const {PubSub} = require('@google-cloud/pubsub');
const grpc = require('@grpc/grpc-js');

const subscriptionNameOrId = 'projects/smart-arc-333317/subscriptions/mjtest-sub';


/** obtiene una suscripcion */
'use strict';

function main(subscriptionNameOrId = 'projects/smart-arc-333317/subscriptions/mjtest-sub') {

    const pubSubClient = new PubSub();

  async function getSubscription() {
    const [metadata] = await pubSubClient
      .subscription(subscriptionNameOrId)
      .getMetadata();

    console.log(`Subscription: ${metadata.name}`);
    console.log(`Topic: ${metadata.topic}`);
    console.log(`Push config: ${metadata.pushConfig.pushEndpoint}`);
    console.log(`Ack deadline: ${metadata.ackDeadlineSeconds}s`);
  }

  getSubscription().catch(console.error);
}

main(...process.argv.slice(2));