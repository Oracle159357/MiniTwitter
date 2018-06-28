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

// if (actions.type === 'ADD_USER') {
//   if (state.users.findIndex(({ login }) => login === actions.payload) === -1) {
//     return {
//       ...state,
//       currentLogin: actions.payload,
//       users: [...state.users, { login: actions.payload, posts: [] }],
//     };
//   }
//   return {
//     ...state,
//     currentLogin: actions.payload,
//   };
// }
// if (actions.type === 'ADD_POST') {
//   const index = state.users.findIndex(({ login }) => login === state.currentLogin);
//   return {
//     ...state,
//     users: [...state.users.map((user, i) => i === index ? {
//       login: user.login,
//       posts: [...user.posts, {
//         title: actions.payload.title,
//         body: actions.payload.text,
//         comments: [{ loginWhoLeft: '', textOfComment: '' }],
//       }],
//     } : user)],
//   };
// }
// if (actions.type === 'ADD_COMMENT') {
//   const index = state.users.findIndex(({ login }) => login.login === actions.payload.login);
//   const index2 = state.users[index].posts.findIndex(({ title }) => title === actions.payload.title);
//   return {
//     ...state,
//     users: [...state.users.map((user, i) => i === index ? {
//       login: user.login,
//       posts: [...user.posts.map((post, j) => j === index2 ? {
//         title: post.title,
//         body: post.body,
//         comments: [...post.comments, actions.payload.comment],
//       } : post)],
//     } : user)],
//   };
// }

// return state;
