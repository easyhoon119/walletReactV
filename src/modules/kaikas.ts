export const isWalletKai = () => {
    if (typeof window.klaytn !== "undefined") {
        return true;
    }

    return false;
};

export const isDownloadKai = () => {
    if (isWalletKai() === true) {
        return true;
    } else {
        alert("You can use it after installing the Kaikas wallet.");
        window.open(
            "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=ko"
        );
        return false;
    }
};

export const beforeWalletCheckKai = () => {
    if (isDownloadKai() === false) {
        return false;
    }

    return true;
};

export const isConnectKai = (webEth: any, klay: any) => {
    if (
        getAccountKai(webEth, klay) === null ||
        getAccountKai(webEth, klay) === false ||
        typeof getAccountKai(webEth, klay) === "undefined"
    ) {
        return false;
    }

    return true;
};

export const getAccountKai = (webEth: any, klay: any) => {
    if (webEth.chainId === 1) {
        try {
            return klay.selectedAddress;
        } catch (e) {
            console.log(e);
        }
    }

    return false;
};

export const connectWalletKai = async (klaytn: any) => {
    const accounts = await window.klaytn.enable();
    const account = accounts[0];

    return account;
};

export const connectedWalletKai = async (address: any, klay: any) => {
    if (address === null) {
        return {
            address: address,
            balance: 0,
        };
    }

    const balanceReturn = await getBalanceKai(address, klay);

    let balance: any = (+balanceReturn * 0.0000000001 * 0.00000001).toFixed(4);
    try {
        return {
            address: address,
            balance: balance,
        };
    } catch (e: any) {
        console.log("connectedWallet Error: " + e.massage);
    }
};

export const getBalanceKai = async (address: any, klay: any) => {
    if (address === null) {
        return false;
    }

    const balance = await window.caver.klay.getBalance(address);

    return parseInt(balance, 16);
};

export const signKai = async (message: any, webEth: any, eth: any) => {
    const address = getAccountKai(webEth, eth);
    try {
        return await eth.request({
            method: "personal_sign",
            params: [message, address],
            from: address,
        });
    } catch (e: any) {
        console.log("sign Error: " + e.message);
    }
    return false;
};

export const handelConnectKai = () => {
    if (!window.klaytn.selectedAddress) {
        connectWalletKai(window.klaytn).then((addr) => {
            console.log(addr);
        });
    } else {
        console.log("Kaikas is already connected");
    }
};
