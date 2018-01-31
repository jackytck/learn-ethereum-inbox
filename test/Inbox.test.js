const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

const provider = ganache.provider()
const web3 = new Web3(provider)

const { interface, bytecode } = require('../compile')

let accounts
let inbox

beforeEach (async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()

  // use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface)) // init contract
    .deploy({ data: bytecode, arguments: ['Hi there!'] }) // create deploy object
    .send({ from: accounts[0], gas: 1000000 }) // send to network

  inbox.setProvider(provider)
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address)
  })
})