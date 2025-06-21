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
    <div className="flex flex-col justify-between">
      <h1>Member Server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.name}</p>
      <LogOut />
      <ChatBox />
    </div>
  );
};

export default Member;
