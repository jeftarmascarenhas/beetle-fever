const BeetleFever = artifacts.require('BeetleFever')

contract('BeetleFever', (accounts) => {
  let contract
  const owner = accounts[0]

  const BASE_URI = 'ipfs://uri'

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
    const baseURI = await contract.baseURI.call()
    assert.equal(baseURI, BASE_URI)
  })

  it("shouldn't to use setBaseURI if you aren't for owner", async () => {
    const newBaseURI = 'ipfs://new'
    let error

    try {
      await contract.setBaseURI(newBaseURI, {
        from: owner
      })
    } catch (err) {
      error = err
    }

    assert.equal(error.reason, 'Only owner can call this function.')
  })
})
