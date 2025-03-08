'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import { config } from "@/config";
import Draggable from 'react-draggable';

/**
 * Debug tool for development environment
 */
export default function DebugTool() {
	if (config.ENV !== "development") return null;
	
	return (
		<Draggable>
			<div className="fixed bottom-4 right-4 px-4 py-2 bg-white rounded-md shadow-md border border-gray-200">
				<p className="text-sm font-medium mb-2">Debug Tools</p>
				<div className="flex gap-2">
					<Button asChild>
						<Link href="/onboarding">Onboarding</Link>
					</Button>
				</div>
			</div>
		</Draggable>
	)
}