export const GetCurrentLogin = state => state.posts.currentLogin;
export const GetPostUsers = state => state.posts.currentLogin
  && state.posts.users.find(user => user.login === state.posts.currentLogin).posts;
export const GetUsers = state => state.posts.users;
export const GetWatchingMode = state => state.watchMode.isWatchingMode;
export const GetPostUsersByComment = (state, login) => state.posts.currentLogin
  && state.posts.users.find(user => user.login === login).posts;
