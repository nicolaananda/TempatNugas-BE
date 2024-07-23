import { Google } from "arctic";

const clientId = process.env.GOOGLE_CLIENT_ID!; // dari google
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!; // dari google
const redirectURI = process.env.GOOGLE_REDIRECT_URI!; // kita tentukan endpoint untuk callback

export const google = new Google(clientId, clientSecret, redirectURI);