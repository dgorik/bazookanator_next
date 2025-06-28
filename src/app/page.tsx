import LoginForm from "@/app/auth/signin/components/LoginForm";

export default async function Home() {
  return (
    <div>
      <div className=" flex flex-col items-center justify-center min-h-screen">
        <LoginForm />
      </div>
    </div>
  );
}
