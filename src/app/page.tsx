"use client";

import MobileContainer from "@/components/container/mobile";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  return (
    <MobileContainer>
      <h1>Hello Mhoo Toey</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque,
        totam aspernatur perspiciatis minima officia cupiditate reiciendis,
        nostrum eos commodi soluta sint quidem. Quam ad adipisci vitae ex illo
        corporis amet!
      </p>
      <Button>Click</Button>
    </MobileContainer>
  );
}
