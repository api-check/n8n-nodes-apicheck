# n8n ApiCheck Node

Validate addresses, verify emails and phone numbers, search addresses across 18 European countries.

## Installation

```bash
npm install n8n-nodes-apicheck
```

## Credentials

1. Get your API key from [app.apicheck.nl](https://app.apicheck.nl)
2. In n8n, go to Settings > Credentials
3. Click "Add Credential" and search for "ApiCheck API"
4. Enter your API key

## Operations

### Global Search (Recommended)

The **Global Search** operation is the most powerful way to find addresses. It searches across streets, cities, and postal codes in one query with powerful filtering options.

**Use Global Search when you want to:**
- Find any type of address data (streets, cities, or postal codes)
- Filter results by city, street, or postal code area
- Search across Belgium with locality/municipality filters
- Get flexible, comprehensive results in one call

**Configuration:**
1. **Country**: Select from 18 European countries
2. **Search Query**: Enter a street name, city name, or postal code
3. **Limit**: Maximum number of results (default: 10)

**Advanced Filtering** (combine with search query):
- **Filter by City ID** - only return results within a specific city
- **Filter by Street ID** - only return results on a specific street
- **Filter by Postal Code ID** - only return results in a postal code area
- **Filter by Locality ID (Belgium)** - only return results in a locality (deelgemeente)
- **Filter by Municipality ID (Belgium)** - only return results in a municipality (gemeente)

**Result Types:**
Each result includes a `type` field:
- `city` - City/municipality
- `street` - Street name
- `postalcode` - Postal code area

**Example Workflow:**
1. Use Global Search to find cities matching "Amsterdam"
2. Get the `city_id` from the result
3. Use Global Search again with `city_id` filter to find streets in that city

### Lookup Address

Look up an exact address by postal code and house number.

**Supported countries:** Netherlands, Luxembourg

**Fields:**
- **Country** - Netherlands or Luxembourg
- **Postal Code** - e.g., 1012LM
- **House Number** - e.g., 1
- **Number Addition** (optional) - e.g., A, B, 1-3

**Returns:**
- `street` - Street name
- `number` - House number
- `postalcode` - Postal code
- `city` - City name
- `province` - Province/region
- `country` - Country object with name and code

### Get Number Additions

Get available number additions (apartment/suite letters) for a postal code and house number.

**Supported countries:** Netherlands, Luxembourg

**Fields:**
- **Country** - Netherlands or Luxembourg
- **Postal Code** - e.g., 1012LM
- **House Number** - e.g., 1

**Returns:**
- `number` - The house number
- `numberAdditions` - Array of available additions, e.g., `["A", "B", "1-3"]`

### Verify Email

Verify an email address for validity and check if it's from a disposable email provider.

**Fields:**
- **Email Address** - The email to verify

**Returns:**
- **Status** - `valid`, `invalid`, or `unknown`
- **Disposable Email** - `true` if from a disposable email provider
- **Greylisted** - `true` if the mail server is greylisting

### Verify Phone

Verify a phone number for validity.

**Fields:**
- **Phone Number** - Include country code, e.g., +31612345678

**Returns:**
- **Valid** - `true` if valid number
- **Country Code** - e.g., NL
- **Formatted Number** - Standardized format

### Search City

Search for cities by name across 18 European countries.

**Fields:**
- **Country** - Select from 18 countries
- **City Name** - Search query
- **Limit** - Maximum results

**Returns:** List of cities with `city_id`, `name`, and country info

### Search Street

Search for streets by name. Optionally filter by city.

**Fields:**
- **Country** - Select from 18 countries
- **Street Name** - Search query
- **City ID** (optional) - Filter to a specific city
- **Limit** - Maximum results

**Returns:** List of streets with `street_id`, `name`, `city_id`

### Search Postal Code

Search for postal codes. Optionally filter by city.

**Fields:**
- **Country** - Select from 18 countries
- **Postal Code** - Search query (partial or full)
- **City ID** (optional) - Filter to a specific city
- **Limit** - Maximum results

**Returns:** List of postal codes with `postalcode_id`, `name`, `city_id`

### Search Locality

Search for localities (deelgemeenten) by name. Primarily for Belgium.

**Fields:**
- **Country** - Belgium recommended
- **Locality Name** - Search query
- **Limit** - Maximum results

**Returns:** List of localities with `locality_id`, `name`

### Search Municipality

Search for municipalities (gemeenten) by name. Primarily for Belgium.

**Fields:**
- **Country** - Belgium recommended
- **Municipality Name** - Search query
- **Limit** - Maximum results

**Returns:** List of municipalities with `municipality_id`, `name`

### Search Address

Resolve a full address using IDs from other search operations.

**Fields:**
- **Country** - Select from 18 countries
- **Street ID** (optional) - From Search Street
- **City ID** (optional) - From Search City
- **Postal Code ID** (optional) - From Search Postal Code
- **Locality ID** (optional) - From Search Locality (Belgium)
- **Municipality ID** (optional) - From Search Municipality (Belgium)
- **House Number** (optional) - The house number
- **Number Addition** (optional) - Apartment/suite letter
- **Limit** - Maximum results

**Returns:** List of full addresses with all components

## Supported Countries

### All Search Operations (18 countries)
Netherlands (nl), Belgium (be), Luxembourg (lu), Germany (de), France (fr), Czech Republic (cz), Finland (fi), Italy (it), Norway (no), Poland (pl), Portugal (pt), Romania (ro), Spain (es), Switzerland (ch), Austria (at), Denmark (dk), United Kingdom (gb), Sweden (se)

### Address Lookup (Netherlands & Luxembourg only)
Netherlands (nl), Luxembourg (lu)

## Example Workflows

### Validate customer address
1. **Lookup Address** - Enter postal code and house number
2. If multiple units exist, use **Get Number Additions** to show options
3. **Verify Email** - Validate the customer's email address
4. **Verify Phone** - Validate the customer's phone number

### Find addresses in a city
1. **Global Search** - Search for "Amsterdam", get `city_id`
2. **Global Search** - Search for "Dam" with `city_id` filter, get `street_id`
3. **Search Address** - Use `street_id` and house number to get full address

### Belgium address search
1. **Search Municipality** - Find the municipality (gemeente)
2. **Search Locality** - Find the locality (deelgemeente) if needed
3. **Global Search** - Use `municipality_id` or `locality_id` filter for precise results

### Address autocomplete for forms
1. User types partial city → **Search City** → Show matches
2. User selects city, types street → **Search Street** with `city_id` → Show matches
3. User types number → **Lookup Address** with postal code + number → Return full address

## Tips

1. **Use Global Search first** - It's the most flexible and covers all use cases
2. **Filter for precision** - Use city_id, street_id, etc. to narrow down results
3. **Chain operations** - Use IDs from one search as filters in another
4. **Belgium addresses** - Use locality_id and municipality_id filters for precise results

## Support

- Documentation: [docs.apicheck.nl](https://docs.apicheck.nl)
- Support: support@apicheck.nl
