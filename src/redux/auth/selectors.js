export const isLoggedIn=(state)=>state.auth.isLoggedIn;
export const token=(state)=>state.auth.accessToken;
export const userName=(state)=>state.auth.user.fullName;
export const userEmail=(state)=>state.auth.user.email;
export const getCurrentUser = (state) => state.auth.user;
export const userProfileAvatar=(state)=>state.auth.user.profileAvatar;

