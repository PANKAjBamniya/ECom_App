import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { googleLoginSuccess } from "../../store/slice/googleAuthSlice";

interface GoogleJwtPayload {
    name: string;
    email: string;
    picture: string;
}

const GoogleAuthButton = () => {
    const dispatch = useDispatch();

    return (
        <GoogleLogin
            ux_mode="popup"
            onSuccess={(res) => {
                const user = jwtDecode<GoogleJwtPayload>(res.credential!);

                dispatch(
                    googleLoginSuccess({
                        name: user.name,
                        email: user.email,
                        picture: user.picture,
                    })
                );
            }}
            onError={() => {
                console.error("Google Login Failed");
            }}
        />
    );
};

export default GoogleAuthButton;
