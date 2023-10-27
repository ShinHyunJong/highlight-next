import TextTruncate from 'react-text-truncate'; // recommend

type HighlightTextProps = {
  title: string;
  desc: string;
};
function HighlightText({ title, desc }: HighlightTextProps) {
  return (
    <div className="absolute bottom-0 z-[20] w-full p-2 text-lg">
      <div className="mb-2 font-bold">
        <TextTruncate
          line={2}
          element="p"
          truncateText="…"
          text={title || ''}
        />
      </div>
      <div className="text-sm">
        <TextTruncate
          line={2}
          element="span"
          truncateText="…"
          text={desc || ''}
        />
      </div>
    </div>
  );
}

export default HighlightText;
