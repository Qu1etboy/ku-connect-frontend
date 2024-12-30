"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function OnBoardingSuccessPage() {
	const router = useRouter();
	return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-white to-green-300 from-[50%]">
            <Script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js" strategy="afterInteractive" />
			<div className="text-center flex flex-col gap-20 px-10">
				<h1 className="text-3xl font-semibold">You’re All Set! 🎉</h1>
				<p className="text-gray-500 ">
					Your profile is ready. Start exploring and connecting with new friends on KU Connect.
				</p>
				<Button className="w-full focus:bg-black" onClick={() => router.push("/")}>
					Start Connecting
				</Button>
			</div>
		</div>
	);
}
