# Conduit Controller API Documentation

This is the API documentation for the ConduitController contract, which enables the deployment and management of conduits. Conduits are contracts that allow registered callers (or open "channels") to transfer approved ERC20/721/1155 tokens on behalf of the owner.

## Table of Contents

1. [Contract Address](#contract-address)
2. [Getting Started](#getting-started)
   - [Creating a New Conduit](#creating-a-new-conduit)
3. [Conduit Management](#conduit-management)
   - [Opening and Closing Channels](#opening-and-closing-channels)
   - [Initiating Ownership Transfer](#initiating-ownership-transfer)
   - [Accepting Ownership](#accepting-ownership)
4. [Querying Conduit Information](#querying-conduit-information)
   - [Retrieving Conduit Owner](#retrieving-conduit-owner)
   - [Retrieving Conduit Key](#retrieving-conduit-key)
   - [Checking Conduit Existence](#checking-conduit-existence)
   - [Retrieving Potential Owner](#retrieving-potential-owner)
   - [Checking Channel Status](#checking-channel-status)
   - [Retrieving Total Channels](#retrieving-total-channels)
   - [Retrieving Open Channels](#retrieving-open-channels)
   - [Retrieving a Specific Open Channel](#retrieving-a-specific-open-channel)
5. [Contract Information](#contract-information)
   - [Retrieving Conduit Code Hashes](#retrieving-conduit-code-hashes)

## Contract Address <a name="contract-address"></a>

The ConduitController contract's address depends on the network it has been deployed to. Please refer to the deployment information on the respective blockchain explorer to obtain the contract's address.

## Getting Started <a name="getting-started"></a>

### Creating a New Conduit <a name="creating-a-new-conduit"></a>

To create a new conduit, you can use the `createConduit` function. This function deploys a new conduit using a supplied conduit key and assigns an initial owner for the deployed conduit. The first twenty bytes of the conduit key must match the caller's address.

```solidity
function createConduit(bytes32 conduitKey, address initialOwner) external returns (address conduit)
```
* conduitKey (bytes32): The conduit key used to deploy the conduit. The first twenty bytes of the conduit key must match the caller's address.
* initialOwner (address): The initial owner to set for the new conduit.

#### Example
```javascript
const conduitKey = "0x1234567890123456789012345678901234567890";
const initialOwner = "0xYourAddress";

const conduitControllerContract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);
const transaction = await conduitControllerContract.createConduit(conduitKey, initialOwner);
await transaction.wait();

```
## Conduit Management <a name="conduit-management"></a>
#### Opening and Closing Channels <a name="opening-and-closing-channels"></a>
To open or close a channel on a given conduit, use the updateChannel function. Only the owner of the conduit can call this function.
```solidity
function updateChannel(address conduit, address channel, bool isOpen) external

```
* conduit (address): The conduit for which to open or close the channel.
* channel (address): The channel to open or close on the conduit.
* isOpen (bool): A boolean indicating whether to open (true) or close (false) the channel.

#### Example
```javascript
const conduitAddress = "0xConduitAddress";
const channelAddress = "0xChannelAddress";
const isOpen = true;

const conduitControllerContract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);
const transaction = await conduitControllerContract.updateChannel(conduitAddress, channelAddress, isOpen);
await transaction.wait();

```
### Initiating Ownership Transfer <a name="initiating-ownership-transfer"></a>
To initiate conduit ownership transfer, use the transferOwnership function. Only the current owner of the conduit can call this function.
```javascript
function transferOwnership(address conduit, address newPotentialOwner) external
```

* conduit (address): The conduit for which to initiate ownership transfer.
* newPotentialOwner (address): The new potential owner of the conduit.



```javascript
const conduitAddress = "0xConduitAddress";
const newPotentialOwner = "0xNewPotentialOwnerAddress";

const conduitControllerContract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);
const transaction = await conduitControllerContract.transferOwnership(conduitAddress, newPotentialOwner);
await transaction.wait();
```
### Accepting Ownership <a name="accepting-ownership"></a>
To accept ownership of a supplied conduit, use the `acceptOwnership` function. Only accounts that the current owner has set as the new potential owner may call this function.
```solidity
function acceptOwnership(address conduit) external
```
* conduit (address): The conduit for which to accept ownership.
```javascript
const conduitAddress = "0xConduitAddress";
const conduitControllerContract = new ethers.Contract("CONTRACT_ADDRESS", abi, signer);
const transaction = await conduitControllerContract.acceptOwnership(conduitAddress);
await transaction.wait();

```
## Querying Conduit Information <a name="querying-conduit-information"></a>
### Retrieving Conduit Owner <a name="retrieving-conduit-owner"></a>

To retrieve the current owner of a deployed conduit, use the ownerOf function.

```solidity
function ownerOf(address conduit) external view returns (address owner)
conduit (address): The conduit for which to retrieve the associated owner.
```
Example:

```javascript
const conduitAddress = "0xConduitAddress";
const conduitControllerContract = new ethers.Contract("CONTRACT_ADDRESS", abi, provider);
const owner = await conduitControllerContract.ownerOf(conduitAddress);
console.log("Conduit Owner:", owner);
```
### Retrieving Conduit Key <a name="retrieving-conduit-key"></a>
To retrieve the conduit key for a deployed conduit via reverse lookup, use the getKey function.

```solidity
function getKey(address conduit) external view returns (bytes32 conduitKey)
```
* conduit (address): The conduit for which to retrieve the associated conduit key.
Example:
