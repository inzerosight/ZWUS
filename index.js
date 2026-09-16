/**
 * ZWUS (Zero Width Unicode Standard)
 */
const zwus = {
    3: {unifier: "\u{00AD}", 0: "\u{180E}", 1: "\u{200B}", 2: "\u{200D}"},
    6: {unifier: "\u{200C}", 0: "\u{200D}", 1: "\u{200F}", 2: "\u{00AD}", 3: "\u{2060}", 4: "\u{200B}", 5: "\u{200E}"},
    7: {unifier: "\u{200C}", 0: "\u{200D}", 1: "\u{200F}", 2: "\u{00AD}", 3: "\u{2060}", 4: "\u{200B}", 5: "\u{200E}", 6: "\u{FEFF}"},
    /**
     * Encodes a string into a sequence of zero-width characters.
     * @param {string} text - The input text to encode.
     * @param {number} base - The numerical base for encoding. Defaults to 7. Options: 3, 6, 7.
     * @returns {string} The encoded string.
     */
    encodeString: (text, base = 7) => Array.from(text, u => (+base === 7 ? rankOf(u) : u.codePointAt(0)).toString(base).split('').map(x => zwus[base][x]).join('')).join(zwus[base].unifier),
    /**
     * Encodes an array of numbers into a sequence of zero-width characters.
     * @param {Array<number>} arr - The array of numbers to encode.
     * @param {number} base - The numerical base for encoding. Defaults to 7. Options: 3, 6, 7.
     * @returns {string} The encoded array.
     */
    encodeNumberArray: (arr, base = 7) => arr.map(n => n.toString(base).split('').map(x => zwus[base][x]).join('')).join(zwus[base].unifier),
    /**
     * Decodes a string of zero-width characters back into the original string.
     * NOTE: Decoding accuracy is contingent upon the original encoding base and alphabet.
     * @param {string} text - The encoded text to decode.
     * @param {number} base - The numerical base for decoding. Defaults to 7. Must match the base used for encoding.
     * @returns {string} The decoded string.
     */
    decodeToString: (text, base = 7) => zwus.decodeToNumberArray(text, base).map(n => String.fromCodePoint(+base === 7 ? pointOf(n) : n)).join(''),
    /**
     * Decodes a string of zero-width characters back into the original array of numbers.
     * NOTE: Decoding accuracy is contingent upon the original encoding base and alphabet.
     * @param {string} text - The encoded text to decode.
     * @param {number} base - The numerical base for decoding. Defaults to 7. Must match the base used for encoding.
     * @returns {Array<number>} The decoded array of numbers.
     */
    decodeToNumberArray: (text, base = 7) => text.split(zwus[base].unifier).map(x => Array.from(x).map(z => Object.keys(zwus[base]).find(k => zwus[base][k] === z)).join('')).filter(Boolean).map(x => parseInt(x, base)),
};

// Printable ASCII gets short base-7 values; other code points keep their value.
const priority = "te aoinshrdlucmfwypvbgkjqxz.,!?'-:;()0123456789ETAOINSHRDLUCMFWYPVBGKJQXZ";
const order = [...new Set([...priority, ...Array.from({length: 95}, (_, i) => String.fromCharCode(i + 32))])];
const ranks = new Map(order.map((char, rank) => [char, rank]));
const rankOf = char => ranks.get(char) ?? (char.codePointAt(0) < 32 ? char.codePointAt(0) + 95 : char.codePointAt(0));
const pointOf = rank => rank < 95 ? order[rank].codePointAt(0) : rank < 127 ? rank - 95 : rank;

export default zwus;
