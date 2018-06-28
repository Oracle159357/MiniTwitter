const initialState = {
  users: [],
  currentLogin: '',
};

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      if (state.users.findIndex(({ login }) => login === action.payload) === -1) {
        return {
          ...state,
          currentLogin: action.payload,
          users: [...state.users, { login: action.payload, posts: [] }],
        };
      }
      return {
        ...state,
        currentLogin: action.payload,
      };
    case 'ADD_POST': {
      const index = state.users.findIndex(({ login }) => login === state.currentLogin);
      return {
        ...state,
        users: [...state.users.map((user, i) => i === index ? {
          login: user.login,
          posts: [...user.posts, {
            title: action.payload.title,
            body: action.payload.body,
            comments: [{ loginWhoLeft: '', textOfComment: '' }],
          }],
        } : user)],
      };
    }
    case 'ADD_COMMENT': {
      const indexLogin = state.users.findIndex(({ login }) => login === action.payload.login);
      const indexPost = state.users[indexLogin].posts.findIndex(({ title }) => title === action.payload.title);
      return {
        ...state,
        users: [...state.users.map((user, i) => i === indexLogin ? {
          login: user.login,
          posts: [...user.posts.map((post, j) => j === indexPost ? {
            title: post.title,
            body: post.body,
            comments: [...post.comments, action.payload.comment],
          } : post)],
        } : user)],
      };
    }
    default:
      return state;
  }
};
