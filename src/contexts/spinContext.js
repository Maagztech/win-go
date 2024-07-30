"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useGlobal } from './globalContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { encryptData, bSpin, fetchERC20TokenData, getHistory, getReferal, getStreaks, getMultiplier, reward, updateSpin, updateStreaks, userSpin, referalApi, findGas } from '@/data/spinData';

const SpinContext = createContext();
export const SpinProvider = ({ children }) => {
  const { userData, setLoading } = useGlobal();
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
  const [historyVisible, setHistoryVisible] = useState(false);
  const [pool, setPool] = useState(null);
  const [gas, setGas] = useState(0);
  const fetchData = async () => {
    let result = await userSpin(userData.auth);
    setSpin(result);
    result = await getStreaks(userData.auth);
    setStreak(result);
    result = await getMultiplier(userData.auth);
    setMultiplier(result);
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
    result = await axios.get("https://sdk.komet.me/slot/pool-status");
    setPool(result.data);
  }

  const fetchBal = async () => {
    result = await fetchERC20TokenData(userData.address);
    setBalance(result);
  }

  useEffect(() => {
    if (userData?.address) {
      fetchData();
    }
  }, [userData])




  const buySpin = async (spin, setTopup) => {
    const res = await findGas();
    if (res + spin / 3 <= balance) {
      alert("Total amount to be deducted  $" + gas + spin / 3)
      await bSpin(userData.auth, spin);
      let result = await userSpin(userData.auth);
      setSpin(result);
      toast("Success")
    }
    else {
      toast("Fund your account.")
      setTopup(true);
    }
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
    if (spinResult.type) {
      const data = await encryptData({
        points: spinResult.points,
        type: spinResult.type,
        key: createCode(10),
      })
      await reward(data, userData.auth);
    }
    await updateSpin(userData.auth);
    await updateStreaks(userData.auth);
    await fetchData();
  }


  useEffect(() => {
    if (!spinResult) return;
    collectReward();
  }, [spinResult])


  const refaral = async (referal_code) => {
    try {
      await referalApi(referal_code, userData.auth);
      await fetchData();
      toast("Success...")
    } catch (error) {
      toast("An error occured. Try again...")
    }
  }

  return (
    <SpinContext.Provider value={{ collectReward, fetchBal, refaral, pool, historyVisible, setHistoryVisible, buySpin, referal, rate, history, setHistory, spinResult, setSpinResult, spin, streak, berry, balance, bit, multiplier }}>
      {children}
    </SpinContext.Provider>
  );
};

export const useSpin = () => useContext(SpinContext);
