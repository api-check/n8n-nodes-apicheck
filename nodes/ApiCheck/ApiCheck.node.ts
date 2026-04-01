import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, NodeOperationError } from 'n8n-workflow';

export class ApiCheck implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'ApiCheck',
    name: 'apiCheck',
    icon: 'file:apicheck.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Validate addresses, verify emails and phone numbers',
    defaults: { name: 'ApiCheck' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'ApiCheck API', required: true }],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Lookup Address', value: 'lookupAddress', description: 'Look up address by postal code (NL, LU)' },
          { name: 'Verify Email', value: 'verifyEmail', description: 'Verify an email address' },
          { name: 'Verify Phone', value: 'verifyPhone', description: 'Verify a phone number' },
          { name: 'Global Search', value: 'globalSearch', description: 'Search addresses, cities, streets' },
        ],
        default: 'lookupAddress',
      },
      // Lookup Address fields
      {
        displayName: 'Country',
        name: 'country',
        type: 'options',
        displayOptions: { show: { operation: ['lookupAddress'] } },
        options: [
          { name: 'Netherlands', value: 'nl' },
          { name: 'Luxembourg', value: 'lu' },
        ],
        default: 'nl',
      },
      {
        displayName: 'Postal Code',
        name: 'postalcode',
        type: 'string',
        displayOptions: { show: { operation: ['lookupAddress'] } },
        default: '',
        placeholder: '1012LM',
      },
      {
        displayName: 'House Number',
        name: 'number',
        type: 'string',
        displayOptions: { show: { operation: ['lookupAddress'] } },
        default: '',
        placeholder: '1',
      },
      // Verify Email field
      {
        displayName: 'Email Address',
        name: 'email',
        type: 'string',
        displayOptions: { show: { operation: ['verifyEmail'] } },
        default: '',
        placeholder: 'test@example.com',
      },
      // Verify Phone field
      {
        displayName: 'Phone Number',
        name: 'phone',
        type: 'string',
        displayOptions: { show: { operation: ['verifyPhone'] } },
        default: '',
        placeholder: '+31612345678',
        description: 'Include country code',
      },
      // Global Search fields
      {
        displayName: 'Country',
        name: 'searchCountry',
        type: 'options',
        displayOptions: { show: { operation: ['globalSearch'] } },
        options: [
          { name: 'Netherlands', value: 'nl' },
          { name: 'Belgium', value: 'be' },
          { name: 'Luxembourg', value: 'lu' },
          { name: 'Germany', value: 'de' },
          { name: 'France', value: 'fr' },
        ],
        default: 'nl',
      },
      {
        displayName: 'Search Query',
        name: 'query',
        type: 'string',
        displayOptions: { show: { operation: ['globalSearch'] } },
        default: '',
        placeholder: 'Amsterdam',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const operation = this.getNodeParameter('operation', 0) as string;
    const credentials = await this.getCredentials('ApiCheck API');

    const headers: Record<string, string> = {
      'X-API-KEY': credentials.apiKey as string,
      Accept: 'application/json',
    };
    if (credentials.referer) {
      headers.Referer = credentials.referer as string;
    }

    for (let i = 0; i < items.length; i++) {
      let url = '';
      const params: Record<string, string> = {};

      switch (operation) {
        case 'lookupAddress':
          params.country = this.getNodeParameter('country', i) as string;
          params.postalcode = this.getNodeParameter('postalcode', i) as string;
          params.number = this.getNodeParameter('number', i) as string;
          url = `https://api.apicheck.nl/lookup/v1/address/?${new URLSearchParams(params)}`;
          break;
        case 'verifyEmail':
          params.email = this.getNodeParameter('email', i) as string;
          url = `https://api.apicheck.nl/verify/v1/email/?${new URLSearchParams(params)}`;
          break;
        case 'verifyPhone':
          params.number = this.getNodeParameter('phone', i) as string;
          url = `https://api.apicheck.nl/verify/v1/phone/?${new URLSearchParams(params)}`;
          break;
        case 'globalSearch':
          params.country = this.getNodeParameter('searchCountry', i) as string;
          params.query = this.getNodeParameter('query', i) as string;
          url = `https://api.apicheck.nl/search/v1/global/?${new URLSearchParams(params)}`;
          break;
      }

      const response = await this.helpers.httpRequest({
        method: 'GET',
        url,
        headers,
        json: true,
      });

      returnData.push({ json: response, pairedItem: { item: i } });
    }

    return [returnData];
  }
}
