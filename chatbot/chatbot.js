const dialogflow = require('dialogflow');
const structjson = require('./structjson.js');
const config = require('../config/keys.js');

const projectId = config.googleProjectID;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
};

const sessionClient = new dialogflow.SessionsClient({projectId, credentials});

module.exports = {
  textQuery: async function(text, userID, parameters = {}){
    let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text,
          // The language used by the client (en-US)
          languageCode: config.dialogflowSessionLanguageCode,
        },
        queryParams : {
          payload: {
            data: parameters
          }
        }
      },
    };
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
  eventQuery: async function(event,userID, parameters = {}){
    let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
          languageCode: config.dialogflowSessionLanguageCode,
        }
      },
    };
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  handleAction: function(responses){
    return responses;
  }
}
