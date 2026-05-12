<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait HasMediaUpload
{
  /**
   * Upload single image
   */
  public function uploadImage(Request $request, $field = 'image', $folder = 'images')
  {
    if (!$request->hasFile($field)) {
      return null;
    }

    return $request->file($field)->store($folder, 'public');
  }

  /**
   * Upload multiple images
   */
  public function uploadMultipleImages(Request $request, $field = 'images', $folder = 'images')
  {
    $paths = [];

    if (!$request->hasFile($field)) {
      return $paths;
    }

    foreach ($request->file($field) as $file) {
      $paths[] = $file->store($folder, 'public');
    }

    return $paths;
  }

  /**
   * Delete single file
   */
  public function deleteFile($path)
  {
    if ($path && Storage::disk('public')->exists($path)) {
      Storage::disk('public')->delete($path);
    }
  }

  /**
   * Delete multiple files
   */
  public function deleteMultipleFiles(array $paths)
  {
    foreach ($paths as $path) {
      $this->deleteFile($path);
    }
  }
}
