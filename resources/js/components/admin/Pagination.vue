<template>
    <div class="flex flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium" :class="[
        sizeClass,
        showItemsSelection ? 'justify-between' : 'justify-center',
    ]">
        <!-- Items per page selection -->
        <div class="flex items-center gap-2 order-2 md:order-1" v-if="showItemsSelection">
            Items per page
            <Select class="w-40" :default-value="modelValue" :options="itemsPerPage" editable
                @change="$emit('update:modelValue', $event.value)" :disabled="loading || !paginated.total" />
        </div>

        <!-- Boutons de pagination -->
        <MyPagination v-if="true" :paginated="paginated" />
        <div v-else class="flex justify-center items-center gap-4 order-1 md:order-2">
            <span data-datatable-info="true">{{ paginationInfo }}</span>
            <div class="pagination">
                <div class="pagination space-x-2">
                    <!-- Bouton Précédent -->
                    <Link class="btn" :class="{ disabled: !paginated.prev_page_url }"
                        :href="paginated.prev_page_url ?? ''" prefetch cache-for="1m">
                    <i class="ki-outline ki-black-left rtl:transform rtl:rotate-180"></i>
                    </Link>

                    <UiButton v-if="!showEllipsis" variant="outline" class="btn" as-child>
                        <Link preserve-scroll prefetch cache-for="1m" :href="paginated.first_page_url ?? ''" class="rt">
                        ...
                        </Link>
                    </UiButton>

                    <!-- Affichage dynamique des pages -->
                    <UiButton v-for="link in visiblePageNumbers" :key="link.label" as-child :class="{
                        'active disabled': link.active,
                    }" :variant="link.active ? '' : 'secondary'">
                        <Link preserve-scroll prefetch cache-for="1m" :href="link.url ?? ''" class="rt">
                        {{ link.label }}
                        </Link>
                    </UiButton>

                    <UiButton v-if="showEllipsis" variant="outline" class="btn" as-child>
                        <Link preserve-scroll prefetch cache-for="1m" :href="paginated.last_page_url ?? ''" class="rt">
                        ...
                        </Link>
                    </UiButton>

                    <!-- Bouton Suivant -->
                    <Link class="btn" :class="{ disabled: !paginated.next_page_url }" prefetch cache-for="1m"
                        :href="paginated.next_page_url ?? ''">
                    <i class="ki-outline ki-black-right rtl:transform rtl:rotate-180"></i>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MyPagination from "@/components/shared/MyPagination.vue";
import { ref, computed } from "vue";
import { LaravelPagination } from "@/types";
import { itemsPerPage } from "@/utils/dataTable";

const emits = defineEmits(['update:modelValue', 'reset']);

const props = defineProps({
    modelValue: [String, Number],
    paginated: {
        type: Object as () => LaravelPagination<any>,
        required: false,
        default: {},
    },
    showItemsSelection: {
        type: Boolean,
        default: true,
    },
    maxVisiblePages: {
        type: Number,
        required: false,
        default: 5,
    },
    sizeClass: String,
});

const loading = ref(false);

const currentPage = computed(() => props.paginated.current_page);

// Calcul des indices de début et de fin des éléments affichés
const from = computed(
    () => (currentPage.value - 1) * props.paginated.per_page + 1,
);
const to = computed(() =>
    Math.min(
        currentPage.value * props.paginated.per_page,
        props.paginated.total,
    ),
);
const paginationInfo = computed(
    () => `${from.value} to ${to.value} of ${props.paginated.total}`,
);

// Filtrer les liens de pagination pour exclure "Précédent" et "Suivant"
const filteredLinks = computed(() => props.paginated.links?.slice(1, -1));

// Limiter à 5 pages visibles à la fois
const visiblePageNumbers = computed(() => {
    let start = Math.max(
        currentPage.value - Math.floor(props.maxVisiblePages / 2),
        0,
    );
    let end = start + props.maxVisiblePages;

    return filteredLinks.value?.slice(start, end);
});

// Show ellipsis when there are more pages than visible
const showEllipsis = computed(() => {
    return filteredLinks.value?.length > props.maxVisiblePages &&
        currentPage.value < ((filteredLinks.value?.length - Math.floor(props.maxVisiblePages / 2) - 1));
});
</script>
