const toast = {
    success: (_message) => {
      Toastify({
        text: _message,
        duration: 4000,
        className: "toast success", // Class for styling
      }).showToast();
    },
  
    error: (_message) => {
      Toastify({
        text: _message,
        duration: 4000,
        className: "toast error", // Class for styling
      }).showToast();
    },
  
    warning: (_message) => {
      Toastify({
        text: _message,
      duration: 4000,
        className: "toast warning", // Class for styling
      }).showToast();
    },
  
    info: (_message) => {
      Toastify({
        text: _message,
      duration: 4000,
        className: "toast info", // Class for styling
      }).showToast();
    }
  };


  
export default toast;
  