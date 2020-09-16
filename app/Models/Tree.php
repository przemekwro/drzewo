<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class Tree extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'is_node', 'parent_id',
    ];

    public function children()
    {
        return $this->hasMany(Tree::class, 'parent_id', 'id');
    }

    public function allChildren()
    {
        return $this->children()->with('allChildren');
    }
}
