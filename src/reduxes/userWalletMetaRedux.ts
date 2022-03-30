const USERWALLETMETA = 'userwalletMeta/USERWALLETMETA' as const;

type UserWalletMetaState = {
    Metaaddress : string;
    Metaname : string;
    Metabalance : number;
}

export const UserWalletMetaAction = (data : UserWalletMetaState) => ({type : USERWALLETMETA, data : data});

const initialState : UserWalletMetaState = {
    Metaaddress : '',
    Metaname : 'Metamask',
    Metabalance : 0,
};

type UserWalletActionType =
    | ReturnType<typeof UserWalletMetaAction>;

function UserWalletMetaReducer(state : UserWalletMetaState = initialState , action : UserWalletActionType) : UserWalletMetaState {
    switch(action.type) {
        case USERWALLETMETA : {
            return {
                ...state,
                Metaaddress : action.data.Metaaddress,
                Metaname : action.data.Metaname,
                Metabalance : action.data.Metabalance
            }
        }
        default : {
            return {
                ...state
            }
        }
    }
}

export default UserWalletMetaReducer;