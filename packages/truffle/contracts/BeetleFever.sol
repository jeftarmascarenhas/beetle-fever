// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract BeetleFever is ERC721, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public baseTokenURI;
    string internal baseURIExtention = '.json';
    uint120 public maxSupply = 1935;
    uint120 public maxTokenPerMint = 3;
    uint256 sale = 0.06 ether;
    uint256 preSale = 0.03 ether;
    bool isPreSale = true;

    constructor(string memory _baseTokenURI) ERC721('Beetle Fever', 'BT') {
        baseTokenURI = _baseTokenURI;
    }

    function validateMint(uint256 _tokenAmount) private view {
        uint256 supply = totalSupply();
        require(_tokenAmount + supply <= maxSupply, 'RMS');
        require(_tokenAmount > 0 && _tokenAmount <= maxTokenPerMint, 'RMP');
        if (isPreSale) {
            require(msg.value == preSale * _tokenAmount, '');
            return;
        }
        require(msg.value == sale * _tokenAmount, 'RNET');
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function mint(address _buyer, uint256 _tokenAmount) public payable {
        validateMint(_tokenAmount);

        for (uint256 i = 1; i < _tokenAmount; i++) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _safeMint(_buyer, newItemId);
        }
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        string memory currentBaseURI = _baseURI();

        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        _tokenId.toString(),
                        baseURIExtention
                    )
                )
                : '';
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function setIsPreSale(bool _isPreSale) public onlyOwner {
        isPreSale = _isPreSale;
    }
}
