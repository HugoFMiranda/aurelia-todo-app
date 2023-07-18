<?php

namespace App\Http\Controllers;

use App\Http\Requests\todos\DestroyRequest;
use App\Http\Requests\todos\GetAll;
use App\Http\Requests\todos\StoreRequest;
use App\Http\Requests\todos\UpdateRequest;
use App\Http\Requests\todos\UpdateStatusRequest;
use App\Models\Tag;
use App\Models\Todo;
use App\Models\TodoStatuses;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TodoController extends Controller
{
    public function index(GetAll $request): JsonResponse
    {
        $todos = Todo::where('user_id', Auth::user()->id)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($todo) {
                $tags = $todo->tags->toArray();

                return [
                    'id' => $todo->id,
                    'text' => $todo->text,
                    'status' => $todo->status->name,
                    'tags' => $tags,
                    'created_at' => $todo->created_at->format('d-m-Y H:i:s'),
                    'updated_at' => $todo->updated_at->format('d-m-Y H:i:s'),
                ];
            });
        return response()->json($todos);
    }


    public function store(StoreRequest $request)
    {
        $user = Auth::user();
        $tags = $request->get('tags');
        $todo = Todo::create([
            'text' => $request->get('text'),
            'status_id' => TodoStatuses::firstWhere('name', $request->get('status'))->id,
            'user_id' => $user->id,
        ]);

        if ($tags) {
            foreach ($tags as $tag) {
                $tag = Tag::firstOrCreate(
                    [
                        'slug' => Str::slug($tag),
                    ],
                    [
                        'name' => $tag,
                        'color' => "#" . dechex(rand(0x000000, 0xFFFFFF)),
                    ]
                );
                $todo->tags()->attach($tag->id);
            }
        }

        return response()->json([
            'message' => 'Todo created successfully',
            'todo' => [
                'id' => $todo->id,
                'text' => $todo->text,
                'status' => $todo->status->name,
                'created_at' => $todo->created_at->format('d-m-Y'),
                'updated_at' => $todo->updated_at->format('d-m-Y'),
            ],
        ]);
    }

    public function show()
    {
        //
    }

    public function update(UpdateRequest $request, Todo $todo)
    {
        $user = Auth::user();
        $tags = $request->get('tags');
        $status_id = TodoStatuses::firstWhere('name', $request->get('status'))->id;
        $todo->update([
            'text' => $request->get('text'),
            'status_id' => $status_id,
            'user_id' => $user->id,
        ]);

        if ($tags) {
            $tags_ids = array_map(function ($tag) {
                return Tag::firstOrCreate(
                    [
                        'slug' => Str::slug($tag),
                    ],
                    [
                        'name' => $tag,
                        'color' => "#" . dechex(rand(0x000000, 0xFFFFFF)),
                    ]
                )->id;
            }, $tags);
            $todo->tags()->sync($tags_ids);
        } else {
            $todo->tags()->detach();
        }

        return response()->json([
            'message' => 'Todo updated successfully',
        ]);
    }

    public function updateStatus(UpdateStatusRequest $request, Todo $todo): JsonResponse
    {
        $todo->update([
            'status_id' => TodoStatuses::firstWhere('name', $request->get('status'))->id,
        ]);

        return response()->json([
            'message' => 'Todo status updated successfully',
        ]);
    }

    public function destroy(DestroyRequest $request, Todo $todo): JsonResponse
    {
        $todo->delete();

        return response()->json([
            'message' => 'Todo deleted successfully',
        ]);
    }
}
