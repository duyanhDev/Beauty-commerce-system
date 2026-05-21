import { useCategories } from './data/categories'

export function Categories() {
  const { isPending, isError, data, error } = useCategories()

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <div>
      {data?.map((item, index) => {
        return <p key={index + item.name}>{item.name}</p>
      })}
    </div>
  )
}
