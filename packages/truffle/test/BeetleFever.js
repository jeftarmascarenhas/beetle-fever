const BeetleFever = artifacts.require('BeetleFever')
const requireMsg = require('../requireMsg.json')

contract('BeetleFever', (accounts) => {
  let contract
  const owner = accounts[0]

  const BASE_URI = 'ipfs://uri/'

  beforeEach(async () => {
    contract = await BeetleFever.deployed()
  })

  it('deploys successfully', async () => {
    const address = await contract.address

    assert.notEqual(address, '')
    assert.notEqual(address, undefined)
    assert.notEqual(address, null)
    assert.notEqual(address, 0x0)
  })

  it('should have a baseURI when contract it is deployed', async () => {
    const baseURI = await contract.baseTokenURI.call()
    assert.equal(baseURI, BASE_URI)
  })

  it('should to do mint when isPreSale and return tokenURI', async () => {
    const value = web3.utils.toWei('0.03', 'ether')
    const tokenAmount = 1
    const buyer = accounts[1]

    await contract.mint(buyer, tokenAmount, {
      from: buyer,
      value
    })

    const tokenURI = await contract.tokenURI(1)

    const uriWithBase = `${BASE_URI}1.json`

    assert.equal(tokenURI, uriWithBase)
  })

  it('should to do mint per 0.06 when preSale is false and return tokenURI', async () => {
    const value = web3.utils.toWei('0.06', 'ether')
    const tokenAmount = 1
    const buyer = accounts[1]

    await contract.setIsPreSale(false, {
      from: owner
    })

    await contract.mint(buyer, tokenAmount, {
      from: buyer,
      value
    })

    const tokenURI = await contract.tokenURI(2)

    const uriWithBase = `${BASE_URI}2.json`

    assert.equal(tokenURI, uriWithBase)
  })

  it("shouldn't to use setBaseURI if you aren't for owner", async () => {
    const newBaseURI = 'ipfs://new'
    let error

    try {
      await contract.setBaseURI(newBaseURI, {
        from: accounts[2]
      })
    } catch (err) {
      error = err
    }

    assert.equal(error.reason, 'Ownable: caller is not the owner')
  })
})
