//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

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
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Clifty Inc.", "CLIFTY1") {}

    function mintNFT(address recipient, string memory uri)
        public
        returns (uint256)
    {
        require(_tokenIds.current() <= 10);

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, uri);

        _tokenIds.increment();
        return newItemId;
    }
}
