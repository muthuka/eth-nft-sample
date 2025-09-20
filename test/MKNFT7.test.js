const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MKNFT7 (ERC1155)", function () {
  let mknft7;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const MKNFT7 = await ethers.getContractFactory("MKNFT7");
    mknft7 = await MKNFT7.deploy();
    await mknft7.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct URI", async function () {
      expect(await mknft7.uri(0)).to.equal("https://nftsamples.s3.amazonaws.com/{id}.json");
    });

    it("Should mint initial tokens to deployer", async function () {
      expect(await mknft7.balanceOf(owner.address, 0)).to.equal(ethers.parseEther("1")); // GOLD
      expect(await mknft7.balanceOf(owner.address, 1)).to.equal("1000000000000000000000000000"); // SILVER
      expect(await mknft7.balanceOf(owner.address, 2)).to.equal(1); // THORS_HAMMER
      expect(await mknft7.balanceOf(owner.address, 3)).to.equal("1000000000"); // SWORD
      expect(await mknft7.balanceOf(owner.address, 4)).to.equal("1000000000"); // SHIELD
    });

    it("Should have correct token constants", async function () {
      expect(await mknft7.GOLD()).to.equal(0);
      expect(await mknft7.SILVER()).to.equal(1);
      expect(await mknft7.THORS_HAMMER()).to.equal(2);
      expect(await mknft7.SWORD()).to.equal(3);
      expect(await mknft7.SHIELD()).to.equal(4);
    });
  });

  describe("ERC1155 Standard Functions", function () {
    it("Should support ERC1155 interface", async function () {
      expect(await mknft7.supportsInterface("0xd9b67a26")).to.be.true; // ERC1155
    });

    it("Should return correct balance for existing tokens", async function () {
      expect(await mknft7.balanceOf(owner.address, 0)).to.equal(ethers.parseEther("1"));
      expect(await mknft7.balanceOf(owner.address, 1)).to.equal("1000000000000000000000000000");
    });

    it("Should return zero balance for non-existent tokens", async function () {
      expect(await mknft7.balanceOf(owner.address, 999)).to.equal(0);
    });

    it("Should return zero balance for non-existent accounts", async function () {
      expect(await mknft7.balanceOf(addr1.address, 0)).to.equal(0);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens successfully", async function () {
      const amount = ethers.parseEther("100");
      
      await expect(mknft7.safeTransferFrom(owner.address, addr1.address, 0, amount, "0x"))
        .to.emit(mknft7, "TransferSingle")
        .withArgs(owner.address, owner.address, addr1.address, 0, amount);

      expect(await mknft7.balanceOf(owner.address, 0)).to.equal(ethers.parseEther("0.9"));
      expect(await mknft7.balanceOf(addr1.address, 0)).to.equal(amount);
    });

    it("Should batch transfer tokens successfully", async function () {
      const ids = [0, 1, 2];
      const amounts = [ethers.parseEther("0.1"), ethers.parseEther("1000"), 1];
      
      await expect(mknft7.safeBatchTransferFrom(owner.address, addr1.address, ids, amounts, "0x"))
        .to.emit(mknft7, "TransferBatch")
        .withArgs(owner.address, owner.address, addr1.address, ids, amounts);

      expect(await mknft7.balanceOf(addr1.address, 0)).to.equal(amounts[0]);
      expect(await mknft7.balanceOf(addr1.address, 1)).to.equal(amounts[1]);
      expect(await mknft7.balanceOf(addr1.address, 2)).to.equal(amounts[2]);
    });

    it("Should revert when transferring more than balance", async function () {
      const amount = ethers.parseEther("2"); // More than GOLD balance
      
      await expect(mknft7.safeTransferFrom(owner.address, addr1.address, 0, amount, "0x"))
        .to.be.revertedWithCustomError(mknft7, "ERC1155InsufficientBalance");
    });

    it("Should revert when non-owner tries to transfer", async function () {
      const amount = ethers.parseEther("100");
      
      await expect(mknft7.connect(addr1).safeTransferFrom(owner.address, addr2.address, 0, amount, "0x"))
        .to.be.revertedWithCustomError(mknft7, "ERC1155MissingApprovalForAll");
    });
  });

  describe("Approvals", function () {
    it("Should set approval for all", async function () {
      await expect(mknft7.setApprovalForAll(addr1.address, true))
        .to.emit(mknft7, "ApprovalForAll")
        .withArgs(owner.address, addr1.address, true);

      expect(await mknft7.isApprovedForAll(owner.address, addr1.address)).to.be.true;
    });

    it("Should revoke approval for all", async function () {
      await mknft7.setApprovalForAll(addr1.address, true);
      
      await expect(mknft7.setApprovalForAll(addr1.address, false))
        .to.emit(mknft7, "ApprovalForAll")
        .withArgs(owner.address, addr1.address, false);

      expect(await mknft7.isApprovedForAll(owner.address, addr1.address)).to.be.false;
    });
  });

  describe("URI", function () {
    it("Should return correct URI for all tokens", async function () {
      const baseURI = "https://nftsamples.s3.amazonaws.com/{id}.json";
      
      expect(await mknft7.uri(0)).to.equal(baseURI);
      expect(await mknft7.uri(1)).to.equal(baseURI);
      expect(await mknft7.uri(2)).to.equal(baseURI);
      expect(await mknft7.uri(3)).to.equal(baseURI);
      expect(await mknft7.uri(4)).to.equal(baseURI);
    });
  });
});
