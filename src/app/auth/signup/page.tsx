import SignupForm from "@/app/auth/signup/components/SignupForm";
import Header from "@/components/Header";

export default async function Signup() {
  return (
    <div>
      <div className=" flex flex-col items-center justify-center min-h-screen">
        <Header />
        <SignupForm />
      </div>
    </div>
  );
}
