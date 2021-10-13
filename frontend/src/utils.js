const logout = () => {
  localStorage.removeItem("userToken");
  window.location.replace("http://localhost:3000/");
};
