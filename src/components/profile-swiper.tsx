type Profile = {
  name: string;
  description: string;
  image: string;
};

type ProfileSwiperProps = {
  profiles: Profile[];
  children: React.ReactNode;
};

export default function ProfileSwiper({
  profiles,
  children,
}: ProfileSwiperProps) {
  return (
    <div className="snap-y snap-mandatory flex-1 overflow-scroll no-scrollbar">
      {profiles.map((profile, index) => (
        <div key={index} className="snap-center snap-always h-full w-full">
          <div className="h-[55%]">
            <img
              src={profile.image}
              alt={`Image ${index + 1}`}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">{profile.name}</h1>
            <p>{profile.description}</p>
          </div>
        </div>
      ))}
      {children}
    </div>
  );
}
