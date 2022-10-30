import {domain,clientID} from 'auth_config'

export const environment = {
  production: false,
  auth: {
    domain,
    clientID,
    redirectUri: window.location.origin
  }
};
