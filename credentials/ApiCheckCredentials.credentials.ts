import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class ApiCheckCredentials {
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-KEY': '={{$credentials.apiKey}}',
				Accept: 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.apicheck.nl',
			url: '/verify/v1/email/',
			qs: { email: 'test@example.com' },
		},
	};
}
