/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Configuration, OpenAIApi } = require("openai");

admin.initializeApp();
const db = admin.firestore();

const configuration = new Configuration({
  apiKey: functions.config().openai.key, // Uses the key you just set
});
const openai = new OpenAIApi(configuration);

exports.getGiftSuggestions = functions.https.onRequest(async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).send({ error: "Prompt required" });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Suggest 3 suitable product categories from my website based on this user request: "${prompt}". Only use categories: embroidery, crochet, hampers, lippan, wall hanging. Return in JSON like: { "categories": ["crochet","hampers"] }`
        },
      ],
      temperature: 0.7,
    });

    const responseText = completion.data.choices[0].message.content;
    const aiCategories = JSON.parse(responseText).categories;

    const productsRef = db.collection("products");
    let products = [];
    for (const cat of aiCategories) {
      const snapshot = await productsRef.where("category", "==", cat).get();
      snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
    }

    res.status(200).send({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong" });
  }
});

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
