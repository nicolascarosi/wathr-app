import { GoogleLogin } from '@leecheuk/react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { useAppDispatch } from "store/hooks";
import { userActions } from 'store/user/user';

const clientId = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`

const LoginButton = () => {

    const dispatch = useAppDispatch();

    const onFailure = (response: any) => {
        console.log("failure");
    }
    
    const onSuccess = (response: any) => {
        dispatch(userActions.setFullName(response.wt.Ad));
        sessionStorage.google_token = response.accessToken;
        sessionStorage.google_full_name = response.wt.Ad;
    }

    useEffect(() => {
        if (sessionStorage.google_token) {
            dispatch(userActions.setFullName(sessionStorage.google_full_name));
        }
        else {
            const initClient = () => {
                    gapi.client.init({
                    clientId: clientId,
                    scope: ''
                });
            };
            gapi.load('client:auth2', initClient);
        }
    });

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export { LoginButton };