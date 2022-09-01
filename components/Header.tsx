import type { NextPage } from 'next'
import Link from 'next/link';
import { ConnectButton } from 'web3uikit'
import Web3Model from 'web3modal'
import { ethers } from 'ethers';
import { useState } from 'react';
const providerOptions = {

}

const Header: NextPage = () =>  {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [web3Provider, setWeb3Provider] = useState({})

  // const connectWallet = async () => {

  //   try {
  //     let web3modal = new Web3Model({
  //       cacheProvider: false,
  //       providerOptions
  //     })
  //     const web3ModelInstance = await web3modal.connect()
  //     const web3modalProvider = new ethers.providers.Web3Provider(web3ModelInstance)
  //     console.log(web3modalProvider)
  //     if (web3modalProvider) {
  //       // eslint-disable-next-line react-hooks/rules-of-hooks
  //       setWeb3Provider(web3modalProvider)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

  return(
    <div>

      <nav className='px-5 py-4 flex justify-between'>
        <div className='flex space-x-96'>
          <img className='w-[125px] h-[33px]' src="/img/usher-logo.png" alt="" />
          <div>
            <ul className='flex space-x-10 pt-1'>
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
        <ConnectButton moralisAuth={false} />
        </div>
      </nav>

    </div>
  )

}

export default Header