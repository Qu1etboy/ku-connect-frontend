import { getSettings, updateSettings } from "@/services/settings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const queryKey = ["my-settings"];

export function useSettings() {
  return useQuery({
    queryKey,
    queryFn: getSettings,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSettings,
    onSuccess: (data) => {
      console.log("settings updated successfully", data);
      queryClient.setQueryData(queryKey, data);
      toast("Settings updated successfully", {
        icon: "✅",
        position: "top-center",
      });
    },
    onError: () => {
      toast("Failed to update settings", {
        icon: "❌",
        position: "top-center",
      });
    },
  });
}
