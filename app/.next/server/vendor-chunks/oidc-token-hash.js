exports.id = "vendor-chunks/oidc-token-hash";
exports.ids = ["vendor-chunks/oidc-token-hash"];
exports.modules = {

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/oidc-token-hash/lib/index.js":
/*!*****************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/oidc-token-hash/lib/index.js ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { strict: assert } = __webpack_require__(/*! assert */ "assert");
const { createHash } = __webpack_require__(/*! crypto */ "crypto");
const { format } = __webpack_require__(/*! util */ "util");

const shake256 = __webpack_require__(/*! ./shake256 */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/oidc-token-hash/lib/shake256.js");

let encode;
if (Buffer.isEncoding('base64url')) {
  encode = (input) => input.toString('base64url');
} else {
  const fromBase64 = (base64) => base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  encode = (input) => fromBase64(input.toString('base64'));
}

/** SPECIFICATION
 * Its (_hash) value is the base64url encoding of the left-most half of the hash of the octets of
 * the ASCII representation of the token value, where the hash algorithm used is the hash algorithm
 * used in the alg Header Parameter of the ID Token's JOSE Header. For instance, if the alg is
 * RS256, hash the token value with SHA-256, then take the left-most 128 bits and base64url encode
 * them. The _hash value is a case sensitive string.
 */

/**
 * @name getHash
 * @api private
 *
 * returns the sha length based off the JOSE alg heade value, defaults to sha256
 *
 * @param token {String} token value to generate the hash from
 * @param alg {String} ID Token JOSE header alg value (i.e. RS256, HS384, ES512, PS256)
 * @param [crv] {String} For EdDSA the curve decides what hash algorithm is used. Required for EdDSA
 */
function getHash(alg, crv) {
  switch (alg) {
    case 'HS256':
    case 'RS256':
    case 'PS256':
    case 'ES256':
    case 'ES256K':
      return createHash('sha256');

    case 'HS384':
    case 'RS384':
    case 'PS384':
    case 'ES384':
      return createHash('sha384');

    case 'HS512':
    case 'RS512':
    case 'PS512':
    case 'ES512':
    case 'Ed25519':
      return createHash('sha512');

    case 'Ed448':
      if (!shake256) {
        throw new TypeError('Ed448 *_hash calculation is not supported in your Node.js runtime version');
      }

      return createHash('shake256', { outputLength: 114 });

    case 'EdDSA':
      switch (crv) {
        case 'Ed25519':
          return createHash('sha512');
        case 'Ed448':
          if (!shake256) {
            throw new TypeError('Ed448 *_hash calculation is not supported in your Node.js runtime version');
          }

          return createHash('shake256', { outputLength: 114 });
        default:
          throw new TypeError('unrecognized or invalid EdDSA curve provided');
      }

    default:
      throw new TypeError('unrecognized or invalid JWS algorithm provided');
  }
}

function generate(token, alg, crv) {
  const digest = getHash(alg, crv).update(token).digest();
  return encode(digest.slice(0, digest.length / 2));
}

function validate(names, actual, source, alg, crv) {
  if (typeof names.claim !== 'string' || !names.claim) {
    throw new TypeError('names.claim must be a non-empty string');
  }

  if (typeof names.source !== 'string' || !names.source) {
    throw new TypeError('names.source must be a non-empty string');
  }

  assert(typeof actual === 'string' && actual, `${names.claim} must be a non-empty string`);
  assert(typeof source === 'string' && source, `${names.source} must be a non-empty string`);

  let expected;
  let msg;
  try {
    expected = generate(source, alg, crv);
  } catch (err) {
    msg = format('%s could not be validated (%s)', names.claim, err.message);
  }

  msg = msg || format('%s mismatch, expected %s, got: %s', names.claim, expected, actual);

  assert.equal(expected, actual, msg);
}

module.exports = {
  validate,
  generate,
};


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/oidc-token-hash/lib/shake256.js":
/*!********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/oidc-token-hash/lib/shake256.js ***!
  \********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const crypto = __webpack_require__(/*! crypto */ "crypto");

const [major, minor] = process.version.substring(1).split('.').map((x) => parseInt(x, 10));
const xofOutputLength = major > 12 || (major === 12 && minor >= 8);
const shake256 = xofOutputLength && crypto.getHashes().includes('shake256');

module.exports = shake256;


/***/ })

};
;