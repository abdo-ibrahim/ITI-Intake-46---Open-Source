<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
  /**
   * Redirect the user to the provider's authentication page.
   *
   * @param string $provider
   * @return \Illuminate\Http\Response
   */
  public function redirectToProvider($provider)
  {
    return Socialite::driver($provider)->redirect();
  }

  /**
   * Obtain the user information from the provider.
   *
   * @param string $provider
   * @return \Illuminate\Http\Response
   */
  public function handleProviderCallback($provider)
  {
    try {
      $socialUser = Socialite::driver($provider)->user();
    } catch (\Exception $e) {
      return redirect()->route('login')->with('error', 'Authentication failed.');
    }

    $user = User::where('email', $socialUser->getEmail())->first();

    if (!$user) {
      $user = User::create([
        'name' => $socialUser->getName() ?? $socialUser->getNickname(),
        'email' => $socialUser->getEmail(),
        'password' => bcrypt(Str::random(16)),
        'email_verified_at' => now(),
      ]);
    }

    Auth::login($user);

    return redirect()->route('dashboard');
  }
}
