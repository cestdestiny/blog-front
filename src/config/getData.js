import fetch from './fetch'

const login = data => fetch('/login', data, 'POST')

const listUserInfo = () => fetch('/user/info')

export {
  login,
  listUserInfo
}
