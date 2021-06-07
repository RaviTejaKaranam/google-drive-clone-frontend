//Install the js-cookie package
import cookie from 'js-cookie';
//When the user logs in we are creating a token at the back end.
//We should store this token in a cookie in the browser 

//Set Cookie
//key is the name of the cookie
//value will store its Value
export const setCookie = (key, value) =>{
  //To work with cookies we must make sure that the window object is available
  if(window !== "undefined"){
    cookie.set(key, value, {
      expires : 1 // 1 day
    })
  }
}

//Remove Cookie
export const removeCookie = (key) =>{
  //To work with cookies we must make sure that the window object is available
  if(window !== "undefined"){
    cookie.remove(key, {
      expires : 1 // 1 day
    })
  }
}

//Get cookie
//To send the token to the backend
export const getCookie = (key) =>{
  //To work with cookies we must make sure that the window object is available
  if(window !== "undefined"){
    return cookie.get(key)
  }
}

//LocalStorage


//set item in localStorage
export const setLocalStorage = (key, value)=>{
  if(window !== "undefined"){
    //We can only stores strings in the local storage
    localStorage.setItem(key, JSON.stringify(value))
  }
}

//Remove Item from localStorage
export const removeLocalStorage = (key)=>{
  if(window !== "undefined"){
    localStorage.removeItem(key)
  }
}

//Setting the cookie and localstorage values based on the response from the server when logging in
export const authenticate = (response, next) =>{
  setCookie("token", response.data.token)
  setLocalStorage("user", response.data.user)
  next() //To show a pop up or alert to the user after logging in,
  //next is a callback function that gets fired after executing the code above it.
}
//Accessing user info from local storage
export const isAuthenticated = () =>{
  const checkCookie = getCookie('token') //Checking if the token is set
  if(checkCookie){
    // If the localStorage is set, return the user details or return false
    if(localStorage.getItem('user')){
      return JSON.parse(localStorage.getItem('user'))
    } 
    else{
      return false
    }
  }
}
//Signout functionality
export const signout = next =>{
  removeCookie('token')
  removeLocalStorage('user')
  next()
}