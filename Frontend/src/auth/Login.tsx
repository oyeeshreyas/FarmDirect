import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [input, setInput] = useState<LoginInputState>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<Partial<LoginInputState>>({});
    const {loading , login} = useUserStore();
    const navigate = useNavigate();

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }
    const loginSubmitHandler = async (e: FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        const result = userLoginSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setError(fieldErrors as Partial<LoginInputState>);
            return;
        }
        try {
            await login(input);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
        

    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
                <div className="mb-9">
                    <h1 className="font-bold text-2xl">FarmDirect</h1>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {error && <span className="test-xm text-red-500">{error.email}</span>}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className="pl-10 focus-visible:ring-1"
                        />
                        <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {error && <span className="test-xm text-red-500">{error.password}</span>}
                    </div>
                </div>
                <div className="mb-10">
                    {
                        loading ? <Button disabled className="w-full   bg-green-500 hover:bg-green-600 "><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait</Button> : (
                            <Button type="submit" className="w-full  bg-green-500 hover:bg-green-600 ">Login</Button>
                        )
                    }
                    <div className="mt-4">
                        <Link to="/forgot-password" className="text-sm hover:text-blue-500 hover:underline">Forgot Password?</Link>
                    </div>
                </div>
                <Separator />
                <p className="mt-4">
                    Don't have an account?   {""}
                    <Link to="/signup" className="text-blue-500">Signup</Link>
                </p>

            </form>
        </div>
    );
};
export default Login;