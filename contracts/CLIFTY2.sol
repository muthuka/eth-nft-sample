//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CLIFTY2 is ERC721URIStorage {
    uint256 private _tokenIds;

    constructor() ERC721("Clifty Inc.", "CLIFTY2") {}

    function mintNFT(address recipient, string memory uri)
        public
        returns (uint256)
    {
        require(_tokenIds <= 10000);

        uint256 newItemId = _tokenIds;
        super._mint(recipient, newItemId);
        super._setTokenURI(newItemId, uri);

        _tokenIds++;
        return newItemId;
    }
}
