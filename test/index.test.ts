import auth from './auth/index'
import profile from './profile/index'
import file from './file/index'

(() => {
  auth()
  profile()
  file()
})()