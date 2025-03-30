import { Profile } from "@/services/profile";
import { getProfileImageUrl } from "@/utils/url";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {
  displayDepartmentLabel,
  displayFacultyLabel,
  displayYearLabel,
} from "@/data/form";

interface ProfileMoreProps {
  profile: Profile;
  nisitInfo?: string;
  children?: React.ReactNode;
  visibility?: "public" | "connected";
}
export default function ProfileMore({
  profile,
  nisitInfo,
  children,
  visibility = "public",
}: ProfileMoreProps) {
  const contactInfo = [
    { name: "Line", value: profile.line },
    { name: "Facebook", value: profile.facebook },
    { name: "Instagram", value: profile.instagram },
    { name: "Other", value: profile.other },
  ];

  const isContactInfoVisible =
    profile.settings.contactInfoVisibility === "public" ||
    (visibility === "connected" &&
      profile.settings.contactInfoVisibility === "connected");

  const renderNisitInfo = () => {
    let info = [];
    if (profile.faculty) {
      info.push(`Faculty of ${displayFacultyLabel(profile.faculty)}`);
    }
    if (profile.department) {
      info.push(`${displayDepartmentLabel(profile.department)}`);
    }
    if (profile.year) {
      info.push(`${displayYearLabel(profile.year)}`);
    }
    return info.join(", ");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children || (
          <Button variant="link" className="px-0 text-sm text-green-500">
            Read more
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto max-h-[80dvh] min-h-[80dvh] w-full max-w-sm overflow-scroll">
          <DrawerHeader>
            <Avatar className="absolute -top-14 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-white shadow-md">
              <AvatarImage
                className="rounded-full"
                src={getProfileImageUrl(profile.image || "")}
              />
              <AvatarFallback>
                {profile.displayName[0]}
                <span className="sr-only">{profile.displayName}</span>
              </AvatarFallback>
            </Avatar>
            <DrawerTitle className="pt-8">
              <h1 className="text-left text-2xl font-bold">
                {profile.displayName}
              </h1>
            </DrawerTitle>
            <DrawerDescription>
              <p className="text-left text-base font-semibold">
                {nisitInfo || renderNisitInfo()}
              </p>
              <p className="mt-2 text-left">{profile.bio}</p>
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-6 px-4 pb-6 pt-2">
            {profile.interests.length > 0 && (
              <div>
                <h2 className="font-semibold text-muted-foreground">
                  Interests
                </h2>
                <div className="my-4 flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <Badge
                      key={interest.id}
                      variant="outline"
                      className="rounded-3xl px-3 py-2 text-sm"
                    >
                      {interest.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {isContactInfoVisible && (
              <div>
                <h2 className="font-semibold text-muted-foreground">
                  Contact Information
                </h2>
                {contactInfo.map((info) => (
                  <div className="my-4 grid grid-cols-3 gap-1" key={info.name}>
                    <p className="col-span-1 grid text-wrap text-sm font-semibold">
                      {info.name}
                    </p>
                    <p className="col-span-2 grid whitespace-pre text-wrap break-all text-sm text-green-600">
                      {info.value || "-"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
