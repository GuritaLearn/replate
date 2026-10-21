<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class GoogleAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_google_redirect_route_redirects_to_google(): void
    {
        $response = $this->get(route('auth.google'));

        $response->assertRedirect();
        $this->assertStringContainsString('accounts.google.com', $response->getTargetUrl());
    }

    public function test_new_user_can_authenticate_via_google(): void
    {
        $socialiteUser = Mockery::mock(SocialiteUser::class);
        $socialiteUser->shouldReceive('getId')->andReturn('google-id-12345');
        $socialiteUser->shouldReceive('getName')->andReturn('Budi Santoso');
        $socialiteUser->shouldReceive('getEmail')->andReturn('budi@example.com');
        $socialiteUser->shouldReceive('getNickname')->andReturn(null);

        Socialite::shouldReceive('driver->user')->andReturn($socialiteUser);

        $response = $this->get(route('auth.google.callback'));

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));

        $this->assertDatabaseHas('users', [
            'email' => 'budi@example.com',
            'google_id' => 'google-id-12345',
            'name' => 'Budi Santoso',
        ]);
    }

    public function test_existing_email_user_can_link_google_account(): void
    {
        $user = User::factory()->create([
            'email' => 'existing@example.com',
            'google_id' => null,
        ]);

        $socialiteUser = Mockery::mock(SocialiteUser::class);
        $socialiteUser->shouldReceive('getId')->andReturn('google-id-99999');
        $socialiteUser->shouldReceive('getName')->andReturn('Existing User');
        $socialiteUser->shouldReceive('getEmail')->andReturn('existing@example.com');
        $socialiteUser->shouldReceive('getNickname')->andReturn(null);

        Socialite::shouldReceive('driver->user')->andReturn($socialiteUser);

        $response = $this->get(route('auth.google.callback'));

        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard', absolute: false));

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => 'existing@example.com',
            'google_id' => 'google-id-99999',
        ]);
    }
}
