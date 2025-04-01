<script setup>
import { usePage } from "@inertiajs/vue3";
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useSiteStore } from "@/stores/site";
import { useQuery } from "@tanstack/vue-query";
import { showLoadingToast } from "vant";

const page = usePage();
const siteStore = useSiteStore();

const { data, isLoading, isError, error } = useQuery(
    siteStore.getQueryOptions("languages")
);

const currentLang = ref(
    localStorage.getItem("current_lang") ||
    window.gtranslateSettings.default_language
);

const changeLanguage = (code) => {
    if (code === currentLang.value) return;

    showLoadingToast({
        message: "Translating...",
        forbidClick: true,
        duration: 500,
    });

    window.doGTranslate(currentLang.value + "|" + code);

    localStorage.setItem("current_lang", code);
    currentLang.value = code;
};

onMounted(() => {
    // document.getElementById("gt_float_wrapper").style.display = "block";
});

onUnmounted(() => {
    // document.getElementById("gt_float_wrapper").style.display = "none";
});

watch(
    () => data?.value, // Observer uniquement les changements dans data
    (newData) => {
        if (newData) {
            var languages = [];
            Object.keys(newData).forEach((code) => {
                if (page.props.config.translatable?.includes(code)) {
                    languages.push({
                        code: code,
                        ...newData[code],
                    });
                }
            });
            siteStore.updateLanguages(languages);
        }
    }
);
</script>

<template>
    <div>
        <div class="border border-g30 p-4 rounded-xl bg-g20 mx-4 text-g60 font-medium text-sm hidden">
            <p class="text-g50">Suggested</p>
            <div class="pt-4 suggestedLanguage radioItems">
                <div
                    class="flex justify-between items-center item active border-b border-dashed border-g30 pb-3 cursor-pointer">
                    <p class="">English (US)</p>
                    <div class="rounded-full duration-500 circle-outer">
                        <div class="size-3 rounded-full duration-500 circle-inner"></div>
                    </div>
                </div>
                <div class="flex justify-between items-center item pt-3 cursor-pointer">
                    <p class="">English (UK)</p>
                    <div class="rounded-full duration-500 circle-outer">
                        <div class="size-3 rounded-full duration-500 circle-inner"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="border border-g30 p-4 rounded-xl mx-4 text-g60 font-medium text-sm">
            <p class="text-g50">Languages</p>
            <div class="pt-4 otherLanguage radioItems">
                <div v-if="isLoading" class="flex justify-center items-center">
                    <van-loading type="spinner" />
                </div>

                <p class="invalid-feedback" v-if="isError">{{ error }}</p>

                <div v-for="(lang, index) in siteStore.languages" :key="lang.code"
                    class="flex justify-between items-center item border-b border-dashed border-g30 py-3 cursor-pointer"
                    :class="lang.code == currentLang ? 'active' : ''" @click="changeLanguage(lang.code)">
                    <p style="text-transform: capitalize" :data-native-name="lang.nativeName">
                        {{ lang.name }}
                    </p>
                    <div class="rounded-full duration-500 circle-outer">
                        <div class="size-3 rounded-full duration-500 circle-inner"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
