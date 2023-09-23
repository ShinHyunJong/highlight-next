type OnboardingItemProps = {
  index: number;
};

function OnboardingItem({ index }: OnboardingItemProps) {
  return (
    <div className="flex h-full w-full flex-col justify-end gap-4 px-8 pb-[200px]">
      {index === 0 ? (
        <>
          <h1 className="text-5xl">Discovering</h1>
          <h1 className="text-5xl">Music</h1>
          <h1 className="text-5xl">Is Hard.</h1>
        </>
      ) : (
        <>
          <h1 className="text-5xl">Get help from</h1>
          <h1 className="text-5xl">friends, brands</h1>
          <h1 className="text-5xl">and cafes.!</h1>
        </>
      )}
    </div>
  );
}

export default OnboardingItem;
