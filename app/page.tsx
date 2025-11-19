"use client";
import ElectricBorder from "@/components/ElectricBorder";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ElectricBorder
        className="w-100 h-70 flex items-center justify-center p-4"
        color="#7df9ff"
        speed={1}
        chaos={0.5}
        thickness={2}
        style={{ borderRadius: 16 }}
      >
        <div>
          <p
            className="text-white text-4xl font-bold text-center"
            style={{ margin: "6px 0 0", opacity: 0.8 }}
          >
            Welcome to the Electric Border Component!
          </p>
        </div>
      </ElectricBorder>
    </div>
  );
}
