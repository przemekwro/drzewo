<?php

namespace App\Http\Controllers;

use App\Models\Tree;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TreeController extends Controller
{
    public function index(){
        return Tree::all();
    }

    public function store(Request $request){
        Auth::user($request->bearerToken());
        return Tree::create([
            'name'=>$request->name,
            'parent_id'=>$request->parent_id,
        ]);
    }

    public function indexWithKids(){
        $parents = Tree::all()->where('parent_id',null);
        $collection =[];
        foreach ($parents as $p){
            $collection[]=$p::with('allChildren')->where('id', $p->id)->first();
        }
        return $collection;
    }

    public function updateParent(Request $request,$id){
        $node = Tree::findOrFail($id);
        $node->parent_id=$request->parent_id;
        $node->save();
        return 200;
    }

    public function update(Request $request, $id){
        $node = Tree::find($id);
        $node->name = $request->name;
        $node->save();
        return 200;
    }

    public function deleteTree($id){
        $node = Tree::findOrFail($id);
        $node->delete();
        return 200;
    }

    public function deleteNode($id){
        $node = Tree::find($id);
        $children = $node->children;
        foreach ($children as $child){
            $child->parent_id = $node->parent_id;
            $child->save();
        }
        $node->delete();
        return 200;
    }
}
