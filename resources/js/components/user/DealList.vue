<template>
    <div class="helpCenterTab">
        <ul class="tab-button flex justify-between items-center font-semibold text-g40">
            <li v-for="(tab, index) in tabs" :key="tab.id" :id="tab.id"
                class="tabButton w-full text-center pb-4 border-b-2 border-g30 cursor-pointer"
                :class="activeTabId === tab.id ? 'activeTabButton' : ''" @click="changeTab(tab.id)">
                {{ tab.name }}
            </li>
        </ul>

        <div class="pt-8">
            <van-notice-bar v-if="!activeTab.items" color="#9c9ea1" background="#ecf9ff" left-icon="info-o">
                Select a tab to show records.
            </van-notice-bar>
            <template v-else>
                <div v-for="(tab, index) in tabs" :key="index" class="tab-content"
                    :class="activeTabId === tab.id ? 'activeTab' : 'hiddenTab'" :id="`${tab.id}_data`">
                    <HistoryRepeater section="deals" :data="tab.items" />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import HistoryRepeater from "@/components/user/HistoryRepeater.vue";

const data = ref([]);
const localKey = "dealsActiveTab";
const tabs = reactive([
    {
        name: "Available",
        key: "pending",
        id: "tabOne",
        items: [],
    },
    {
        name: "Processing",
        id: "tabThree",
        items: [],
    },
    // {
    //     name: "Completed",
    //     id: "tabTwo",
    //     items: [],
    // },
    {
        name: "Canceled",
        id: "tabTwo",
        items: [],
    },
]);

const activeTabId = ref(localStorage.getItem(localKey) || tabs[0].id);
const activeTab = computed(() =>
    tabs.find((tab) => tab.id === activeTabId.value)
);

const changeTab = (id) => {
    loadData();
    activeTabId.value = id;
    localStorage.setItem(localKey, id);
};

const loadData = () => {
    tabs.forEach((tab) => {
        tab.items = getData(tab.key || tab.name.toLowerCase());
    });
};

const getData = (status = null) => {
    return data.value.filter((deal) => (status ? deal.pivot?.status === status : true));
};

onMounted(async () => {
    await axios.get(route('user.deals'))
        .then((response) => {
            data.value = response.data;
        })
        .catch((error) => {
            console.error(error);
            data.value = [];
        });
    changeTab(activeTabId.value);
});
</script>
