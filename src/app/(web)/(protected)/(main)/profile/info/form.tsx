"use client";

import InputField from "@/components/form/input";
import { LoadingScreen } from "@/components/loading";
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
import {
  contactForm,
  fieldOfStudy,
  nisitInfoForm,
  personalInfoForm,
} from "@/data/form";
import { useUpdateMyProfile } from "@/hooks/profile";
import { User } from "@/hooks/user";
import { upload } from "@/utils/storage";
import { getProfileImageUrl } from "@/utils/url";
import { CameraIcon, ChevronRightIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
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

export default function ProfileInfomationForm({
  user,
  defaultValues,
}: {
  user: User;
  defaultValues: any;
}) {
  const [departmentData, setDepartmentData] = useState<any>(null);
  const form = useForm({
    defaultValues,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mutation = useUpdateMyProfile();

  const onSubmit = (data: any) => {
    if (config.ENV === "development") {
      toast("Form Submitted", {
        description: <pre>{JSON.stringify(data, null, 2)}</pre>,
      });
    }

    mutation.mutate(data);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = await upload(
        file,
        user?.userId + "/" + file.name + "-" + Date.now(),
        "avatars",
      );
      console.log(data);

      form.setValue("image", data.path);

      mutation.mutate({
        ...form.getValues(),
        image: data.path,
      });
    }
  };

  const formWatch = form.watch();
  useEffect(() => {
    // Update department data based on faculty selection
    const { faculty } = formWatch;
    setDepartmentData(fieldOfStudy[faculty]);

    // Clear department field if faculty is changed
    if (
      faculty &&
      !fieldOfStudy[faculty]?.some(
        (dept) => dept.value === formWatch.department,
      )
    ) {
      form.setValue("department", "");
    }
  }, [formWatch.faculty]);

  if (mutation.isPending) {
    return <LoadingScreen />;
  }

  return (
    <div className="pb-12">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Avatar
            className="my-6 h-[150px] w-[150px] cursor-pointer hover:opacity-80"
            onClick={() => fileInputRef.current?.click()}
          >
            <AvatarImage
              src={getProfileImageUrl(form.getValues("image"))}
              alt={user?.name}
              className="object-cover"
            />
            <AvatarFallback>{form.getValues("displayName")[0]}</AvatarFallback>
          </Avatar>
          <div
            className="absolute bottom-[30px] right-0 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-500"
            onClick={() => fileInputRef.current?.click()}
          >
            <CameraIcon className="h-4 w-4 text-white" />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
        <p className="text-lg font-semibold">{form.getValues("displayName")}</p>
      </div>

      {groups.map((group) => (
        <div key={group.name} className="mt-6">
          <h2 className="mb-3 px-3 font-semibold text-muted-foreground">
            {group.name}
          </h2>
          {group.fields.map((field) => (
            <Drawer key={field.id}>
              <DrawerTrigger asChild>
                <div className="flex cursor-pointer justify-between p-4 text-sm hover:bg-gray-50 md:text-base">
                  <p>{field.label}</p>
                  <div className="flex justify-end">
                    {form.getValues(field.id) ? (
                      <p className="max-w-[25ch] truncate text-green-600">
                        {form.getValues(field.id)}
                      </p>
                    ) : (
                      <p className="text-muted-foreground">
                        {field.placeholder}
                      </p>
                    )}
                    <ChevronRightIcon
                      className="ml-2 text-muted-foreground"
                      width={20}
                    />
                  </div>
                </div>
              </DrawerTrigger>
              <DrawerContent className="flex h-[90%] items-center px-6 md:px-0">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-md"
                  >
                    <InputField
                      control={form.control}
                      name={field.id}
                      type={field.type}
                      label={field.label}
                      placeholder={field.placeholder}
                      data={
                        field.label === "Department" && departmentData
                          ? departmentData
                          : field.data
                      }
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
