const {PubSub} = require('@google-cloud/pubsub');
const grpc = require('@grpc/grpc-js');

/** Crea un topico y una suscripcion en un proyecto existente en el cloud de google */

quickstart();

async function quickstart (
    projectId = 'projects/smart-arc-333317', // Your Google Cloud Platform project ID
    topicNameOrId = 'projects/smart-arc-333317/topics/mjtest', // Name for the new topic to create
    subscriptionName = 'projects/smart-arc-333317/subscriptions/mjtest-sub' // Name for the new subscription to create
){
    // Instantiates a client
    const pubsub1 = new PubSub({projectId});
  
    // Creates a new topic
    const [topic] = await pubsub1.createTopic(topicNameOrId);
    console.log(`Topic ${topic.name} created.`);
  
    // Creates a subscription on that new topic
    const [subscription] = await topic.createSubscription(subscriptionName);
  
    // Receive callbacks for new messages on the subscription
    subscription.on('message', message => {
      console.log('Mensaje recibido', message.data.toString());
      process.exit(0);
    });
  
    // Receive callbacks for errors on the subscription
    subscription.on('error', error => {
      console.error('Received error:', error);
      process.exit(1);
    });
  
    // Send a message to the topic
    topic.publishMessage({data: Buffer.from('Mensaje de test')});
  }