const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TestNFT1", function () {
  let testNFT1;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const TestNFT1 = await ethers.getContractFactory("TESTNFT1");
    testNFT1 = await TestNFT1.deploy();
    await testNFT1.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await testNFT1.name()).to.equal("Test Token 1 for 100 NFTs");
      expect(await testNFT1.symbol()).to.equal("TESTNFT1");
    });

    it("Should set the deployer as owner", async function () {
      expect(await testNFT1.owner()).to.equal(owner.address);
    });

    it("Should have zero total supply initially", async function () {
      expect(await testNFT1.balanceOf(addr1.address)).to.equal(0);
    });
  });

  describe("Access Control", function () {
    it("Should allow only owner to mint", async function () {
      const tokenURI = "ipfs://QmTest";
      
      await expect(testNFT1.mintNFT(addr1.address, tokenURI))
        .to.emit(testNFT1, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, 0);
    });

    it("Should revert when non-owner tries to mint", async function () {
      const tokenURI = "ipfs://QmTest";
      
      await expect(testNFT1.connect(addr1).mintNFT(addr2.address, tokenURI))
        .to.be.revertedWithCustomError(testNFT1, "OwnableUnauthorizedAccount");
    });
  });

  describe("Minting", function () {
    it("Should mint NFT successfully", async function () {
      const tokenURI = "ipfs://QmTest123";
      
      await expect(testNFT1.mintNFT(addr1.address, tokenURI))
        .to.emit(testNFT1, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, 0);

      expect(await testNFT1.ownerOf(0)).to.equal(addr1.address);
      expect(await testNFT1.tokenURI(0)).to.equal(tokenURI);
      expect(await testNFT1.balanceOf(addr1.address)).to.equal(1);
    });

    it("Should enforce minting limit of 101 tokens", async function () {
      const tokenURI = "ipfs://QmTest";
      
      // Mint 101 tokens (should succeed)
      for (let i = 0; i < 101; i++) {
        await testNFT1.mintNFT(addr1.address, `${tokenURI}${i}`);
      }

      // 102nd mint should fail
      await expect(testNFT1.mintNFT(addr1.address, `${tokenURI}101`))
        .to.be.reverted;
    });

    it("Should mint to different addresses", async function () {
      const tokenURI1 = "ipfs://QmTest1";
      const tokenURI2 = "ipfs://QmTest2";
      
      await testNFT1.mintNFT(addr1.address, tokenURI1);
      await testNFT1.mintNFT(addr2.address, tokenURI2);

      expect(await testNFT1.ownerOf(0)).to.equal(addr1.address);
      expect(await testNFT1.ownerOf(1)).to.equal(addr2.address);
      expect(await testNFT1.balanceOf(addr1.address)).to.equal(1);
      expect(await testNFT1.balanceOf(addr2.address)).to.equal(1);
    });
  });

  describe("Token URI", function () {
    it("Should return correct token URI", async function () {
      const tokenURI = "ipfs://QmTest123";
      
      await testNFT1.mintNFT(addr1.address, tokenURI);
      expect(await testNFT1.tokenURI(0)).to.equal(tokenURI);
    });

    it("Should revert when querying URI for non-existent token", async function () {
      await expect(testNFT1.tokenURI(999))
        .to.be.revertedWithCustomError(testNFT1, "ERC721NonexistentToken");
    });
  });
});
