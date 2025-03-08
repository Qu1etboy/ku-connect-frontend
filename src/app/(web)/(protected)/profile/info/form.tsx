"use client";

import InputField from "@/components/form/input";
import MainLayout from "@/components/layout/main";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form } from "@/components/ui/form";
import { config } from "@/config";
import { contactForm, nisitInfoForm, personalInfoForm } from "@/data/form";
import { User, useUser } from "@/hooks/user";
import { updateProfile } from "@/services/profile";
import { useMutation } from "@tanstack/react-query";
import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const groups = [
  {
    name: "Personal Information",
    fields: [...personalInfoForm, ...nisitInfoForm],
  },
  {
    name: "Contact Information",
    fields: contactForm,
  },
];

export default function ProfileInfomationForm({ user, defaultValues }: { user: User, defaultValues: any }) {
  const form = useForm({
    defaultValues,
  });

	const mutation = useMutation({
    mutationFn: (profile: any) => {
      return updateProfile(profile);
    },
		onSuccess: () => {
			toast("Profile updated successfully", {
				position: "top-center",
				icon: "✅",
			});
		},
		onError: () => {
			toast("Failed to update profile", {
				position: "top-center",
				icon: "❌",
			});
		},
  })

  const onSubmit = (data: any) => {
    if (config.ENV === "development") {
      toast("Form Submitted", {
        description: <pre>{JSON.stringify(data, null, 2)}</pre>,
      });
    }

    mutation.mutate(data);
  };

	if (mutation.isPending) {
		return <div>Loading...</div>;
	}

  return (
      <div className="pb-12">
        <div className="flex flex-col items-center">
          <Avatar className="w-[150px] h-[150px] my-6">
            <AvatarImage src={user?.avatar_url} alt={user?.name} />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-lg">{user?.name}</p>
        </div>

        {groups.map((group) => (
          <div key={group.name} className="mt-6">
            <h2 className="px-3 mb-3 font-semibold text-muted-foreground">
              {group.name}
            </h2>
            {group.fields.map((field) => (
              <Drawer key={field.id}>
                <DrawerTrigger asChild>
                  <div className="p-4 text-sm md:text-base flex justify-between cursor-pointer hover:bg-gray-50">
                    <p>{field.label}</p>
                    <div className="flex justify-end">
                      {form.getValues(field.id) ? (
                        <p className="text-green-600 max-w-[25ch] truncate">
                          {form.getValues(field.id)}
                        </p>
                      ) : (
                        <p className="text-muted-foreground">
                          {field.placeholder}
                        </p>
                      )}
                      <ChevronRightIcon
                        className="text-muted-foreground ml-2"
                        width={20}
                      />
                    </div>
                  </div>
                </DrawerTrigger>
                <DrawerContent className="px-6 md:px-0 h-[90%] flex items-center">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="max-w-md w-full"
                    >
                      <InputField
                        control={form.control}
                        name={field.id}
                        type={field.type}
                        label={field.label}
                        placeholder={field.placeholder}
                        data={field.data}
                      />
                      <DrawerFooter className="px-0">
                        <Button>Save</Button>
                        <DrawerClose>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                          >
                            Cancel
                          </Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </form>
                  </Form>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
        ))}
      </div>
  );
}
