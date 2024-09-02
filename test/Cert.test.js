const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { expect } = require('chai')

describe('Cert', function () {

    async function deployCertFixture() {
        const[admin, other] = await ethers.getSigners();

        const Cert = await ethers.getContractFactory('Cert');
        const cert = await Cert.deploy();

        return { admin, other, cert };
    }

    it('Should set the right admin value', async function () {
        const { cert, admin } = await loadFixture(deployCertFixture);

        expect(cert.deploymentTransaction().from).to.equal(admin.address);
    })
});