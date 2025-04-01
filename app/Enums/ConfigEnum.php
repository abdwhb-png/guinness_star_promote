<?php

namespace App\Enums;

enum ConfigEnum: string
{
    case ADMIN_PREFIX = 'admin.';
    case APP_PREFIX = '';
    case ADMIN_PAGE_DIR = 'admin/';
    case APP_PAGE_DIR = 'user/';

    case CHECK_PWD_WITHDRAWAL = 'withdrawal.password_confirmed_at';
    case CHECK_PWD_AUTH = 'auth.password_confirmed_at';

    case MAX_DEALS = '10';
    case WELCOME_BONUS = '50';
    case REFERRAL_BONUS = '500';
    case DEFAULT_CURRENCY = 'F';
    case DEFAULT_PROFIT_RATIO = '15';
    case PROFIT_MAX_ON_FIRST = '5000';

    case IMG_MAX_FILE_SIZE = '5120';
}
