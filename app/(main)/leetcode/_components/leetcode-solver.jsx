"use client";
import { useState } from "react";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	SiJavascript,
	SiTypescript,
	SiPython,
	SiJouav,
	SiCplusplus,
	SiFsharp,
} from "react-icons/si";

const languageIcons = {
	JavaScript: SiJavascript,
	TypeScript: SiTypescript,
	Python: SiPython,
	Java: SiJouav,
	"c++": SiCplusplus,
	"C#": SiFsharp,
};

const languageColors = {
	JavaScript: "#F7DF1E",
	TypeScript: "#3178C6",
	Python: "#3776AB",
	Java: "#007396",
	"c++": "#00599C",
	"C#": "#512BD4",
};

export default function LeetCodeSolver() {
	const [problem, setProblem] = useState("");
	const [language, setLanguage] = useState("JavaScript");
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);

	const submit = async (e) => {
		e?.preventDefault();
		setLoading(true);
		setError(null);
		setResult(null);
		try {
			const res = await fetch("/api/leetcode", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ problemNumber: problem, language }),
			});
			const json = await res.json();
			if (!res.ok) throw new Error(json?.error || "Server error");
			setResult(json.data);
		} catch (err) {
			setError(String(err));
		} finally {
			setLoading(false);
		}
	};

	const LanguageIcon = languageIcons[language];
	const languageColor = languageColors[language];

	return (
		<div className="max-w-3xl mx-auto p-6">
			<Card className="bg-background/40 border border-white/10 backdrop-blur-sm">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Code className="h-5 w-5" />
						LeetCode Solver
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					  <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-end">
						<div className="sm:col-span-3">
							<label className="block text-sm font-medium mb-2">Problem Number</label>
							<Input
								id="problemNumber"
								type="number"
								value={problem}
								onChange={(e) => setProblem(e.target.value)}
								placeholder="e.g. 1"
								className="bg-transparent border-white/20"
								required
							/>
						</div>

						<div className="sm:col-span-2">
							<label className="block text-sm font-medium mb-2">Language</label>
							<Select value={language} onValueChange={setLanguage}>
								<SelectTrigger className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/30 focus:border-white/20 focus:ring-white/20 transition-colors">
									<SelectValue className="flex items-center gap-2" />
								</SelectTrigger>
								<SelectContent className="bg-black/95 border-white/10 backdrop-blur-xl">
									<SelectGroup>
										<SelectLabel className="text-white/70">Select Language</SelectLabel>
										{Object.keys(languageIcons).map((lang) => {
											const Icon = languageIcons[lang];
											const color = languageColors[lang];
											return (
												<SelectItem key={lang} value={lang} className="flex items-center gap-2 cursor-pointer hover:bg-white/10 focus:bg-white/10 data-[state=checked]:bg-white/20">
													<div className="flex items-center gap-2 w-full">
														<Icon style={{ color }} className="w-4 h-4" />
														<span>{lang}</span>
													</div>
												</SelectItem>
											);
										})}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

									<div className="sm:col-span-1">
										<Button
											type="submit"
											variant="secondary"
											size="lg"
											className="w-full rounded-lg px-4 py-3 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(82,39,255,0.18)] bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-500 text-white"
											disabled={loading}
										>
											{loading ? "Generating..." : "Get Solution"}
										</Button>
									</div>
					</form>

					{error && <div className="text-red-500">{error}</div>}

					{result && (
						<div className="space-y-4">
							<div className="bg-transparent p-4 rounded flex items-center justify-between">
								<div>
									<h2 className="text-xl font-medium">{result.title}</h2>
									<p className="text-sm text-muted-foreground">Difficulty: {result.difficulty}</p>
								</div>
								{LanguageIcon && (
									<LanguageIcon style={{ color: languageColor }} className="w-8 h-8" />
								)}
							</div>

							{result.description && (
								<div className="text-sm text-gray-300">
									<h3 className="font-semibold">Description</h3>
									<div className="mt-1 whitespace-pre-wrap">{result.description}</div>
								</div>
							)}

							{result.approach && (
								<div className="text-sm text-gray-300">
									<h3 className="font-semibold">Approach</h3>
									<div className="mt-1 whitespace-pre-wrap">{result.approach}</div>
								</div>
							)}

							{result.steps && Array.isArray(result.steps) && (
								<div className="text-sm text-gray-300">
									<h3 className="font-semibold">Steps</h3>
									<ol className="list-decimal list-inside mt-1">
										{result.steps.map((s, i) => (
											<li key={i} className="mt-1">{s}</li>
										))}
									</ol>
								</div>
							)}

							<div>
								<h3 className="font-semibold">Code</h3>
								<Textarea
									readOnly
									value={result.code || JSON.stringify(result, null, 2)}
									className="font-mono min-h-[180px] bg-black/70 text-sm"
								/>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
