//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CLIFTY3 is ERC721URIStorage {
    constructor() ERC721("Clifty Inc.", "CLIFTY3") {}

    function mintNFT(
        address recipient,
        string memory uri,
        uint256 tokenId
    ) public returns (uint256) {
        super._mint(recipient, tokenId);
        super._setTokenURI(tokenId, uri);

        return tokenId;
    }
}
