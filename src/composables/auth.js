import { Client, Account, ID } from "appwrite";

const client = new Client();
client.setEndpoint("http://localhost/v1").setProject("63e29e4ab946dd0d77ef");
const account = new Account(client);

export { client, account, ID };
