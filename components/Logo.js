import React from "react";
import Link from "next/link";
export default function Logo() {
	return (
		<Link href="/">
			<img
				alt="image"
				className="img-fluid"
				src="/images/logo.svg"
			/>
		</Link>
	);
}
