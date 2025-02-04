const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const AUTH_ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/auth/login`,
  REGISTER: `${BASE_URL}/api/auth/register`,
};
