import { findResourceById, getIconResourceId } from "@bibliothecadao/eternum";

import { ResourceIcon } from "../../elements/ResourceIcon";
import { currencyFormat } from "../../utils/utils";
import { useProductionManager } from "@/hooks/helpers/useResources";
import { useEffect, useMemo, useState } from "react";
import useBlockchainStore from "@/hooks/store/useBlockchainStore";

export const ResourceChip = ({
  isLabor = false,
  resourceId,
  entityId,
}: {
  isLabor?: boolean;
  resourceId: number;
  entityId: bigint;
}) => {
  const currentTick = useBlockchainStore((state) => state.currentTick);
  const productionManager = useProductionManager(entityId, resourceId);

  const production = useMemo(() => {
    return productionManager.getProduction();
  }, []);

  const balance = useMemo(() => {
    return productionManager.balance(currentTick);
  }, [productionManager, production, currentTick]);

  const netRate = useMemo(() => {
    let netRate = productionManager.netRate(currentTick);
    if (netRate[1] < 0) {
      // net rate is negative
      if (Math.abs(netRate[1]) > productionManager.balance(currentTick)) {
        return 0;
      }
    }
    return netRate[1];
  }, [productionManager, production]);

  const [displayBalance, setDisplayBalance] = useState(balance);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayBalance((prevDisplayBalance) => {
        const difference = balance - prevDisplayBalance;
        if (Math.abs(difference) > 0) {
          // Calculate step size as a fraction of the difference, e.g., 10% of the remaining difference
          const stepSize = difference * 0.1;
          // Update the display balance by adding the step size, but ensure it doesn't overshoot
          return prevDisplayBalance + stepSize;
        }
        return prevDisplayBalance;
      });
    }, 2); // Adjust interval speed as needed
    return () => clearInterval(interval);
  }, [balance]);

  return (
    <div className={`flex relative group items-center text-xs border border-gold/10 px-2 p-1 hover:bg-gold/20 `}>
      <ResourceIcon
        isLabor={isLabor}
        withTooltip={true}
        resource={findResourceById(getIconResourceId(resourceId, isLabor))?.trait as string}
        size="sm"
        className="mr-3 self-center"
      />

      <div className="flex justify-between w-full">
        <div className=" self-center text-sm font-bold">
          {currencyFormat(displayBalance ? Number(displayBalance) : 0, 2)}
        </div>

        {/* <div className="text-xs w-full self-center text-opacity-65 px-1">{findResourceById(resourceId)?.trait}</div> */}
        {netRate ? (
          <div
            className={`${Number(netRate) < 0 ? "text-light-red" : "text-green/80"} self-center px-2 flex font-bold`}
          >
            <div>{parseFloat(netRate.toString()) < 0 ? "" : "+"}</div>

            <div>{netRate / 1000} / s</div>
          </div>
        ) : (
          <div className="self-center ml-2"></div>
        )}
      </div>
    </div>
  );
};
