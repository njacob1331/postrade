import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center gap-8">
      <SignUp />
    </div>
  );
}
