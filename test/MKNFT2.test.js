const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MKNFT2", function () {
  let mknft2;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const MKNFT2 = await ethers.getContractFactory("MKNFT2");
    mknft2 = await MKNFT2.deploy();
    await mknft2.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await mknft2.name()).to.equal("MKNFT2");
      expect(await mknft2.symbol()).to.equal("MKNFT2");
    });

    it("Should set the deployer as owner", async function () {
      expect(await mknft2.owner()).to.equal(owner.address);
    });

    it("Should have zero total supply initially", async function () {
      expect(await mknft2.balanceOf(addr1.address)).to.equal(0);
    });
  });

  describe("Access Control", function () {
    it("Should allow only owner to mint", async function () {
      const tokenURI = "ipfs://QmTest";
      
      await expect(mknft2.mintNFT(addr1.address, tokenURI))
        .to.emit(mknft2, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, 1);
    });

    it("Should revert when non-owner tries to mint", async function () {
      const tokenURI = "ipfs://QmTest";
      
      await expect(mknft2.connect(addr1).mintNFT(addr2.address, tokenURI))
        .to.be.revertedWithCustomError(mknft2, "OwnableUnauthorizedAccount");
    });
  });

  describe("Minting", function () {
    it("Should mint NFT successfully", async function () {
      const tokenURI = "ipfs://QmTest123";
      
      await expect(mknft2.mintNFT(addr1.address, tokenURI))
        .to.emit(mknft2, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, 1);

      expect(await mknft2.ownerOf(1)).to.equal(addr1.address);
      expect(await mknft2.tokenURI(1)).to.equal(tokenURI);
      expect(await mknft2.balanceOf(addr1.address)).to.equal(1);
    });

    it("Should enforce minting limit of 3 tokens", async function () {
      const tokenURI = "ipfs://QmTest";
      
      // Mint 3 tokens (should succeed)
      for (let i = 0; i < 3; i++) {
        await mknft2.mintNFT(addr1.address, `${tokenURI}${i}`);
      }

      // 4th mint should fail
      await expect(mknft2.mintNFT(addr1.address, `${tokenURI}3`))
        .to.be.reverted;
    });

    it("Should increment token IDs correctly", async function () {
      const tokenURI1 = "ipfs://QmTest1";
      const tokenURI2 = "ipfs://QmTest2";
      
      await mknft2.mintNFT(addr1.address, tokenURI1);
      await mknft2.mintNFT(addr2.address, tokenURI2);

      expect(await mknft2.ownerOf(1)).to.equal(addr1.address);
      expect(await mknft2.ownerOf(2)).to.equal(addr2.address);
      expect(await mknft2.balanceOf(addr1.address)).to.equal(1);
      expect(await mknft2.balanceOf(addr2.address)).to.equal(1);
    });
  });

  describe("Ownership Transfer", function () {
    it("Should allow owner to transfer ownership", async function () {
      await mknft2.transferOwnership(addr1.address);
      expect(await mknft2.owner()).to.equal(addr1.address);
    });

    it("Should revert when non-owner tries to transfer ownership", async function () {
      await expect(mknft2.connect(addr1).transferOwnership(addr2.address))
        .to.be.revertedWithCustomError(mknft2, "OwnableUnauthorizedAccount");
    });
  });
});
