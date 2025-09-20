const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CLIFTY2", function () {
  let clifty2;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const CLIFTY2 = await ethers.getContractFactory("CLIFTY2");
    clifty2 = await CLIFTY2.deploy();
    await clifty2.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await clifty2.name()).to.equal("Clifty Inc.");
      expect(await clifty2.symbol()).to.equal("CLIFTY2");
    });

    it("Should have zero total supply initially", async function () {
      expect(await clifty2.balanceOf(addr1.address)).to.equal(0);
    });
  });

  describe("Minting", function () {
    it("Should mint NFT successfully", async function () {
      const tokenURI = "ipfs://QmTest123";
      
      await expect(clifty2.mintNFT(addr1.address, tokenURI))
        .to.emit(clifty2, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, 0);

      expect(await clifty2.ownerOf(0)).to.equal(addr1.address);
      expect(await clifty2.tokenURI(0)).to.equal(tokenURI);
      expect(await clifty2.balanceOf(addr1.address)).to.equal(1);
    });

    it("Should enforce minting limit of 10000 tokens", async function () {
      const tokenURI = "ipfs://QmTest";
      
      // Mint 10000 tokens (should succeed)
      for (let i = 0; i < 10000; i++) {
        await clifty2.mintNFT(addr1.address, `${tokenURI}${i}`);
      }

      // 10001st mint should fail
      await expect(clifty2.mintNFT(addr1.address, `${tokenURI}10000`))
        .to.be.revertedWithCustomError(clifty2, "ERC721InvalidReceiver");
    });

    it("Should mint to different addresses", async function () {
      const tokenURI1 = "ipfs://QmTest1";
      const tokenURI2 = "ipfs://QmTest2";
      
      await clifty2.mintNFT(addr1.address, tokenURI1);
      await clifty2.mintNFT(addr2.address, tokenURI2);

      expect(await clifty2.ownerOf(0)).to.equal(addr1.address);
      expect(await clifty2.ownerOf(1)).to.equal(addr2.address);
      expect(await clifty2.balanceOf(addr1.address)).to.equal(1);
      expect(await clifty2.balanceOf(addr2.address)).to.equal(1);
    });
  });

  describe("Token URI", function () {
    it("Should return correct token URI", async function () {
      const tokenURI = "ipfs://QmTest123";
      
      await clifty2.mintNFT(addr1.address, tokenURI);
      expect(await clifty2.tokenURI(0)).to.equal(tokenURI);
    });

    it("Should revert when querying URI for non-existent token", async function () {
      await expect(clifty2.tokenURI(999))
        .to.be.revertedWithCustomError(clifty2, "ERC721NonexistentToken");
    });
  });
});
