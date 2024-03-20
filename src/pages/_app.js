import AuthGard from "@/components/Guard/AuthGard";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Toaster position="top-center" reverseOrder={false} />

			<AuthGard>
				<Component {...pageProps} />
			</AuthGard>
		</Provider>
	);
}
