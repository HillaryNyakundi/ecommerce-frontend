'use client';

import { useForm } from 'react-hook-form';
import { useSignIn } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { SignInInput } from '@/types/api';

export default function SignInForm() {
  const signIn = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInInput) => {
    signIn.mutate(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            {...register('username', {
              required: 'Username is required',
            })}
            id="username"
            type="text"
            placeholder="Enter your username"
            disabled={signIn.isPending}
          />
          {errors.username && (
            <p className="text-sm text-destructive">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register('password', {
              required: 'Password is required',
            })}
            id="password"
            type="password"
            placeholder="Enter your password"
            disabled={signIn.isPending}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={signIn.isPending}
      >
        {signIn.isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}