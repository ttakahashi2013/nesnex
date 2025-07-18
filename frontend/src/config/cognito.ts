// AWS Cognito設定
export const cognitoConfig = {
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
  userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
  oauth: {
    domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    scope: ['email', 'openid', 'profile'],
    redirectSignIn: 'http://localhost:8080/',
    redirectSignOut: 'http://localhost:8080/',
    responseType: 'code'
  }
};