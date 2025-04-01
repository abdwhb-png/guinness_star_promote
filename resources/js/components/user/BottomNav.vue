<script setup>
import StartIcon from "./StartIcon.vue";

const navs = [
    {
        name: "Accueil",
        icon: "ph ph-house",
        route: "dashboard",
    },
    {
        name: "Account",
        icon: "ph ph-user",
        route: "account",
    },
    {
        name: "Historique",
        icon: "ph ph-hourglass",
        route: "history",
    },
    {
        name: "Infos",
        icon: "ph ph-info",
        route: "more",
    },
    // {
    //     name: "Start",
    //     icon: "ph ph-stack",
    //     route: "start",
    // },
];
</script>

<template>
    <div class="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto">
        <div class="absolute left-[45%] bottom-[50px]">
            <Link href="/start" class="">
            <StartIcon class="z-10" />
            <div class="absolute -bottom-2 -left-5 -right-5 ">
                <img src="/app/assets/images/reload-bg.png" alt="" />
            </div>
            </Link>
        </div>

        <div class="flex justify-between items-center gap-5 text-white bg-g60 rounded-t-2xl p-4">
            <Link v-for="(nav, index) in navs" :key="index" :href="route(nav.route)"
                class="flex flex-col justify-center items-center cursor-pointer">
            <i class="ph text-2xl" :class="{
                [nav.icon]: true,
                'ph-fill': route().current(nav.route),
                'text-3 xl': nav.name == 'Start'
            }"></i>
            <p class="font-semibold text-xs">{{ nav.name }}</p>
            </Link>
        </div>
    </div>
</template>
