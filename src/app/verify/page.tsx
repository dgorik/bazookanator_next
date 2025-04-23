import { LoginForm } from "@/components/home/login-form";
import Header from "@/components/Header";
import { VerificationComponent } from "@/components/verification/Verification";

export default function Verification() {
  return (
    <div>
      <div className=" flex flex-col items-center justify-center min-h-screen">
        <Header />
        <VerificationComponent />
      </div>
    </div>
  );
}
