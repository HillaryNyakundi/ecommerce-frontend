'use client';

import { useForm } from 'react-hook-form';
import { useSignUp } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { SignUpInput } from '@/types/api';

export default function SignUpForm() {
  const signUp = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput & { confirmPassword: string }>({
    defaultValues: {
      username: '',
      email: '',
      full_name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: SignUpInput & { confirmPassword: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...signUpData } = data;
    signUp.mutate(signUpData);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            {...register('full_name', {
              required: 'Full name is required',
            })}
            id="full_name"
            type="text"
            placeholder="John Doe"
            disabled={signUp.isPending}
          />
          {errors.full_name && (
            <p className="text-sm text-destructive">{errors.full_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            {...register('username', {
              required: 'Username is required',
            })}
            id="username"
            type="text"
            placeholder="johndoe"
            disabled={signUp.isPending}
          />
          {errors.username && (
            <p className="text-sm text-destructive">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            id="email"
            type="email"
            placeholder="you@example.com"
            disabled={signUp.isPending}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            id="password"
            type="password"
            placeholder="At least 6 characters"
            disabled={signUp.isPending}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            {...register('confirmPassword', {
              required: 'Please confirm your password',
            })}
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            disabled={signUp.isPending}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={signUp.isPending}
      >
        {signUp.isPending ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  );
}