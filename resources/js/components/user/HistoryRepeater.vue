<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { getSeverity, paginate } from "@/utils";
import { Message } from "primevue";

const props = defineProps({
    data: Array,
    section: {
        type: String,
        required: true,
    },
});

const items = ref([]);

const currentPage = ref(0);
const firstElem = ref(0);
const itemsPerPage = props.section == "transactions" ? 10 : 5;

const totalItems = computed(() => items.value.length);

const paginatedItems = computed(() => {
    return paginate(items.value, itemsPerPage);
});

const dealPop = ref();
const currentDeal = ref({});

const showDeal = (event, deal) => {
    currentDeal.value = deal;
    dealPop.value.toggle(event);
};

watch(
    () => props.data,
    (newData) => {
        items.value = newData || [];
    },
    { immediate: true }
);
</script>
<template>
    <div>
        <div class="flex justify-between items-center">
            <p class="text-g60 font-semibold">Total Item</p>
            <p class="text-g60 font-semibold">({{ totalItems }})</p>
        </div>

        <van-empty v-if="totalItems == 0" description="No records found" />

        <div v-else>
            <Popover ref="dealPop">
                <div class="flex flex-col gap-4">
                    <div>
                        <div class="">
                            <p class="text-g60 font-semibold">Deal Detail</p>
                            <div v-show="currentDeal.description" class="text-sm text-g50 pt-4">
                                <div v-html="currentDeal.description"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Popover>
            <div v-if="section == 'transactions'" class="flex flex-col gap-4 pt-4">
                <div v-for="(item, index) in paginatedItems[currentPage]" :key="item.ref_id"
                    class="flex flex-col gap-4 pt-2">
                    <div class="p-4 rounded-xl border border-g30 flex justify-start items-center gap-4">
                        <div class="w-full">
                            <div class="flex justify-between items-center">
                                <div class="flex justify-start items-center gap-2 text-sm">
                                    <p class="text-sm font-medium text-g60" :style="{ textTransform: 'capitalize' }">
                                        {{ item.type }}
                                    </p>
                                    <p class="text-g60 font-semibold">
                                        <span class="text-g40 font-semibold">$</span>
                                        {{ item.amount }}
                                    </p>
                                </div>
                                <van-tag :type="getSeverity(item.status)">{{
                                    item.status
                                }}</van-tag>
                            </div>

                            <p class="text-g50 text-xs pt-1 mt-2">
                                {{ item.method }}
                            </p>
                            <p class="text-g50 text-xs pt-1">
                                {{ item.updated }}
                            </p>

                            <p class="text-g40 text-xs border-t border-dashed border-g30 pt-1 mt-2">
                                REF: {{ item.ref_id }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="section == 'deals'" class="flex flex-col gap-4 pt-4 mb-2">
                <div v-for="(item, index) in paginatedItems[currentPage]" :key="item.id"
                    class="p-4 rounded-xl border bg-g20 border-g30">
                    <div class="flex justify-between items-center pb-2 mb-3 border-b border-dashed border-g30 text-g60">
                        <p class="text-sm">{{ item.pivot.date }}</p>
                        <van-tag :type="getSeverity(item.pivot.status)">
                            {{
                                item.pivot.status.replace(
                                    "pending",
                                    "available"
                                )
                            }}
                        </van-tag>
                    </div>
                    <div class="flex flex-col justify-start items-center gap-4">
                        <div class="rounded-lg overflow-hidden">
                            <Image :src="item.image" alt="Image" preview />
                        </div>
                    </div>
                    <div class="">
                        <p class="text-xl font-medium text-g60">
                            {{ item.name }} ({{ item.category }})
                        </p>

                        <div class="flex justify-start items-center gap-2 pt-2 text-sm pb-2">
                            <p class="text-g40 font-semibold">
                                {{ $page.props.auth.user.account.currency }}
                            </p>
                            <p v-if="item.pivot.frozen" class="text-g60 font-semibold">
                                {{ item.pivot.frozen }}
                            </p>
                            <p v-else class="text-g60 font-semibold">
                                {{
                                    item.pivot.status == "completed"
                                        ? `${item.pivot.price}`
                                        : `${item.display_price ?? ''}`
                                }}
                            </p>
                            <van-tag v-if="item.pivot.status == 'completed'" type="primary" plain size="large">{{ `+
                                ${item.pivot.profit}` }}</van-tag>
                        </div>

                        <div v-if="
                            item.pivot.status == 'canceled' &&
                            item.pivot.message
                        ">
                            <Message icon="pi pi-exclamation-triangle" severity="error" closable>
                                {{ item.pivot.message }}
                            </Message>
                        </div>

                        <p class="text-g40 text-xs border-t border-dashed border-g30 pt-1 mt-2">
                            <span class="font-semibold cursor-pointer underline" @click="showDeal($event, item)">Show
                                Detail</span>
                        </p>
                    </div>
                </div>
            </div>

            <Paginator v-model:first="firstElem" :rows="itemsPerPage" :totalRecords="totalItems"
                @page="currentPage = $event.page"></Paginator>
        </div>
    </div>
</template>
