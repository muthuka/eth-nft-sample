//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MKNFT6 is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    constructor() ERC721("MK Token 6 for NFT", "MKNFT6") Ownable(msg.sender) {}

    function mintNFT(address recipient, string memory uri)
        public
        onlyOwner
        returns (uint256)
    {
        require(_tokenIds <= 10);

        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, uri);

        _tokenIds++;
        return newItemId;
    }
}
