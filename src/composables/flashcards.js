import { Databases, Functions, Permission, Role } from "appwrite";
import { client, ID } from "../composables/auth";

const databases = new Databases(client);

const getUserId = async () => {
  let userId = null;
  const functions = new Functions(client);
  await functions.createExecution("63ed06738379f60e60ac").then(
    (response) => {
      userId = JSON.parse(response.response).userId;
    },
    (error) => {
      console.log(error);
    }
  );
  return userId;
};

const getDeck = async (id) => {
  let deck = {};
  await databases
    .getDocument("63ebf3afddae21e5a119", "63ebf3de54f3e0e0991c", id)
    .then(
      (response) => {
        deck = response;
      },
      (error) => {
        console.log(error);
      }
    );
  return deck;
};

const getDecks = async () => {
  let decks = {};
  await databases
    .listDocuments("63ebf3afddae21e5a119", "63ebf3de54f3e0e0991c")
    .then(
      (response) => {
        decks = response.documents;
      },
      (error) => {
        console.log(error);
      }
    );
  return decks;
};

const addDeck = async (title, flashcards) => {
  const databases = new Databases(client);
  const userId = await getUserId();

  await databases
    .createDocument(
      "63ebf3afddae21e5a119",
      "63ebf3de54f3e0e0991c",
      ID.unique(),
      {
        owner: userId,
        title: title,
        flashcards: JSON.stringify(flashcards),
      },
      [
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ]
    )
    .then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
};

export { getDeck, getDecks, addDeck };
