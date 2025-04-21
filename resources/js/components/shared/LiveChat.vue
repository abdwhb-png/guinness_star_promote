<template>
    <div
        id="livechat_trigger"
        class="animate-fade-in-up fixed bottom-[66px] right-4 z-[1002] transform animate-pulse cursor-pointer rounded-sm bg-blue-600 text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
        @click="toggleChat"
    >
        <div class="flex items-center gap-1 p-1 px-2 md:p-3">
            <!-- Simple Chat Icon (Replace with your preferred icon library if needed) -->
            <img src="/images/chat-web.png" alt="" class="h-6 w-6" />
            <span class="md:text-md text-sm"> Chat </span>
        </div>

        <!-- Basic Chat Window (Initially Hidden) -->
        <div
            v-if="isChatOpen"
            class="animate-fade-in absolute bottom-full right-0 mb-2 flex h-96 w-72 flex-col rounded-lg border border-gray-200 bg-white shadow-xl"
            @click.stop
        >
            <div class="flex items-center justify-between rounded-t-lg bg-blue-600 p-3 text-white">
                <h3 class="font-semibold">Live Chat</h3>
                <button @click.stop="closeChat" class="text-white hover:text-gray-200">
                    &times;
                    <!-- Close Icon -->
                </button>
            </div>
            <div class="flex-grow overflow-y-auto p-4">
                <!-- Chat messages would go here -->
                <p class="text-sm text-gray-600">We are available on the following channels?</p>
                <div class="flex flex-col gap-2">
                    <a v-for="(item, index) in $page.props.config.csLinks" :key="'hc_' + item.id" :href="item.url" target="_blank" class="link">
                        {{ item.title }}
                    </a>
                </div>
            </div>
            <div class="hidden border-t border-gray-200 p-2">
                <input
                    type="text"
                    placeholder="Type your message..."
                    class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isChatOpen = ref(false);

const toggleChat = () => {
    isChatOpen.value = !isChatOpen.value;
};

const closeChat = () => {
    isChatOpen.value = false;
};
</script>

<style scoped>
@media (min-width: 768px) {
    #livechat_trigger {
        right: calc((100% - var(--side-width, 600px)) / 2) !important;
    }
}

/* Simple fade-in and slide-up animation */
@keyframes fadeInAndUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fadeInAndUp 0.5s ease-out forwards;
}

/* Simple fade-in for the chat window */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
}
</style>
