export const setNumberofQustions = (num) =>{
    return {
        type : 'SET_QUSTION_COUNT',
        payload : num
    }
}

export const setCategoryofQustions = (category) =>{
    return {
        type : 'SET_QUSTION_CATEGORY',
        payload : category
    }
}

export const setDifficultyofQustion = (difficulty) =>{
    return {
        type : 'SET_QUSTION_DIFFICULTY',
        payload : difficulty
    }
}

export const setTypeofQustion = (qusType) =>{
    return {
        type : 'SET_QUSTION_TYPE',
        payload : qusType
    }
}