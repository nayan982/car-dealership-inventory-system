const SkeletonTable = ({ rows = 6, columns = 6 }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5">
      <table className="w-full">
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-white/5 last:border-0"
            >
              {Array.from({ length: columns }).map((_, columnIndex) => (
                <td key={columnIndex} className="p-4">
                  <div className="skeleton h-4 w-full rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;