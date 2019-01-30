const chatbot = require("./../chatbot/chatbot");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ hello: "john" });
  });

  //backend df route do handle text queries
  app.post("/api/df_text_query", async (req, res) => {
    let responses = await chatbot.textQuery(
      req.body.text,
      req.body.userID,
      req.body.parameters
    );
    res.send(responses[0].queryResult);
  });

  //backend df route for event queries
  app.post("/api/df_event_query", async (req, res) => {
    let responses = await chatbot.eventQuery(
      req.body.event,
      req.body.userID,
      req.body.parameters
    );
    res.send(responses[0].queryResult);
  });
};
