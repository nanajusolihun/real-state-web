import React, { useState, useContext } from "react";
import { RiWallet3Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Menu } from "@headlessui/react";
import { HouseContext } from "./HouseContext";

const PriceRangeDropdown = () => {
    const { price, setPrice } = useContext(HouseContext);

    const [isOpen, setIsOpen] = useState(false);

    const prices = [
      { value: "Price range (any)" },      
      { value: "> 10000000000" },
      { value: "7600000000 - 10000000000" },
      { value: "5100000000 - 7500000000" },
      { value: "2600000000 - 5000000000" },
      { value: "1100000000 - 2500000000" },
      { value: "510000000 - 1000000000" },
      { value: "< 500000000 " },
    ];
    return (
      <Menu as="div" className="dropdown relative">
        <Menu.Button className="dropdown-btn w-full text-left" onClick={() => setIsOpen(!isOpen)}>
          <RiWallet3Line className="dropdown-icon-primary" />
          <div>
            <div className="text-[15px] font-medium leading-tight">{price}</div>
            <div className="text-[13px]">Choose price range</div>
          </div>
          {isOpen ? <RiArrowUpSLine className="dropdown-icon-secondary" /> : <RiArrowDownSLine className="dropdown-icon-secondary" />}
        </Menu.Button>

        <Menu.Items className="dropdown-menu">
          {prices.map((price, index) => {
            return (
              <Menu.Item onClick={() => setPrice(price.value)} key={index} as="li" className="cursor-pointer hover:bg-violet-800 transition">
                {price.value}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Menu>
    );
};

export default PriceRangeDropdown;
