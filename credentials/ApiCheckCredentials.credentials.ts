import { ICredentialsProperties } from 'n8n-workflow';

export class ApiCheckCredentials implements ICredentialsProperties {
  name = 'ApiCheck API';
  extendedDisplayName = 'ApiCheck';
  properties = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string' as const,
      typeOptions: { password: true },
      default: '',
      required: true,
    },
    {
      displayName: 'Referer (optional)',
      name: 'referer',
      type: 'string' as const,
      default: '',
      description: 'Required if your API key has "Allowed Hosts" enabled',
    },
  ];
  
  authenticate = {
    type: 'genericAuthenticationType',
    properties: {
      headers: {
        'X-API-KEY': '={{$credentials.apiKey}}',
        Accept: 'application/json',
      },
    },
  };
  
  test = {
    request: {
      baseURL: 'https://api.apicheck.nl',
      url: '/lookup/v1/countries/',
    },
  };
}
