import { useEffect, useContext } from 'react';
import { ToastContext } from '../App';
import axiosInstance, { setupAxiosInterceptors } from '../utils/axiosInstance';

const useAxiosInterceptor = () => {
  const toastHelpers = useContext(ToastContext);

  useEffect(() => {
    if (toastHelpers) {
      setupAxiosInterceptors(toastHelpers);
    }
  }, [toastHelpers]);

  return axiosInstance;
};

export default useAxiosInterceptor;