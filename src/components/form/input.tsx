import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import { Combobox } from "../ui/combobox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

type InputFieldProps = {
	control: any;
	type?: string;
	name: string;
	label?: string;
	placeholder?: string;
	data?: { value: string; label: string }[];
	description?: string;
	required?: boolean;
	selectedFaculty?: string;
	disabled?: boolean;
};

export default function InputField({
	control,
	name,
	label,
	placeholder,
	data = [],
	type = "text",
	description,
}: InputFieldProps) {
	const getInputByType = (type: string, field: ControllerRenderProps<FieldValues, string>) => {
		switch (type) {
			case "pill":
				return (
					<div>
						<FormControl>
							<ToggleGroup type="multiple" value={field.value} onValueChange={field.onChange}>
								<div className="flex flex-wrap justify-center">
									{data.map((d) => (
										<ToggleGroupItem
											key={d.value}
											value={d.value}
											className='border border-gray-200 rounded-full px-3 py-1 m-1 hover:text-black data-[state=on]:bg-green-200 data-[state=on]:border-green-500'
										>
											{d.label}
										</ToggleGroupItem>
									))}
								</div>
							</ToggleGroup>
						</FormControl>
					</div>
				);
			case "textarea":
				return (
					<FormControl>
						<Textarea placeholder={placeholder} {...field} />
					</FormControl>
				);
			case "combobox":
				return (
					<FormControl>
						<div>
							<Combobox
								placeholder={placeholder}
								data={data}
								width="100%"
								value={field.value}
								onChange={field.onChange}
							/>
						</div>
					</FormControl>
				);
			case "checkbox":
				return (
					<div className="flex items-center space-x-2">
						<Checkbox id={name} checked={field.value} onCheckedChange={field.onChange} />
						<label
							htmlFor={name}
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{label}
						</label>
					</div>
				);
			case "radio":
				return (
					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className="flex flex-col space-y-1"
						>
							{data.map((d) => (
								<FormItem key={d.value} className="flex items-center space-x-3 space-y-0">
									<FormControl>
										<RadioGroupItem value={d.value} />
									</FormControl>
									<FormLabel className="font-normal">{d.label}</FormLabel>
								</FormItem>
							))}
						</RadioGroup>
					</FormControl>
				);
			case "select":
				return (
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{data.map((d) => (
								<SelectItem key={d.value} value={d.value}>
									{d.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);
			case "date":
				return (
					<div>
						<Popover>
							<PopoverTrigger asChild>
								<FormControl>
									<Button
										variant={"outline"}
										className={cn(
											"w-full pl-3 text-left font-normal",
											!field.value && "text-muted-foreground"
										)}
									>
										{field.value ? (
											format(field.value, "PPP")
										) : (
											<span className="text-sm">{placeholder ?? "Pick a date"}</span>
										)}
										<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={field.value}
									onSelect={field.onChange}
									disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
				);
			default:
				return (
					<FormControl>
						<Input placeholder={placeholder} {...field} />
					</FormControl>
				);
		}
	};

	if (type === "switch") {
		return (
			<FormField
				control={control}
				name={name}
				render={({ field }) => (
					<FormItem className="flex flex-row items-center justify-between rounded-lg p-3">
						<div className="space-y-0.5">
							<FormLabel>{label}</FormLabel>
							<FormDescription>{description}</FormDescription>
						</div>
						<FormControl>
							<Switch checked={field.value} onCheckedChange={field.onChange} />
						</FormControl>
					</FormItem>
				)}
			/>
		);
	}

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{type != "checkbox" && <FormLabel>{label}</FormLabel>}
					{getInputByType(type, field)}
					<FormDescription>{description}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
