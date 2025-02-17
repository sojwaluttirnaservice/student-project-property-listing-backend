const toast = {
  // Success Toast
  success: (_message) => {
    Toastify({
      text: _message,
      duration: 4000,
      className: "toast success", // Class for styling
      onClick: function () {}, // Optionally add a click event handler
    }).showToast();
    
    // Listen for toast render and adjust height after insertion
    setTimeout(() => adjustToastHeight(), 100);  // Wait a bit before adjusting height
  },

  // Error Toast
  error: (_message) => {
    Toastify({
      text: _message,
      duration: 4000,
      className: "toast error", // Class for styling
      onClick: function () {}, // Optionally add a click event handler
    }).showToast();
    
    setTimeout(() => adjustToastHeight(), 100);  // Wait a bit before adjusting height
  },

  // Warning Toast
  warning: (_message) => {
    Toastify({
      text: _message,
      duration: 4000,
      className: "toast warning", // Class for styling
      onClick: function () {}, // Optionally add a click event handler
    }).showToast();
    
    setTimeout(() => adjustToastHeight(), 100);  // Wait a bit before adjusting height
  },

  // Info Toast
  info: (_message) => {
    Toastify({
      text: _message,
      duration: 4000,
      className: "toast info", // Class for styling
      onClick: function () {}, // Optionally add a click event handler
    }).showToast();
    
    setTimeout(() => adjustToastHeight(), 100);  // Wait a bit before adjusting height
  },
};

// Function to adjust the toast height dynamically based on content
const adjustToastHeight = () => {
  // Select the toast element (Toastify appends to the body dynamically)
  const toastElement = document.querySelector('.toast');
  
  // If the toast element exists, adjust its height based on the content
  if (toastElement) {
    toastElement.style.height = 'auto'; // Allow height to adjust
    const contentHeight = toastElement.scrollHeight; // Get the actual height based on content
    toastElement.style.height = `${contentHeight}px`; // Set the height accordingly
  }
};

export default toast;
