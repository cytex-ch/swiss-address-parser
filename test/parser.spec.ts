import {readFileSync} from 'fs';
import parseSwissAddress from '../src';
import {Address} from '../src';
import path = require('path');

interface Example {
  input: string;
  output: {
    street?: string;
    streetNumber?: string;
    postalCode?: string;
    city?: string;
    canton?: string;
  };
}

describe('Parser', () => {
  it('should be defined', () => {
    expect(parseSwissAddress).toBeDefined();
  });

  it('should parse a swiss address', () => {
    const examples: Example[] = [];

    const csv = readFileSync(
      `${path.join(process.cwd(), 'test/test-cases.csv')}`,
      'utf8'
    );
    csv.split('\n').forEach((line, index) => {
      if (index === 0) {
        return;
      }

      // when splitting by comma, ignore commas inside of double quotes
      const [input, street, streetNumber, postalCode, city, canton] =
        line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

      const output = {
        street: street.replace(/"/g, ''),
        streetNumber: streetNumber.replace(/"/g, ''),
        postalCode: postalCode.replace(/"/g, ''),
        city: city.replace(/"/g, ''),
        canton: canton.replace(/"/g, ''),
      };

      // remove empty values
      Object.keys(output).forEach(key => {
        if (output[key as keyof Address] === '') {
          delete output[key as keyof Address];
        }
      });
      examples.push({
        input: input.replace(/"/g, ''),
        output,
      });
    });

    examples.forEach(example => {
      const address = parseSwissAddress(example.input);
      Object.keys(example.output).forEach(key => {
        expect(address[key as keyof Address]).toBe(
          (example.output as Record<string, string>)?.[key]
        );
      });
    });
  });
});
