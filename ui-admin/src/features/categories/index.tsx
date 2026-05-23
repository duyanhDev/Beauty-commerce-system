'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { DialogCategories } from './components/categories-dialog'
import { CategoriesProvider } from './components/categories-provider'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { useCategories } from './data/categories'

export function Categories() {
  const { isPending, isError, data, error } = useCategories()

  const [open, setOpen] = useState<boolean>(false)

  const openClick = () => {
    setOpen((prev) => !prev)
  }

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <div>
      <CategoriesProvider>
        <Header fixed>
          <Search className='me-auto' />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </Header>

        <div className='container m-auto'>
          <div className='flex items-center justify-between'>
            <h1 className='mt-3 text-2xl uppercase'>Danh mục sản phẩm</h1>

            <div className='flex items-center gap-2.5'>
              <Input type='search' placeholder='Search...' />
              <Button>Search</Button>
            </div>
          </div>

          <div className='mt-3' onClick={openClick}>
            <Button>Thêm danh mục</Button>
          </div>

          <DataTable columns={columns} data={data} />
        </div>
      </CategoriesProvider>
      <DialogCategories open={open} setOpen={setOpen} />
    </div>
  )
}
