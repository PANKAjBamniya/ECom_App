import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../../store";
import { toast } from "react-toastify";
import { Loading, registerUser, setError } from "../../store/slice/authSlice";
import { useRegisterMutation } from "../../store/api/authApi";
import googleLogo from "../../assets/googleLogo.png"
import GoogleAuthButton from "../../components/common/GoogleAuthButton";


const registerSchema = z.object({
    name: z.string().min(2, "Please enter name"),
    email: z.string().email("Please enter valid email"),
    password: z.string().min(4, "Password too short"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
    const { isLoggedIn: isGoogleLoggedIn } = useSelector(
        (state: RootState) => state.googleAuth
    );
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registerApi] = useRegisterMutation();

    const { register, handleSubmit, formState: { errors } } =
        useForm<RegisterFormData>({
            resolver: zodResolver(registerSchema),
        });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            dispatch(Loading());

            const res = await registerApi({
                name: data.name,
                email: data.email,
                password: data.password,
            }).unwrap();

            dispatch(
                registerUser({
                    user: {
                        name: res.name,
                        email: res.email,
                        role: res.role,
                    },
                    token: res.token,
                })
            );

            toast.success("Registration successful 🎉");
            navigate("/");
        } catch (error) {
            console.log(error)
            toast.error("Registration failed");
            dispatch(setError("Registration failed"));
        }
    };

    useEffect(() => {
        if (user || isGoogleLoggedIn) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 flex justify-center items-center ">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Create account
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Let’s create your account.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3"
                >
                    <div>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            register={register("name")}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            label="Email"
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
                            placeholder="••••••••"
                            register={register("password")}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        By continuing, you agree to our Terms, Privacy Policy & Cookies.
                    </p>


                    <button
                        type="submit"
                        className="bg-black text-white rounded-lg py-3 mt-3 font-medium active:scale-[0.98] transition"
                    >
                        Create Account
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-4">
                        <hr className="flex-1 border-gray-200" />
                        <span className="text-xs text-gray-400">OR</span>
                        <hr className="flex-1 border-gray-200" />
                    </div>
                </form>

                {/* Google Button */}
                <GoogleAuthButton />

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-5">
                    Already have an account?
                    <Link to="/login" className="text-black font-medium ml-1">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );

};

export default RegisterPage;
