function Greeting({ label, textList }: { label?:string, textList: string[] }) {
  return (
    <div className="flex flex-col gap-2 text-4xl font-semibold">
      <p className="text-gray-500">{label}</p>
      {textList.map((t) => {
        return <h1 key={t}>{t}</h1>;
      })}
    </div>
  );
}

export default Greeting;
