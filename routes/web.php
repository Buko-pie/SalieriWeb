<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [Controller::class, 'home'])->name('home');
Route::get('/fetchArts', [Controller::class, 'fetchArts'])->name('fetchArts');
Route::post('/creds', [Controller::class, 'checkCreds'])->name('creds');
Route::post('/uploadArts', [Controller::class, 'uploadArts'])->name('uploadArts');
Route::post('/setConfigs', [Controller::class, 'setConfigs'])->name('setConfigs');
