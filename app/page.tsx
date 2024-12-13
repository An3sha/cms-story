'use client';

import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UserRole } from '@/lib/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>('writer');

  const handleLogin = () => {
    login(selectedRole);
    router.push(selectedRole === 'writer' ? '/writer' : '/reviewer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Story CMS Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Select Role</Label>
              <RadioGroup
                defaultValue={selectedRole}
                onValueChange={(value) => setSelectedRole(value as UserRole)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="writer" id="writer" />
                  <Label htmlFor="writer">Writer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reviewer" id="reviewer" />
                  <Label htmlFor="reviewer">Reviewer</Label>
                </div>
              </RadioGroup>
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}