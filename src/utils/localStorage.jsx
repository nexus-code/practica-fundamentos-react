/*
* Save user on local Storage
*/

// View to set on sessionStorage


export const setUserLS = user => {

  console.log('setUserLS');

  localStorage.setItem('data', JSON.stringify(user));
};

export const getUserLS = () => {
	const user = localStorage.getItem('data');
  return JSON.parse(user)
};

export const clearLocalStorage = () => {
  localStorage.clear();
}
