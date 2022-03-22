import { exampleActionType } from "store/actions/exampleAction"

const initialState = {
    name : '지훈',
    email : 'easyhoo@sdsad.com'
}

const ExampleReducer = (state = initialState, action : exampleActionType) => {
    switch(action.type) {
        case 'EXAMPLE' : {
            return {
                ...state,
                name : action.data.name,
                email : action.data.email
            }
        }
        default : {
            return {
                ...state
            }
        }
    }
}

export default ExampleReducer;