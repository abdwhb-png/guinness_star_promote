<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { getSeverity, getFilters } from "@/utils/dataTable";
import { DataTableStatus, CustomToolbarButton } from "@/types";
import { FilterMatchMode } from "@primevue/core/api";

const emits = defineEmits(["filtered"]);

const props = defineProps({
    dataName: {
        type: String,
        required: true,
    },
    statuses: {
        type: Array<DataTableStatus>,
        required: false,
        default: [],
    },
    data: {
        type: Array,
        required: false,
        default: [],
    },
    getSeverity: {
        type: Function,
        default: getSeverity,
        required: false,
    },
    buttons: {
        type: Array<CustomToolbarButton>,
        default: [],
    },
});

const toolbarButtons = ref([]);

const filters = ref(getFilters(props.dataName));

const initFilters = () => {
    filters.value = getFilters(props.dataName);
};

const clearFilters = () => {
    initFilters();

    toolbarButtons.value.forEach((button) => {
        button?.$el?.classList.add("p-button-outlined");
    });

    emits("filtered", filters.value);
};

const getCount = computed(() => (keys: Array<string> = [], value = null) => {
    return (
        props.data.filter((item: any) => {
            var level = item;

            keys.forEach((key) => {
                level = level[key];
            });

            if (keys.includes("negative_balance")) {
                return level !== "none";
            }

            return level == value;
        })?.length || 0
    );
});

onMounted(() => {
    nextTick(() => {
        handleButtons("show");
    });
});

onUnmounted(() => {
    handleButtons("hide");
});

function handleButtons(state: string) {
    toolbarButtons.value.forEach((button, index) => {
        const el = button?.$el;
        if (el) {
            const fn = () => onFilter(index, el);

            if (state == "show") {
                el.addEventListener("click", fn);
            }

            if (state == "hide") {
                el.removeEventListener("click", fn);
            }
        }
    });
}

function onFilter(index: number, el: HTMLElement | null) {
    const type = el.attributes?.["filter-type"].value || "";
    const value = el.attributes?.["filter-value"].value || "";

    try {
        initFilters();

        if (type == "neg_balance" && value == "has") {
            filters.value["state.negative_balance"].matchMode =
                FilterMatchMode.NOT_CONTAINS;
            filters.value["state.negative_balance"].value = "none";
        } else if (type == "current" && value == "is") {
            props.data.filter((item: any) => {
                if (item.is_current) {
                    filters.value["index"].value = item.index;
                }
            });
        } else {
            filters.value[type].value = value;
        }

        toolbarButtons.value.forEach((button, btnIndex) => {
            let btnEl = button?.$el;
            if (index === btnIndex) {
                el.classList.remove("p-button-outlined");
            } else {
                btnEl?.classList.add("p-button-outlined");
            }
        });

        emits("filtered", filters.value);
    } catch (error) {
        console.warn("Warning while filtering in custom toolbar", error);
    }
}
</script>

<template>
    <Toolbar class="m-2">
        <template #start>
            <div class="flex flex-wrap justify-end md:justify-normal gap-4">
                <slot name="start" />
            </div>
        </template>

        <template #end>
            <div class="flex flex-wrap gap-4">
                <slot name="end">
                    <Button
                        type="button"
                        icon="pi pi-filter-slash"
                        label="Clear"
                        severity="secondary"
                        size="small"
                        @click="clearFilters"
                    />
                    <Button
                        v-for="(item, index) in statuses"
                        :key="item.label"
                        :badge="getCount(['status'], item.value).toString()"
                        :badgeSeverity="
                            getCount(['status'], item.value) > 0
                                ? 'contrast'
                                : 'secondary'
                        "
                        :label="item.label"
                        :severity="getSeverity(item.value)"
                        size="small"
                        variant="outlined"
                        class="capitalize"
                        filter-type="status"
                        :filter-value="item.value"
                        ref="toolbarButtons"
                    />
                </slot>

                <Button
                    v-for="(btn, index) in buttons"
                    :key="index"
                    :severity="btn.severity"
                    :label="btn.label"
                    :filter-type="btn.filterType"
                    :filter-value="btn.filterValue"
                    :badge="
                        getCount(
                            btn.countSearchKeys,
                            btn.filterValue
                        ).toString()
                    "
                    :badgeSeverity="
                        getCount(btn.countSearchKeys, btn.filterValue) > 0
                            ? 'contrast'
                            : 'secondary'
                    "
                    variant="outlined"
                    class="capitalize"
                    size="small"
                    ref="toolbarButtons"
                />
            </div>
        </template>
    </Toolbar>
</template>
