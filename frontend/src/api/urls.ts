const ConfigUrls = {
  configMailPath: 'api/configuration/email'
};

const AuthUrls = {
  loginPath: 'api/auth/login/',
  logoutPath: 'api/auth/logout/'
};

const UserUrls = {
  listPath: 'api/users/',
  detailPath: 'api/users/',

  setPasswordPath: 'api/user/set-password',
  updatePermissionsPath: 'api/user/update-permissions',
  totpConfigurationPath: 'api/user/totp-configuration'
};

const Urls = {
  ConfigUrls,
  AuthUrls,
  UserUrls
};

export default Urls;