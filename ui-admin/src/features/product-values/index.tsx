import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MoreHorizontalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { VolumeDialog } from './components/dialog'
import { ProductValue } from './data/schema'
import { fetchProductValue } from './data/value-data'

export function ProductValues() {
  const [page, setPage] = useState<number>(1)
  const [open, SetOpen] = useState<boolean>(false)

  const limit = 10

  const skip = (page - 1) * limit

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['attribute-values'],
    queryFn: fetchProductValue,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const totalData = data?.slice(skip, skip + limit)

  const totalPage = Math.ceil((data?.length || 0) / limit)

  const onChangePage = (page: number) => {
    if (page > 0 && page <= totalPage) {
      setPage(page)
    }
  }

  const OpenDialog = () => {
    console.log('xx')

    SetOpen(true)
  }

  return (
    <>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>
      <div className='mt-3.5 p-5 text-2xl font-bold uppercase'>
        {' '}
        Danh mục quản lý Dung Tích
      </div>

      <Button className='ml-5 w-1/6 p-5' onClick={OpenDialog}>
        Thêm Dung Tích
      </Button>

      <div className='m-5'>
        <Table className=''>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Tên dung tích</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalData?.map((item: ProductValue) => {
              return (
                <TableRow className='p-5'>
                  <TableCell className='font-medium'>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className='text-right'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon' className='size-8'>
                          <MoreHorizontalIcon />
                          <span className='sr-only'>Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant='destructive'>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => onChangePage(page - 1)} />
            </PaginationItem>

            {[...Array(totalPage)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={page === index + 1}
                  onClick={() => onChangePage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext onClick={() => onChangePage(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <VolumeDialog open={open} onOpenChange={SetOpen} />
    </>
  )
}
