import AuthGard from "@/components/Guard/AuthGard";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

const Layout = dynamic(() => import("@/components/Layout"), {
	ssr: false,
});

export default function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Toaster position="top-center" reverseOrder={false} />
			<Layout>
				<AuthGard>
					<Component {...pageProps} />
				</AuthGard>
			</Layout>
		</Provider>
	);
}
