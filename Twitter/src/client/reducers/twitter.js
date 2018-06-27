const initialState = {
    users: [],
    tempLogin: "",

};


export const posts = (state = initialState, action) => {
    if (action.type === 'ADD_USER') {
        state.tempLogin = action.login;

        return {
            ...state,
            users: [...state.users, {login: action.login, posts: []}]
        }
    }
    if (action.type === 'ADD_POST') {
        const index = state.users.findIndex(({login}) => login === state.tempLogin);
        return {
            ...state, users: [...state.users.map((user, i) => i === index ? {
                login: user.login,
                posts: [...user.posts, {
                    title: action.post.title,
                    body: action.post.body,
                    comments: [{loginWhoLeft: '', textOfComment: ''}]
                }]
            } : user)]
        }
    }
    if (action.type === 'ADD_COMMENT') {
        const index = state.users.findIndex(({login}) => login.login === action.payload.login);
        const index2 = state.users[index].posts.findIndex(({title}) => title === action.payload.title);
        return {
            ...state, users: [...state.users.map((user, i) => i === index ? {
                login: user.login,
                posts: [...user.posts.map((post, i) => i === index2 ? {
                    title: post.title,
                    body: post.body,
                    comments: [...post.comments, action.payload.comment]
                } : post)]
            } : user)]
        }
    }

    return state
};