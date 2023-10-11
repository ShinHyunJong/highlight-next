import clsx from 'clsx';

function Stepper({ step, count }: { step: number; count: number }) {
  const steps = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <div className="mb-4 flex w-full gap-2">
      {steps.map((x) => {
        return (
          <div
            key={x}
            className={clsx(
              'h-2 flex-1 rounded',
              x !== step ? 'bg-gray-400' : 'bg-green-400',
            )}
          />
        );
      })}
    </div>
  );
}

export default Stepper;
