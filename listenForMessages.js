/** Script que escucha los mensajes enviados al topico */

const subscriptionNameOrId = 'projects/smart-arc-333317/subscriptions/mjtest-sub';
const timeout = 60;

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');
const grpc = require('@grpc/grpc-js');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

function listenForMessages(subscriptionNameOrId, timeout) {
  // References an existing subscription
  const subscription = pubSubClient.subscription(subscriptionNameOrId);

  // Create an event handler to handle messages
  let messageCount = 0;
  const messageHandler = message => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', messageHandler);

  // Wait a while for the subscription to run. (Part of the sample only.)
  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}


function main(
  subscriptionNameOrId = 'projects/smart-arc-333317/subscriptions/mjtest-sub',
  timeout = 60
) {
  timeout = Number(timeout);
  listenForMessages(subscriptionNameOrId, timeout);
}

main(...process.argv.slice(2));