import auth0 from 'auth0-js';
import {AUTH_DOMAIN, AUTH_CLIENT_ID,BACKEND_URL} from '../env';


const webAuth = new auth0.WebAuth({
    domain:AUTH_DOMAIN,
    clientID: AUTH_CLIENT_ID,
    responseType: 'token id_token',

});


class UserManagement {
    static authManagement = null;

    initialize = (accessToken) =>{
        UserManagement.authManagement = new auth0.Management({
            domain: AUTH_DOMAIN,
            token: accessToken
        });
    }

    isInitialized = () => {
        return !!UserManagement.authManagement
    }

    getUserData = async (accessToken) => {
        let response = await new Promise((resolve,reject)=>{
            webAuth.client.userInfo(accessToken,function(err,user){
                if(err) return reject(err);

                return resolve(user);
            })
        });
        return response;
    }

    patchUserData = async (userId, userMetadata) => {
        let response = await new Promise((resolve,reject)=>{
            UserManagement.authManagement.patchUserMetadata(userId, userMetadata, function(err,user){
                if(err) return reject(err);

                return resolve(user);
            })
        });
        return response;
    }


}

const UserManager = new UserManagement();

const sendOtpEmail = async (email) =>{
    if(!email) return;

    let response = await fetch(`${BACKEND_URL}/users/login`,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({email})
    })

    return response.json();
}

const verifyOtpEmail = async ({email,otp}) =>{
    if(!email) return;

    let response = await fetch(`${BACKEND_URL}/users/otp`,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({email,otp})
    })

    let result = await response.json();

    UserManager.initialize(result.data.access_token);
    let user = await UserManager.getUserData(result.data.access_token)

    let user_object = {user,accessData:result.data}
    window.localStorage.setItem("_user",JSON.stringify(user_object));
    return user;
}

const isAuthenticated = () => {

    let userString = window.localStorage.getItem('_user');
    if(!userString) return false;

    let user = JSON.parse(userString);
    return !!user;
}

const logout = ()=>{
    window.localStorage.removeItem('_user');
    window.localStorage.clear();
}

const getAccessToken = () =>{
    if(!isAuthenticated()) return;

    let userObjectString = window.localStorage.getItem('_user');
    let userObject = JSON.parse(userObjectString);
    return userObject.accessData.access_token;

}

const getUser = ()=>{
    if(!isAuthenticated()) return;

    let userObjectString = window.localStorage.getItem('_user');
    let userObject = JSON.parse(userObjectString);
    return userObject.user;
}

export {
    sendOtpEmail,
    verifyOtpEmail,
    UserManager,
    isAuthenticated,
    logout,
    getUser,
    getAccessToken
    }
