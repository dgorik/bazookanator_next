import LoginForm from "@/app/sign-in/components/LoginForm";
import Header from "@/components/Header";

export default async function Home() {
  //this page is rendered on a server because it's using async
  // await connectDB(); // Connect to the DB before the page is rendered
  // await connectSuperbase();

  return (
    <div>
      <div className=" flex flex-col items-center justify-center min-h-screen">
        <Header />
        <LoginForm />
      </div>
    </div>
  );
}
