<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Redirect user to Google OAuth consent screen.
     */
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle callback from Google.
     */
    public function handleGoogleCallback(Request $request): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Throwable $e) {
            Log::error('Google OAuth Error: ' . $e->getMessage());

            return redirect()->route('login')->withErrors([
                'email' => 'Gagal masuk dengan Google. Silakan coba lagi.',
            ]);
        }

        // 1. Cari berdasarkan google_id
        $user = User::where('google_id', $googleUser->getId())->first();

        if (! $user) {
            // 2. Jika belum ada google_id, cari berdasarkan email (akun yang pernah daftar manual)
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                // Link akun yang sudah ada ke akun Google ini
                $user->update([
                    'google_id' => $googleUser->getId(),
                ]);
            } else {
                // 3. Buat akun baru jika sama sekali belum terdaftar
                $user = User::create([
                    'name' => $googleUser->getName() ?? $googleUser->getNickname() ?? 'Pengguna Replate',
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'role' => UserRole::USER,
                    'email_verified_at' => now(),
                ]);
            }
        }

        // Cek jika akun diblacklist
        if ($user->isBlacklisted()) {
            return redirect()->route('login')->withErrors([
                'email' => 'Akun Anda sedang dibekukan / diblacklist. Silakan hubungi admin.',
            ]);
        }

        Auth::login($user, remember: true);

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
