import { Calendar } from "@/components/calendar";

export default function Home() {
  return (
    <main className="container mx-auto">
      <Calendar viewingDate={new Date()} />
    </main>
  );
}
