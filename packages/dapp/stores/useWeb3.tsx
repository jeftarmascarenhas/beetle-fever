import create from 'zustand'
import Web3 from 'web3'

const useWeb3 = create(set => {
  const web3 = new Web3(Web3.givenProvider || ethereum)

  const setNewProvider = (provider = '') => {
    web3.setProvider(provider)
    set(state => ({
      ...state,
      web3
    }))
  }

  const networkId = web3.eth.net.getId()
  const deployedAddress = web3.eth.net.getId()

  return {
    web3: null,
    accounts: null,
    contract: null,
    setNewProvider
  }
})
