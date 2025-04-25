import { LoginForm } from "@/components/home/login-form";
import Header from "@/components/Header";
import { SignupForm } from "@/components/signup/SignupForm";

export default function SignUp() {
  return (
    <div>
      <div className=" flex flex-col items-center justify-center min-h-screen">
        <Header />
        <SignupForm />
      </div>
    </div>
  );
}

// Added env.
