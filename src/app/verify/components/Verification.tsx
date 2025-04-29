import { Button } from "@/(components)/ui/button";
import Link from "next/link";

export async function VerificationComponent() {
  return (
    <div>
      <div>Boooooom, verify</div>;
      <Link href="/api">
        <Button type="submit" className="w-full">
          Click to see a server component
        </Button>
      </Link>
    </div>
  );
}
