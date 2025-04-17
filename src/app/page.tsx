import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <main>
        <h1 className="text-3xl font-bold">Hello world!</h1>
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div>
          <Link href="/dashboard" rel="noopener noreferrer">
            <Button>
              <Image
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Go To Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
