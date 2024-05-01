import CircleButton from "@/ui/elements/CircleButton";
import { ReactComponent as Skull } from "@/assets/icons/common/skull.svg";
import { ReactComponent as City } from "@/assets/icons/common/city.svg";
import { ReactComponent as Shield } from "@/assets/icons/common/shield.svg";

import { useState } from "react";

import { RealmListBoxes } from "@/ui/components/list/RealmListBoxes";
import { SelectPreviewBuilding } from "@/ui/components/construction/SelectPreviewBuilding";

export const BottomNavigation = () => {
  const [activeBar, setActiveBar] = useState<null | "R" | "B" | "A">(null);

  const toggleBar = (barName: "R" | "B" | "A") => {
    if (activeBar === barName) {
      setActiveBar(null);
    } else {
      setActiveBar(barName);
    }
  };

  const navigation = [
    {
      name: "bar1",
      button: (
        <CircleButton
          image="/images/buildings/thumb/realm.png"
          label="Realms"
          className="forth-step"
          active={activeBar === "R"}
          size="xl"
          onClick={() => toggleBar("R")}
        >
          {/* <City className="w-6 fill-current" /> */}
        </CircleButton>
      ),
    },
    // {
    //   name: "bar3",
    //   button: (
    //     <CircleButton
    //       image="/images/buildings/thumb/army.png"
    //       label="Armies"
    //       active={activeBar === "A"}
    //       size="xl"
    //       onClick={() => toggleBar("A")}
    //     >
    //       {/* <Shield className="w-5 fill-current" /> */}
    //     </CircleButton>
    //   ),
    // },
  ];

  return (
    <div className="flex  py-3 w-[600px] justify-center flex-wrap  relative">
      {/* <div className="absolute -left-16 top-8">
        <img className="w-32 h-32 rounded-full border-4 border-gold" src="/images/avatars/1.png" alt="" />
      </div> */}

      <div className=" w-full ml-24 mr-4  h-full mt-4">
        <div
          className={`w-full transition-all duration-300 overflow-auto pb-2 ${
            activeBar === "R" ? "h-auto" : "h-0 hidden"
          }`}
        >
          <RealmListBoxes />
        </div>
        <div
          className={`w-full transition-all duration-300 overflow-auto pb-2 ${
            activeBar === "B" ? "h-auto" : "h-0 hidden"
          }`}
        >
          {/* <SelectPreviewBuilding /> */}
        </div>
        <div
          className={`w-full transition-all duration-300 overflow-auto pb-2 ${
            activeBar === "A" ? "h-auto" : "h-0 hidden"
          }`}
        >
          armies
        </div>
      </div>
      <div className="w-full flex space-x-2 justify-start  pl-24">
        {navigation.map((item) => (
          <div key={item.name}>{item.button}</div>
        ))}
      </div>
    </div>
  );
};