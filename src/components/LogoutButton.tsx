import { GoogleLogout } from '@leecheuk/react-google-login';
import { useAppDispatch } from "store/hooks";
import { userActions } from 'store/user/user';

const clientId = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`

const LogoutButton = () => {

    const dispatch = useAppDispatch();
    
    const onSuccess = () => {
        dispatch(userActions.setFullName(""));
        sessionStorage.google_token = "";
        sessionStorage.google_full_name = "";
    }

    return (
        <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
        />
    )
}

export { LogoutButton };