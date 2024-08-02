"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { generateSeedPhrase, checkUserName, fetchUserStatus, fetchUser, parseJwt, checkEmailAccountExists, login, fetchSeed, decryptData, encryptData, getOneAccountDetails, slotRegister } from "@/data/globalData"
import { useRouter } from "next/navigation";
const APIKEY = "hl23n6dgigp2pgvtzt7sm0nw4caiau11";
const KEY = "W4DRnUcof83pbRzEFp8U24vbTr7vzSil";
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const isMobileQuery = useMediaQuery({ query: '(max-width: 800px)' });
    const [isMobile, setIsMobile] = useState(null);
    const [newUser, setNewUser] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMobile(isMobileQuery);
        }
    }, [isMobileQuery]);

    const router = useRouter();
    const [userData, setUserData] = useState();
    const [available, setAvailable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [userPannel, setUserPannel] = useState(false);
    const [mustReward, setMustReward] = useState(false);
    const getEmail = async (res) => {
        try {
            const info = parseJwt(res.credential);
            const response = await checkEmailAccountExists(info.email);
            if (response.data.isCollector == true || response.data.isGamer) {
                localStorage.setItem("email", info.email);
                loginHandleSubmit(info.email);
            } else {
                localStorage.setItem("email", info.email);
                setUserPannel(true);
            }
        } catch (error) {
            console.log("Error", error);
        }
    };


    const loginHandleSubmit = async (email) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token") || "";
            if (email != null) {
                const resp = await login(email, token);
                const bearerToken = resp.data?.success?.data?.oneFaToken;
                localStorage.setItem("auth", bearerToken);
                const u = await slotRegister(bearerToken);
                setNewUser(u);
                setMustReward(u);
                const userData = await fetchUser(bearerToken);
                const primaryAddress = userData?.success?.data?.userWallets?.filter(
                    (item) => {
                        return item?.type === "KOMET_WALLET";
                    }
                )[0];
                const userId = userData?.success?.data?.userId;
                localStorage.setItem("userid", userId);
                const address = primaryAddress?.walletAddress;
                const userEmail = userData?.success?.data?.email;
                const username = userData?.success?.data?.username;
                const res = await fetchSeed(token, bearerToken, address);
                if (res.data?.seedPhrase) {

                    localStorage.setItem("auth", bearerToken || null);
                    setCookie("auth", bearerToken, { maxAge: 60 * 60 * 24 * 14 });
                    const seedPhrase = await decryptData(res.data.seedPhrase, APIKEY);
                    const WalletInfo = getOneAccountDetails(seedPhrase);
                    if (WalletInfo) {
                        const share = await encryptData(
                            WalletInfo.privateKey,
                            KEY
                        );
                        localStorage.setItem("share", share);
                        const userInfo = {
                            username: username,
                            address: WalletInfo.address,
                            userId: userId,
                            email: userEmail,
                            auth: bearerToken,
                            share: share,
                            wallets: userData?.success?.data?.userWallets,
                        };
                        localStorage.setItem("address", WalletInfo?.address);
                        setUserData(userInfo);
                        router.push("/spin");

                    }
                }
            }
        } catch (err) {
            console.log("An error occured.", err)
        }
    };

    const UserNameAvailablity = async (name) => {
        if (name?.includes(" ")) {
            setAvailable(false);
        } else {
            const response = await checkUserName(name).catch((error) => {
                alert("Please try again after few minutes");
                console.log(error);
            });
            if (response.status == 200) {
                if (response.data == false) {
                    setAvailable(true);
                } else {
                    setAvailable(false);
                }
            }
        }
    };

    useEffect(() => { if (username != "") UserNameAvailablity(username) }, [username])

    const handleChange = (e) => {
        if (e.target.name === "username") {
            setUsername(e.target.value);
        }
    };



    const handleSubmit = async () => {
        try {
            const key = APIKEY;
            const emailAdd = localStorage.getItem("email");
            const phrase = await generateSeedPhrase();
            if (!available) {
                alert("Username not available");
                return;
            }
            if (username != "" && emailAdd != null) {
                setLoading(true);
                const accessToken = localStorage.getItem("token") || "";
                const response = await RegisterNewUser(
                    username,
                    accessToken,
                    emailAdd
                );
                const bearerToken = response.data?.success?.data?.oneFaToken;
                localStorage.setItem("auth", bearerToken);
                const u = await slotRegister(bearerToken);
                setNewUser(u);
                setMustReward(u);
                const userData = await fetchUser(bearerToken);
                const userId = userData?.success?.data?.userId;
                localStorage.setItem("userid", userId);
                console.log(response.response);
                if (response.status == 200) {
                    const text = await encryptData(phrase, key);
                    const WalletInfo = getOneAccountDetails(phrase);
                    localStorage.setItem("email", emailAdd);
                    localStorage.setItem("auth", bearerToken);
                    setCookie("auth", bearerToken, { maxAge: 60 * 60 * 24 * 14 });
                    localStorage.setItem("address", WalletInfo?.address);
                    await linkAddress(
                        username,
                        userId,
                        emailAdd,
                        WalletInfo.address,
                        bearerToken,
                        "KOMET_WALLET",
                        true
                    );
                    await SaveSeedToBackend(
                        bearerToken,
                        userId,
                        text,
                        WalletInfo.address
                    );

                    if (WalletInfo) {
                        const share = await encryptData(
                            WalletInfo.privateKey,
                            KEY
                        );
                        localStorage.setItem("share", share);
                        const userInfo = {
                            username: username,
                            userId: userId,
                            address: WalletInfo?.address,
                            email: emailAdd,
                            auth: bearerToken,
                            share: share,
                            wallets: [
                                {
                                    email: email,
                                    type: "KOMET_WALLET",
                                    userId: userId,
                                    username: username,
                                    walletAddress: WalletInfo?.address,
                                },
                            ],
                        };
                        setUserData(userInfo);
                        router.push("/spin");
                    }
                }
            }
        } catch (error) {
            console.log("an error occured", error);
        }
    };


    const logoutFromKomet = async () => {
        localStorage.removeItem("address");
        localStorage.clear();
        deleteCookie('auth')
        router.push('/')
    };

    const initializeUserData = async (auth) => {
        setLoading(true);
        const email = localStorage.getItem("email");
        const addresss = localStorage.getItem("address");
        const share = localStorage.getItem("share");
        const token = localStorage.getItem("token");
        const address = localStorage.getItem("address");

        if (!address || !token) {
            router.push("/");
            setLoading(false);
            return;
        }
        else router.push("/spin")
        const u = await slotRegister(auth);
        setNewUser(u);
        setMustReward(u);
        const res = await fetchSeed(token, auth, address);
        const seedPhrase = await decryptData(res.data.seedPhrase, APIKEY);
        const userDataRes = await fetchUserStatus(auth, router);
        const userInfo = userDataRes?.success?.data?.userWallets?.filter(
            (item, index) => {
                return item?.walletAddress === localStorage.getItem("address");
            }
        )?.[0];
        setUserData({
            address: userInfo?.walletAddress || addresss || address,
            userId: userDataRes?.success?.data?.userId,
            username: userInfo?.username || userDataRes?.success?.data?.username,
            email: userDataRes?.success?.data?.email,
            auth: auth,
            share: share,
            wallets: userDataRes?.success?.data?.userWallets,
        });
        setLoading(false)
    };


    useEffect(() => {
        setLoading(true)
        const auth = getCookie("auth");
        const bearerToken = localStorage.getItem("auth");
        if (typeof window !== "undefined") {
            if (auth || bearerToken) {
                initializeUserData(auth || bearerToken);
            }
            else {
                router.push("/");
                setLoading(false)
            }
        }
    }, []);

    return (
        <GlobalContext.Provider value={{ mustReward, setMustReward, available, username, setUsername, isMobile, logoutFromKomet, userPannel, loading, setLoading, getEmail, userData, handleChange, handleSubmit, UserNameAvailablity, username, setUsername, newUser, setNewUser, userPannel, setUserPannel }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);
