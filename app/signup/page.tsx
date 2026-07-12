import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <SignupForm />
      </section>
    </main>
  );
}