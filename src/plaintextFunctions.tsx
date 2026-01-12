import Title from "@components/Title";

export const _getTitle = (
  OriginalTital: React.FC<unknown>,
  Props: Record<string, unknown>,
): React.ReactElement => <Title original={<OriginalTital {...Props} />} />;
