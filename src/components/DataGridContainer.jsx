const DataGridContainer = ({ children }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {children}
    </div>
  );
};

export default DataGridContainer;
