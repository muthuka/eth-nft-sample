const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ThalaMovies", function () {
  let thalaMovies;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const ThalaMovies = await ethers.getContractFactory("ThalaMovies");
    thalaMovies = await ThalaMovies.deploy();
    await thalaMovies.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await thalaMovies.name()).to.equal("Thala Ajit Kumar Movies");
      expect(await thalaMovies.symbol()).to.equal("ThalaMovies");
    });

    it("Should set the deployer as owner", async function () {
      expect(await thalaMovies.owner()).to.equal(owner.address);
    });

    it("Should have zero total supply initially", async function () {
      expect(await thalaMovies.balanceOf(addr1.address)).to.equal(0);
    });
  });

  describe("Access Control", function () {
    it("Should allow only owner to mint", async function () {
      const tokenURI = "ipfs://QmTest";
      
      await expect(thalaMovies.mintNFT(addr1.address, tokenURI))
        .to.emit(thalaMovies, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, 1);
    });

    it("Should revert when non-owner tries to mint", async function () {
      const tokenURI = "ipfs://QmTest";
      
      await expect(thalaMovies.connect(addr1).mintNFT(addr2.address, tokenURI))
        .to.be.revertedWithCustomError(thalaMovies, "OwnableUnauthorizedAccount");
    });
  });

  describe("Minting", function () {
    it("Should mint NFT successfully", async function () {
      const tokenURI = "ipfs://QmTest123";
      
      await expect(thalaMovies.mintNFT(addr1.address, tokenURI))
        .to.emit(thalaMovies, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, 1);

      expect(await thalaMovies.ownerOf(1)).to.equal(addr1.address);
      expect(await thalaMovies.tokenURI(1)).to.equal(tokenURI);
      expect(await thalaMovies.balanceOf(addr1.address)).to.equal(1);
    });

    it("Should mint multiple NFTs with correct token IDs", async function () {
      const tokenURI1 = "ipfs://QmTest1";
      const tokenURI2 = "ipfs://QmTest2";
      
      await thalaMovies.mintNFT(addr1.address, tokenURI1);
      await thalaMovies.mintNFT(addr2.address, tokenURI2);

      expect(await thalaMovies.ownerOf(1)).to.equal(addr1.address);
      expect(await thalaMovies.ownerOf(2)).to.equal(addr2.address);
      expect(await thalaMovies.balanceOf(addr1.address)).to.equal(2);
    });

    it("Should mint to different addresses", async function () {
      const tokenURI1 = "ipfs://QmTest1";
      const tokenURI2 = "ipfs://QmTest2";
      
      await thalaMovies.mintNFT(addr1.address, tokenURI1);
      await thalaMovies.mintNFT(addr2.address, tokenURI2);

      expect(await thalaMovies.balanceOf(addr1.address)).to.equal(1);
      expect(await thalaMovies.balanceOf(addr2.address)).to.equal(1);
    });
  });

  describe("Token URI", function () {
    it("Should return correct token URI", async function () {
      const tokenURI = "ipfs://QmTest123";
      
      await thalaMovies.mintNFT(addr1.address, tokenURI);
      expect(await thalaMovies.tokenURI(1)).to.equal(tokenURI);
    });

    it("Should revert when querying URI for non-existent token", async function () {
      await expect(thalaMovies.tokenURI(999))
        .to.be.revertedWithCustomError(thalaMovies, "ERC721NonexistentToken");
    });
  });

  describe("Ownership Transfer", function () {
    it("Should allow owner to transfer ownership", async function () {
      await thalaMovies.transferOwnership(addr1.address);
      expect(await thalaMovies.owner()).to.equal(addr1.address);
    });

    it("Should revert when non-owner tries to transfer ownership", async function () {
      await expect(thalaMovies.connect(addr1).transferOwnership(addr2.address))
        .to.be.revertedWithCustomError(thalaMovies, "OwnableUnauthorizedAccount");
    });
  });
});
