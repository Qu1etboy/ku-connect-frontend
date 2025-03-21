import {
  createProfile,
  getKUConnectInterests,
  getMyInterests,
  getMyProfile,
  updateMyInterests,
  updateProfile,
} from "@/services/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const myProfileQueryKey = ["my-profile"];
const myInterestsQueryKey = ["my-interests"];
const kuConnectInterestsQueryKey = ["system-interests"];

export function useMyProfile() {
  return useQuery({
    queryKey: myProfileQueryKey,
    queryFn: getMyProfile,
  });
}

export function useCreateProfile({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProfile,
    onSuccess: (data) => {
      console.log("profile created successfully", data);
      queryClient.refetchQueries({ queryKey: myProfileQueryKey });
      onSuccess();
    },
    onError: () => {
      onError();
    },
  });
}

export function useUpdateMyProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      console.log("profile updated successfully", data);
      queryClient.setQueryData(myProfileQueryKey, data);
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
  });
}

export function useKuConnectInterests() {
  return useQuery({
    queryKey: kuConnectInterestsQueryKey,
    queryFn: getKUConnectInterests,
  });
}

export function useMyInterests() {
  return useQuery({
    queryKey: myInterestsQueryKey,
    queryFn: getMyInterests,
  });
}

export function useUpdateMyInterests() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMyInterests,
    onSuccess: async (data) => {
      console.log("interests updated successfully", data.interests);
      queryClient.setQueryData(myInterestsQueryKey, data.interests);
      toast("Interests updated successfully", {
        position: "top-center",
        icon: "✅",
      });
    },
    onError: () => {
      toast("Error updating interests", {
        position: "top-center",
        icon: "❌",
      });
    },
  });
}
