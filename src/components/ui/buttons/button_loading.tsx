import { Loader2Icon } from "lucide-react";
import { Button } from "./button";

export function ButtonLoading() {
  return (
    <Button size="sm" disabled>
      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}
