'use client';

import { Container } from '@/components/layout/container';
import { useAccount, useUpdateAccount } from '@/hooks/use-user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProfileFormData {
  full_name: string;
  username: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data, isLoading, error } = useAccount();
  const updateAccount = useUpdateAccount();

  const account = data?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>();

  // Populate form with current data
  useEffect(() => {
    if (account) {
      reset({
        full_name: account.full_name,
        username: account.username,
        email: account.email,
      });
    }
  }, [account, reset]);

  // Redirect if not authenticated
  useEffect(() => {
    if (error) {
      router.push('/auth/signin');
    }
  }, [error, router]);

  const onSubmit = (data: ProfileFormData) => {
    updateAccount.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="section-spacing">
        <Container>
          <div className="max-w-2xl mx-auto space-y-6">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-96" />
          </div>
        </Container>
      </div>
    );
  }

  if (!account) {
    return null;
  }

  return (
    <div className="section-spacing">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-light tracking-[0.18em] mb-2">
              MY PROFILE
            </h1>
            <p className="text-muted-foreground">
              Manage your account information
            </p>
          </div>

          <div className="space-y-6">
            {/* Account Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account details here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      {...register('full_name', {
                        required: 'Full name is required',
                      })}
                    />
                    {errors.full_name && (
                      <p className="text-sm text-destructive">
                        {errors.full_name.message}
                      </p>
                    )}
                  </div>

                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      {...register('username', {
                        required: 'Username is required',
                      })}
                    />
                    {errors.username && (
                      <p className="text-sm text-destructive">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!isDirty || updateAccount.isPending}
                  >
                    {updateAccount.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Account Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>
                  Read-only account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Account ID</span>
                  <span className="text-sm font-medium">{account.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <span className="text-sm font-medium uppercase">{account.role}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-sm font-medium">
                    {account.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="text-sm font-medium">
                    {new Date(account.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
