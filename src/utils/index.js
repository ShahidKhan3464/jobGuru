import dayjs from 'dayjs';

// Default payload data used for API requests
export const payloadData = {
  page: 1,
  pageSize: 5,
  condition: {},
  sortOrder: 'DESC',
  sortColumn: 'name'
};

// Function to get the access token from local storage
export const getAccessToken = () => {
  const auth_token = localStorage.getItem('auth_token');
  if (auth_token !== null) {
    return JSON.parse(auth_token);
  }
  return null;
};

// Function to get user data from local storage
export const getUser = () => {
  const user = window.localStorage.getItem('user');
  if (user !== null) {
    return JSON.parse(user);
  }
  return null;
};

// Function to truncate a string if it exceeds 30 characters
export const truncatedString = (str) => {
  const truncatedText = str?.length > 30 ? `${str.slice(0, 25)}...` : str;
  return truncatedText;
};

// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str) => {
  return str?.charAt(0).toUpperCase() + str?.toLowerCase().substring(1);
};

// Function to format date using dayjs
export const formattedDate = (inputDate) => {
  const convertedDate = dayjs(inputDate).format('MM-DD-YYYY');
  return convertedDate;
};

// Function to format time for showing
export const formattedTimeToShow = (dateToFormat) => {
  const formattedTime = dayjs(dateToFormat).format('hh:mm A');
  return formattedTime;
};

// Function to format bytes to human-readable size.
export const formatBytes = (bytes) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
