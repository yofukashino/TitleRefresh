import Title from "./Components/Title";

export const _getTitle = (OriginalTital: React.FC<unknown>, Props: Record<string, unknown>) => (
  <Title original={<OriginalTital {...Props} />} />
);
