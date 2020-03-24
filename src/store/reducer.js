const defaultState = {
    currentRoute: JSON.parse(sessionStorage.getItem('currentRoute')) || ['/dashbord'],
    navTitle: JSON.parse(sessionStorage.getItem("navTitle")) || ['主页']
}

export default (state = defaultState, action) => {
    if (action.type === 'SET_CURRENTROUTE') {
        let newState = JSON.parse(JSON.stringify(state))
        newState.currentRoute = action.value
        sessionStorage.setItem('currentRoute', JSON.stringify(action.value))
        return newState
    }
    if (action.type === 'SET_NAVTITLE') {
        let newState = JSON.parse(JSON.stringify(state))
        newState.navTitle = action.value
        sessionStorage.setItem('navTitle', JSON.stringify(action.value))
        return newState
    }
    return state
}