export function useGetFiles() {
  const search = useState('get-files-search', () => '')

  const fetch = useFetch('/api/files', {
    query: { search },
    watch: false,
  })

  watchDebounced(
    search,
    () => {
      fetch.refresh({ _initial: false })
    },
    { debounce: 300, maxWait: 1000 }
  )

  return { ...fetch, search }
}
