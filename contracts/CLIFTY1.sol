//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
//                                                                         //
//           ░█████╗░██╗░░░░░██╗███████╗████████╗██╗░░░██╗                 //
//           ██╔══██╗██║░░░░░██║██╔════╝╚══██╔══╝╚██╗░██╔╝                 //
//           ██║░░╚═╝██║░░░░░██║█████╗░░░░░██║░░░░╚████╔╝░                 //
//           ██║░░██╗██║░░░░░██║██╔══╝░░░░░██║░░░░░╚██╔╝░░                 //
//           ╚█████╔╝███████╗██║██║░░░░░░░░██║░░░░░░██║░░░                 //
//           ░╚════╝░╚══════╝╚═╝╚═╝░░░░░░░░╚═╝░░░░░░╚═╝░░░                 //
//                                                                         //
//                                                                         //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////

contract CLIFTY1 is ERC721URIStorage {
    uint256 private _tokenIds;

    constructor() ERC721("Clifty Inc.", "CLIFTY1") {}

    function mintNFT(address recipient, string memory uri)
        public
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
