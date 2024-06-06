let BASE_URL = ''

if (process.env.NODE_ENV == 'development') {
  //小程序访问，不能用localhost
  BASE_URL = 'https://jlsh.globebill.com/api'
  //  #ifdef H5
  BASE_URL = 'https://jlsh.globebill.com/api_test'
  //  #endif
} else {
  BASE_URL = 'https://jlsh.globebill.com/api_test'  
  //  #ifdef H5
  BASE_URL = 'https://jlsh.globebill.com/api_test'
  //  #endif
}
const configService = {
  apiUrl: BASE_URL
}

export default configService
