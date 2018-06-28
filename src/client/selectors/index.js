export const getCurrentLogin = state => state.posts.currentLogin;

export const getPostUsers = state => state.posts.currentLogin
  && state.posts.users.find(user => user.login === state.posts.currentLogin).posts;

export const getUsers = state => state.posts.users;

export const getWatchingMode = state => state.watchMode.isWatchingMode;

export const getPostUsersByComment = (state, login) => state.posts.currentLogin
  && state.posts.users.find(user => user.login === login).posts;
