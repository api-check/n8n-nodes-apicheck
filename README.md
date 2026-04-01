# n8n-nodes-apicheck

n8n community node for [ApiCheck](https://apicheck.nl) - address validation, search, and verification.

## Installation

In n8n, go to **Settings > Community Nodes** and enter:

```
n8n-nodes-apicheck
```

Or install via npm in your n8n installation:

```bash
npm install n8n-nodes-apicheck
```

## Credentials

1. Get your API key from [app.apicheck.nl](https://app.apicheck.nl)
2. In n8n, go to **Credentials > Add Credential > ApiCheck API**
3. Enter your API key
4. Add a Referer if your key has "Allowed Hosts" enabled

## Operations

### Lookup Address
Look up an address by postal code and house number (Netherlands, Luxembourg).

### Verify Email
Verify an email address for validity, disposable status, and greylisting.

### Verify Phone
Verify a phone number for validity and formatting.

### Global Search
Search for addresses, streets, cities, or postal codes (18 countries).

## Supported Countries

### Lookup
- Netherlands (nl)
- Luxembourg (lu)

### Search
NL, BE, LU, FR, DE, CZ, FI, IT, NO, PL, PT, RO, ES, CH, AT, DK, GB, SE

## Example Workflows

- **Form submission → Verify email → Add to CRM**
- **New order → Lookup address → Create shipping label**
- **Lead capture → Verify phone → Send SMS**

## License

MIT

## Support

- Website: [apicheck.nl](https://apicheck.nl)
- Email: support@apicheck.nl
