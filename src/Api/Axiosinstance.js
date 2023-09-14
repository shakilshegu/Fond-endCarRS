import axios from "axios"
import { toast } from "react-hot-toast";



export const AxiosUser =axios.create({
    baseURL:"http://localhost:5000/"
})


export const AxiosAdmin =axios.create({
    baseURL:"http://localhost:5000/admin/"
})

export const AxiosPartner =axios.create({
    baseURL:"http://localhost:5000/partner/"
})


AxiosUser.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error)
);

AxiosAdmin.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error)
);

AxiosPartner.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error)
);

const handleAxiosError = (error, navigate) => {
      const errorMessage = error.response
        ? error.response.data.message
        : 'An error occurred while request.';
    
      if (error.response) {
        if (error.response.status === 404) {
          toast.error('404 - Resource Not Found');
          navigate('/PageNotFound');
        } else if (error.response.status === 500) {
          toast.error('500 - Internal Server Error');
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error(errorMessage);
      }
    }