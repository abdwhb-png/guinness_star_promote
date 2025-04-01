<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    @include('favicon')

    <title inertia>{{ config('app.name', 'Guinness Star Promote') }}</title>

    <!-- Styles -->
    @vite(['resources/css/app.css'])
    <link rel="manifest" href="{{ asset('app/manifest.json') }}" />
    <link href="{{ asset('app/style.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('app/assets/css/swiper.min.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('css/phosphor-icons/regular/style.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('css/phosphor-icons/thin/style.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('css/phosphor-icons/light/style.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('css/phosphor-icons/bold/style.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('css/phosphor-icons/fill/style.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('css/phosphor-icons/duotone/style.css') }}" />

    <!-- Scripts -->
    @routes
    @vite(['resources/js/app.ts'])
    @inertiaHead

    <script src="{{ asset('js/gsap.min.js') }}"></script>
    <script defer src="{{ asset('app/index.js') }}"></script>
</head>

<body class="" style="background-color: #e5e7eb">

    @inertia

    <div class="gtranslate_wrapper"></div>
    <script>
        window.gtranslateSettings = {
            "default_language": "en",
            "native_language_names": true,
            "languages": @json(config('vars.translatable_locales')),
            "wrapper_selector": ".gtranslate_wrapper",
            "switcher_horizontal_position": "right",
            "switcher_vertical_position": "bottom",
            // "float_switcher_open_direction": "left",
            "detect_browser_language": {!! json_encode(config('app.env') === 'production') !!},
            "alt_flags": {
                "en": "usa"
            }
        }
    </script>
    <script src="{{ asset('js/gtranslate.js') }}" defer></script>

    {{-- <script src="{{ asset('js/bg-beams.js') }}"></script> --}}

    <!-- ==== js dependencies start ==== -->
    <script src="{{ asset('/app/assets/js/main.js') }}"></script>
    <script src="{{ asset('/app/assets/js/plugins/plugins.js') }}"></script>
    <script src="{{ asset('/app/assets/js/plugins/plugin-custom.js') }}"></script>

    <script>
        function reloadPage(){
            window.location.reload()
        }
        function handleTogglePassword(container) {
            const passwordField = container.querySelector(".passwordField");
            const toggleIcon = container.querySelector("i");

            if (passwordField && toggleIcon) {
                toggleIcon.classList.add("cursor-pointer");

                toggleIcon.addEventListener("click", () => {
                    // Toggle the input type
                    const isPassword = passwordField.type === "password";
                    passwordField.type = isPassword ? "text" : "password";

                    // Toggle the icon class
                    toggleIcon.classList.toggle("ph-eye");
                    toggleIcon.classList.toggle("ph-eye-closed");
                });

            };
        };
    </script>
</body>

</html>
