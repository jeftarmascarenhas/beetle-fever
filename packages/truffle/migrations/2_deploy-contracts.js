const BeetleFever = artifacts.require('BeetleFever')

module.exports = function (deployer) {
  const BASE_URI = 'ipfs://uri'
  deployer.deploy(BeetleFever, BASE_URI)
}
