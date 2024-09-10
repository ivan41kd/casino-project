fetch(window.location.href).then((response) => {
 if (response.status === 404) {
  window.location.replace('/');
 }
});
