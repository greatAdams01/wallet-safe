import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Safe, { SafeFactory, SafeAccountConfig } from '@gnosis.pm/safe-core-sdk'
import { ethers } from 'ethers'
import EthersAdapter from '@gnosis.pm/safe-ethers-lib'
import WalletConnectProvider from "@walletconnect/web3-provider";
import SafeServiceClient, { SafeInfoResponse } from '@gnosis.pm/safe-service-client'
import styles from '../styles/Home.module.css'
import Web3Model from 'web3modal'
import { useEffect, useState } from 'react'
import { shortenAddress } from '../utils/shortAddress';
import { SafeTransactionDataPartial } from '@gnosis.pm/safe-core-sdk-types';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.NEXT_PUBLIC_infuraId // required
    }
  }
}

const Home: NextPage = () => {
  const [contractCreated, setContractCreated] = useState(false)
  const [address, setAddress] = useState<string[]>([])
  const [ adapter, setAdapter ] = useState<EthersAdapter>()
  const [currentAccount, setCurrentAccount] = useState<string>('')
  const [safeAddress, setSafeAddress] = useState<string>('')
  const [inputs, setInputs] = useState({ address: "",});
  const [safeService, setSafeService] = useState<SafeServiceClient>()

 

  const connectWallet = async () => {

    try {
      let web3modal = new Web3Model({
        cacheProvider: true,
        providerOptions
      })
      const web3ModelInstance = await web3modal.connect()
      const web3modalProvider = new ethers.providers.Web3Provider(web3ModelInstance)
      web3modalProvider.send("eth_requestAccounts", [])
      .then((accounts)=>{
        if(accounts.length>0) {
          setCurrentAccount(accounts[0])
          if (address.length !== 3) {
            setAddress([ ...address, accounts[0]])
          }
        }
      }).catch((e)=>console.log(e))

    } catch (error) {
      console.log(error)
    }

  }

  const onClickDisconnect = () => {
    console.log("onClickDisConnect")
    setCurrentAccount('')
  }

  const load = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.send("eth_requestAccounts", [])
      .then((accounts)=>{
        if(accounts.length>0) {
          setCurrentAccount(accounts[0])
          if (address.length !== 3) {
            setAddress([ ...address, accounts[0]])
          }
        }
      }).catch((e)=>console.log(e))
    const safeOwner = provider.getSigner(0)

    const ethAdapter = new EthersAdapter({
      ethers,
      signer: safeOwner
    })
    const txServiceUrl = 'https://safe-transaction.gnosis.io'
    const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter })
    setSafeService(safeService)
    setAdapter(ethAdapter)
  }

  const createSafe = async (ethAdapter: any) => {

  const safeFactory = await SafeFactory.create({ ethAdapter })

  const owners = address
  const threshold = 2
  const safeAccountConfig: SafeAccountConfig = {
    owners,
    threshold,
  }

  const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig })
  const newSafeAddress = safeSdk.getAddress()
  setSafeAddress(newSafeAddress)
  setContractCreated(true) 
  // const safeInfo = await safeService?.getSafeInfo('0xa90b80BBeD85DE1732C20502862a6859Ae44A472')
  // console.log(safeInfo)
  }

  const handleChange = async (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    // event.preventDefault();
    if (!inputs.address || address.length === 3) {
      return
    }
    setAddress([ ...address, inputs.address])
  };

  const createTx = async () => {
    console.log('Fired')
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const safeOwner = provider.getSigner(0)

      const ethAdapter = new EthersAdapter({
        ethers,
        signer: safeOwner
      })
      const txServiceUrl = 'https://safe-transaction.gnosis.io'
      const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter })

      const safeSdk: Safe = await Safe.create({ ethAdapter: ethAdapter, safeAddress })
      const amount = await ethers.utils.parseEther("0.00002")
      const safeTransactionData: SafeTransactionDataPartial = {
        to: '0xc6D330E5B7Deb31824B837Aa77771178bD8e6713',
        value: '0000000000000200000',
        data: ''
      }
      const senderAddress  = currentAccount
      const safeTransaction = await safeSdk.createTransaction({ safeTransactionData })
      const signedSafeTransaction = await safeSdk.signTransaction(safeTransaction)
      console.log(signedSafeTransaction)
    } catch (error) {
      console.log(error)
    }
  } 

  useEffect(() => {
    load()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create safe wallet</title>
        <meta name="description" content="Create Transactions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <header>
    <nav className='px-5 py-5 flex justify-between'>
        <div className='flex space-x-96'>
          <img className='w-[125px] h-[35px]' src="/img/usher-logo.png" alt="" />
          <div>
            <ul className='flex space-x-10 pt-2'>
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/'>Transactions</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          {!currentAccount ? (
            
            <button className='p-2 border rounded-xl cursor-pointer' onClick={() => connectWallet()} >Connect wallet</button>
          ) : <p className='p-2 border rounded-xl cursor-pointer' onClick={() => onClickDisconnect()}>{shortenAddress(currentAccount)}</p>

          }
        </div>
      </nav>
    </header>

    <main className='px-5 text-center'>
      {/* Display create contract or list of owners */}
      { !contractCreated ? (
        <section className='py-20 mt-16 border w-[700px] m-auto rounded-xl px-5'>
          <div>
          <p className='text-xl font-semibold pb-5'>Create safe Wallet</p>
          <div className='flex space-x-5 justify-center pb-4'>
            {address.map((e, i) => 
              <p className='p-2 border rounded-xl cursor-pointer' key={i}>{shortenAddress(e)}</p>
            )}
          </div>
          <div className='space-x-4'>
          {address.length === 3 ? (
            <>
              <input onClick={() => createSafe(adapter)} className='p-2 border rounded-xl cursor-pointer' type="submit" value="Create safe" name="" id="" />
            </>
          ): (
            <>
              <input
                className='p-2 border rounded-xl outline-none'
                type="text"
                placeholder='Enter address'
                name='address'
                value={inputs?.address || ""}
                onChange={handleChange}
              />
              <input onClick={() => handleSubmit()} className='p-2 border rounded-xl cursor-pointer' type="submit" value="Add" name="" id="" />
            </>
          )}
          </div>
          </div>
        </section>
      ) :(
        <section className='mt-20'>
            <div>
              <p className='text-xl font-semibold pb-5'>Owners</p>
              <div className='flex space-x-5 justify-center pb-4'>
                {address.map((e, i) => 
                  <p className='p-2 border rounded-xl cursor-pointer zoom' key={i}>{shortenAddress(e)}</p>
                )}
            </div>
            
            <button onClick={() => createTx()} className="p-2 border rounded-xl">
              Send Tokens
            </button>
            </div>
        </section>
      )

      }
    
    </main>
    </div>
  )
}

export default Home
