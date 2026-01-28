import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/common/Input";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { RootState } from "../../store";
import { Loading, loginUser, setError } from "../../store/slice/authSlice";
import { useLoginMutation } from "../../store/api/authApi";
import { toast } from "react-toastify";
import googleLogo from "../../assets/googleLogo.png"
import facebookLogo from "../../assets/logos_facebook.png"

const loginSchema = z.object({
    email: z.string().email("Please enter a Vaild Email Address"),
    password: z.string().min(4, "Password is Required"),
});

type LoginformData = z.infer<typeof loginSchema>

const LoginPages = () => {
    const { user, isLoading } = useSelector((state: RootState) => state.auth);
    const [loginApi] = useLoginMutation();

    const { handleSubmit, register, formState: { errors } } = useForm<LoginformData>({
        resolver: zodResolver(loginSchema)
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = async (data: LoginformData) => {
        try {
            dispatch(Loading())
            const res = await loginApi({
                email: data.email,
                password: data.password,
            }).unwrap();

            dispatch(
                loginUser({
                    user: {
                        name: res.name,
                        email: res.email,
                        role: res.role,
                    },
                    token: res.token,
                })
            );

            toast.success("Login successful 🎉");

            navigate("/");
        } catch (err) {
            toast.error("Invalid email or password");
            dispatch(setError("Invalid email or password"));
        }
    };



    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [])

    return (
        <div className="p-20 flex items-center justify-center px-4 w-full">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Login to your account
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        It’s great to see you again.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3"
                >
                    <div>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email address"
                            register={register("email")}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            register={register("password")}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <p className="text-sm text-gray-500">Forgot your password? <span className="text-black underline">Reset your password</span></p>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white rounded-lg py-3 mt-2 font-medium disabled:opacity-60 active:scale-[0.98] transition"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-4">
                    <hr className="flex-1 border-gray-200" />
                    <span className="text-xs text-gray-400">OR</span>
                    <hr className="flex-1 border-gray-200" />
                </div>

                {/* Google Button */}
                <button className="w-full border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium active:scale-[0.98] transition mt-4">
                    <img src={googleLogo} alt="Google" className="w-[20px]" />
                    Continue with Google
                </button>

                {/* Google Button */}
                <button className="w-full border bg-[#1977F2] border-gray-300 rounded-lg py-4 text-white flex items-center justify-center gap-2 text-sm font-medium active:scale-[0.98] transition mt-4">
                    <img src={facebookLogo} alt="Google" className="w-[20px]" />
                    Continue with facebook
                </button>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-26">
                    Don’t have an account?
                    <Link
                        to="/register"
                        className="text-black font-medium ml-1"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );

};

export default LoginPages;
