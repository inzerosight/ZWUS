# ZWUS

Zero Width Unicode Steganography — hide text inside invisible characters.

`npm i zwus`

## Usage

```js
import zwus from 'zwus';

// Encode & decode strings
const hidden = zwus.encodeString("secret");
const revealed = zwus.decodeToString(hidden);
// "secret"

// Encode & decode number arrays
const encoded = zwus.encodeNumberArray([72, 101, 108]);
const decoded = zwus.decodeToNumberArray(encoded);
// [72, 101, 108]
```

### Base

Higher base = shorter output, but more likely visible in some renderers.

```js
zwus.encodeString("hi", 3)  // default, safest
zwus.encodeString("hi", 6)  // compact
zwus.encodeString("hi", 8)  // most compact
```

Decode must match the encode base:

```js
zwus.decodeToString(encoded, 6)
```

## License

[WTFPL](license)
