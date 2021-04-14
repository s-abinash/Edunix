const getDefaultState = () => {
    return {
        id:'',
        userid:'',
        token:'',
        auth: false
    }
}
export default{
    namespaced: true,
    state:getDefaultState(),
    mutations:{
        updateLogin(state,login) {
            Object.assign(state, login)
        },
        resetStore(state)
        {
            Object.assign(state, getDefaultState())
        }
    },
    getters: {
        isAuthenticated: state => {
            return state.auth
        },
        token: state => {
            return state.token
        }
    }
}