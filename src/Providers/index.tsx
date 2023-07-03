import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import DataProvider from "./ApolloProvider";
import SwProvider from "./SwProvider";

const Providers = (props) => {
  return (
    <RecoilRoot>
      <SwProvider>
        <DataProvider>
          <HelmetProvider>
            <BrowserRouter>{props.children}</BrowserRouter>;
          </HelmetProvider>
        </DataProvider>
      </SwProvider>
    </RecoilRoot>
  );
};

export default Providers;
