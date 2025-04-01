<script setup>
import { reactive, ref, watch } from "vue";
import { useAdminStore } from "@/stores/admin";

const adminStore = useAdminStore();

const data = ref(adminStore.currentUser);
const currentIndex = ref("");
const searchInput = ref("");

const toShow = reactive([
    {
        label: "User",
        key: "call_name",
        value: {}
    },
    {
        label: "User Account",
        key: "account",
        value: {}
    },
    {
        label: "User Info",
        key: "info",
        value: {}
    },
    {
        label: "Payment Methods",
        key: "payment_methods",
        value: {}
    }
]);

initValues();

watch(searchInput, () => {
    const currentData = toShow.find((item) => item.key === currentIndex.value);
    if (!currentData) return;

    toShow.forEach((item) => {
        if (item.key === currentData.key) {
            item.value = searchInput.value
                ? Object.keys(data.value[currentData.key])
                    .filter((index) =>
                        index.toString().toLowerCase().includes(searchInput.value.toLowerCase())
                    ).reduce((acc, index) => {
                        acc[index] = data.value[currentData.key][index];
                        return acc;
                    }, {})
                : data.value[currentData.key];
        }
    });
});

function initValues() {
    toShow.forEach((item) => {
        item.value = data.value[item.key];
    });
}

function isObject(value) {
    return typeof value === "object";
}
</script>

<template>
    <div>
        <div>
            <Accordion v-model:value="currentIndex">
                <AccordionPanel v-for="data in toShow" :key="data.key" :value="data.key">
                    <AccordionHeader v-if="data.value !== null">
                        <span>{{ data.label }}</span>
                    </AccordionHeader>

                    <AccordionContent v-if="data.value !== null">
                        <div class="flex mb-3 space-x-2">
                            <IconField>
                                <InputIcon class="pi pi-search" />
                                <InputText v-model="searchInput" placeholder="Search key" size="small" />
                            </IconField>
                            <UiButton v-if="searchInput" variant="outline" class="px-3" @click="searchInput = ''"
                                size="small">
                                <i class="pi pi-times"></i>
                            </UiButton>
                        </div>
                        <pre v-if="!isObject(data.value)">{{ data.value }}</pre>
                        <ul v-else class="list-group">
                            <li v-for="(item, index) in data.value" :key="index" class="list-group-item">
                                <div class="flex justify-between">
                                    <span class="text-gray-400">
                                        {{ index + ":" }}
                                    </span>
                                    <span class="ml-2">
                                        <pre>{{ item }}</pre>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
    </div>
</template>
