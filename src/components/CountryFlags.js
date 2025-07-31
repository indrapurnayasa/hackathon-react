import React from "react";
import TwemojiFlag from "./TwemojiFlag";

function CountryFlags() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Country Flags Test</h2>
      <div className="flex flex-wrap gap-4">
        <TwemojiFlag countryCode="ID" className="text-2xl" />
        <TwemojiFlag countryCode="US" className="text-2xl" />
        <TwemojiFlag countryCode="JP" className="text-2xl" />
        <TwemojiFlag countryCode="GB" className="text-2xl" />
        <TwemojiFlag countryCode="FR" className="text-2xl" />
      </div>
    </div>
  );
}

export default CountryFlags;
