import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const is404 = router.pathname === "/404";
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {!is404 && <Navbar />}
      <main className="container mx-auto p-4 md:p-8">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
