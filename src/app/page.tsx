import { RestaurantsView } from "@/components/restaurants/restaurants-view";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Мои рестораны</h1>
      <div className="mt-8">
        <RestaurantsView />
      </div>
    </main>
  );
}
