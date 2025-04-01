<?php

namespace App\Enums;

enum TransacEnum: string
{
    case RECHARGE = 'recharge';
    case WITHDRAWAL = 'withdrawal';
    case COMMISSION = 'commission';
    case BONUS = 'bonus';
}
