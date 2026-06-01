type ButtonFilterPropType = {
  children: React.ReactNode;
  filter: string;
  filterValue: string;
  handleFilter: (filterValue: string) => void;
};

const ButtonFilter = ({
  children,
  filter,
  filterValue,
  handleFilter,
}: ButtonFilterPropType) => {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${filter === filterValue ? "bg-primary-700" : ""}`}
      onClick={() => handleFilter(filterValue)}
    >
      {children}
    </button>
  );
};

export default ButtonFilter;
