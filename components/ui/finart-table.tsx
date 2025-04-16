"use client";

import { useState } from "react";
import { CaretSortIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Define common types
export type SortDirection = "asc" | "desc" | null;

export type ColumnDefinition<T> = {
  id: string;
  header: string;
  accessorKey: keyof T | ((row: T) => unknown);
  cell?: (row: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
};

export type FinartTableProps<T> = {
  data: T[];
  columns: ColumnDefinition<T>[];
  className?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  onRowClick?: (row: T) => void;
  sortable?: boolean;
  defaultSortColumn?: string;
  defaultSortDirection?: SortDirection;
  compact?: boolean;
  striped?: boolean;
  highlightOnHover?: boolean;
};

export function FinartTable<T extends Record<string, unknown>>({
  data,
  columns,
  className,
  rowClassName,
  onRowClick,
  sortable = true,
  defaultSortColumn,
  defaultSortDirection = "asc",
  compact = false,
  striped = false,
  highlightOnHover = true,
}: FinartTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(defaultSortColumn || null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    defaultSortColumn ? defaultSortDirection : null
  );

  const handleSort = (columnId: string) => {
    if (!sortable) return;
    
    if (sortColumn === columnId) {
      // Toggle sort direction or reset
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  // Sort the data based on current sort state
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;

    const column = columns.find((col) => col.id === sortColumn);
    if (!column) return 0;

    let valueA: unknown, valueB: unknown;

    if (typeof column.accessorKey === "function") {
      valueA = column.accessorKey(a);
      valueB = column.accessorKey(b);
    } else {
      valueA = a[column.accessorKey as keyof T];
      valueB = b[column.accessorKey as keyof T];
    }

    if (valueA === valueB) return 0;
    
    const modifier = sortDirection === "asc" ? 1 : -1;
    
    // Handle string comparison
    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB) * modifier;
    }
    
    // Handle number comparison
    if (typeof valueA === "number" && typeof valueB === "number") {
      return (valueA > valueB ? 1 : -1) * modifier;
    }
    
    // Handle date comparison
    if (valueA instanceof Date && valueB instanceof Date) {
      return (valueA.getTime() - valueB.getTime()) * modifier;
    }
    
    // Default comparison (convert to string if needed)
    return String(valueA).localeCompare(String(valueB)) * modifier;
  });

  // Helper to get cell value
  const getCellValue = (column: ColumnDefinition<T>, row: T): React.ReactNode => {
    if (column.cell) {
      return column.cell(row);
    }

    if (typeof column.accessorKey === "function") {
      return String(column.accessorKey(row));
    }

    return String(row[column.accessorKey as keyof T]);
  };

  // Render sort indicator
  const renderSortIndicator = (columnId: string) => {
    if (!sortable) return null;
    if (sortColumn !== columnId) return <CaretSortIcon className="ml-1 h-4 w-4 opacity-50" />;
    
    return sortDirection === "asc" ? (
      <ChevronUpIcon className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDownIcon className="ml-1 h-4 w-4" />
    );
  };

  return (
    <div className="w-full overflow-hidden">
      <Table className={cn("w-full", className)}>
        <TableHeader>
          <TableRow className="border-b border-border/50 hover:bg-transparent">
            {columns.map((column) => (
              <TableHead
                key={column.id}
                onClick={column.sortable !== false && sortable ? () => handleSort(column.id) : undefined}
                className={cn(
                  column.sortable !== false && sortable && "cursor-pointer select-none",
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right",
                  "bg-muted/30 font-medium text-xs uppercase tracking-wider",
                  column.className
                )}
              >
                <div className="flex items-center">
                  <span>{column.header}</span>
                  {column.sortable !== false && sortable && renderSortIndicator(column.id)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results found.
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((row, rowIndex) => {
              const rowClass = typeof rowClassName === "function" 
                ? rowClassName(row, rowIndex) 
                : rowClassName;
              
              return (
                <TableRow
                  key={rowIndex}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(
                    onRowClick && "cursor-pointer",
                    striped && rowIndex % 2 === 1 && "bg-muted/30",
                    !highlightOnHover && "hover:bg-transparent",
                    compact ? "h-8" : "h-12",
                    "border-b border-border/20 transition-colors",
                    rowClass
                  )}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={`${rowIndex}-${colIndex}`}
                      className={cn(
                        "text-sm",
                        compact ? "py-1 px-2" : "py-2 px-3",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        column.className
                      )}
                    >
                      {getCellValue(column, row)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default FinartTable; 