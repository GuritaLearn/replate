import { useState } from 'react';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar" />

            {/* Header / Judul */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Daftar ke Replate</h2>
                <p className="text-sm text-gray-500 mt-1">Buat akun baru kamu</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Field Nama Lengkap */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                        placeholder="Nama Lengkap"
                        autoComplete="name"
                        autoFocus
                        required
                    />
                    <InputError message={errors.name} className="mt-1" />
                </div>

                {/* Field Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                        placeholder="email@contoh.com"
                        autoComplete="username"
                        required
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* Field Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 transition-colors"
                            title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                            aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* Field Konfirmasi Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Konfirmasi Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPasswordConfirmation ? 'text' : 'password'}
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 transition-colors"
                            title={showPasswordConfirmation ? 'Sembunyikan konfirmasi password' : 'Lihat konfirmasi password'}
                            aria-label={showPasswordConfirmation ? 'Sembunyikan konfirmasi password' : 'Lihat konfirmasi password'}
                        >
                            {showPasswordConfirmation ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </div>

                {/* Tombol Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition disabled:opacity-50"
                >
                    {processing ? 'Memproses...' : 'Daftar'}
                </button>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-3 text-gray-400 font-medium tracking-wider">
                            Atau
                        </span>
                    </div>
                </div>

                <a
                    href={route('auth.google')}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                    </svg>
                    <span>Daftar dengan Google</span>
                </a>

                {/* Link ke Halaman Login */}
                <p className="text-center text-sm text-gray-500 pt-2">
                    Sudah punya akun?{' '}
                    <Link href={route('login')} className="text-green-600 font-medium hover:text-green-700">
                        Masuk sekarang
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}