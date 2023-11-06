import LinesEllipsis from 'react-lines-ellipsis';

type HighlightPosterTextProps = {
  title: string;
};

function HighlightPosterText({ title }: HighlightPosterTextProps) {
  return (
    <div className="absolute bottom-0 z-[20] w-full px-4 pb-4 text-lg">
      <div className="text-3xl font-bold">
        <LinesEllipsis
          text={title}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </div>
    </div>
  );
}

export default HighlightPosterText;
