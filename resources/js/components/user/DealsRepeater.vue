<script setup>
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/user";
import { useInfiniteQuery } from "@tanstack/vue-query";

const userStore = useUserStore();

const deals = ref([]);
const pagination = reactive({
    prevPage: null,
    currentPage: 1,
    nextPage: null,
    list: [],
});

const fetchPaginatedData = async ({ pageParam = pagination.currentPage }) => {
    const { data } = await axios.get(
        route("deal.index", { page: pageParam, per_page: 30, limit: 500 })
    );

    pagination.currentPage = data.current_page;

    pagination.nextPage =
        data.current_page < data.last_page ? data.current_page + 1 : undefined;

    pagination.prevPage =
        data.current_page > 1 ? data.current_page - 1 : undefined;

    deals.value = data.data;
    pagination.list = data;

    const activeCategory = categories.find((item) => item.active);
    if (activeCategory) {
        filter(activeCategory.id);
    }

    return data;
};

const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    data,
} = useInfiniteQuery({
    queryKey: ["siteStore", "deals"],
    // initialPageParam: 1,
    queryFn: fetchPaginatedData,
    getNextPageParam: (lastPage) => {
        return pagination.nextPage;
        return lastPage.next_page_url ? lastPage.current_page + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) => {
        return pagination.prevPage;
        return firstPage.prev_page_url ? firstPage.current_page - 1 : undefined;
    },
});

const categories = [
    {
        name: "All",
        id: "all",
        active: true,
    },
    {
        name: "Artists",
        id: "artist",
        active: false,
    },
    {
        name: "Tracks",
        id: "track",
        active: false,
    },
];

const filter = (category) => {
    deals.value = Object.values(pagination.list.data).filter(
        (item) => category == "all" || item.category === category
    );

    categories.map((item) => {
        item.active = item.id === category;
    });
};
</script>

<template>
    <div class="">
        <ul
            class="flex justify-start items-center overflow-y-auto text-base font-medium gap-3 pb-2 horizontal-slide productCategoryList">
            <li v-for="(item, index) in categories" :key="index" class="item" translate="no"
                :class="{ active: item.active }" @click="filter(item.id)">
                {{ item.name }}
            </li>
        </ul>

        <div class="flex justify-between items-center pt-4 relative mb-3">
            <button type="button" @click="fetchPreviousPage" :disabled="isFetchingPreviousPage" v-if="hasPreviousPage"
                class="text-g60 font-semibold absolute left-0 flex items-center gap-2">
                <i class="ph ph-skip-back"></i> Previous
            </button>
            <button type="button" @click="fetchNextPage" :disabled="isFetchingNextPage" v-if="hasNextPage"
                class="text-g60 font-semibold absolute right-0 flex items-center gap-2">
                Next <i class="ph ph-skip-forward"></i>
            </button>
        </div>

        <div>
            <div v-if="isLoading || isFetching" class="flex justify-center items-center">
                <van-loading type="spinner" />
            </div>

            <van-notice-bar v-if="isError" color="red" background="#ecf9ff" left-icon="info-o" :description="error" />

            <van-empty v-if="isSuccess && deals.length == 0" description="No records found" />

            <div class="pt-4 grid grid-cols-2 gap-4" v-if="isSuccess">
                <div v-for="(item, index) in deals" :key="item.id" class="col-span-1 relative">
                    <a href="javascript:void(0)" class="rounded-xl relative overflow-hidden block liner-bg-1">
                        <div v-lazy-container="{
                            selector: 'img',
                            error: '/app/assets/images/default-deal.png',
                        }" class="flex justify-center">
                            <Image :data-src="item.image" :src="item.image" alt="Image" preview />
                        </div>
                    </a>
                    <div @click="userStore.toggleDealFavourite(item)"
                        class="absolute top-3 right-3 shadow-1 bg-white p-1.5 rounded-full flex justify-center items-center cursor-pointer favouriteButton">
                        <i class="ph-heart-straight text-g60" :class="item.isLiked ? 'ph-fill' : 'ph'"></i>
                    </div>
                    <div class="pt-1">
                        <p class="truncate mt-2">
                            <a translate="no" :href="item.spotify_url || 'javascript:void(0)'" target="_blank"
                                class="text-g60 hover:text-sky-500 text-base font-semibold">
                                {{ item.name }}
                            </a>
                        </p>
                        <div class="flex justify-between items-center">
                            <p class="text-g60 font-semibold text-xs" style="text-transform: capitalize">
                                {{ item.category }}
                            </p>
                            <i class="ph ph-dot text-3xl text-g50 leading-none"></i>
                            <div class="flex justify-start items-center gap-2">
                                <i class="ph-fill ph-star text-g30"></i>
                                <p class="text-g60 font-semibold text-xs">
                                    {{ item.average_rating }}
                                    <span class="font-normal text-g40">({{ item.total_reviews }})</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:void(0)" class="text-g60 font-semibold text-sm">
                        <span class="font-normal text-g40">
                            {{ 'Popularity' }}</span>
                        {{ `${item.popularity}%` }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.p-image {
    height: 100%;
}

.p-image img {
    min-height: 170px;
    max-height: 170px;
    min-width: 100%;
}

@media screen and (max-width: 360px) {
    .p-image img {
        min-height: 100px;
        max-height: 100px;
    }
}
</style>
