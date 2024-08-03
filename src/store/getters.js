const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.userInfo.staffPhoto,
  userId: state => state.user.userInfo.userId,
  name: state => state.user.userInfo.username
}
export default getters
