type FilterLabelProps = {
  children?: React.ReactNode;
};

export function FilterLabel({ children }: FilterLabelProps) {
  return (
    <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
      {children}
    </p>
  );
}
