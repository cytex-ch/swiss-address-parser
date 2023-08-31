<h2 align="center">swiss-address-parser</h3>
<p align="center">
parses 🇨🇭 address strings into structured data
</p>

<br/>

<div align="center">

[![Build, Lint and Test](https://github.com/cytex-ch/swiss-address-parser/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/cytex-ch/swiss-address-parser/actions/workflows/build-and-test.yml)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub issues](https://img.shields.io/github/issues/cytex-ch/swiss-address-parser)]()
[![GitHub pull requests](https://img.shields.io/github/issues-pr/cytex-ch/swiss-address-parser)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![codecov](https://codecov.io/gh/cytex-ch/swiss-address-parser/graph/badge.svg?token=P7TXWCFFB5)](https://codecov.io/gh/cytex-media-solutions/swiss-address-parser)

</div>

<br/>

<div align="center" style="margin-bottom: 20px; background-color: #FFF; border-radius: 5px; padding: 20px; color: #000;">
        ⚠️ This project is still in development and not ready for production use. ⚠️<br/>
        Can't wait to use it? Feel free to
        <a href="#authors">contribute</a>.
</div>

<br/>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Installing](#installing)
- [Tests](#tests)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About

<a name="about"></a>

<strong>swiss-address-parser</strong> is a library that parses 🇨🇭 address strings into structured data. It acknowledges the fact that user input varies and tries to parse as much as possible.


## 🏁 Getting Started

<a name="getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

<a name="installing"></a>

Install the package via npm:

```bash
npm install swiss-address-parser --save
```

or via yarn:

```bash
yarn add swiss-address-parser
```

## 🎈 Usage

<a name="usage"></a>

### Basic usage

```typescript
import parse from 'swiss-address-parser';

const address = parse('Musterstrasse 1, 8000 Zürich');

console.log(address);

// {
//   street: 'Musterstrasse',
//   streetNumber: '1',
//   zipCode: '8000',
//   city: 'Zürich',
//   canton: 'ZH',
//   country: 'CH'
// }
```

## 🔧 Running the tests

<a name="tests"></a>

Tests are written with jest. You can run them with the following command:

```bash
npm run test
```

## ⛏️ Built Using

<a name="built_using"></a>

- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Jest](https://jestjs.io/) - Testing framework
- [Prettier](https://prettier.io/) - Code formatter
- [ESLint](https://eslint.org/) - Linter

## ✍️ Authors

<a name="authors"></a>

- [@cytex-ch](https://github.com/cytex-ch) - Project author
- [@sjutz](https://github.com/sjutz) - Project maintainer <simon.jutz@cytex.ch>
