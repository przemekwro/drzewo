<?php

namespace App\Http\Controllers;

use App\Models\Tree;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TreeController extends Controller
{
    public function index(){
        return Tree::all();
    }

    public function store (Request $request){
        Auth::user($request->bearerToken());
        return Tree::create([
            'name'=>$request->name,
            'is_node'=>$request->is_node,
            'parent_id'=>$request->parent_id,
        ]);
    }

    public function indexWithKids(){
        $parents = Tree::all()->where('parent_id',null);
        $collection =[];
        foreach ($parents as $p){
            $collection[]=$p::with('allChildren')->where('id', $p->id)->first();
        }
        //$account = Tree::with('allChildrenAccounts')->first();
        return $collection;
    }
}
