import LinesEllipsis from 'react-lines-ellipsis';

type HighlightTextProps = {
  title: string;
  desc: string;
};

function HighlightText({ title, desc }: HighlightTextProps) {
  return (
    <div className="absolute bottom-0 z-[20] w-full p-2 text-lg">
      <div className="mb-2 font-bold">
        <LinesEllipsis
          text={title}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </div>
      <div className="text-sm">
        <LinesEllipsis
          text={desc}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </div>
    </div>
  );
}

export default HighlightText;
