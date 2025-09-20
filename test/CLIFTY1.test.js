const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CLIFTY1", function () {
  let clifty1;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const CLIFTY1 = await ethers.getContractFactory("CLIFTY1");
    clifty1 = await CLIFTY1.deploy();
    await clifty1.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await clifty1.name()).to.equal("Clifty Inc.");
      expect(await clifty1.symbol()).to.equal("CLIFTY1");
    });

    it("Should have zero total supply initially", async function () {
      expect(await clifty1.balanceOf(addr1.address)).to.equal(0);
    });
  });

  describe("Minting", function () {
    it("Should mint NFT successfully", async function () {
      const tokenURI = "ipfs://QmTest123";
      
      await expect(clifty1.mintNFT(addr1.address, tokenURI))
        .to.emit(clifty1, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, 0);

      expect(await clifty1.ownerOf(0)).to.equal(addr1.address);
      expect(await clifty1.tokenURI(0)).to.equal(tokenURI);
      expect(await clifty1.balanceOf(addr1.address)).to.equal(1);
    });

    it("Should mint multiple NFTs with correct token IDs", async function () {
      const tokenURI1 = "ipfs://QmTest1";
      const tokenURI2 = "ipfs://QmTest2";
      
      await clifty1.mintNFT(addr1.address, tokenURI1);
      await clifty1.mintNFT(addr2.address, tokenURI2);

      expect(await clifty1.ownerOf(0)).to.equal(addr1.address);
      expect(await clifty1.ownerOf(1)).to.equal(addr2.address);
      expect(await clifty1.balanceOf(addr1.address)).to.equal(1);
      expect(await clifty1.balanceOf(addr2.address)).to.equal(1);
    });

    it("Should enforce minting limit of 11 tokens", async function () {
      const tokenURI = "ipfs://QmTest";
      
      // Mint 11 tokens (should succeed)
      for (let i = 0; i < 11; i++) {
        await clifty1.mintNFT(addr1.address, `${tokenURI}${i}`);
      }

      // 12th mint should fail
      await expect(clifty1.mintNFT(addr1.address, `${tokenURI}11`))
        .to.be.reverted;
    });

    it("Should revert when minting to zero address", async function () {
      const tokenURI = "ipfs://QmTest";
      
      await expect(clifty1.mintNFT(ethers.ZeroAddress, tokenURI))
        .to.be.revertedWithCustomError(clifty1, "ERC721InvalidReceiver");
    });
  });

  describe("Token URI", function () {
    it("Should return correct token URI", async function () {
      const tokenURI = "ipfs://QmTest123";
      
      await clifty1.mintNFT(addr1.address, tokenURI);
      expect(await clifty1.tokenURI(0)).to.equal(tokenURI);
    });

    it("Should revert when querying URI for non-existent token", async function () {
      await expect(clifty1.tokenURI(999))
        .to.be.revertedWithCustomError(clifty1, "ERC721NonexistentToken");
    });
  });

  describe("Ownership", function () {
    it("Should track ownership correctly", async function () {
      const tokenURI = "ipfs://QmTest";
      
      await clifty1.mintNFT(addr1.address, tokenURI);
      
      expect(await clifty1.ownerOf(0)).to.equal(addr1.address);
      expect(await clifty1.balanceOf(addr1.address)).to.equal(1);
    });
  });
});
