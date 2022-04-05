const EXAMPLE = "example/EXAMPLE" as const;

type ExampleState = {
    name: string;
    email: string;
};

export const ExampleAction = (data: ExampleState) => ({
    type: EXAMPLE,
    data: data,
});

const initialState: ExampleState = {
    name: "지훈",
    email: "easy@gmail.com",
};

type ExampleActionType = ReturnType<typeof ExampleAction>;

function ExampleReducer(
    state: ExampleState = initialState,
    action: ExampleActionType
): ExampleState {
    switch (action.type) {
        case EXAMPLE: {
            return {
                ...state,
                name: action.data.name,
                email: action.data.email,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}

export default ExampleReducer;
