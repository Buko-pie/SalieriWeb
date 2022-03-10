<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Filesystem\Filesystem;

use League\ColorExtractor\Color;
use League\ColorExtractor\ColorExtractor;
use League\ColorExtractor\Palette;

class Controller extends BaseController
{
  // use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

  public function home()
  {
    return view('welcome');
  }

  public function checkCreds(Request $request)
  {
    $path = resource_path() . "/database/data.json";
    $req = json_decode($request->getContent());

    $data = json_decode(file_get_contents($path), true);
    $data = $req->step ? $data['credentials']['cred_1'] : $data['credentials']['cred_0'];

    if (password_verify($req->creds, $data)) {
      return response()->json(['response' => 'ok'], 200);
    }
    return response()->json(['error_msg' => 'credential mismatch'], 401);
  }

  public function uploadArts(Request $request)
  {
    if ($request->hasFile('artFiles')) {
      $path = storage_path() . "/database/data.json";
      $data = json_decode(file_get_contents($path), true);
      $arts = $data['Arts'];

      $files = $request->file('artFiles');
      $names = $request['names'];

      foreach ($files as $index => $art) {
        $i = (int)explode('_', $names[$index])[1];
        Storage::disk('public_art_upload')->putFileAs('art/', $art, $names[$index]);

        $palette = Palette::fromFilename(public_path() . '/images/art/' . $names[$index]);
        $extractor = new ColorExtractor($palette);
        $arts[$i]['color'] = Color::fromIntToHex($extractor->extract(1)[0]);
      }
      $data['Arts'] = $arts;
      // Storage::disk('db')->putFileAs('', json_encode($data), 'data.json');
      Storage::disk('db')->put('data.json', json_encode($data));
      return response()->json(['message' => 'ok'], 200);
    }
    return response()->json(['error_msg' => 'No files found'], 404);
  }

  public function fetchArts(Request $request)
  {
    $path = storage_path() . "/database/data.json";
    $data = json_decode(file_get_contents($path), true);
    $arts = $data['Arts'];
    $configs = $data['Configs'];

    return response()->json(['arts' => $arts, 'configs' => $configs], 200);
  }

  public function setConfigs(Request $request)
  {
    $path = storage_path() . "/database/data.json";
    $data = json_decode(file_get_contents($path), true);

    $textscroll = $request['textscroll'];

    if ($request['textscroll']) {
      $data['Configs']['textscroll'] = $request['textscroll'];
    }
    if ($request->file('logo')) {
      Storage::disk('public_art_upload')->putFileAs('logo/', $request->file('logo'), 'logo');
    }
    if ($request->file('logo2')) {
      Storage::disk('public_art_upload')->putFileAs('logo/', $request->file('logo2'), 'logo2');
    }
    Storage::disk('db')->put('data.json', json_encode($data));

    return response()->json(['message' => 'ok'], 200);
  }
}
