const NOWMEDIAQUERY = "nowMediaQuery/NOWMEDIAQUERY" as const;

type NowMediaQueryState = {
    isPc: boolean;
};

export const NowMediaQueryAction = (data: NowMediaQueryState) => ({
    type: NOWMEDIAQUERY,
    data: data,
});

const initialState: NowMediaQueryState = {
    isPc: false,
};

type NowMediaQueryActionType = ReturnType<typeof NowMediaQueryAction>;

function NowMediaQueryReducer(
    state: NowMediaQueryState = initialState,
    action: NowMediaQueryActionType
): NowMediaQueryState {
    switch (action.type) {
        case NOWMEDIAQUERY: {
            return {
                ...state,
                isPc: action.data.isPc,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}

export default NowMediaQueryReducer;
