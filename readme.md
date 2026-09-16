# Zero Width Unicode Standard (ZWUS)

Zero Width Unicode Steganography — hide text inside invisible characters.

`npm install zwus`

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

Base 7 ranks printable ASCII so common English characters use one or two digits. Base 6 keeps Unicode code points as numbers. Some platforms strip particular zero-width characters.

```js
zwus.encodeString("hi", 3)  // safest
zwus.encodeString("hi", 6)  // code point encoding
zwus.encodeString("hi", 7)  // default, compact for ordinary English text
```

Decode must match the encode base:

```js
zwus.decodeToString(zwus.encodeString("hi", 7), 7)
```

Number arrays use ordinary base digits in every standard. Base 7's frequency ranking applies only to strings. Decoding ignores visible text mixed into a payload.

## Interop

Encoded output is byte-identical to the [Rust crate](https://crates.io/crates/zwus), so you can encode in JS and decode in Rust or vice versa.

## License

[WTFPL](license)

## Browser Extension

You can also use ZWUS in your browser with [inØsight](https://github.com/inzerosight/inzerosight): [Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/in0sight/) · [Chrome Web Store](https://chromewebstore.google.com/detail/acnmohbphjmnbaboacmecidopeplkhog)

