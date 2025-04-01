<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '@/components/ui/pagination';
import { Link, router } from '@inertiajs/vue3';
import { LaravelPagination } from 'laravel-vue-pagination';
import { computed } from 'vue';

const props = defineProps({
    paginated: {
        type: Object as () => LaravelPagination<any>,
        required: false,
        default: null,
    },
});

const filteredLinks = computed(() => props.paginated.links?.slice(1, -1));

function changePage(index) {
    router.get(
        filteredLinks.value[index]?.url || '',
        {},
        {
            preserveScroll: true,
            // preserveState: true,
        },
    );
}
</script>

<template>
    <Pagination v-if="paginated" v-slot="{ page }" :items-per-page="paginated.per_page" :total="paginated.total"
        :sibling-count="1" show-edges :default-page="1">
        <PaginationList v-slot="{ items }" class="flex items-center justify-center gap-1">
            <PaginationFirst />
            <PaginationPrev />

            <template v-for="(item, index) in items">
                <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                    <Button class="h-9 w-9 p-0"
                        :variant="item.value === page || item.value === route().params.page ? 'default' : 'outline'"
                        as-child>
                        <Link preserve-scroll preserve-state prefetch cache-for="1m"
                            :href="route(route().current(), { ...route().params, page: item.value })">
                        {{ item.value }}
                        </Link>
                    </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext />
            <PaginationLast />
        </PaginationList>
    </Pagination>
</template>
