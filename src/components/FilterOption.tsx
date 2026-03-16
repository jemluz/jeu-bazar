type FilterOptionProps = {
  children: React.ReactNode;
  isActive: boolean;
  activeStyle: string;
  inactiveStyle: string;
  onOptionChange: () => void;
};

export default function FilterOption({
  children,
  isActive,
  activeStyle,
  inactiveStyle,
  onOptionChange,
}: FilterOptionProps) {
  function handleOptionChange() {
    onOptionChange();
  }

  return (
    <button
      type="button"
      onClick={handleOptionChange}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition ${
        isActive ? activeStyle : inactiveStyle
      }`}
    >
      {children}
    </button>
  );
}
