import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import LogOut from "./components/LogOut";

const Member = async () => {
  const session = await getServerSession(options);

  if (!session) {
    let msg = "Please log in";
    redirect(`/?message=${msg}`);
  }

  return (
    <div>
      <h1>Member Server Session</h1>
      <LogOut />
      <p>{session?.user?.email}</p>
    </div>
  );
};

export default Member;
