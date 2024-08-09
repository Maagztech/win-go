import cryptojs from "crypto-js";
import { ethers } from "ethers";
import axios from "axios";
import { deleteCookie } from "cookies-next";
import { randomBytes } from "crypto-browserify";
const BASE_URL = "https://prod-api.komet.me/";

export const avatars = [
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/pfp%2FPFP-1.png?alt=media&token=0e0c7edf-4adc-4403-8876-27274b63f6e3',
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/pfp%2FPFP-10.png?alt=media&token=582317f7-45c1-4734-999d-025a9bd4cb52',
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/pfp%2FPFP-11.png?alt=media&token=fcb751be-dc10-4280-b9f3-45a05ce3c7e1',
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/pfp%2FPFP-12.png?alt=media&token=4d36162b-13b2-4d28-8c34-6226318a9c3d',
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/pfp%2FPFP-13.png?alt=media&token=a2ebf0d6-3acd-49a3-ae90-da2648267bef',
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/pfp%2FPFP-14.png?alt=media&token=d7380fb2-8f77-4737-8c2a-507873af00bd',
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/pfp%2FPFP-15.png?alt=media&token=9be15299-1404-4305-a8ab-0314641c8c1d',
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/pfp%2FPFP-16.png?alt=media&token=95bdb94e-e841-48eb-a4d2-0d5881effffa',
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/pfp%2FPFP-17.png?alt=media&token=1b90c1db-0b2f-47bb-bbe3-828c956f6bea',
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/pfp%2FPFP-18.png?alt=media&token=3db6743d-75e9-4c4d-bc96-667854cda66a',
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/pfp%2FPFP-19.png?alt=media&token=a6873c6c-5c69-49cc-9dc7-a2d13acc6d2e',
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/PFPs%2F14.png?alt=media&token=eea1bb3d-b60d-4484-b4f8-1f1adc013a94&_gl=1*3bvut5*_ga*OTMyMDkwMDQxLjE2NzE1NTQ0MzI.*_ga_CW55HF8NVT*MTY4NjIzOTg0MC4xMTkuMS4xNjg2MjQxMTg2LjAuMC4w',
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/PFPs%2F15.png?alt=media&token=9fb99136-335a-49c0-ae71-f2a31c6bf4e5&_gl=1*gsr9a9*_ga*OTMyMDkwMDQxLjE2NzE1NTQ0MzI.*_ga_CW55HF8NVT*MTY4NjIzOTg0MC4xMTkuMS4xNjg2MjQxMTk4LjAuMC4w',
    'https://firebasestorage.googleapis.com/v0/b/generated-surf-349813.appspot.com/o/PFPs%2F18.png?alt=media&token=645fe445-652d-4bfe-90ac-6c625b0d4a43&_gl=1*1ume54q*_ga*OTMyMDkwMDQxLjE2NzE1NTQ0MzI.*_ga_CW55HF8NVT*MTY4NjIzOTg0MC4xMTkuMS4xNjg2MjQxMjEwLjAuMC4w',
]

export const getProfileImage = (userId) => {
    if (typeof window !== "undefined") {
        const user = userId;
        const id = userId || 0;
        let image = "";
        //toast(id%10)
        image = avatars[id % 10] || avatars[0];
        return image;
    }
    else {
        return avatars[0]
    }
};


export const fetchUser = async (token) => {
    if (token == null) {
        try {
            const result = await axios.get(
                `${BASE_URL}v1/api/auth/user/v1/details`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return result.data;
        } catch (err) {
            deleteCookie("auth");
        }
    }
    try {
        const result = await axios.get(
            `${BASE_URL}v1/api/auth/user/v1/details`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return result.data;
    } catch (err) {
        deleteCookie("auth");
        localStorage.clear();
        window.location.reload();
    }
};

export function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export const checkEmailAccountExists = async (email) => {
    const result = await axios.get(`${BASE_URL}auth/checkEmail?email=${email}`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    });
    return result;
};

export const fetchSeed = async (
    token,
    accessToken,
    address
) => {
    try {
        const result = await axios.post(
            `${BASE_URL}userSeed/fetch?walletAddress=${address}`,
            {
                token,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return result;
    } catch (error) {
        console.log("an error occured");
    }

};


export const login = async (emailId, accessToken) => {

    const body = {
        emailId: emailId,
        loginProvider: "GMAIL",
        loginContext: {
            googleIdToken: accessToken
        }
    }

    const result = await axios.post(
        `${BASE_URL}v1/api/auth/login/v1/user`,
        body,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return result;
};

export const slotRegister = async (token) => {
    try {
        const response = await axios.post(
            'https://sdk.komet.me/slot/register',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return true;
    } catch (error) {
        await spin3(token);
        return false;
    }
};

export const spin3 = async (token) => {
    try {
        await axios.post(
            'https://sdk.komet.me/slot/signin-spin-update',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    } catch (error) {

    }
}


export const generateSeedPhrase = async () => {
    const random = randomBytes(16);
    const mnemonic = await bip39.entropyToMnemonic(random.toString("hex"));
    return mnemonic;
};

export const checkUserName = async (name) => {
    const result = await axios.get(
        `${BASE_URL}auth/checkUserName?userName=${name}`
    );
    return result;
};

export const RegisterNewUser = async (
    username,
    accessToken,
    email,
) => {
    const response = await axios.post(
        `${BASE_URL}v1/api/auth/user/registration/v1/register`,
        {
            username: username,
            loginProvider: "GMAIL",
            email: email,
            loginContext: {
                googleIdToken: accessToken
            }
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    )

    return response;
};


export const fetchUserStatus = async (token, router) => {
    try {
        const result = await axios.get(
            `${BASE_URL}v1/api/auth/user/v1/details`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return result.data;
    } catch (err) {
        deleteCookie("auth");
    }

};



export const SaveSeedToBackend = async (
    accessToken,
    userId,
    seed,
    address
) => {
    const result = await axios.post(
        `${BASE_URL}userSeed/add`,
        {
            userId: userId,
            seedPhrase: seed,
            walletAddress: address,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return result;
};

export const linkAddress = async (
    username,
    userId,
    email,
    address,
    BearerToken,
    type,
    registration,
) => {
    const result = await axios.post(
        `${BASE_URL}user/saveWallet`,
        {
            username: username,
            userId: userId,
            email: email != null ? email : "",
            walletAddress: address,
            type: type,
            registration: registration
        },
        {
            headers: {
                Authorization: `Bearer ${BearerToken}`,
            },
        }
    );

    return result;
};

export const decryptData = async (encrypted, key) => {
    const decrypted = await cryptojs.AES.decrypt(encrypted, key)
    const text = decrypted.toString(cryptojs.enc.Utf8);
    return text;
};

export const getOneAccountDetails = (mnemonic) => {
    if (typeof window !== "undefined") {
        const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
        const firstAccount = hdNode.derivePath("m/44'/60'/0'/0/0");
        return firstAccount;
    }
};

export const encryptData = async (message, key) => {
    const encrypted = await cryptojs.AES.encrypt(message, key);
    return encrypted.toString();
};