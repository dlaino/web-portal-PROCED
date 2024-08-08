export type MappableItem<T> = {
  id: number;
  name: string;
};

export function transformIdToNameMap<T>(
  data: MappableItem<T>[] | undefined
): Record<number, string> {
  return (
    data?.reduce((acc, item) => {
      acc[item.id] = item.name;
      return acc;
    }, {} as Record<number, string>) || {}
  );
}
