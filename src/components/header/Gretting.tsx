function Greeting({ textList }: { textList: string[] }) {
  return (
    <div className="flex flex-col gap-2 text-4xl font-semibold">
      {textList.map((t) => {
        return <h1 key={t}>{t}</h1>;
      })}
    </div>
  );
}

export default Greeting;
