# ArcaneCoin ERC-20 Token Contract

## Introduction

This is a basic ERC-20 token contract implemented in Solidity. The contract allows users to create, transfer, and manage tokens on the Ethereum blockchain.

## Contract Details

### Name

The name of the token is ArcaneCoin.

### Symbol

The symbol of the token is ARC.

### Decimals

The token has 18 decimal places.

### Total Supply

The total supply of the token is 1,000 tokens, with a total value of 1,000 * 10^18 wei.

## Functions

### `balanceOf`

Returns the balance of a specific address.

- **Parameters**:
  - `address _owner`: The address to check the balance of.
- **Returns**: The balance of the address.

### `transfer`

Transfers tokens from the caller's address to another address.

- **Parameters**:
  - `address _to`: The address to transfer tokens to.
  - `uint256 _value`: The amount of tokens to transfer.
- **Returns**: A boolean indicating whether the transfer was successful.

### `approve`

Approves an address to spend tokens on behalf of the caller.

- **Parameters**:
  - `address _spender`: The address to approve.
  - `uint256 _value`: The amount of tokens to approve.
- **Returns**: A boolean indicating whether the approval was successful.

### `allowance`

Returns the amount of tokens that an address is allowed to spend on behalf of another address.

- **Parameters**:
  - `address _owner`: The address that owns the tokens.
  - `address _spender`: The address that is allowed to spend the tokens.
- **Returns**: The amount of tokens that the spender is allowed to spend.

### `transferFrom`

Transfers tokens from one address to another address, using an approved allowance.

- **Parameters**:
  - `address _from`: The address to transfer tokens from.
  - `address _to`: The address to transfer tokens to.
  - `uint256 _value`: The amount of tokens to transfer.
- **Returns**: A boolean indicating whether the transfer was successful.

## Events

### `Transfer`

Emitted when tokens are transferred from one address to another.

- **Parameters**:
  - `address indexed _from`: The address that transferred the tokens.
  - `address indexed _to`: The address that received the tokens.
  - `uint256 _value`: The amount of tokens transferred.

### `Approval`

Emitted when an address is approved to spend tokens on behalf of another address.

- **Parameters**:
  - `address indexed _owner`: The address that owns the tokens.
  - `address indexed _spender`: The address that is approved to spend the tokens.
  - `uint256 _value`: The amount of tokens that the spender is approved to spend.

## License

This contract is licensed under the MIT License.
