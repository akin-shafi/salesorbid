import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import SessionTimeout from "../utils/SessionTimeout";
import { ChakraProvider } from "@chakra-ui/react";

import "@/styles/css/bootstrap.min.css";
import "@/styles/globals.css";

import "@/styles/css/bootstrap-icons.css";
import "@/styles/css/swiper-bundle.min.css";
import "@/styles/css/nice-select.css";
import "@/styles/css/animate.min.css";
import "@/styles/css/jquery.fancybox.min.css";
import "@/styles/css/boxicons.min.css";
import "@/styles/css/style.css";

import {
	publicRoutes,
	adminRoutes,
	excludedRoutes,
} from "@/utils/publicRoutes";

// Import your header and footer components
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";

export default function App({ Component, pageProps }) {
	const router = useRouter();
	const isPublicRoute = publicRoutes.includes(router.pathname);
	const isExcludedRoute = excludedRoutes.includes(router.pathname);
	const isAdminRoute = adminRoutes.some((route) =>
		router.pathname.startsWith(route)
	);

	useEffect(() => {
		const loadDynamicStyles = async () => {
			if (router.pathname === "/") {
				await import("@/styles/site.css");
			}
		};

		loadDynamicStyles();
	}, [router.pathname]);

	return (
		<>
			<Head>
				<title>
					{router.pathname === "/"
						? "Home"
						: router.pathname
								.replace("/", "")
								.replaceAll("-", " ")
								.toUpperCase()}
				</title>

				<meta
					name="description"
					content="Free code tutorial"
				/>
			</Head>
			<SessionProvider session={pageProps.session}>
				<SessionTimeout timeout={300000} /> {/* 5 minutes timeout */}
				{/* Conditionally render Header and Footer components */}
				<ChakraProvider>
					{isExcludedRoute ? (
						<Component {...pageProps} />
					) : isAdminRoute ? (
						<>
							<AdminHeader />
							<Component {...pageProps} />
							<AdminFooter />
						</>
					) : (
						<>
							<Header />
							<Component {...pageProps} />
							<Footer />
						</>
					)}
				</ChakraProvider>
			</SessionProvider>
		</>
	);
}
