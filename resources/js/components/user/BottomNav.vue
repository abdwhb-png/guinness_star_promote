<script setup>
const navs = [
    {
        name: "Accueil",
        icon: "ph ph-house",
        route: "dashboard",
    },
    {
        name: "Records",
        icon: "ph ph-hourglass",
        route: "history",
    },
    {
        name: "Start",
        icon: "ph ph-stack",
        route: "start",
    },
    {
        name: "Infos",
        icon: "ph ph-dots-three-circle",
        route: "more",
    },
    {
        name: "Account",
        icon: "ph ph-user",
        route: "account",
    },
];
</script>

<template>
    <div class="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto">
        <div class="flex justify-between items-center gap-3 text-white bg-g60 rounded-t-2xl p-4">
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
