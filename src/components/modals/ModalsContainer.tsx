"use client";

import React from "react";
import { modals as modalsDescriber } from "./modalsDescriber";
import { useModalStore } from "@/stores/modal";
import { isObjectEmpty } from "@/lib/utils";

export const ModalsContainer = (props: any) => {
  const [modals, setModals] = useModalStore((state) => [
    state.modals,
    state.setModals,
  ]);

  if (isObjectEmpty(modals)) {
    setModals();
  }

  return (
    <React.Fragment>
      {Object.entries(modals).map(([name, { open, ...otherProps }]) => {
        if (!open) return null;

        const modalTmp = modalsDescriber[name];

        return <modalTmp.component key={name} />;
      })}
    </React.Fragment>
  );
};
