const initialState = JSON.parse(localStorage.getItem('attribute')) || {
    questionCount : 0,
    questionCategory : '',
    questionDifficulty : '',
    questionType : ''
}

const quizReducers = (state = initialState,action) =>{
    let updatedObject = {}
    switch(action.type){
        case 'SET_QUSTION_COUNT':
            updatedObject = {
                ...state,
                questionCount : action.payload
            }
            localStorage.setItem('attribute',JSON.stringify(updatedObject))
            return updatedObject
        
            case 'SET_QUSTION_CATEGORY':
                updatedObject = {
                    ...state,
                    questionCategory : action.payload
                }
                localStorage.setItem('attribute',JSON.stringify(updatedObject))
                return updatedObject
            
            case 'SET_QUSTION_DIFFICULTY':
                updatedObject = {
                    ...state,
                    questionDifficulty : action.payload
                }
                localStorage.setItem('attribute',JSON.stringify(updatedObject))
                return updatedObject
            
            case 'SET_QUSTION_TYPE':
                updatedObject = {
                    ...state,
                    questionType : action.payload
                }
                localStorage.setItem('attribute',JSON.stringify(updatedObject))
                return updatedObject
            
            default:
                return state
    }
}

export default quizReducers