export const getCookie = (name: string) => {
  if (!document.cookie || document.cookie === '') return null;

  const cookies = document.cookie.split(';');
  let cookieValue = null;

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.substring(0, name.length + 1) === name + '=') {
      cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
      break;
    }
  }
  return cookieValue;
};
