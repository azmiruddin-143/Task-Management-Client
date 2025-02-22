import { FaGoogle } from "react-icons/fa6";
import signUp from "../../assets/Sign up-bro.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const SignUp = () => {
    const { googleRegister, setuser } = useContext(AuthContext)
    const navigate = useNavigate()
    const googleSignin = () => {
        googleRegister()
            .then((result) => {
                setuser(result.user);
                console.log(result.user);
                const userInfo = {
                    userName: result.user?.displayName,
                    userEmail: result.user?.email,
                    userphoto: result.user?.photoURL,
                    userRole: "User"
                }
                axios.post('https://task-management-server-olive-three.vercel.app/users', userInfo)
                    .then(result => {
                        setuser(result.data);
                        console.log(result.data);
                        navigate('/')
                    })
            })
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <img className="w-72 md:w-96 lg:w-[400px] mb-6" src={signUp} alt="Sign Up" />

            <button onClick={googleSignin} className="bg-black flex items-center gap-3 text-white rounded-md py-3 px-6 text-lg shadow-md">
                <FaGoogle className="text-xl" />
                Continue with Google
            </button>

            <Link className="mt-5 text-lg" to={'/signin'}>
                Already a user? <span className="text-primary font-bold">Sign In</span>
            </Link>
        </div>
    );
};

export default SignUp;
