const getEnvironment = () => {
  return process.env.API_URL || '';
};

const getLoginEnvironment = () => {
  return process.env.Login_API_URL || '';
};

export const environment = getEnvironment();
export const loginEnvironment = getLoginEnvironment();