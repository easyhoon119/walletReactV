type ExActionData = {
    name : string,
    email : string
}

export const ExampleAction = (data : ExActionData) => {
    return {
        type : "EXAMPLE",
        data : data
    }
}

export type exampleActionType = ReturnType<typeof ExampleAction>;