// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract BeetleFever is ERC721 {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public baseURI;
    string internal baseURIExtention = '.json';
    address payable owner;
    uint120 public maxSupply = 1935;

    constructor(string memory _baseURI) ERC721('Beetle Fever', 'BT') {
        baseURI = _baseURI;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'Only owner can call this function.');
        _;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }
}
