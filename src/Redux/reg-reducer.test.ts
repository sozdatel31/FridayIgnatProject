import registrationReducer, { InitialStateType, setAppErrorAC, setIsInitializedAC } from "./reg-reducer";


let state: InitialStateType;

beforeEach(() => {
    state =
    {
        error: null,
        isInitialized: false
    }

})

test('test set-Error', () => {
    let action = setAppErrorAC("error")
    let newState = registrationReducer(state, action)
    expect(newState.error).toBe("error")
    expect(newState.isInitialized).toBe(false)
});

test('test set-is-initialized', () => {
    let action = setIsInitializedAC(true)
    let newState = registrationReducer(state, action)
    expect(newState.isInitialized).toBe(true)
    expect(newState.error).toBe(null)
});