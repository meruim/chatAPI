const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const conversations = {};

router.post("/", async (req, res) => {
  const message = req.query.message ? req.body.query.toLowerCase() : null;
  const userId = global.utils.generateRandomUserId;

  if (!message) {
    return res.status(400).json({ error: "Message is missing" });
  }

  if (!conversations[userId]) {
    conversations[userId] = [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
    ];
  }

  conversations[userId].push({
    role: "user",
    content: message,
  });

  let response = "API not available";

  try {
    response = await getGroqChatCompletion(conversations[userId]);

    conversations[userId].push({
      role: "assistant",
      content: response,
    });

    res.status(200).json({ message: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getGroqChatCompletion = async (conversation) => {
  const apiKey = process.env.apiKey;
  if (!apiKey) {
    throw new Error("No API key!");
  }
  const groq = new Groq({
    apiKey: process.env.apiKey,
  });
  try {
    const completion = await groq.chat.completions.create({
      messages: conversation,
      model: "llama3-8b-8192",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: false,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = router;
