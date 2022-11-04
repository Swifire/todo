<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'status'];

    public function scopeOrderById($query) {
        return $query->orderBy('id','DESC');
    }
}
