import React, { useState } from 'react';
import {
  Content,
  SideNav,
  SideNavItems,
  SideNavLink,
  OverflowMenu,
  OverflowMenuItem,
} from "@carbon/react";
import "@carbon/charts/styles.css";
import './home.css';
import {DataShare, Events, ShareKnowledge, Tour, Screen} from "@carbon/icons-react";
import CoverageComponent from "../nav-Items/coverage";
import PocComponent from "../nav-Items/poc";
import EmptyStateComponent from "../empty-state/empty-state";

const HomeComponent = () => {
  const [switchName, setSwitchName] = useState("ugandaemr");
  const [navItem, setNavItem] = useState("coverage");

  const handleOnClickItem = (navItem) => {
    setNavItem(navItem);
  };

  const handleSwitchName = (selectedItem) => {
    setSwitchName(selectedItem);
  }

  return (
    <>
      <header className="metrics-header">
        <div className="header-label"> EMR Metrics</div>
        <div>
          <label> {switchName === "ugandaemr" ? "UgandaEMR" : switchName === "eafya" ? "eAFYA" : "Clinic Master"} </label>
          <OverflowMenu
            renderIcon={Screen}
            flipped={true}
            iconDescription="EMR"
            className="emr-menu-container"
          >
            <OverflowMenuItem itemText="UgandaEMR" onClick={() => handleSwitchName("ugandaemr")} />
            <OverflowMenuItem hasDivider itemText="eAFYA" onClick={() => handleSwitchName("eafya")} />
            <OverflowMenuItem hasDivider itemText="Clinic Master" onClick={() => handleSwitchName("clinicmaster")} />
          </OverflowMenu>
        </div>
      </header>
      <Content className="metrics-body">
        <SideNav aria-label="Side navigation">
          <SideNavItems>
            <SideNavLink renderIcon={Tour} large onClick={() => handleOnClickItem("coverage")}> EMR
              Coverage </SideNavLink>

            <SideNavLink renderIcon={ShareKnowledge} large onClick={() => handleOnClickItem("poc")}> POC
              Data </SideNavLink>

            <SideNavLink renderIcon={Events} large onClick={() =>handleOnClickItem("performance")}> Performance </SideNavLink>

            <SideNavLink renderIcon={DataShare} large onClick={() => handleOnClickItem("exchange")}> EMR
              Health Exchange </SideNavLink>
          </SideNavItems>

          {/*<footer className="footer">*/}
          {/*  <div className="rights-panel">© 2024 All rights reserved</div>*/}
          {/*  <div> Monitoring & Evaluation Technical Support (METS)</div>*/}
          {/*</footer>*/}
        </SideNav>
        <section className="section-wrapper">
          {navItem === "coverage" && (<CoverageComponent emr={switchName}/>)}
          {navItem === "poc" && (<PocComponent emr={switchName}/>)}
          {navItem === "performance" && (<EmptyStateComponent />)}
          {navItem === "exchange" && (<EmptyStateComponent />)}
        </section>
      </Content>
    </>
  );
};

export default HomeComponent;
