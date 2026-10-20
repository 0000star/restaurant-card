import { Card, CardContent } from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card>
      <CardContent className="text-muted-foreground py-12 text-center">
        Пока нет записей — добавьте первое заведение
      </CardContent>
    </Card>
  );
}
