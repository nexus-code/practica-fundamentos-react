/*
* Save user on local Storage
*/

// View to set on sessionStorage


export const setUserLS = user => {

  localStorage.setItem('data', JSON.stringify(user));
};

export const getUserLS = () => {
	const user = localStorage.getItem('data');
  return JSON.parse(user)
};

export const clearLocalStorage = () => {
  localStorage.clear();
}

// 

export const isEmpty = (obj) => {
  // https://firstclassjs.com/check-if-object-is-empty-in-javascript/

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}