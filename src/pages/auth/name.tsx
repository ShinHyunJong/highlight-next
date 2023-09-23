import AuthTemplate from '@/templates/AuthTemplate';

function AuthName() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <h1 className="text-3xl">Tell me your name</h1>
    </section>
  );
}

AuthName.Template = AuthTemplate;

export default AuthName;
