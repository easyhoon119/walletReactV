export const isWalletMeta = () => {
    if (typeof window.ethereum !== "undefined") {
        return true;
    }

    return false;
};

export const isDownloadMeta = () => {
    if (isWalletMeta() === true) {
        return true;
    } else {
        alert("You can use it after installing the Metamask wallet.");
        window.open(
            "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko"
        );
        return false;
    }
};

export const beforeWalletCheckMeta = () => {
    if (isDownloadMeta() === false) {
        return false;
    }

    return true;
};

export const isConnectMeta = (webEth: any, eth: any) => {
    if (
        getAccountMeta(webEth, eth) === null ||
        getAccountMeta(webEth, eth) === false ||
        typeof getAccountMeta(webEth, eth) === "undefined"
    ) {
        return false;
    }

    return true;
};

export const getAccountMeta = (webEth: any, eth: any) => {
    if (webEth.chainId === 1) {
        try {
            return eth.selectedAddress;
        } catch (e) {
            console.log(e);
        }
    }

    return false;
};

export const connectWalletMeta = async (eth: any) => {
    const accounts = await eth.enable();
    const account = accounts[0];

    return account;
};

export const connectedWalletMeta = async (address: any, eth: any) => {
    if (address === null) {
        return {
            address: address,
            balance: 0,
        };
    }

    const balanceReturn = await getBalanceMeta(address, eth);

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

export const getBalanceMeta = async (address: any, eth: any) => {
    if (address === null) {
        return false;
    }
    const accounts = await eth.request({
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [address, "latest"],
    });

    return parseInt(accounts, 16);
};

export const signMeta = async (message: any, webEth: any, eth: any) => {
    const address = getAccountMeta(webEth, eth);
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

export const handleConnectMeta = () => {
    if (!window.ethereum.selectedAddress) {
        if (beforeWalletCheckMeta() === true) {
            connectWalletMeta(window.ethereum).then((addr) => {
                console.log(addr);
            });
        }
    } else {
        console.log("Metamask is already connected");
    }
};
