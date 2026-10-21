import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function NoResults({ onReset }: { onReset: () => void }) {
  return (
    <Card>
      <CardContent className="text-muted-foreground space-y-4 py-12 text-center">
        <p>По выбранным фильтрам ничего не найдено</p>
        <Button variant="outline" onClick={onReset}>
          Сбросить фильтры
        </Button>
      </CardContent>
    </Card>
  );
}
