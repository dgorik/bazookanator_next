import { Textarea } from "@/(components)/ui/textarea";
import { Button } from "@/(components)/ui/button";

export default function ChatBox() {
  return (
    <div>
      <Textarea placeholder="Type your message here." />
      <Button>Fire away a question</Button>
    </div>
  );
}
