import { Controller, useForm } from 'react-hook-form';

import Greeting from '@/components/header/Gretting';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/auth';
import HeaderTemplate from '@/templates/HeaderTemplate';

type FormValues = {
  email: string;
  password: string;
};

function AuthEmail() {
  const { postSignInEmail, signInLoading } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    postSignInEmail(data.email, data.password);
  };

  return (
    <HeaderTemplate title="Sign In">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-4">
          <Greeting textList={['Enter your email', 'And password']} />
          <div className="space-y-4">
            <div className="mt-8 space-y-2">
              <p className="text-sm text-gray-100">Email</p>
              <Controller
                name="email"
                control={control}
                rules={{ required: true, min: 2, max: 100 }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your email."
                    />
                  );
                }}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-100">Password</p>
              <Controller
                name="password"
                control={control}
                rules={{ required: true, min: 2 }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      autoComplete="password"
                      type="password"
                      placeholder="Enter your password."
                    />
                  );
                }}
              />
            </div>
          </div>

          <Button
            isLoading={signInLoading}
            className="mt-8 w-full"
            isDisabled={!isValid}
          >
            SignIn
          </Button>
        </div>
      </form>
    </HeaderTemplate>
  );
}

export default AuthEmail;
