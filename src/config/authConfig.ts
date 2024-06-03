const authConfig = {
  authRequired: process.env.AUTH_REQUIRED === 'false',
  auth0Logout: process.env.AUTH0_LOGOUT === 'true',
  secret: process.env.SECRET!,
  baseURL: process.env.ENVIRONMENT === 'local' ? process.env.BASE_URL! : process.env.SERVER_BASE_URL!,
  clientID: process.env.CLIENT_ID!,
  issuerBaseURL: process.env.ISSUER_BASE_URL!,
};

export default authConfig;