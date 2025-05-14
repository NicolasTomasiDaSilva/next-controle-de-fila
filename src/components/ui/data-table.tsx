"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  FilterFnOption,
  Column,
  Row,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import React from "react";
import { cn } from "@/lib/utils";

export function normalizeString(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

interface DataTableProps<TData, TValue> {
  className?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchFields: string[];
  searchPlaceholder?: string;
  showHeaders?: boolean;
  showSearch?: boolean;
  renderHeader?: (params: {
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
    placeholder: string;
    colSpan: number;
  }) => React.ReactNode;
  renderRow?: (row: Row<TData>) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchFields,
  searchPlaceholder = "Digite para buscar...",
  showHeaders = true,
  showSearch = true,
  renderHeader,
  renderRow,
  className,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    filterFns: {
      fuzzy: (row, id, value) => {
        const data = row.original;
        const search = normalizeString(value);
        return searchFields.some((field) =>
          normalizeString(data[field].toString()).includes(search)
        );
      },
    },
    globalFilterFn: "fuzzy" as FilterFnOption<TData>,
    state: {
      globalFilter,
    },
  });

  return (
    <div className="rounded-md border">
      <Table className="responsive-table">
        {renderHeader ? (
          renderHeader({
            globalFilter,
            setGlobalFilter,
            placeholder: searchPlaceholder,
            colSpan: columns.length,
          })
        ) : (
          <TableHeader>
            {showSearch && (
              <TableRow className="bg-muted/50">
                <TableHead colSpan={columns.length}>
                  <div className="flex items-center py-2">
                    <Input
                      placeholder={searchPlaceholder}
                      value={globalFilter ?? ""}
                      onChange={(event) => setGlobalFilter(event.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                </TableHead>
              </TableRow>
            )}
            {showHeaders &&
              table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
          </TableHeader>
        )}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) =>
              renderRow ? (
                renderRow(row)
              ) : (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              )
            )
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
