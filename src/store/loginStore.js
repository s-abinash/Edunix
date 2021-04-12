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
            state=login;
        },
        resetStore(state)
        {
            Object.assign(state, getDefaultState())
        }
    },
    getters: {
        isAuthenticated: state => {
            return state.auth
        }
    }
}