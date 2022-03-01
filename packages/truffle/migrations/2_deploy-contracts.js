const BeetleFever = artifacts.require('BeetleFever')

module.exports = function (deployer) {
  const baseURI = 'ipfs://uri'
  deployer.deploy(BeetleFever, baseURI)
}
