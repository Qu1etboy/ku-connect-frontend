import { ThreeDot } from "react-loading-indicators";

export function LoadingScreen() {
  return (
    <div className="flex h-full items-center justify-center">
      <ThreeDot color="#bbf7d0" size="medium" />
    </div>
  );
}
