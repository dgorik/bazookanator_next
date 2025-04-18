import { LoginForm } from "@/components/home/login-form";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <div className=" flex flex-col items-center justify-center min-h-screen">
        <Header />
        <LoginForm />
      </div>
    </div>
  );
}
