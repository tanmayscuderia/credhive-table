import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_SortingState,
  type MRT_Virtualizer,
} from 'mantine-react-table';
import { CompanyType } from '../store';
import { useDispatch } from 'react-redux';
import './mantitable.css';

interface Props {
  tableData: CompanyType[];
  tableConfig: MRT_ColumnDef<CompanyType>[];
}

// Define the type for the row object
interface RowType {
  original: any; // Update this with the appropriate type for the 'original' property
}

const MantineTable: React.FC<Props> = ({ tableData, tableConfig }) => {
  const columns = useMemo(() => tableConfig, []);

  const rowVirtualizerInstanceRef = useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

  const [data, setData] = useState<CompanyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(tableData);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex(0);
    } catch (e) {
      console.log(e);
    }
  }, [sorting]);

  const table = useMantineReactTable({
    columns,
    data,
    enableBottomToolbar: true,
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enableGlobalFilterModes: true,
    enablePagination: false,
    enablePinning: true,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    enableDensityToggle: false,
    mantineTableContainerProps: { sx: { height: 'calc(100vh - 210px)' } },
    onSortingChange: setSorting,
    state: { isLoading, sorting },
    rowVirtualizerInstanceRef,
    rowVirtualizerProps: { overscan: 5 },
    columnVirtualizerProps: { overscan: 2 },
    initialState: { density: 'xs' },
    mantineTableBodyRowProps: ({ row }: { row: RowType }) => ({
      onClick: (event: React.MouseEvent<HTMLTableRowElement>) => {
        dispatch({ type: 'SELECTED_ROW', payload: row.original })
      },
      sx: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
      },
    }),
  });

  return <MantineReactTable table={table} />;
};


export default MantineTable;