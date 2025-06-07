import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import LogOut from "./components/LogOut";
import ChatBox from "./components/ChatBox";

const Member = async () => {
  const session = await getServerSession(options);

  if (!session) {
    let msg = "Please log in";
    redirect(`/?message=${msg}`);
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-4 right-4 ">
        <h1>Member Server Session</h1>
        <p>{session?.user?.email}</p>
        <p>{session?.user?.name}</p>
        <LogOut />
      </div>

      <div className="absolute bottom-4 right-4 ">
        <ChatBox />
      </div>
    </div>
  );
};

export default Member;
