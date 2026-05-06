<script setup lang="ts">
import { onMounted } from 'vue'
import { UserIcon } from 'lucide-vue-next'

import { PageTemplate } from '@/shared/ui/templates'
import { Avatar } from '@/shared/ui/avatar'
import { AvatarImage } from '@/shared/ui/avatar'
import { AvatarFallback } from '@/shared/ui/avatar'
import { useProfileStore } from '@/entities/profile'
import { Card } from '@/shared/ui/card'
import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/shared/ui/tabs'

const profileStore = useProfileStore()

onMounted(() => {
    void profileStore.load()
})
</script>

<template>
    <PageTemplate class="flex flex-col gap-8">
        <Card class="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
            <Avatar size="lg" shape="square" class="shrink-0 self-start">
                <AvatarImage v-if="profileStore.profile" :src="profileStore.profile.image" alt="profile image" />
                <AvatarFallback v-else>
                    <UserIcon class="" />
                </AvatarFallback>
            </Avatar>
            <div class="flex min-w-0 flex-col gap-4">
                <p class="break-words text-2xl font-bold">{{ profileStore.profile?.name }}</p>
                <div class="grid grid-cols-1 sm:gap-2 sm:grid-cols-2 md:gap-4">
                    <p class="break-words text-sm text-muted-foreground">{{ profileStore.profile?.email }}</p>
                    <p class="break-words text-sm text-muted-foreground">{{ profileStore.profile?.tagline }}</p>
                    <p class="break-words text-sm text-muted-foreground">{{ profileStore.profile?.bio }}</p>
                    <p class="break-words text-sm text-muted-foreground">{{ profileStore.profile?.location }}</p>
                </div>
            </div>
        </Card>

        <Tabs defaultValue="test1">
            <TabsList class="mb-4">
                <TabsTrigger value="test1">
                    Test1
                </TabsTrigger>
                <TabsTrigger value="test2">
                    Test2
                </TabsTrigger>
            </TabsList>
            <Card class="p-4 shadow-none dark:none">
                <TabsContent value="test1">
                    Test1 Content
                </TabsContent>
                <TabsContent value="test2">
                    Test2 Content
                </TabsContent>
            </Card>
        </Tabs>
    </PageTemplate>
</template>