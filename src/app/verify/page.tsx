import { LoginForm } from "@/app/Loginform";
import Header from "@/(components)/Header";
import { VerificationComponent } from "@/app/verify/components/Verification";

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
