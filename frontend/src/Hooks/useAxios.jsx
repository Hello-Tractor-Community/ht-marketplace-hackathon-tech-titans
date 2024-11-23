import { useCallback, useMemo } from 'react';
import axios from 'axios';

const useAxios = () => {
  
  const baseURL = 'http://localhost:5500';
  const fetchData = useCallback(async (url, method = 'GET', data = null, config = {}) => {
    
    
    const token = localStorage.getItem('access_token');
      const headers = {
        ...config.headers,
        ...(config.useAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      };
      const response = await axios({
        method,
        url: `${baseURL}${url}`,
        data,
        headers,
        ...config,
      });
      
      return response.data;
    
  }, [baseURL]);

  const get = useMemo(() => (url, config = {}) => fetchData(url, 'GET', null, config), [fetchData]);
  const post = useMemo(() => (url, data, config = {}) => fetchData(url, 'POST', data, config), [fetchData]);
  const patch = useMemo(() => (url, data, config = {}) => fetchData(url, 'PATCH', data, config), [fetchData]);
  const del = useMemo(() => (url, config = {}) => fetchData(url, 'DELETE', null,config), [fetchData]);
  const put = useMemo(() => (url, data, config = {}) => fetchData(url, 'PUT', data, config), [fetchData]);

  return { get, post, patch, del,put };
};

export default useAxios;