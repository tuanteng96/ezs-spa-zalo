import React from "react";
import { Icon, Page, useNavigate, Text } from "zmp-ui";
import { useQueryParams } from "../../hook";
import { CatalogueCate } from "./components/CatalogueCate";
import { CatalogueMenu } from "./components/CatalogueMenu";
import ListProducts from "./ListProducts";
import ListServices from "./ListServices";

const CataloguePage = () => {
  const navigate = useNavigate();
  const queryParams = useQueryParams();

  const queryConfig = {
    TypeID: queryParams?.TypeID || "",
    CateID: queryParams?.CateID || "",
  };

  return (
    <Page className="page !h-full !overflow-hidden flex flex-col" hideScrollbar>
      <div className="navbar fixed top-0 left-0 min-w-[100vw] max-w-[100vw] z-[999] bg-white">
        <div className="w-2/3 relative flex items-center h-full pl-10">
          <div
            className="absolute left-0 w-10 h-full flex justify-center items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <Icon icon="zi-chevron-left-header" className="text-app" />
          </div>
          <Text.Title className="text-app">Danh mục</Text.Title>
        </div>
      </div>
      <CatalogueMenu queryConfig={queryConfig} />
      <CatalogueCate queryConfig={queryConfig} />
      {queryConfig?.TypeID === "795" ? (
        <ListServices queryConfig={queryConfig} />
      ) : (
        <ListProducts queryConfig={queryConfig} />
      )}
    </Page>
  );
};
export default CataloguePage;
