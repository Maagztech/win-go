"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useGlobal } from './globalContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { encryptData, bSpin, fetchERC20TokenData, getHistory, getReferal, getStreaks, reward, updateSpin, updateStreaks, userSpin } from '@/data/spinData';

const SpinContext = createContext();
export const SpinProvider = ({ children }) => {
  const { userData } = useGlobal();
  const [spinResult, setSpinResult] = useState(null);
  const [spin, setSpin] = useState(0);
  const [streak, setStreak] = useState(0);
  const [berry, setBerry] = useState(0);
  const [balance, setBalance] = useState(0);
  const [bit, setBit] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [history, setHistory] = useState([])
  const [referal, setReferal] = useState(null);
  const [rate, setRate] = useState(67058.80)
  const fetchData = async () => {
    let result = await userSpin(userData.auth);
    setSpin(result);
    result = await getStreaks(userData.auth);
    setStreak(result);
    result = await fetchERC20TokenData(userData.address);
    setBalance(result);
    result = await getHistory(userData.auth)
    setHistory(result);
    const berryPoints = result.filter(item => item.type === 'berry').reduce((acc, item) => acc + item.points, 0);
    const btcPoints = result.filter(item => item.type === 'btc').reduce((acc, item) => acc + item.points, 0);
    setBerry(berryPoints);
    setBit(btcPoints);
    result = getReferal(userData.auth);
    setReferal(result);
    result = await axios.get('https://sdk.komet.me/bridge/convert?symbol=BTC');
    setRate(result.data.rate || 67058.80);
  }

  useEffect(() => {
    if (userData?.address) {
      fetchData();
    }
  }, [userData])


  const buySpin = async (spin) => {
    await bSpin(userData.auth, spin);
    let result = await userSpin(userData.auth);
    setSpin(result);
  }

  function createCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const collectReward = async () => {
    console.log("spinResult", spinResult)
    const data = await encryptData(JSON.stringify({
      points: spinResult.points,
      type: spinResult.type,
      key: createCode(10),
    }))
    await reward(data, userData.auth);
    await updateSpin(userData.auth);
    await updateStreaks(userData.auth);
    await fetchData();
    toast("success...")
  }

  useEffect(() => {
    if (spinResult) {
      collectReward();
    }
  }, [spinResult])

  return (
    <SpinContext.Provider value={{ buySpin, referal, rate, history, setHistory, spinResult, setSpinResult, spin, streak, berry, balance, bit, multiplier }}>
      {children}
    </SpinContext.Provider>
  );
};

export const useSpin = () => useContext(SpinContext);
