type OnboardingItemProps = {
  index: number;
};

function OnboardingItem({ index }: OnboardingItemProps) {
  return (
    <div className="flex h-full w-full flex-col justify-start gap-4 px-8 pt-[100px]">
      {index === 0 ? (
        <>
          <h1 className="text-5xl">Discovering</h1>
          <h1 className="text-5xl">Music</h1>
          <h1 className="text-5xl">Is Hard.</h1>
        </>
      ) : (
        <>
          <h2 className="text-5xl">Get help from</h2>
          <h2 className="text-5xl">friends, brands</h2>
          <h2 className="text-5xl">and cafes.!</h2>
        </>
      )}
    </div>
  );
}

export default OnboardingItem;
