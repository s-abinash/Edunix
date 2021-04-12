const getDefaultState = () => {
    return {

    }
}

export default{
    namespaced: true,
    state: getDefaultState(),
    mutations:{
        resetStore(state)
        {
            Object.assign(state, getDefaultState())
        }
    }
}