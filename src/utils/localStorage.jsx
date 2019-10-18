/*
* Save user on local Storage
*/

// View to set on sessionStorage


export const setUserLS = user => {
  localStorage.setItem('data', JSON.stringify(user));
};

export const getUserLS = () => {
//export const restoreUser = () => {
	const user = localStorage.getItem('data');
  return JSON.parse(user)
};

// export const deleteStorage = () => {
export const clearLS = () => {
  localStorage.clear();
}
