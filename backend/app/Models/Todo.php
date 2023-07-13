<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
        'status_id',
        'user_id',
    ];

    public function status(): BelongsTo
    {
        return $this->belongsTo(TodoStatuses::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
