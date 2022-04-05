const USERWALLETKAI = "userwalletKai/USERWALLETKAI" as const;

type UserWalletKaiState = {
    Kaiaddress: string;
    Kainame: string;
    Kaibalance: number;
    Kaiconnect: boolean;
};

export const UserWalletKaiAction = (data: UserWalletKaiState) => ({
    type: USERWALLETKAI,
    data: data,
});

const initialState: UserWalletKaiState = {
    Kaiaddress: "",
    Kainame: "Kaikas",
    Kaibalance: 0,
    Kaiconnect: false,
};

type UserWalletActionType = ReturnType<typeof UserWalletKaiAction>;

function UserWalletKaiReducer(
    state: UserWalletKaiState = initialState,
    action: UserWalletActionType
): UserWalletKaiState {
    switch (action.type) {
        case USERWALLETKAI: {
            return {
                ...state,
                Kaiaddress: action.data.Kaiaddress,
                Kainame: action.data.Kainame,
                Kaibalance: action.data.Kaibalance,
                Kaiconnect: action.data.Kaiconnect,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}

export default UserWalletKaiReducer;
