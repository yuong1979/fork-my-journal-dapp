/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/cpipda.json`.
 */
export type Cpipda = {
  "address": "99j6yg8qGD8HcjD3gHT1Chy9Xi8sQCina9kRSYA1KPrF",
  "metadata": {
    "name": "cpipda",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "solTransfer",
      "discriminator": [
        135,
        254,
        247,
        202,
        217,
        48,
        184,
        165
      ],
      "accounts": [
        {
          "name": "pdaAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  100,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "recipient"
              }
            ]
          }
        },
        {
          "name": "recipient",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ]
};
