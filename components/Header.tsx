import type { NextPage } from 'next'
import Link from 'next/link';
import Web3Model from 'web3modal'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from 'ethers';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { shortenAddress } from '../utils/shortAddress';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.NEXT_PUBLIC_infuraId // required
    }
  }
}

const Header: NextPage = () =>  {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()

  const connectWallet = async () => {

    try {
      let web3modal = new Web3Model({
        cacheProvider: false,
        providerOptions
      })
      const web3ModelInstance = await web3modal.connect()
      const web3modalProvider = new ethers.providers.Web3Provider(web3ModelInstance)
      web3modalProvider.send("eth_requestAccounts", [])
      .then((accounts)=>{
        if(accounts.length>0) {
          setCurrentAccount(accounts[0])
        }
      }).catch((e)=>console.log(e))

    } catch (error) {
      console.log(error)
    }

  }

  const onClickDisconnect = () => {
    console.log("onClickDisConnect")
    setCurrentAccount(undefined)
  }

  return(
    <div>

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

    </div>
  )

}

export default Header