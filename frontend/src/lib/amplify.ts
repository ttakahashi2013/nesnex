import { Amplify } from 'aws-amplify';
import { cognitoConfig } from '../config/cognito';

// Amplifyの設定
export const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      region: cognitoConfig.region,
      userPoolId: cognitoConfig.userPoolId,
      userPoolWebClientId: cognitoConfig.userPoolWebClientId,
      oauth: cognitoConfig.oauth
    }
  });
};