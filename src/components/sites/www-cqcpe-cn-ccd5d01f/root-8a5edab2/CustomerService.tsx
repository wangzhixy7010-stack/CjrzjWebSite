"use client";

import { useState } from "react";

export function CustomerService() {
  const [open, setOpen] = useState(false);

  return (
    <div className="customer-service">
      <div id="csPopup" className={open ? "cs-popup show" : "cs-popup"}>
        <div className="cs-popup-content">
          {open ? (
            <iframe
              src="https://www.zyautoservice.cn/qa/#/znkf1"
              title="智能客服"
            />
          ) : null}
        </div>
      </div>
      <button
        id="csButton"
        className="cs-button"
        type="button"
        aria-label="智能客服"
        onClick={() => setOpen((value) => !value)}
      />
    </div>
  );
}
