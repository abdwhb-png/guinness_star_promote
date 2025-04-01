<template>
    <div class="card flex flex-col justify-center">
        <IconField v-show="!searchText" class="md:w-[60%] w-[100%] mx-auto mb-3">
            <InputIcon>
                <i class="pi pi-search" />
            </InputIcon>
            <InputText fluid v-model="search" placeholder="Type to search" />
            <InputIcon v-show="search" @click="search = ''" class="cursor-pointer">
                <i class="pi pi-times" />
            </InputIcon>
        </IconField>

        <ProgressSpinner v-if="loading" />

        <van-empty v-if="!items.length" description="No data available" />

        <div v-else class="w-full flex flex-col gap-3 justify-center">
            <div class="pt-3 border border-surface-200 dark:border-surface-700 rounded md:min-w-[60%] min-w-[100%] mx-auto"
                style="height: 400px; overflow-y: auto">
                <div v-for="(item, index) in items" :key="index"
                    class="mx-2 mb-3 rounded bg-white shadow-xl px-8 leading-6 sm:leading-7 text-slate-700 text-sm dark:bg-slate-800 dark:text-slate-400"
                    style="height: 50px">
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="">
                                <Link class="link" :href="route(
                                    page.props.routePrefix + 'users',
                                    { search: item.username }
                                )
                                    ">{{ item.username }}</Link>
                                {{ item.text }}
                                {{ item.country ? `from ${item.country}` : "" }}
                                {{ item.city ? `(${item.city})` : "" }}
                            </div>
                            <p class="text-xs text-gray-400">
                                {{ item.date }}
                                <span class="hidden">{{
                                    item.created_at
                                    }}</span>
                            </p>
                        </div>

                        <Button v-if="page.props.auth.user.isRoot" @click="() => onDelete(item.id)" outlined
                            icon="pi pi-times" severity="danger" rounded size="small" aria-label="Delete" />
                    </div>
                </div>
            </div>
            <Button @click="loadMore" :disabled="disableLoadMore" :loading="loading"
                class="w-full md:w-1/2 mx-auto mt-4" variant="outlined">Load More</Button>
        </div>
    </div>
</template>

<script setup>
import { usePage } from "@inertiajs/vue3";
import { ref, watch } from "vue";
import { useAdminStore } from "@/stores/admin";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { sleep } from "@/utils/helpers";

const props = defineProps({
    datas: {
        type: Array,
        default: [],
    },
    searchText: { type: String, default: "" },
});

const page = usePage();
const adminStore = useAdminStore();
const confirm = useConfirm();
const toast = useToast();

const items = ref(props.datas);
const currentPage = ref(1);
const search = ref(props.searchText || null);
const loading = ref(false);
const disableLoadMore = ref(false);

const searchData = async () => {
    await sleep(1000);
    loadMore();
};

const onDelete = async (id) => {
    await adminStore.deleteData(
        'co_logs',
        id,
        confirm,
        toast
    )
    // loadMore();
}

watch(
    () => (props.searchText, search.value),
    (text, input) => {
        if (text) {
            search.value = text;
            loadMore();
        }
        if (input !== null) {
            searchData();
        }
    },
    { immediate: true }
);

function loadMore() {
    loading.value = true;
    currentPage.value++;

    axios
        .get(
            route(page.props.routePrefix + "dashboard", {
                page: currentPage.value,
                getData: true,
                search: search.value,
            })
        )
        .then((res) => {
            disableLoadMore.value =
                items.value.length >= res.data.coLogs.length;
            items.value = res.data.coLogs || props.datas;
        })
        .finally(() => {
            loading.value = false;
        });
};
</script>
