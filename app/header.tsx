import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChromePicker } from "react-color";

type Props = {
  setColor: Dispatch<SetStateAction<string>>;
  color: string;
  clear: () => void;
};

const Header = ({ setColor, color, clear }: Props) => {
  const [showPallet, setShowPallet] = useState(false);

  useEffect(() => {
    if (showPallet) {
      window.addEventListener("click", () => setShowPallet(false));
    }
    return () =>
      window.removeEventListener("click", () => setShowPallet(false));
  }, []);

  return (
    <div className="bg-[#BDCDD6] px-3 py-4 flex gap-10 justify-between">
      <div>
        <h1 className="text-3xl font-semibold">Canvascity</h1>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div
          onClick={() => setShowPallet((show) => !show)}
          style={{ background: color }}
          className={`w-8 h-8 rounded-full cursor-pointer relative shadow-xl`}
        ></div>
        {showPallet && (
          <div className="absolute top-24 right-20">
            <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
          </div>
        )}
        <button
          type="button"
          onClick={clear}
          className="px-10 py-2 rounded-lg border bg-white shadow-xl text-lg font-semibold"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
export default Header;
