import { LoginForm } from "@/app/Loginform";
import Header from "@/(components)/Header";
import { connectDB } from "../database/mongodb";

export default async function Home() {
  await connectDB(); // Connect to the DB before the page is rendered

  return (
    <div>
      <div className=" flex flex-col items-center justify-center min-h-screen">
        <Header />
        <LoginForm />
      </div>
    </div>
  );
}
