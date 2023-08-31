/**
 * @interface Address
 * Represents an address object.
 * @property {string} [street] - The street of the address.
 * @property {string} [streetNumber] - The street number of the address.
 * @property {string} [postalCode] - The postal code of the address.
 * @property {string} [city] - The city of the address.
 * @property {string} [canton] - The canton of the address.
 */
export interface Address {
  street?: string;
  streetNumber?: string;
  postalCode?: string;
  city?: string;
  canton?: string;
}

/**
 * @function trimWithComma
 * Removes leading and trailing commas from the input string.
 * @param {string} input - The input string.
 * @returns {string} - The trimmed string.
 */
function trimWithComma(input: string): string {
  return input.replace(/^,/, '').replace(/,$/, '').trim();
}

function removeMatch(input: string, match: RegExpMatchArray): string {
  return input.replace(match[0], '').trim();
}

/**
 * Extracts the canton from the end of the input string and adds it to the address object.
 *
 * @param input The input string
 * @param address The address object
 * @returns The input string without the canton and the address object with the canton
 */
function extractCanton(input: string, address: Address): [string, Address] {
  const match = input.match(
    /(?<canton>\(?(?:AG|AI|AR|BE|BL|BS|FR|GE|GL|GR|JU|LU|NE|NW|OW|SG|SH|SO|SZ|TG|TI|UR|VD|VS|ZG|ZH)\)?)$/
  );

  if (match) {
    address.canton = match.groups?.canton.replace(/[()]/g, '');
    input = removeMatch(input, match);
  }

  return [trimWithComma(input), address];
}

/**
 * @function extractZipAndCity
 * Extracts the postal code and city from the input string and adds them to the address object.
 * @param {string} input - The input string.
 * @param {Address} address - The address object.
 * @returns {Array<string, Address>} - The input string without the postal code and city and the address object with the postal code and city.
 */
function extractZipAndCity(input: string, address: Address): [string, Address] {
  const match = input.match(/(?<zip>\d{4})\s(?<city>[^,]+),?/);

  if (match) {
    address.postalCode = match.groups?.zip;
    address.city = match.groups?.city;
    input = removeMatch(input, match);
  }

  return [trimWithComma(input), address];
}

/**
 * @function extractStreetNumber
 * Extracts the street number from the input string and adds it to the address object.
 * @param {string} input - The input string.
 * @param {Address} address - The address object.
 * @returns {Array<string, Address>} - The input string without the street number and the address object with the street number.
 */
function extractStreetNumber(
  input: string,
  address: Address
): [string, Address] {
  const match = input.match(/(?<streetNumber>\d+[A-Za-z]?),?/);

  if (match) {
    address.streetNumber = match.groups?.streetNumber;
    input = removeMatch(input, match);
  }

  return [trimWithComma(input), address];
}

/**
 * @function extractOrphanPostalCode
 * Extracts an orphan postal code from the input string and adds it to the address object.
 * @param {string} input - The input string.
 * @param {Address} address - The address object.
 * @returns {Array<string, Address>} - The input string without the postal code and the address object with the postal code.
 */
function extractOrphanPostalCode(
  input: string,
  address: Address
): [string, Address] {
  const match = input.match(/^(?<postalCode>\d{4})$/);

  if (match) {
    address.postalCode = match.groups?.postalCode;
    input = removeMatch(input, match);
  }

  return [trimWithComma(input), address];
}

/**
 * @function extractStreet
 * Extracts the street from the input string and adds it to the address object.
 * @param {string} input - The input string.
 * @param {Address} address - The address object.
 * @returns {Address} - The address object with the street.
 */
function extractStreet(input: string, address: Address): Address {
  address.street = input.trim();
  return address;
}

/**
 * @function parseSwissAddress
 * Parses the input string and returns an address object.
 * @param {string} input - The input string.
 * @returns {Address} - The address object.
 */
export default function parseSwissAddress(input: string): Address {
  let result: Address = {};

  [input, result] = extractOrphanPostalCode(input, {});
  [input, result] = extractCanton(input, result);
  [input, result] = extractZipAndCity(input, result);
  [input, result] = extractStreetNumber(input, result);
  result = extractStreet(input, result);

  return result;
}
