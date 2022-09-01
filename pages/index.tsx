import type { NextPage } from 'next'
import Head from 'next/head'
import Safe, { SafeFactory, SafeAccountConfig } from '@gnosis.pm/safe-core-sdk'
import { ethers } from 'ethers'
import EthersAdapter from '@gnosis.pm/safe-ethers-lib'
import SafeServiceClient from '@gnosis.pm/safe-service-client'
import styles from '../styles/Home.module.css'
import { useMoralis, useChain } from 'react-moralis'
import Web3Modle from 'web3modal'
import { useEffect, useState } from 'react'



const Home: NextPage = () => {
  const [adapter, setAdapter] = useState<any>()
  const [address, setAddress] = useState<string[]>()

  const { enableWeb3  } = useMoralis()

// const web3Provider = provider

// const load = async () => {
//   const web3modal = new Web3Modle()
//   const connection = await web3modal.connect()
//   const provider = new ethers.providers.Web3Provider(connection)

//   const safeOwner = provider.getSigner(0)

//   const ethAdapter = new EthersAdapter({
//     ethers,
//     signer: safeOwner
//   })

//   console.log(ethAdapter, safeOwner)
//   setAdapter(ethAdapter)
// }

//   const createSafe = async () => {

//   const ethAdapter:EthersAdapter = adapter;

//   const safeFactory = await SafeFactory.create({ ethAdapter })

//   const owners = ['0x<address>', '0x<address>', '0x<address>']
//   const threshold = 3
//   const safeAccountConfig: SafeAccountConfig = {
//     owners,
//     threshold,
//     // ...
//   }

//   const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig }) 
//   }


//   useEffect(() => {
//     load()
//   }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Create Transactions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <main>
    
    </main>
    </div>
  )
}

export default Home
