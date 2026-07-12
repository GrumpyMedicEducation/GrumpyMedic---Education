import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <LoginForm />
      </section>
    </main>
  );
}