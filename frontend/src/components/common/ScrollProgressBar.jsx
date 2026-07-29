import { useScrollProgress } from "../../hooks/useScrollProgress";

const ScrollProgressBar = () => {
  const progress = useScrollProgress();

  const progressStyle = {
    width: `${progress}%`,
  };

  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-ember to-ember-light transition-[width] duration-150 ease-out"
        style={progressStyle}
      />
    </div>
  );
};

export default ScrollProgressBar;