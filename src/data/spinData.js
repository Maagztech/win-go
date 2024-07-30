import axios from "axios";

export const encryptData = async (message) => {
    try {
        const response = await axios.post('/api/encrypt-message', { message });
        return response.data.encrypted;
    } catch (error) {
        console.error('Error encrypting message:', error);
    }
};


export const userSpin = async (token) => {
    try {
        const response = await axios.get(
            'https://sdk.komet.me/slot/spins-left',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.spinsLeft
    } catch (error) {
        return 0;
    }
};

export const updateSpin = async (token) => {
    try {
        const response = await axios.post(
            'https://sdk.komet.me/slot/update-spin',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        return { error: error.response?.data || 'Failed to update spin' };
    }
};

export const bSpin = async (token, spin) => {
    try {
        const response = await axios.post(
            'https://sdk.komet.me/slot/buy',
            { spin },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        return { error: error.response?.data || 'Failed to update spin' };
    }
};


export const getStreaks = async (token) => {
    try {
        const response = await axios.get(
            'https://sdk.komet.me/slot/streaks',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.streaks;
    } catch (error) {
        return 0;
    }
};

export const getMultiplier = async (token) => {
    try {
        const response = await axios.get(
            'https://sdk.komet.me/slot/multiplier',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.multiplier;
    } catch (error) {
        return 0;
    }
};

export const updateStreaks = async (token) => {
    try {
        const response = await axios.post(
            'https://sdk.komet.me/slot/update-streaks',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        return { error: error.response?.data || 'Failed to update streaks' };
    }
};

export const getHistory = async (token) => {
    try {
        const response = await axios.get(
            'https://sdk.komet.me/slot/getUserRewardHistory',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        return [];
    }
};

export const getReferal = async (token) => {
    try {
        const response = await axios.get(
            'https://sdk.komet.me/slot/getReferalInfo',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data[0].referal_code;
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message); // Log error details
        return "";
    }
};

export const reward = async (data, token) => {
    try {
        const response = await axios.post(
            'https://sdk.komet.me/slot/save', { data },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        return { error: error.response?.data || 'Failed to update streaks' };
    }
}

export const fetchERC20TokenData = async (address) => {
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImY4Njg5N2Q3LTlhZTYtNDc2NS04N2JjLWVmNGY5YzFkNDU4MyIsIm9yZ0lkIjoiMzIzNjMwIiwidXNlcklkIjoiMzMyNjk3IiwidHlwZUlkIjoiMDc3NTk3ZDctZGEzZS00MDkyLTlkOTctZmMwYTI3M2EyMWRlIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODIwNjA1NDIsImV4cCI6NDgzNzgyMDU0Mn0.Qm6KAwiKj43H0Psz80Y6GESNAz8v2D2p1A7QyTznS7E";

    try {
        const response = await axios.get(
            `https://deep-index.moralis.io/api/v2.2/${address}/erc20?chain=polygon&token_addresses%5B0%5D=0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6`,
            {
                headers: {
                    accept: 'application/json',
                    'X-API-Key': apiKey
                }
            });
        return parseFloat(response.data[0].total_supply_formatted).toFixed(4);
    } catch (error) {
        return 0;
    }
};

export const fetchPool = async () => {
    try {
        const response = await axios.get("https://sdk.komet.me/slot/pool-status");
        return response.data;
    } catch (error) {
        return null
    }
}

export const referalApi = async (referal_code, token) => {
    const response = await axios.post(
        'https://sdk.komet.me/slot/update-referal',
        { referal_code },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};
