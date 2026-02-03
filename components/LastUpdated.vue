<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(`last-update-page-${route.path}`, () => {
  return queryCollection('docs').path(route.path).first()
})

const { data: lastUpdate } = await useAsyncData(
  `last-update-git-${route.path}`,
  async () => {
    if (!page.value) return null

    // In Nuxt Content 3, page object has 'stem' which is the path within 'content/'
    const stem = (page.value as any).stem
    if (!stem) return null

    const githubPath = `content/${stem}.md`

    const config = useRuntimeConfig()
    const owner = 'budgera'
    const repo = 'wiki'

    try {
      const response = await $fetch<any[]>(`https://api.github.com/repos/${owner}/${repo}/commits`, {
        params: {
          path: githubPath,
          page: 1,
          per_page: 1,
        },
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      })

      if (response && response.length > 0) {
        return response[0].commit.committer.date
      }
    } catch (e) {
      console.error('Failed to fetch last update from GitHub', e)
    }

    return null
  },
  {
    watch: [page],
  },
)

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}
</script>

<template>
  <div v-if="lastUpdate" class="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-500">
    <p class="mb-0 text-xs text-neutral-400">Обновлено:</p>
    <span>{{ formatDate(lastUpdate) }}</span>
  </div>
</template>
