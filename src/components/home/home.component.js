import React, { useState } from 'react';
import {
  Content,
  SideNav,
  SideNavItems,
  SideNavLink,
  OverflowMenu,
  OverflowMenuItem, Button,
} from "@carbon/react";
import "@carbon/charts/styles.css";
import './home.css';
import {
  DataShare,
  Menu,
  Events,
  ShareKnowledge,
  Tour,
  TableOfContents,
  OverflowMenuVertical
} from "@carbon/icons-react";
import CoverageComponent from "../nav-Items/coverage";
import PocComponent from "../nav-Items/poc";
import EmptyStateComponent from "../empty-state/empty-state";
import HIEComponent from "../nav-Items/hie";

const HomeComponent = () => {
  const [switchName, setSwitchName] = useState("ugandaemr");
  const [navItem, setNavItem] = useState("coverage");
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const handleOnClickItem = (navItem) => {
    setNavItem(navItem);
    setIsSideNavOpen(false);
  };

  const handleSwitchName = (selectedItem) => {
    setSwitchName(selectedItem);
  }

  const handleSideNavItemClick = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <>
      <header className="metrics-header">
        <div className="header-label">
          <Button
            hasIconOnly
            renderIcon={Menu}
            kind="tertiary"
            onClick={handleSideNavItemClick}
            className="toggle-menu-btn"
          />
          <span>EMR Metrics</span>
        </div>
        <div>
          <label> {switchName === "ugandaemr" ? "UgandaEMR+" : switchName === "eafya" ? "eAFYA" : "Clinic Master"} </label>
          <OverflowMenu
            renderIcon={OverflowMenuVertical}
            flipped={true}
            iconDescription="EMR"
            className="emr-menu-container"
          >
            <OverflowMenuItem itemText="UgandaEMR+" onClick={() => handleSwitchName("ugandaemr")} />
            <OverflowMenuItem hasDivider itemText="eAFYA" onClick={() => handleSwitchName("eafya")} />
            <OverflowMenuItem hasDivider itemText="Clinic Master" onClick={() => handleSwitchName("clinicmaster")} />
          </OverflowMenu>
        </div>
      </header>
      <Content className={isSideNavOpen ? "nav-controller metrics-body" : "metrics-body"} >
        <SideNav aria-label="side navigation" inert={undefined}>
          <SideNavItems>
            <SideNavLink renderIcon={Tour} large onClick={() => handleOnClickItem("coverage")}> EMR+
              Coverage</SideNavLink>

            <SideNavLink renderIcon={ShareKnowledge} large onClick={() => handleOnClickItem("poc")}> Live POC
              Data </SideNavLink>

            {/*<SideNavLink className="disabled-link" renderIcon={Events} large onClick={() =>handleOnClickItem("performance")}> Performance </SideNavLink>*/}

            <SideNavLink renderIcon={DataShare} large onClick={() => handleOnClickItem("exchange")}> HIE
              Metrics </SideNavLink>
          </SideNavItems>
        </SideNav>
        <section className="section-wrapper">
          {navItem === "coverage" && (<CoverageComponent emr={switchName}/>)}
          {navItem === "poc" && (<PocComponent emr={switchName}/>)}
          {navItem === "performance" && (<EmptyStateComponent />)}
          {navItem === "exchange" && (<HIEComponent emr={switchName} />)}
        </section>
      </Content>
    </>
  );
};

export default HomeComponent;
