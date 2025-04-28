import { LoginForm } from "@/app/Loginform";
import Header from "@/components/Header";
import { SignupForm } from "@/app/signup/components/SignupForm";

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
