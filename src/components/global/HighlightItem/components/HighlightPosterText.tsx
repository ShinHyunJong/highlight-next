import LinesEllipsis from 'react-lines-ellipsis';

type HighlightPosterTextProps = {
  title: string;
};

function HighlightPosterText({ title }: HighlightPosterTextProps) {
  return (
    <div className="absolute bottom-0 z-[20] w-full p-2 pb-8 text-lg">
      <div className="mb-3 text-3xl font-bold leading-6">
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
