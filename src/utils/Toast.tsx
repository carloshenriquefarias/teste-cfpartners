import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastApiResponse = (response: any, customTitle = '') => {
  if (!response) {
    toast.success(customTitle || 'Success', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return;
  }

  if (response.status === 200) {
    const apiSuccess = response.data.message || 'Success';
    toast.success(apiSuccess, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else {
    const title = customTitle || 'Error occurred';
    toast.error(title, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};
