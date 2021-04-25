const getDefaultState = () => {
    return {
        id:'',
        userid:'',
        name: '',
        token:'',
        auth: false,
        admin:false
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
        isAdmin: state => {
            return state.auth && state.admin
        },
        token: state => {
            return state.token
        }
    }
}