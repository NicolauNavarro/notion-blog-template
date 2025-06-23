import React from "react";

export default function Heading_1({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-medium">{children}</h2>;
}
