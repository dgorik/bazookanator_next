import LogOut from "./components/LogOut";
import ChatBox from "./components/ChatBox";

export default async function Member() {
  return (
    <div>
      {/* <h1>Member Server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.name}</p> */}
      <LogOut />
      <ChatBox />
    </div>
  );
}
