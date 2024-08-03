import type { Database } from '~/database.types'
import { serverSupabaseClient } from '#supabase/server'
import z from 'zod'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const query = await getValidatedQuery(event, (query) =>
    z.object({ search: z.string().optional() }).parse(query)
  )

  const sbQuery = client
    .from('files')
    .select()
    .limit(30)
    .order('name', { ascending: false })

  if ((query.search ?? '') != '') {
    sbQuery.ilike('name', `%${query.search}%`)
  }

  const { data } = await sbQuery

  return data ?? []
})
