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
    <div className="flex-row">
      <h1>Member Server Session</h1>
      <p>{session?.user?.email}</p>
      <div>
        <LogOut />
        <ChatBox />
      </div>
    </div>
  );
};

export default Member;
