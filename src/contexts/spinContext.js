"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useGlobal } from './globalContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { encryptData, bSpin, fetchERC20TokenData, getHistory, getReferal, getStreaks, getMultiplier, reward, updateSpin, updateStreaks, userSpin, referalApi, findGas } from '@/data/spinData';
import { spin3 } from '@/data/globalData';

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
  const [low, setLow] = useState(false);
  const [onmeta, setOnmeta] = useState(false);
  const [order, setOrder] = useState(false);
  const [referalPoints, setReferalPoints] = useState(0);



  const fetchData = async () => {
    let result = await userSpin(userData.auth);
    setSpin(result);
    result = await getStreaks(userData.auth);
    setStreak(result ? result : 1);
    result = await getMultiplier(userData.auth);
    setMultiplier(result);
    result = await fetchERC20TokenData(userData.address);
    setBalance(result);
    result = await getHistory(userData.auth)
    setHistory(result.reverse());
    let berryPoints = result
      .filter(item => item.type === 'berry')
      .reduce((acc, item) => acc + item.points, 0);
    berryPoints = berryPoints % 1 ? berryPoints.toFixed(1) : berryPoints.toFixed(0);
    const btcPoints = result.filter(item => item.type === 'btc').reduce((acc, item) => acc + item.points, 0);
    setBerry(berryPoints);
    setBit(btcPoints);
    result = await getReferal(userData.auth);
    setReferal(result.referal_code);
    setReferalPoints(result.points - 1);
    axios.get('https://sdk.komet.me/bridge/convert?symbol=BTC').then(response => setRate(response.data.rate)).catch(err => setRate(67058.80));
    result = await axios.get("https://sdk.komet.me/slot/pool-status").then(response => setPool(response.data)).catch(err => setPool(null));
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

  useEffect(() => { if (balance * rate < 1 / 3) { setLow(true); } }, [balance, rate])

  const [bspin, setBspin] = useState(0);
  const buySpin = async (spin, setTopup) => {
    const res = await findGas();
    if (res + spin / 3 <= balance) {
      alert("Total amount to be deducted  $" + gas + spin / 3)
      await bSpin(userData.auth, spin);
      let result = await userSpin(userData.auth);
      setSpin(result);
      toast(spin + " Spins Added to Your Account.")
    }
    else {
      setBspin(spin);
      setOnmeta(true)
      setTopup(true);
    }
  }

  const onmeta_fun = async (w) => {
    const address = userData?.address;
    const email = userData?.email;
    if (rate * 84 * w < 50) toast("Minimum amount for topup is 50INR.")
    /* global onMetaWidget */
    // @ts-ignore
    if (document?.getElementById("widget")?.innerHTML === "") {
      if ("OnMetaWidget") {
        // @ts-ignore
        let createWidget = new onMetaWidget({
          elementId: "widget",
          apiKey: "900971f7-56c8-4c66-a3e2-c687f3590e8b",
          walletAddress: address,
          userEmail: email,
          chainId: "137",
          fiatAmount: rate * 84 * w < 50 ? 50 : rate * 84 * w,
          fiatType: "inr",
          tokenAddress: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
        });
        createWidget.init();
        createWidget.on("ORDER_COMPLETED_EVENTS", async (status) => { await fetchData(); setOnmeta(false); setOrder(true); });

      } else {
        console.error("Widget element not found");
      }
    } else {
      console.error("onMetaWidget is not defined");
    }
  };

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

  const [signInDate, setSignInDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const checkDateChange = async () => {
      const currentDate = new Date().toISOString().split('T')[0];
      if (currentDate !== signInDate) {
        await spin3(userData.auth);
        setSignInDate(currentDate);
        fetchData();
      }
    };

    const intervalId = setInterval(checkDateChange, 60 * 1000 * 5);

    if (userData?.auth)
      checkDateChange();

    return () => clearInterval(intervalId);
  }, [signInDate, userData]);

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
    <SpinContext.Provider value={{ collectReward, onmeta_fun, referalPoints, bspin, setBspin, onmeta, setOnmeta, low, fetchBal, refaral, pool, historyVisible, setHistoryVisible, buySpin, referal, rate, history, setHistory, spinResult, setSpinResult, spin, streak, berry, balance, bit, multiplier }}>
      {children}
    </SpinContext.Provider>
  );
};

export const useSpin = () => useContext(SpinContext);
