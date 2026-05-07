<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

Route::get('/', function () {
    return view('welcome');
});


Route::get("/todos", [TodoController::class, "index"])->name("todos.index");
Route::get("/todos/create", [TodoController::class, "create"])->name("todos.create");
Route::post("/todos", [TodoController::class, "store"])->name("todos.store");
Route::get("/todos/{id}", [TodoController::class, "show"])->name("todos.show");
Route::get("/todos/{id}/edit", [TodoController::class, "edit"])->name("todos.edit");
Route::put("/todos/{id}", [TodoController::class, "update"])->name("todos.update");
Route::delete("/todos/{id}", [TodoController::class, "destroy"])->name("todos.destroy");
