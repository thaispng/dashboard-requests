
"use client";
import Header from "@/components/_ui/header/header";
import Dash from "@/components/_ui/dash/dash";
import  Table  from "@/components/_ui/table/table";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center px-10 pb-5 gap-4">
      <Dash />
      <Table />
      </main>
    </>
  );
}
