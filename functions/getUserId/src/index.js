const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async (req, res) => {
  const payload =
    req.payload ||
    "No payload provided. Add custom data when executing function.";

  const secretKey =
    req.variables.SECRET_KEY ||
    "SECRET_KEY variable not found. You can set it in Function settings.";

  const randomNumber = Math.random();

  const trigger = req.variables.APPWRITE_FUNCTION_TRIGGER;

  res.json({
    userId: req.variables.APPWRITE_FUNCTION_USER_ID,
    // payload,
    // secretKey,
    // randomNumber,
    // trigger,
  });
};

// module.exports = async function (req, res) {
//   const client = new sdk.Client();

//   // You can remove services you don't use
//   const account = new sdk.Account(client);
//   const avatars = new sdk.Avatars(client);
//   const database = new sdk.Databases(client);
//   const functions = new sdk.Functions(client);
//   const health = new sdk.Health(client);
//   const locale = new sdk.Locale(client);
//   const storage = new sdk.Storage(client);
//   const teams = new sdk.Teams(client);
//   const users = new sdk.Users(client);

//   const { userId } = JSON.parse(req.account);

//   if (!userId) {
//     console.log("Missing userId: " + userId);
//     return res.json({ userId, payload: req.payload });
//   }

//   if (
//     !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
//     !req.variables["APPWRITE_FUNCTION_API_KEY"]
//   ) {
//     console.warn(
//       "Environment variables are not set. Function cannot use Appwrite SDK."
//     );
//   } else {
//     client
//       .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
//       .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
//       .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
//       .setSelfSigned(true);
//   }

//   res.json({
//     areDevelopersAwesome: true,
//   });
// };
