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
import { fetchDataAttributeValue } from './data/data'

export function Attribute_values() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['attribute-value'],
    queryFn: fetchDataAttributeValue,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <div className='flex justify-between'>
        <Button className='m-5'>Thêm mới</Button>
        <div className=''>
          <input type='serch' placeholder='Tìm kiếm' />
        </div>
      </div>
      <div className='m-5 mt-2.5'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Biến thể</TableHead>
              <TableHead>Thuộc tính</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.length > 0 &&
              data.map((attr: any, index: number) => {
                return (
                  <TableRow key={attr.id}>
                    <TableCell className='font-medium'>{index + 1}</TableCell>
                    <TableCell className='font-medium'>{attr.value}</TableCell>
                    <TableCell className='font-medium'>
                      {attr.attribute.name}
                    </TableCell>

                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='size-8'
                          >
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
      </div>
    </div>
  )
}
