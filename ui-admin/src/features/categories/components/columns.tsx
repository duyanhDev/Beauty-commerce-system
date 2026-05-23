'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Categories } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Categories>[] = [
  {
    accessorKey: 'id',
    header: 'id',
  },

  {
    accessorKey: 'name',
    header: 'Tên danh mục',
  },
  {
    accessorKey: 'slug',
    header: 'slug',
  },

  {
    accessorKey: 'parent.name',
    header: 'parent',
  },

  {
    accessorKey: 'children',
    header: 'children',
    cell: ({ row }) => {
      const children = row.original.children

      return children.map((item) => item.name).join(', ')
    },
  },
  {
    id: 'actions',
    header: 'Hành động',
    cell: DataTableRowActions,
  },
]
