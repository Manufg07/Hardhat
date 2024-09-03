const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Cert", function () {
  async function deployCertFixture() {
    const [admin, other] = await ethers.getSigners();

    const Cert = await ethers.getContractFactory("Cert");
    const cert = await Cert.deploy();

    return { admin, other, cert };
  }

  it("Should set the right admin value", async function () {
    const { cert, admin } = await loadFixture(deployCertFixture);

    expect(cert.deploymentTransaction().from).to.equal(admin.address);
  });

  it("Testing issue", async function () {
    const { cert } = await loadFixture(deployCertFixture);

    await expect(cert.issue(101, "Manu", "EDP", "S", "10 Jun 2024"))
      .to.emit(cert, "Issued")
      .withArgs("EDP", 101, "S");
  });

  it("Read value", async function () {
    const { cert } = await loadFixture(deployCertFixture);

    await cert.issue(101, "Manu", "EDP", "S", "10 Jun 2024");
    const certificates = await cert.Certificates(101);

    // console.log("Data: ", certificates);

    expect(certificates[0]).to.equal("Manu");
    expect(certificates[1]).to.equal("EDP");
    expect(certificates[2]).to.equal("S");
    expect(certificates[3]).to.equal("10 Jun 2024");
  });

  // it("Test issue from another account ", async function () {
  //     const { cert, other } = await loadFixture(deployCertFixture);

  //     await expect(cert.connect(other).issue(101, "Manu", "EDP", "S", "10 Jun 2024"))
  //     .to.be.revertedWith('Access Denied');
  // })
});

describe("Fail test", function () {
  async function deployCertFixture() {
    const [admin, other] = await ethers.getSigners();

    const Cert = await ethers.getContractFactory("Cert");
    const cert = await Cert.deploy();

    return { admin, other, cert };
  }

  it("Test issue from another account ", async function () {
    const { cert, other } = await loadFixture(deployCertFixture);

    await expect(
      cert.connect(other).issue(101, "Manu", "EDP", "S", "10 Jun 2024")
    ).to.be.revertedWith("Access Denied");
  });
});
